function PageNotFound() {
    return (
        <>
            <section className="condition-wrap">
                <div className="container">
                    <div className="contact-head term-box">
                        <h2>ERROR</h2>
                        <ul className="circle-box">
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="error-section">
                <div className="container">
                    <div className="page-wrap">
                        <figure className="error-img">
                            <img src="/assets/images/404.png" alt="404" />
                        </figure>
                        <h2>PAGE NOT FOUND</h2>
                        <p>The page you are looking for does not exist , I can take you to the <a href="/">homepage.</a></p>
                        <a href="/" className="back-link btn">Back to homepage</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PageNotFound;