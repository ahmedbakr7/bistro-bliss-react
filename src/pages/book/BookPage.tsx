import { type ReactNode, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import Form from "../../components/Form/Form";
import { bookSchema } from "../../schemas/book/book";
import { resetBook, submitBook } from "./BookController";
import Input from "../../components/Form/Input";
import useAuthContext from "../../stores/AuthContext/useAuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { paths } from "../../utils/routes/routePaths";

export interface BookDataType {
    date?: string;
    time?: string;
    name: string;
    phone: string;
    totalPerson: number;
}

export default function BookPage(): ReactNode {
    const { authState } = useAuthContext();
    const location = useLocation();

    // Hooks must come before any early returns
    const dateConstraints = useMemo(() => {
        const today = new Date();
        const formatDateForInput = (date: Date) =>
            date.toISOString().split("T")[0];
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = today;
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);
        return {
            defaultValue: formatDateForInput(tomorrow),
            min: formatDateForInput(minDate),
            max: formatDateForInput(maxDate),
        };
    }, []);

    const timeConstraints = useMemo(() => {
        const minTime = "11:00";
        const maxTime = "22:00";
        const defaultTime = "19:00";
        const step = "30"; // minutes
        return { minTime, maxTime, defaultTime, step };
    }, []);

    const bookTableMutation = useMutation({
        mutationFn: async (bookData: BookDataType) => submitBook(bookData),
        onSuccess: () => {
            console.log("Table booked successfully!");
        },
        onError: (error) => {
            console.error("Booking failed:", error);
        },
    });

    if (!authState.user) {
        return <Navigate to={paths.login} replace state={{ from: location }} />;
    }

    const handleSubmit = async (
        values: BookDataType,
        { resetForm }: FormikHelpers<BookDataType>
    ) => {
        try {
            await bookTableMutation.mutateAsync(values);
            resetForm();
        } catch {
            // handled in onError
        }
    };

    return (
        <main style={{ maxHeight: "900px", height: "100vh" }}>
            <section className="d-flex flex-column h-100 align-items-center position-relative container py-5">
                <div
                    className="w-100 position-absolute"
                    style={{
                        top: "350px",
                        height: "700px",
                        backgroundColor: "grey",
                        backgroundImage: "url(/src/assets/map.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: -1,
                    }}
                ></div>
                <h1 className="my-4">Book A Table</h1>
                <p className="mb-5">
                    We consider all the drivers of change gives you the
                    components you need to change to create a truly happens.
                </p>
                <div
                    className="p-5 bg-white rounded shadow-lg"
                    style={{ width: "100%", maxWidth: "800px" }}
                >
                    <Form<BookDataType>
                        initialValues={{
                            name: "",
                            phone: "",
                            totalPerson: 1,
                            date: dateConstraints.defaultValue,
                            time: timeConstraints.defaultTime,
                        }}
                        onReset={resetBook}
                        onSubmit={handleSubmit}
                        validationSchema={bookSchema}
                    >
                        {() => (
                            <>
                                <div className="row row-cols-2">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="dateFormControl"
                                                className="form-label"
                                            >
                                                Date
                                            </label>
                                            <Input
                                                name="date"
                                                type="date"
                                                className="form-control"
                                                id="dateFormControl"
                                                min={
                                                    dateConstraints.min as unknown as string
                                                }
                                                max={
                                                    dateConstraints.max as unknown as string
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="timeFormControl"
                                                className="form-label"
                                            >
                                                Time
                                            </label>
                                            <Input
                                                name="time"
                                                type="time"
                                                className="form-control"
                                                id="timeFormControl"
                                                min={
                                                    timeConstraints.minTime as unknown as string
                                                }
                                                max={
                                                    timeConstraints.maxTime as unknown as string
                                                }
                                                step={timeConstraints.step}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="nameFormControl"
                                                className="form-label"
                                            >
                                                Name
                                            </label>
                                            <Input
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                style={{
                                                    borderRadius: "9999px",
                                                }}
                                                placeholder="Enter your name"
                                                id="nameFormControl"
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="phoneFormControl"
                                                className="form-label"
                                            >
                                                Phone
                                            </label>
                                            <Input
                                                name="phone"
                                                id="phoneFormControl"
                                                type="tel"
                                                className="form-control"
                                                placeholder="x-xxx-xxx-xxxx"
                                                minLength={11}
                                                maxLength={11}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 w-100 ">
                                    <label
                                        htmlFor="personFormControl"
                                        className="form-label"
                                    >
                                        Number of Persons
                                    </label>
                                    <Input
                                        name="totalPerson"
                                        as="select"
                                        className="form-select"
                                        id="personFormControl"
                                    >
                                        <option value="1" key="1">
                                            1 Person
                                        </option>
                                        <option value="2" key="2">
                                            2 Person
                                        </option>
                                        <option value="3" key="3">
                                            3 Person
                                        </option>
                                        <option value="4" key="4">
                                            4 Person
                                        </option>
                                        <option value="5" key="5">
                                            5 Person
                                        </option>
                                        <option value="6" key="6">
                                            6 Person
                                        </option>
                                        <option value="7" key="7">
                                            7 Person
                                        </option>
                                        <option value="8" key="8">
                                            8 Person
                                        </option>
                                    </Input>
                                </div>
                                <button
                                    type="submit"
                                    className="theme-button w-100"
                                    disabled={bookTableMutation.isPending}
                                >
                                    {bookTableMutation.isPending
                                        ? "Booking..."
                                        : "Book A Table"}
                                </button>
                                {bookTableMutation.isError && (
                                    <div
                                        className="alert alert-danger mt-3"
                                        role="alert"
                                    >
                                        Failed to book table. Please try again.
                                        <br />
                                        <b>Error</b>
                                        <span className="subtitle">
                                            {" "}
                                            {bookTableMutation.error.message}
                                        </span>
                                    </div>
                                )}
                                {bookTableMutation.isSuccess && (
                                    <div
                                        className="alert alert-success mt-3"
                                        role="alert"
                                    >
                                        Table booked successfully! We'll confirm
                                        your reservation shortly.
                                    </div>
                                )}
                            </>
                        )}
                    </Form>
                </div>
            </section>
        </main>
    );
}
