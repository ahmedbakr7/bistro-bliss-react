import { type ReactNode, useMemo } from "react";
import Form from "../../components/Form/Form";
import { bookSchema } from "../../schemas/book/book";
import { resetBook, submitBook } from "./BookController";
import Input from "../../components/Form/Input";

export interface BookDataType {
    date?: string;
    time?: string;
    name: string;
    phone: string;
    totalPerson: number;
}

export default function BookPage(): ReactNode {
    // Calculate default, min, and max dates using useMemo to avoid recalculations on re-renders
    const dateConstraints = useMemo(() => {
        const today = new Date();

        // Format a date as YYYY-MM-DD for HTML date input
        const formatDateForInput = (date: Date) => {
            return date.toISOString().split("T")[0];
        };

        // Default: Tomorrow
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Min: Today
        const minDate = today;

        // Max: 3 months from today
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);

        return {
            defaultValue: formatDateForInput(tomorrow),
            min: formatDateForInput(minDate),
            max: formatDateForInput(maxDate),
        };
    }, []);

    // Calculate time constraints for restaurant booking hours
    const timeConstraints = useMemo(() => {
        // Restaurant opening hours: 11:00 AM to 10:00 PM
        const minTime = "11:00"; // 11:00 AM
        const maxTime = "22:00"; // 10:00 PM
        const defaultTime = "19:00"; // 7:00 PM - a popular dinner time

        // Time slots every 30 minutes
        const step = "30"; // minutes

        return { minTime, maxTime, defaultTime, step };
    }, []);

    return (
        <main style={{ maxHeight: "900px", height: "100vh" }}>
            <section className="d-flex flex-column h-100 align-items-center position-relative container py-5">
                {/* Background image positioned absolutely */}
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
                        onSubmit={submitBook}
                        validationSchema={bookSchema}
                    >
                        {(_formProps) => (
                            <>
                                <div className="row row-cols-2">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="dateFormControl"
                                                className="form-label"
                                            >
                                                Date
                                            </label>{" "}
                                            <Input
                                                name="date"
                                                type="date"
                                                className="form-control"
                                                id="dateFormControl"
                                                min={dateConstraints.min}
                                                max={dateConstraints.max}
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
                                            </label>{" "}
                                            <Input
                                                name="time"
                                                type="time"
                                                className="form-control"
                                                id="timeFormControl"
                                                min={timeConstraints.minTime}
                                                max={timeConstraints.maxTime}
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
                                                className="form-control "
                                                style={{
                                                    borderRadius: "9999px",
                                                }}
                                                placeholder="Enter your name"
                                                // minLength={1}
                                                // formEncType=""
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
                                >
                                    Book A Table
                                </button>
                            </>
                        )}
                    </Form>
                </div>
            </section>
        </main>
    );
}
