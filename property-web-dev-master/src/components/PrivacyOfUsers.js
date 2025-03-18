import { useEffect, useState } from "react";
import { GET } from "../api";
function PrivacyOfUsers() {
    const [data, setData] = useState('');
    useEffect(() => {
        GET("privacy_of_users").then((response) => {
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

export default PrivacyOfUsers;