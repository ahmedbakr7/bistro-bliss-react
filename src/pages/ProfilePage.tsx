import type { ReactNode } from "react";
import Section from "../components/Section";
import Roundel from "../components/Roundel/Roundel";
import Table from "../components/Table/Table";
import type { TableHeader } from "../components/Table/Table";
import { useMemo } from "react";
import { useProfile } from "../hooks/useProfile";
import Form from "../components/Form/Form";
import Input from "../components/Form/Input";
import * as Yup from "yup";
import useAuthContext from "../stores/AuthContext/useAuthContext";
import { useUserOrders } from "../hooks/useOrders";
import OrderGroupRow from "../components/Orders/OrderGroupRow";
import type {
    DetailRow,
    OrderGroup as OrdersOrderGroup,
} from "../components/Orders/types";

// Removed DUMMY_ORDERS and DUMMY_DETAILS in favor of API-driven data

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

    // Fetch user's orders (includes orderDetails from API)
    const { data: ordersPayload, isLoading, isError } = useUserOrders();

    const orders = useMemo(
        () => ordersPayload?.data ?? [],
        [ordersPayload]
    ) as unknown as Array<OrdersOrderGroup["order"]>;

    type OrderGroup = {
        order: OrdersOrderGroup["order"];
        details: DetailRow[];
    };

    const groupedData: OrderGroup[] = useMemo(
        () =>
            (orders ?? []).map((o) => ({
                order: o,
                details: (o.orderDetails ?? []) as DetailRow[],
            })),
        [orders]
    );

    const groupHeaders: TableHeader<OrderGroup>[] = useMemo(
        () => [
            {
                name: "Orders",
                render: (row, _value, rowIndex) => (
                    <OrderGroupRow group={row} rowIndex={rowIndex} />
                ),
            },
        ],
        []
    );

    const emptyEl = useMemo(() => {
        if (isLoading)
            return (
                <tr>
                    <td
                        colSpan={groupHeaders.length + 1}
                        className="text-center"
                    >
                        Loading orders...
                    </td>
                </tr>
            );
        if (isError)
            return (
                <tr>
                    <td
                        colSpan={groupHeaders.length + 1}
                        className="text-center"
                    >
                        Failed to load orders
                    </td>
                </tr>
            );
        return (
            <tr>
                <td colSpan={groupHeaders.length + 1} className="text-center">
                    No orders found
                </td>
            </tr>
        );
    }, [groupHeaders.length, isError, isLoading]);

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
                    emptyElement={emptyEl}
                />
            </Section>
        </main>
    );
}
