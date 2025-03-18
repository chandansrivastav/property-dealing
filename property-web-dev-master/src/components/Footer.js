import { useState, useEffect } from "react";
import { GET } from "../api";
function Footer() {
    let [footer, setfooter] = useState('')
    useEffect(() => {
        GET("footer").then((response) => {
            if (response.status == "success") {
                setfooter(response.data)
            }
        });
    }, []);
    return (
        <>
        <div dangerouslySetInnerHTML={{ __html: footer || '' }}></div>
        </>
    )
}

export default Footer;