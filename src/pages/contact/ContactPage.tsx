import type { ReactNode } from "react";
import Section from "../../components/Section";
import Form from "../../components/Form/Form";
import { contactSchema } from "../../schemas/contactus/registerSchema";
import { MdEmail } from "react-icons/md";
import { resetContact, submitContact } from "./ContactController";

export interface ContactDataType{
    name:string,
    email:string,
    subject:string,
    message:string,
}

export default function ContactPage(): ReactNode {
    return (
        <main>
            <Section title="Contact Us" style={{maxWidth:"700px"}} className="align-items-center py-5">
                <p>
                    We consider all the drivers of change gives you the
                    components you need to change to create a truly happens.
                </p>

                <div
                    className="p-5 bg-white rounded shadow-lg"
                    style={{ width: "100%", maxWidth: "800px" }}
                >
                    <div className="row row-cols-2"> <div className="col">
                        <Form<ContactDataType> onSubmit={submitContact} onReset={resetContact} validationSchema={contactSchema} initialValues={{name:"",email:"",subject:"",message:""}}>
                                                        <div className="mb-3">
                                <label
                                    htmlFor="nameFormControl"
                                    className="form-label"
                                >
                                    Name
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="nameFormControl"
                                />
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label
                                    htmlFor="emailFormControl"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
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
                        <input
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
                        <textarea
                            placeholder="Write a message"
                            className="form-control"
                            id="messageFormControl"
                            rows={4}
                            style={{ resize: "vertical" }}
                        ></textarea>
                    </div>
                    </Form>
                    <button className="theme-button w-100">Send</button>
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
