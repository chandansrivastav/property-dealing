import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import constant from "../constant";
import { GET } from "../api";

function Home() {
  let [homepage, sethomepage] = useState({});
  useEffect(() => {
    GET("home_page").then((response) => {
      if (response.status == "success") {
        console.log(response.data, "Data");

        sethomepage(response.data);
      }
      // toast.success(response.message)
    });
  }, []);

  return (
    <>
      <div
        className="bannerWithVideo"
        dangerouslySetInnerHTML={{ __html: homepage?.bannerData || "" }}
      ></div>
      <div
        dangerouslySetInnerHTML={{ __html: homepage?.servicesData || "" }}
      ></div>
      {homepage?.locationData?.length ? (
        <section className="features">
          <div className="container">
            <div className="features-head">
              <h2>FEATURED LOACALITIES</h2>
              <ul className="circle-box">
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="features-img-wrapper">
              <div className="row">
                <div className="left-slide">
                  <div className="first-slide">
                    {homepage?.locationData[0] ? (
                      <div className="feature-img">
                        <Link
                          to={
                            "/property-list/" + homepage?.locationData[0]?._id
                          }
                        >
                          <img
                            src={
                              constant.BASE_API_IMAGE_URL +
                              homepage?.SHOWLOCATIONPATH +
                              homepage?.locationData[0].image
                            }
                            alt="img"
                            title="img"
                          />
                          <span className="img-text">
                            {homepage?.locationData[0].name || ""}
                          </span>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}

                    {homepage?.locationData[1] ? (
                      <div className="feature-img">
                        <Link
                          to={
                            "/property-list/" + homepage?.locationData[1]?._id
                          }
                        >
                          <img
                            src={
                              constant.BASE_API_IMAGE_URL +
                              homepage?.SHOWLOCATIONPATH +
                              homepage?.locationData[1].image
                            }
                            alt="img"
                            title="img"
                          />
                          <span className="img-text">
                            {homepage?.locationData[1].name || ""}
                          </span>
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {homepage?.locationData[2] ? (
                    <div className="feature-img second">
                      <Link
                        to={"/property-list/" + homepage?.locationData[2]?._id}
                      >
                        <img
                          src={
                            constant.BASE_API_IMAGE_URL +
                            homepage?.SHOWLOCATIONPATH +
                            homepage?.locationData[2].image
                          }
                          alt="img"
                          title="img"
                        />
                        <span className="img-text">
                          {homepage?.locationData[2].name || ""}
                        </span>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {homepage?.locationData[3] ? (
                  <div className="right-slide">
                    <div className="feature-img">
                      <Link
                        to={"/property-list/" + homepage?.locationData[3]?._id}
                      >
                        <img
                          src={
                            constant.BASE_API_IMAGE_URL +
                            homepage?.SHOWLOCATIONPATH +
                            homepage?.locationData[3].image
                          }
                          alt="img"
                          title="img"
                        />
                        <span className="img-text">
                          {homepage?.locationData[3].name || ""}
                        </span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      <div
        dangerouslySetInnerHTML={{ __html: homepage?.projectsData || "" }}
      ></div>
    </>
  );
}

export default Home;
