import type { ReactNode } from "react";
import Section from "../components/Section";
import Roundel from "../components/Roundel/Roundel";
import Table from "../components/Table/Table";
import type { TableHeader } from "../components/Table/Table";
import { useMemo } from "react";
import type { Order, OrderDetail, OrderStatus } from "../services/ordersApi";
import burgerImg from "../assets/burger-sandwich.png";
import friesImg from "../assets/fries.png";
import saladImg from "../assets/salad.png";
import pizzaImg from "../assets/pizza.png";
import { useProfile } from "../hooks/useProfile";
import Form from "../components/Form/Form";
import Input from "../components/Form/Input";
import * as Yup from "yup";
import useAuthContext from "../stores/AuthContext/useAuthContext";

// Dummy data for local testing
export type DetailRow = OrderDetail & { image: string };

const DUMMY_ORDERS: Order[] = [
    {
        id: "ord_1001",
        status: "pending" as OrderStatus,
        userId: "user_1",
        totalPrice: 0,
        acceptedAt: null,
        deliveredAt: null,
        receivedAt: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: new Date().toISOString(),
    },
    {
        id: "ord_1002",
        status: "accepted" as OrderStatus,
        userId: "user_1",
        totalPrice: 0,
        acceptedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        deliveredAt: null,
        receivedAt: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: new Date().toISOString(),
    },
];

const DUMMY_DETAILS: Record<string, DetailRow[]> = {
    ord_1001: [
        {
            id: "itm_1",
            orderId: "ord_1001",
            productId: "burger",
            name_snapshot: "Cheese Burger",
            price_snapshot: 12.5,
            quantity: 2,
            image: burgerImg,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: new Date().toISOString(),
        },
        {
            id: "itm_2",
            orderId: "ord_1001",
            productId: "fries",
            name_snapshot: "French Fries",
            price_snapshot: 4.75,
            quantity: 1,
            image: friesImg,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: new Date().toISOString(),
        },
    ],
    ord_1002: [
        {
            id: "itm_3",
            orderId: "ord_1002",
            productId: "salad",
            name_snapshot: "Garden Salad",
            price_snapshot: 7.25,
            quantity: 3,
            image: saladImg,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: new Date().toISOString(),
        },
        {
            id: "itm_4",
            orderId: "ord_1002",
            productId: "pizza",
            name_snapshot: "Pepperoni Pizza",
            price_snapshot: 15,
            quantity: 1,
            image: pizzaImg,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: new Date().toISOString(),
        },
    ],
};

export default function ProfilePage(): ReactNode {
    // Profile hook
    const profileMutation = useProfile();

    const { authState, setAuthState } = useAuthContext();

    const profile = authState.user;

    type ProfileFormValues = {
        name: string;
        email: string;
        phoneNumber: string;
    };

    const initialValues: ProfileFormValues = useMemo(
        () => ({
            name: (profile?.name as string) || "",
            email: (profile?.email as string) || "",
            phoneNumber: (profile?.phoneNumber as string) || "",
        }),
        [profile?.name, profile?.email, profile?.phoneNumber]
    );

    const validationSchema = useMemo(
        () =>
            Yup.object({
                name: Yup.string()
                    .max(50, "Max 50 characters")
                    .required("Name is required"),
                email: Yup.string()
                    .email("Enter a valid email")
                    .max(50, "Max 50 characters")
                    .required("Email is required"),
                phoneNumber: Yup.string()
                    .max(50, "Max 50 characters")
                    .required("Phone number is required"),
            }),
        []
    );

    // no need to select an order; we're rendering grouped big table
    const orders = DUMMY_ORDERS;

    type OrderGroup = { order: Order; details: DetailRow[] };
    const groupedData: OrderGroup[] = useMemo(
        () =>
            orders.map((o) => ({
                order: o,
                details: DUMMY_DETAILS[o.id] ?? [],
            })),
        [orders]
    );

    const groupHeaders: TableHeader<OrderGroup>[] = useMemo(
        () => [
            {
                name: "Orders",
                render: (row, _value, rowIndex) => {
                    const { order, details } = row;
                    const subtotal = details.reduce(
                        (s, d) => s + (d.price_snapshot ?? 0) * d.quantity,
                        0
                    );
                    const shipping = 15;
                    const total = subtotal + shipping;

                    // Reduce top spacing for subsequent groups to avoid double breaks
                    const containerClass = rowIndex > 0 ? "pt-2 pb-3" : "py-3";

                    return (
                        <div
                            className={containerClass}
                            style={{
                                borderTop:
                                    rowIndex > 0
                                        ? "1px solid #dee2e6"
                                        : undefined,
                            }}
                        >
                            {/* Remove row negative margins inside table cell to prevent horizontal scroll */}
                            <div className="row g-4 mx-0">
                                <div className="col-lg-8">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <h6 className="mb-0">Product name</h6>
                                        <h6 className="mb-0">Unit price</h6>
                                        <h6 className="mb-0">Quantity</h6>
                                    </div>
                                    {rowIndex === 0 && (
                                        <hr className="mt-2 mb-3" />
                                    )}
                                    {details.map((d) => (
                                        <div
                                            key={d.id}
                                            className="d-flex justify-content-between align-items-center py-2"
                                        >
                                            <div className="d-flex align-items-center gap-2">
                                                <img
                                                    src={d.image as string}
                                                    alt={
                                                        (d.name_snapshot as string) ??
                                                        String(d.productId)
                                                    }
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        objectFit: "cover",
                                                        borderRadius: 6,
                                                    }}
                                                />
                                                <span>
                                                    {d.name_snapshot ??
                                                        String(d.productId)}
                                                </span>
                                            </div>
                                            <div
                                                className="text-end"
                                                style={{ minWidth: 80 }}
                                            >
                                                $
                                                {(
                                                    d.price_snapshot ?? 0
                                                ).toFixed(2)}
                                            </div>
                                            <div
                                                className="text-end"
                                                style={{ minWidth: 40 }}
                                            >
                                                {d.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-lg-4">
                                    <div className="border rounded p-4 h-100">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className="badge bg-success-subtle border border-success text-success">
                                                ✓
                                            </span>
                                            <h5 className="m-0">
                                                Order Confirmed
                                            </h5>
                                        </div>
                                        <p className="text-muted mb-4">
                                            we hope you enjoy your food
                                        </p>

                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal :</span>
                                            <span>{`$${subtotal.toFixed(
                                                2
                                            )}`}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Shipping :</span>
                                            <span>{`$${shipping.toFixed(
                                                2
                                            )}`}</span>
                                        </div>
                                        <div className="d-flex justify-content-between border-top pt-2">
                                            <strong>Total :</strong>
                                            <strong>{`$${total.toFixed(
                                                2
                                            )}`}</strong>
                                        </div>

                                        <div className="mt-4">
                                            <div className="mb-2 text-capitalize">
                                                <small className="text-muted">
                                                    status
                                                </small>
                                                <div>
                                                    {order.status ?? "pending"}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <small className="text-muted">
                                                    Order will be delivered soon
                                                </small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="text-muted">
                                                    <small>Created</small>
                                                </span>
                                                <span
                                                    className="rounded-circle bg-danger"
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                        display: "inline-block",
                                                    }}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
        <main>
            <Section
                title="Profile"
                className="p-5 text-center align-items-center"
            >
                <div
                    className=" align-items-center  w-50"
                    style={{ minWidth: "400px" }}
                >
                    <Roundel
                        rounded
                        image={{
                            className: "rounded-circle",
                            src:
                                (`http://localhost:3000/uploads/${profile?.imageUrl}` as string) ||
                                "https://randomuser.me/api/portraits/men/32.jpg",
                            alt: "User Image",
                            style: { height: "81px" },
                        }}
                    />
                    <Form
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await profileMutation.mutateAsync(values);
                                if (profileMutation.data) {
                                    setAuthState({
                                        ...authState,
                                        user: profileMutation.data,
                                    });
                                }
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                        onReset={() => void 0}
                        enableReinitialize
                    >
                        {(formik) => (
                            <>
                                <div className="mb-3">
                                    <label className="form-label text-start w-100">
                                        Name
                                    </label>
                                    <Input
                                        name="name"
                                        type="text"
                                        placeholder="Your name"
                                        className="form-control"
                                        disabled={
                                            profileMutation.isPending ||
                                            formik.isSubmitting
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-start w-100">
                                        Email
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        className="form-control"
                                        disabled={
                                            profileMutation.isPending ||
                                            formik.isSubmitting
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-start w-100">
                                        Phone number
                                    </label>
                                    <Input
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Your phone number"
                                        className="form-control"
                                        disabled={
                                            profileMutation.isPending ||
                                            formik.isSubmitting
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="theme-button "
                                    disabled={
                                        profileMutation.isPending ||
                                        formik.isSubmitting
                                    }
                                >
                                    {profileMutation.isPending ||
                                    formik.isSubmitting
                                        ? "Saving..."
                                        : "Save"}
                                </button>
                            </>
                        )}
                    </Form>
                </div>
            </Section>
            <Section className="d-flex flex-column justify-content-evenly align-items-center w-100">
                <div
                    className="d-flex justify-content-between w-50 mb-4"
                    style={{ minWidth: "402px" }}
                >
                    <button className="theme-button">Active Orders</button>
                    <button className="theme-secondary-button">
                        Order History
                    </button>
                    <button className="theme-secondary-button">
                        My Bookings
                    </button>
                </div>

                <Table<OrderGroup>
                    data={groupedData}
                    tableHeaders={groupHeaders}
                    className="w-100"
                    emptyElement={
                        <tr>
                            <td
                                colSpan={groupHeaders.length + 1}
                                className="text-center"
                            >
                                No orders found
                            </td>
                        </tr>
                    }
                />
            </Section>
        </main>
    );
}
