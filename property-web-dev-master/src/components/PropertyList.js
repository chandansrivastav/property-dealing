import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import constant from "../constant";
import { POST } from "../api";

function PropertyList() {
    const { id } = useParams();
    const [property, setProperty] = useState({
        list: [],
        totalRecords: 0,
        categoryData: {},
        BASEIMAGEPATH: ""
    });
    const [input, setInput] = useState({
        id: id || "",
        pageno: 1,
        limit: 20,
        prevDisabled: true,
        nextDisabled: true
    });
    if (input.id && input.id != id) {
        setInput({ ...input, id: (id || "") });
    }
    useEffect(() => {
        POST("property_list", input).then((response) => {
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
                setProperty(response.data);
            }
        });
    }, [input]);
    function pageChange(e) {
        const pageno = +e.target.value || 1;
        if (pageno == 1 && property.totalRecords > (input.pageno * input.limit)) {
            setInput({ ...input, pageno: input.pageno + pageno });
        } else if (pageno == -1 && input.pageno > 1) {
            setInput({ ...input, pageno: input.pageno + pageno });
        }
    }
    return (
        <section className="blog-section">
            <div className="container">
                <div className="contact-head term-box">
                    <h2>{property?.pageData?.name || ""}</h2>
                    <ul className="circle-box">
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <div className="blog-wrap">
                    {property.list.length ? property.list.map(data => {
                        return (
                            <div key={data._id} className="blog-main">
                                <div className="blog">
                                    <figure className="blog-img">
                                        <img src={constant.BASE_API_IMAGE_URL + property.BASEIMAGEPATH + data.image[0]} alt="property" title="" />
                                    </figure>
                                </div>
                                <p>{data.title}</p>
                                <div className="time-wrap">
                                    <span className="time">{moment(data.createdAt).format(constant.DATE_FORMAT)}</span>
                                    <Link to={"/property-details/" + id + "/" + data._id}><div className="more-link">&#8377; {data.price}</div></Link>
                                </div>
                            </div>
                        );
                    }) : <h2>Not available...</h2>}
                </div>
                <div>
                    <button onClick={pageChange} value={-1} disabled={input.prevDisabled}>Previous</button>
                    {input.pageno}
                    <button onClick={pageChange} value={1} disabled={input.nextDisabled}>Next</button>
                </div>
            </div>
        </section>
    )
}

export default PropertyList