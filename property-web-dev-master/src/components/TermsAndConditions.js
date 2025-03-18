import { useEffect, useState } from "react";
import { GET } from "../api";
function TermsAndConditions() {
    const [data, setData] = useState('');
    useEffect(() => {
        GET("terms_and_conditions").then((response) => {
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

export default TermsAndConditions;