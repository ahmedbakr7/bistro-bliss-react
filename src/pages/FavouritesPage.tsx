import "../components/Card.css";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Section from "../components/Section";
import GridContainer from "../components/GridContainer";
import { Card } from "../components/Card";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import {
    fetchFavouriteDetails,
    type FavouritePayload,
} from "../services/favouritesApi";
import { useCart } from "../hooks/useCart";
import { useFavourites } from "../hooks/useFavourites";
import useAuthContext from "../stores/AuthContext/useAuthContext";

// Define a simple view model for rendering favourites lines
interface FavouriteViewItem {
    detailId: string | number;
    productId: string | number;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

const friendlyFontStyle: React.CSSProperties = {
    fontFamily: '"Poppins", "Segoe UI", system-ui, sans-serif',
    letterSpacing: "0.25px",
};

export default function WishlistPage(): ReactNode {
    const { authState } = useAuthContext();
    const userId =
        (authState.user as unknown as { id?: string; _id?: string })?.id ||
        (authState.user as unknown as { id?: string; _id?: string })?._id ||
        "";

    const {
        data: favPayload,
        isPending,
        isError,
        error,
    } = useQuery<FavouritePayload>({
        queryKey: ["user-favourite-items", userId],
        queryFn: () => fetchFavouriteDetails(userId),
        enabled: !!userId,
        staleTime: Infinity,
    });

    // Map API payload to view items (use snapshot fields)
    const viewItems = useMemo<FavouriteViewItem[]>(() => {
        const rows = favPayload?.items ?? [];
        return rows.map((r, idx) => ({
            detailId: r.id ?? idx,
            productId: r.productId,
            name: r.name_snapshot ?? `Favourite #${idx + 1}`,
            price: Number(r.price_snapshot ?? 0),
            description: undefined,
            imageUrl: undefined,
        }));
    }, [favPayload]);

    const { data: cartItems, addToCart } = useCart();
    const { data: favouriteIds, toggle } = useFavourites();

    const favouriteSet = useMemo(
        () => new Set(favouriteIds ?? []),
        [favouriteIds]
    );
    const cartIdSet = useMemo(
        () => new Set((cartItems ?? []).map((ci) => ci.productId)),
        [cartItems]
    );

    function toggleFavourite(productId: number | string) {
        toggle(productId, favouriteIds);
    }

    function handleAddToCart(productId: number | string) {
        addToCart(productId, 1);
    }

    return (
        <main style={friendlyFontStyle}>
            <Section
                title="My Wishlist"
                className="justify-content-center p-5 align-items-center gap-4"
            >
                <p className="text-muted mb-4" style={{ maxWidth: 640 }}>
                    Your curated list of favourite dishes. Add to cart when
                    you’re ready.
                </p>

                {isPending ? (
                    <div
                        className="d-flex justify-content-center align-items-center my-5"
                        aria-live="polite"
                        aria-busy="true"
                    >
                        <div
                            className="spinner-border text-primary me-3"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="text-muted">Loading favourites…</span>
                    </div>
                ) : isError ? (
                    <div className="alert alert-danger m-3" role="alert">
                        Failed to load favourites:{" "}
                        {error instanceof Error
                            ? error.message
                            : "Unknown error"}
                    </div>
                ) : viewItems.length === 0 ? (
                    <div className="text-center text-muted my-5">
                        No favourites found. Try adding items to your wishlist.
                    </div>
                ) : (
                    <GridContainer className="g-4 w-100" numberOfColumns={4}>
                        {viewItems.map((item) => {
                            const isFav = favouriteSet.has(item.productId);
                            const inCart = cartIdSet.has(item.productId);
                            const imgSrc =
                                item.imageUrl ??
                                "/images/placeholder_image.png";

                            return (
                                <Card
                                    key={item.detailId}
                                    className="rounded-4 h-100 shadow-sm position-relative overflow-hidden menu-card"
                                    style={{
                                        background: "#fff",
                                        border: "1px solid var(--bs-border-color, #eee)",
                                        transition:
                                            "transform .3s ease, box-shadow .3s ease",
                                    }}
                                >
                                    <div
                                        className="position-absolute top-0 end-0 m-2 p-2 rounded-circle d-flex align-items-center justify-content-center favorite-btn"
                                        style={{
                                            background: "rgba(255,255,255,.85)",
                                            backdropFilter: "blur(6px)",
                                            cursor: "pointer",
                                            color: isFav ? "#e63946" : "#555",
                                            zIndex: 5,
                                        }}
                                        aria-label={
                                            isFav
                                                ? "Remove from favourites"
                                                : "Add to favourites"
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavourite(item.productId);
                                        }}
                                    >
                                        {isFav ? <FaHeart /> : <FaRegHeart />}
                                    </div>
                                    <div className="menu-card-media position-relative">
                                        <Card.Image
                                            src={imgSrc}
                                            className="w-100"
                                            style={{
                                                height: 170,
                                                objectFit: "cover",
                                                borderRadius: "1rem",
                                                position: "relative",
                                                zIndex: 1,
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!inCart)
                                                    handleAddToCart(
                                                        item.productId
                                                    );
                                            }}
                                            className={`menu-add-btn theme-btn-primary ${
                                                inCart ? "is-added" : ""
                                            } d-flex align-items-center gap-2 px-3 py-2 rounded-4 fw-semibold border-0`}
                                            style={{
                                                position: "absolute",
                                                bottom: 12,
                                                left: "50%",
                                                boxShadow:
                                                    "0 4px 14px -4px rgba(0,0,0,.25)",
                                                fontSize: ".8rem",
                                                transition:
                                                    "opacity .35s ease, transform .35s ease",
                                                zIndex: 4,
                                            }}
                                            aria-label={
                                                inCart
                                                    ? "Item added"
                                                    : "Add to cart"
                                            }
                                        >
                                            <FiShoppingCart />
                                            {inCart ? "Added" : "Add to cart"}
                                        </button>
                                    </div>
                                    {/* Centered content with price first */}
                                    <div className="pt-3 px-3 pb-4 text-center d-flex flex-column h-100">
                                        <h4
                                            className="mb-2 fw-bold theme-text-primary price"
                                            style={{ fontSize: "1.15rem" }}
                                        >
                                            ${Number(item.price).toFixed(2)}
                                        </h4>
                                        <h5
                                            className="mb-2 fw-semibold"
                                            style={{ fontSize: "1.05rem" }}
                                        >
                                            {String(item.name)}
                                        </h5>
                                        <p
                                            className="text-muted flex-grow-1 mb-0"
                                            style={{
                                                fontSize: ".8rem",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {/* No description in snapshot */}
                                        </p>
                                    </div>
                                </Card>
                            );
                        })}
                    </GridContainer>
                )}
            </Section>
        </main>
    );
}
