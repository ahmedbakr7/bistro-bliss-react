import type { ReactNode } from "react";
import Section from "../../components/Section";
import Form from "../../components/Form/Form";
import { contactSchema } from "../../schemas/contactus/registerSchema";
import { resetContact, submitContact } from "./ContactController";
import Input from "../../components/Form/Input";
import { useMutation } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";

export interface ContactDataType {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactPage(): ReactNode {
    const contactMutation = useMutation({
        mutationFn: async (contactData: ContactDataType) => {
            return await submitContact(contactData);
        },
        onSuccess: () => {
            // Handle successful booking - UI will show success message
            console.log("Table booked successfully!");
        },
        onError: (error) => {
            // Handle booking error - UI will show error message
            console.error("Booking failed:", error);
        },
    });

    // Custom submit handler that uses the mutation
    const handleSubmit = async (
        values: ContactDataType,
        { resetForm }: FormikHelpers<ContactDataType>
    ) => {
        try {
            await contactMutation.mutateAsync(values);
            // Reset form on successful submission
            resetForm();
        } catch (error) {
            // Error is handled by the mutation's onError callback
            console.log(error);
        }
    };

    return (
        <main>
            <Section
                title="Contact Us"
                style={{ maxWidth: "700px" }}
                className="align-items-center py-5"
            >
                <p>
                    We consider all the drivers of change gives you the
                    components you need to change to create a truly happens.
                </p>

                <div
                    className="p-5 bg-white rounded shadow-lg"
                    style={{ width: "100%", maxWidth: "800px" }}
                >
                    <Form<ContactDataType>
                        onSubmit={handleSubmit}
                        onReset={resetContact}
                        validationSchema={contactSchema}
                        initialValues={{
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                        }}
                    >
                        {(formProps) => (
                            <>
                                <div className="row row-cols-2">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="nameFormControl"
                                                className="form-label"
                                            >
                                                Name
                                            </label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="nameFormControl"
                                                name="name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="emailFormControl"
                                                className="form-label"
                                            >
                                                Email
                                            </label>
                                            <Input
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                id="emailFormControl"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="subjectFormControl"
                                        className="form-label"
                                    >
                                        Subject
                                    </label>
                                    <Input
                                        name="subject"
                                        type="text"
                                        placeholder="Write a subject"
                                        className="form-control"
                                        id="subjectFormControl"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="messageFormControl"
                                        className="form-label"
                                    >
                                        Message
                                    </label>
                                    <Input
                                        as="textarea"
                                        name="message"
                                        type="text"
                                        placeholder="Write a message"
                                        className="form-control"
                                        id="messageFormControl"
                                        rows={4}
                                        style={{ resize: "vertical" }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="theme-button w-100"
                                    disabled={contactMutation.isPending}
                                >
                                    {contactMutation.isPending
                                        ? "Sending..."
                                        : "Send"}
                                </button>
                                {contactMutation.isError && (
                                    <div
                                        className="alert alert-danger mt-3"
                                        role="alert"
                                    >
                                        Failed to book table. Please try again.
                                        <br />
                                        <b>Error</b>
                                        <span className="subtitle">
                                            {contactMutation.error.message}
                                        </span>
                                    </div>
                                )}

                                {/* Display success message if mutation succeeded */}
                                {contactMutation.isSuccess && (
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
                <div className="row mt-4 row-cols-3 w-100">
                    <div className="d-flex col flex-column">
                        <b className="mb-2">Call Us:</b>
                        <p>888-123-650</p>
                    </div>
                    <div className="d-flex col flex-column">
                        <b className="mb-2">Hours</b>
                        <p>Mon-Fri: 11am - 8pm Sat, Sun: 9am - 10pm</p>
                    </div>
                    <div className="d-flex col flex-column">
                        <b className="mb-2">Our Location:</b>
                        <p>
                            123 Bridge Street Nowhere Land, LA 12345 United
                            States
                        </p>
                    </div>
                </div>
            </Section>
        </main>
    );
}
