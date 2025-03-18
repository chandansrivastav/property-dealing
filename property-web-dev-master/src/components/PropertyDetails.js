import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import constant from "../constant";
import { GET, POST } from "../api";

function PropertyDetails() {
    let { id, slug } = useParams();
    const [details, setDetails] = useState({
        details: null,
        BASEIMAGEPATH: ""
    });
    const [input, setInput] = useState({
        propertyId: id || ""
    });
    const [error, setError] = useState({});
    const [form, setForm] = useState({
        submitButtonDisabled: false
    });
    useEffect(() => {
        GET("property_details/" + id).then((response) => {
            if (response.status == "success") {
                setDetails(response.data);
            } else {
                toast.error(response.message, { autoClose: 3000 });
            }
        });
    }, []);

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
                if ((/^[6-9]\d{9}$/).test(value)) {
                    setError({ ...error, [name]: "" });
                } else {
                    setError({ ...error, [name]: "Please enter valid phone no." });
                }
                break;
            case "req_date":
                if (value) {
                    setError({ ...error, [name]: "" });
                } else {
                    setError({ ...error, [name]: "Please select date." });
                }
                break;
            case "req_time":
                if (value) {
                    setError({ ...error, [name]: "" });
                } else {
                    setError({ ...error, [name]: "Please select time." });
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
        if (
            error.name == "" &&
            error.email == "" &&
            error.mobile == "" &&
            error.req_date == "" &&
            error.req_time == "" &&
            input.propertyId &&
            details?.details?.propertyStatus != "Sold"
        ) {
            setForm({ submitButtonDisabled: true });
            POST("property_req_add", input).then((response) => {
                if (response.status == "success") {
                    setInput({});
                    setError({});
                    toast.success(response.message, { autoClose: 3000 });
                } else {
                    toast.error(response.message, { autoClose: 3000 });
                }
                setForm({ submitButtonDisabled: false });
            });

        } else {
            if (!input.propertyId) {
                toast.error("Some parameter are missing. please reload the page and try again.", { autoClose: 3000 });
            } else {
                if (!error.name && !input.name) error.name = "Name is required.";
                if (!error.email && !input.email) error.email = "Email is required.";
                if (!error.mobile && !input.mobile) error.mobile = "Phone no. is required.";
                if (!error.req_date && !input.req_date) error.req_date = "Please select date.";
                if (!error.req_time && !input.req_time) error.req_time = "Please select time.";
                setError({ ...error });
            }
        }
    }

    return (
        <>
            {details?.details ? <>
                <section className="condition-wrap">
                    <div className="container">
                        <div className="contact-head term-box">
                            <h2>{details?.details?.title || "N/A"}</h2>
                            <ul className="circle-box">
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="enquiry-section">
                    <div className="container">
                        <div className="enquiry-block">
                            <figure className="enquiry-img">
                                <img src={constant.BASE_API_IMAGE_URL + details?.BASEIMAGEPATH + details?.details?.image[0]} alt={details?.details?.title || "N/A"} />
                                {/* {(details?.details?.image || []).map((imgDt, index) => {
                                    return <img key={index} src={constant.BASE_API_IMAGE_URL + details?.BASEIMAGEPATH + imgDt} alt={details?.details?.title || "N/A"} />
                                })} */}
                            </figure>
                            <div className="enquiry-main">
                                {(details?.details?.propertyStatus == "Sold") ? <h3>Already Sold</h3> :
                                    <><h3>Request Enquiry</h3>
                                        <form className="form-wrapper" method="POST" onSubmit={submitForm}>
                                            <div className="error-tag">{error.name || ""}</div>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Name*" value={input.name || ""} onChange={changeHandler} />
                                            <div className="error-tag">{error.email || ""}</div>
                                            <input type="text" className="form-control" name="email" id="email" value={input.email || ""} onChange={changeHandler} placeholder="Email*" />
                                            <div className="error-tag">{error.mobile || ""}</div>
                                            <input type="text" className="form-control" name="mobile" id="mobile" value={input.mobile || ""} onChange={changeHandler} placeholder="Phone No.*" />
                                            <div className="error-tag">{error.req_date || ""}</div>
                                            <input type="date" className="form-control" name="req_date" id="req_date" value={input.req_date || ""} onChange={changeHandler} />
                                            <div className="error-tag">{error.req_time || ""}</div>
                                            <input type="time" className="form-control" name="req_time" id="req_time" value={input.req_time || ""} onChange={changeHandler} />
                                            <button className="btn" disabled={form.submitButtonDisabled}>SUBMIT</button>
                                        </form>
                                    </>}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="shree-section">
                    <div className="container">
                        <div className="shree-wrap">
                            <div className="shree-developer">
                                <h2>{details?.details?.title || "N/A"}</h2>
                                <p dangerouslySetInnerHTML={{ __html: details?.details?.details || 'N/A' }}></p>
                            </div>
                            <div className="specifications">
                                <h2>Specifications</h2>
                                <ul className="specific-block">
                                    <div dangerouslySetInnerHTML={{ __html: details?.details?.specifications || 'N/A' }}></div>
                                </ul>
                            </div>
                            <div className="specifications">
                                <h2>Amenities</h2>
                                <ul className="specific-block">
                                    <div dangerouslySetInnerHTML={{ __html: details?.details?.amenities || 'N/A' }}></div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </> : ""}
        </>
    );
}

export default PropertyDetails;