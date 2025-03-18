import { useEffect, useState } from "react";
import constant from "../constant";
import { POST } from "../api";
function News() {
    const [news, setNews] = useState({
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
        POST("news_list", input).then((response) => {
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
                setNews(response.data);
            }
        })
    }, [input]);
    function pageChange(e) {
        const pageno = +e.target.value || 1;
        if (pageno == 1 && news.totalRecords > (input.pageno * input.limit)) {
            setInput({ ...input, pageno: input.pageno + pageno });
        } else if (pageno == -1 && input.pageno > 1) {
            setInput({ ...input, pageno: input.pageno + pageno });
        }
    }
    return (
        <section className="about-wrap news-wrapper">
            <div className="container">
                <div className="contact-head">
                    <h2>NEWS
                        <ul className="circle-box">
                            <li></li>
                            <li></li>
                        </ul>
                    </h2>
                </div>
                {news.list.length ? news.list.map((data) => {
                    return (
                        <div key={data._id}>
                            <h3>{data.title}</h3>
                            <div className="news-wrap">
                                <div className="news-left">
                                    <figure className="news-img">
                                        <img src={constant.BASE_API_IMAGE_URL + news.BASEIMAGEPATH + data.image} alt="times" />
                                    </figure>
                                </div>
                                <div className="news-right">
                                    <p><div dangerouslySetInnerHTML={{ __html: data.content || "" }}></div></p>
                                </div>
                            </div>
                        </div>
                    )
                }) : <h2>Not available</h2>}
                <button onClick={pageChange} value={-1} disabled={input.prevDisabled}>Previous</button>
                {input.pageno}
                <button onClick={pageChange} value={1} disabled={input.nextDisabled}>Next</button>
            </div>
        </section >
    )
}

export default News