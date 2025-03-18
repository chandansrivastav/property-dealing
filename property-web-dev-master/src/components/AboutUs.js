import { useEffect, useState } from "react";
import { GET } from "../api";
function AboutUs() {
    const [data, setData] = useState('');
    useEffect(() => {
        GET("about_us").then((response) => {
            if (response.status == "success") {
                setData(response.data);
            }
        });
    }, [])
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: data || '' }}></div>
        </>
    )
}

export default AboutUs;