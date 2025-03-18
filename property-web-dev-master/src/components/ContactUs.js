import { useState } from "react";
import { toast } from 'react-toastify';
import { POST } from "../api";

function ContactUs() {
    const [input, setInput] = useState({});
    const [error, setError] = useState({});
    const [form, setForm] = useState({
        submitButtonDisabled: false
    });
    function formValidation(name, value) {
        switch (name) {
            case "name":
                if (value) {
                    setError({ ...error, [name]: "" });
                } else {
                    setError({ ...error, [name]: "Please enter name." });
                }
                break;
            case "email":
                if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    setError({ ...error, [name]: "" });
                } else {
                    setError({ ...error, [name]: "Please enter valid email id" });
                }
                break;
            case "mobile":
                if (+value && value.length == 10) {
                    setError({ ...error, [name]: "" });
                } else {
                    setError({ ...error, [name]: "Please enter valid mobile number" });
                }
                break;
            case "message":
                if (value) {
                    setError({ ...error, [name]: "" });
                } else {
                    setError({ ...error, [name]: "Please enter message." });
                }
                break;
            default:
                break;
        }
    }
    function changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        formValidation(name, value);
        setInput({ ...input, [name]: value });
    }
    function submitForm(e) {
        e.preventDefault();
        if (error.name == "" &&
            error.email == "" &&
            error.mobile == "" &&
            error.message == "") {
            setForm({ submitButtonDisabled: true });
            POST("contact_us", input).then((response) => {
                if (response.status == "success") {
                    setInput({});
                    setError({});
                    toast.success(response.message, { autoClose: 3000 });
                } else {
                    toast.error(response.message, { autoClose: 3000 });
                }
                setForm({ submitButtonDisabled: false });
            })
        } else {
            if (!error.name && !input.name) error.name = "Name is required.";
            if (!error.email && !input.email) error.email = "Email is required.";
            if (!error.mobile && !input.mobile) error.mobile = "Mobile is required.";
            if (!error.message && !input.message) error.message = "Message is required.";
            setError({ ...error });
            // toast.error("Please enter all required fields.", { autoClose: 3000 });
        }
    }
    return (
        <section className="contact-page" id="contact">
            <div className="container">
                <div className="contact-img ">
                    <div className="contact-head">
                        <h2>Contact Us
                            <ul className="circle-box">
                                <li></li>
                                <li></li>
                            </ul>
                        </h2>

                    </div>
                    {/* <div className="img">
                        <img src="assets/images/contact-img.jpg" alt="img" title="img" />
                    </div> */}
                </div>
                <div className="contact-form">
                    <h2>Feel free to contact us anytime. We will get
                        back to you as soon as we can!</h2>
                    <form className="form-wrapper" method="POST" onSubmit={submitForm}>
                        <div className="error-tag">{error.name || ""}</div>
                        <input type="text" name="name" id="name" value={input.name || ""} onChange={changeHandler} placeholder="Name" />
                        <div className="error-tag">{error.email || ""}</div>
                        <input type="text" name="email" id="email" value={input.email || ""} onChange={changeHandler} placeholder="Email" />
                        <div className="error-tag">{error.mobile || ""}</div>
                        <input type="text" name="mobile" id="mobile" value={input.mobile || ""} onChange={changeHandler} placeholder="Mobile" />
                        <div className="error-tag">{error.message || ""}</div>
                        <input type="text" name="message" id="message" value={input.message || ""} onChange={changeHandler} placeholder="Message" />
                        <button type="submit" className="btn" disabled={form.submitButtonDisabled}>SEND</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactUs;