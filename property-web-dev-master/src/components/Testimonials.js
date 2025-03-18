import { useEffect, useState } from "react";
import constant from "../constant";
import { POST } from "../api";
function Testimonials() {
    const [testimonials, setTestimonials] = useState({
        list: [],
        totalRecords: 0,
        BASEIMAGEPATH: ""
    });
    const [input, setInput] = useState({
        pageno: 1,
        limit: 20,
        prevDisabled: true,
        nextDisabled: true
    })
    useEffect(() => {
        POST("testimonials_list", input).then((response) => {
            if (response.status == "success") {
                if (response.data.totalRecords > (input.pageno * input.limit)) {
                    input.nextDisabled = false;
                } else {
                    input.nextDisabled = true;
                }
                if (input.pageno <= 1) {
                    input.prevDisabled = true
                } else {
                    input.prevDisabled = false
                }
                setTestimonials(response.data);
            }
        })
    }, [input]);
    function pageChange(e) {
        const pageno = +e.target.value || 1;
        if (pageno == 1 && testimonials.totalRecords > (input.pageno * input.limit)) {
            setInput({ ...input, pageno: input.pageno + pageno });
        } else if (pageno == -1 && input.pageno > 1) {
            setInput({ ...input, pageno: input.pageno + pageno });
        }
    }
    return (
        <section className="testimonials">
            <div className="container">
                <div className="contact-head term-box">
                    <h2>TESTIMONIALS</h2>
                    <ul className="circle-box">
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                {/* <h3>Join thousands of happy clients</h3> */}
                <h3></h3>
                <div className="testimonials-warp">
                    {testimonials.list.length ? testimonials.list.map((data) => {
                        return (
                            <div key={data._id} className="testimonials-box">
                                <div className="testimonials-img">
                                    <img src={constant.BASE_API_IMAGE_URL + testimonials.BASEIMAGEPATH + data.image} alt="client" />
                                </div>
                                <div className="testimonials-info">
                                    <h3>{data.name}</h3>
                                    <address>{data.address}</address>
                                    <blockquote>
                                        <i className="icon-quotes"></i><div dangerouslySetInnerHTML={{ __html: data.content || "" }}></div><i className="icon-quotes close"></i></blockquote>
                                </div>
                            </div>
                        )
                    }) : <h2>Not available</h2>}
                </div>
                <button onClick={pageChange} value={-1} disabled={input.prevDisabled}>Previous</button>
                {input.pageno}
                <button onClick={pageChange} value={1} disabled={input.nextDisabled}>Next</button>
            </div>
        </section>
    )
}

export default Testimonials