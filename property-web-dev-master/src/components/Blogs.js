import { useEffect, useState } from "react";
import moment from "moment";
import { POST } from "../api";
import constant from "../constant";

function Blogs() {
    const [data, setData] = useState({
        blogsList: [],
        totalRecords: 0,
        BASEIMAGEPATH: ""
    });
    const [input, setInput] = useState({
        pageno: 1,
        limit: 20,
        prevDisabled: true,
        nextDisabled: true
    });
    useEffect(() => {
        POST("blogs_list", input).then((response) => {
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
                setData(response.data);
            }
        });
    }, [input]);
    function pageChange(e) {
        const pageno = +e.target.value || 1;
        if (pageno == 1 && data.totalRecords > (input.pageno * input.limit)) {
            setInput({ ...input, pageno: input.pageno + pageno });
        } else if (pageno == -1 && input.pageno > 1) {
            setInput({ ...input, pageno: input.pageno + pageno });
        }
    }
    return (
        <section className="blog-section">
            <div className="container">
                <div className="contact-head blog-head">
                    <h2>BLOGS</h2>
                    <ul className="circle-box">
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="blog-wrap">
                    {data.blogsList.map((dt) => {
                        return (
                            <div key={dt._id} className="blog-main">
                                <div className="blog">
                                    <figure className="blog-img">
                                        <img src={constant.BASE_API_IMAGE_URL + data.BASEIMAGEPATH + dt.image} alt="blog" title="" />
                                    </figure>
                                    <h4>{dt.title}</h4>
                                </div>
                                <p><div dangerouslySetInnerHTML={{ __html: dt.content || "" }}></div></p>
                                <div className="time-wrap">
                                    <span className="time">{moment(dt.createdAt).format(constant.DATE_FORMAT)}</span>
                                    {/* <a href="#" className="more-link">Read more</a> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button onClick={pageChange} value={-1} disabled={input.prevDisabled}>Previous</button>
                {input.pageno}
                <button onClick={pageChange} value={1} disabled={input.nextDisabled}>Next</button>
            </div>
        </section>
    )
}

export default Blogs;