import type { ReactNode } from "react";
import Section from "../components/Section";
import Roundel from "../components/Roundel/Roundel";

export default function ProfilePage(): ReactNode {
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
                            src: "https://randomuser.me/api/portraits/men/32.jpg",
                            alt: "User Image",
                            style: { height: "81px" },
                        }}
                    />
                    <div className="mb-3">
                        <label
                            htmlFor="subjectFormControl"
                            className="form-label text-start w-100"
                        >
                            Name
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
                            htmlFor="subjectFormControl"
                            className="form-label text-start w-100"
                        >
                            Email
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
                            htmlFor="subjectFormControl"
                            className="form-label text-start w-100"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            placeholder="Write a subject"
                            className="form-control"
                            id="subjectFormControl"
                        />
                    </div>
                    <button className="theme-button ">Edit</button>
                </div>
            </Section>
            <Section className="d-flex flex-column justify-content-evenly align-items-center">
                <div className="d-flex justify-content-between w-50 mb-4" style={{minWidth:"402px"}}>
                    <button className="theme-button">Active Orders</button>
                    <button className="theme-secondary-button">
                        Order History
                    </button>
                    <button className="theme-secondary-button">
                        My Bookings
                    </button>
                </div>

                <div className="row w-100 pb-5">
                    <div className="col-9">
                        <div className="d-flex justify-content-between">
                            <h3> Product Name</h3>
                            <h3> Unit Price</h3>
                            <h3> Quantity</h3>
                        </div>
                        <hr />
                        <div className="d-flex text-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <img src="" alt="" />
                                <p>Chocolate Icecream</p>
                            </div>
                            <div className="text-center">
                                <p>$ 18.05</p>
                            </div>
                            <div className="text-center">
                                <p>1</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-3"></div> */}
                </div>
            </Section>
        </main>
    );
}
