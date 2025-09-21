import React from "react";
import type { DetailRow } from "./types";

export type OrderItemRowProps = {
    item: DetailRow;
};

const OrderItemRow: React.FC<OrderItemRowProps> = ({ item }) => {
    const price = (item.price_snapshot ?? item.product?.price ?? 0).toFixed(2);
    const name =
        item.product?.name ?? item.name_snapshot ?? String(item.productId);
    const imageSrc = item.product?.imageUrl
        ? `${item.product?.imageUrl}`
        : item.image ?? "/images/placeholder_image.png";

    return (
        <div className="d-flex justify-content-between align-items-center py-2">
            <div className="d-flex align-items-center gap-2">
                <img
                    src={imageSrc}
                    alt={name}
                    style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 6,
                    }}
                />
                <span>{name}</span>
            </div>
            <div className="text-end" style={{ minWidth: 80 }}>
                ${price}
            </div>
            <div className="text-end" style={{ minWidth: 40 }}>
                {item.quantity}
            </div>
        </div>
    );
};

export default React.memo(OrderItemRow);
