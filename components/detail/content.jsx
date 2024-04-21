import { useState, useEffect } from "react";
import { MdCheckCircle, MdCancel, MdOutlineFlight } from "react-icons/md";
import { FaBinoculars } from "react-icons/fa";

import { GiBinoculars } from "react-icons/gi";
import { IoCarSportOutline, IoFastFoodOutline } from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";
// import { FaQs } from "react-icons/fa"
// import FAQs from "../list/faqs"
import dynamic from "next/dynamic";
import ParseHtml from "../parseToHtml";

const FAQs = dynamic(() => import("../list/faqs"));

const Content = ({ data }) => {
  const [overviewlimit, setOverviewlimit] = useState(200); //desktop:200, mobile : 150
  const [overview, setOverview] = useState(data?.package.description);

  const [tnclimit, setTnclimit] = useState(253);
  const [tnc, setTnc] = useState();

  const [faqsinfo, setFaqsInfo] = useState([]);

  var d = data?.package.description;

  // console.log(d)

  useEffect(() => {
    if (data?.package.description !== undefined)
      setOverview(d.substring(0, overviewlimit));
  }, [overviewlimit]);

  useEffect(() => {
    if (data?.package.tnc !== undefined)
      setTnc(data?.package.tnc.substring(0, tnclimit));
  }, [tnclimit]);

  useEffect(() => {
    if (data?.faqs.length !== 0)
      // setTnc(data?.package.tnc.substring(0, tnclimit))
      setFaqsInfo(data?.faqs);
  }, [faqsinfo]);

  const itnRender = data?.itn.map(function (item, i) {
    let c = i + 1;
    let t = "D" + c;
    return (
      <div
        key={i}
        // itemprop="subTrip"
        // itemtype="https://schema.org/TouristTrip"
        // itemScope
      >
        {/* <meta itemprop="name" content={item.heading} />
        <meta itemprop="description" content={item.desc} /> */}
        <div
          className={`Shape_42 _details_ _hover _box_shadow p-0`}
          data-toggle="tooltip"
          data-placement="left"
          title={t}
        >
          <h4 className={`pt-[10px] pr-[10px] pb-0 pl-[10px] mb-0`}>
            Day {c}: {item.heading}
          </h4>
          <p className={`p-[10px] mb-[10px]`}>{item.desc}</p>
          <div className={`Shape_53 text-sm p-[10px] relative`}>
            <div className={`flex`}>
              <div className={`_location_ flex gap-[10px]`}>
                <FaBinoculars className={`text-[17px]`} />
                {/* <i className="fa fa-binoculars" aria-hidden="true"></i>{" "} */}
                <p>
                  {item.attractions.replace(/#/g, " - ").replace(/\//g, " ")}{" "}
                  {item.otherAttractions != undefined
                    ? item.otherAttractions
                        .replace(/,/g, " - ")
                        .replace(/\//g, " ")
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const hotelRender = data?.hotels.map(function (item, i) {
    let hotelname = item.hotelInfo.split("|");
    let hn = hotelname[1];
    return (
      //   <div className="i">
      <tr key={i}>
        {/* <td>
              <div className="__col_1">
                <div className="_num">{i + 1}</div>
              </div>
            </td> */}
        <td>
          <div className="">
            <div className="_city_name_">{item.cityName}</div>
          </div>
        </td>

        <td>
          <div className="">
            <div className="_city_name_">
              {item.city_hotel_nights_count} Nights
            </div>
          </div>
        </td>

        <td>
          <div className="">
            <div className="_city_name_ inline">{hn}</div>
            <div className={`text-[0.8em] inline`}>/similar</div>
          </div>
        </td>
      </tr>
    );
  });

  const paymentpolicyrender = data?.policy.map(function (item, i) {
    if (item.policyType == "PAYMENT" && i == 0) {
      return (
        <>
          {item.day > 0 ? (
            <p> At the time of Booking : {item.amount}% of the Package Cost.</p>
          ) : (
            ""
          )}
          {item.dayFrom1 > 0 ? (
            <p>
              {" "}
              Between {item.dayFrom1} - {item.dayTo1} days before travel :{" "}
              {item.amt1}% of the Package Cost.
            </p>
          ) : (
            ""
          )}
          {item.dayFrom2 > 0 ? (
            <p>
              {" "}
              Between {item.dayFrom2} - {item.dayTo2} days before travel :{" "}
              {item.amt2}% of the Package Cost.
            </p>
          ) : (
            ""
          )}
        </>
      );
    }
  });

  const cancellationpolicyrender = data?.policy.map(function (item, i) {
    if (item.policyType == "CANCELLATION" && i == 1) {
      return (
        <>
          {item.day > 0 ? (
            <p>
              {" "}
              Up to {item.day} Days before travel: {item.amount}% deduction.
            </p>
          ) : (
            ""
          )}
          {item.dayFrom1 > 0 ? (
            <p>
              {" "}
              Between {item.dayFrom1} - {item.dayTo1} days before travel :{" "}
              {item.amt1}% deduction{" "}
            </p>
          ) : (
            ""
          )}
          {item.dayFrom2 > 0 ? (
            <p>
              {" "}
              Between {item.dayFrom2} - {item.dayTo2} days before travel :{" "}
              {item.amt2}% deduction{" "}
            </p>
          ) : (
            ""
          )}
        </>
      );
    }
  });

  return (
    <>
      <section className="inclusions">
        <div className="_container">
          <div className={`flex flex-wrap`}>
            <div className={`w-full`}>
              <div className="inclusion">
                <div className="col-sm-12">
                  <h4 className="_titles_">Inclusions</h4>
                </div>
                <div className={`Shape_42 pt-[10px] pb-[10px]`}>
                  <div className="icons-meal-info d_icons-meal-info">
                    <div className="_div">
                      <div>
                        <div className={`flex text-center`}>
                          <MdOutlineFlight
                            className={`h-6 ml-auto mr-auto text-[#c6c5c5]`}
                            size={20}
                          />
                        </div>
                        <p>Flight</p>
                      </div>
                    </div>

                    <div className="_div">
                      <div>
                        <div className={`flex text-center`}>
                          <IoCarSportOutline
                            className={`h-6 ml-auto mr-auto`}
                            size={20}
                          />
                        </div>
                        <p>Trasnfer</p>
                      </div>
                    </div>

                    <div className="_div">
                      <div>
                        <div className={`flex text-center`}>
                          <IoFastFoodOutline
                            className={`h-6 ml-auto mr-auto`}
                            size={20}
                          />
                        </div>
                        <p>Breakfast</p>
                      </div>
                    </div>

                    <div className="_div">
                      <div>
                        <div className={`flex text-center`}>
                          <RiHotelLine
                            className={`h-6 ml-auto mr-auto`}
                            size={20}
                          />
                        </div>
                        <p>Hotel</p>
                      </div>
                    </div>

                    <div className="_div">
                      <div>
                        {/* GiBinoculars */}
                        <div className={`flex text-center`}>
                          <GiBinoculars
                            className={`h-6 ml-auto mr-auto`}
                            size={20}
                          />
                        </div>
                        <p>SightSeeing</p>
                      </div>
                    </div>
                  </div>
                </div>

                {overview?.length > 0 ? (
                  <div className="_blank" id="overview">
                    <h2 className="_titles_">About the tour package</h2>
                    <div className="Shape_42">
                      <p itemProp="description">
                        {ParseHtml({text:overview})}
                        </p>
                      <div className="text-right">
                        {overviewlimit == 150 || overviewlimit == 200 ? (
                          <a
                            onClick={() => setOverviewlimit(10000)}
                            className="_plus_more"
                          >
                            +more
                          </a>
                        ) : (
                          <a
                            onClick={() => setOverviewlimit(200)}
                            className="_plus_more"
                          >
                            -less
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="_blank"
                  id="itinery"
                  // itemtype="https://schema.org/TouristTrip"
                  // itemScope
                >
                  {/* <meta itemprop="name" content={data.package.name} /> */}
                  <h3 className="_titles_">Itinerary</h3>
                  {itnRender}
                </div>

                <div className="hotel_accomodation __50px" id="hotels">
                  <div className="_list_accomodation">
                    <h4 className="_titles_">Hotel Accomodation</h4>
                    <table
                      className={`table-auto w-full table-hover acc_table mt-4`}
                    >
                      <thead>
                        <tr>
                          <th className={`algin-middle_`}>City</th>
                          <th className={`algin-middle_`}>No. Of Nights</th>
                          <th className={`algin-middle_`}>Hotel</th>
                        </tr>
                      </thead>
                      <tbody>{hotelRender}</tbody>
                    </table>
                  </div>
                </div>

                <div id="inclusions" className="hotel_accomodation">
                  <div className="_list_accomodation">
                    <h4 className="_titles_">Inclusions</h4>
                    <ul className="bullet_points">
                      {data?.package.inclusions.split("#").map((item, i) => {
                        return (
                          <li key={i}>
                            <MdCheckCircle
                              className={`inline text-[#15be03]`}
                            />{" "}
                            <span>{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div id="inclusions" className="hotel_accomodation">
                  <div className="_list_accomodation">
                    <h4 className="_titles_">Exclusions</h4>
                    <ul className="bullet_points">
                      {data?.package.exclusions.split("#").map((item, i) => {
                        return (
                          <li key={i}>
                            <MdCancel className={`inline text-[#fb050b]`} />{" "}
                            <span>{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="payment_policy">
                  <div className="_pay_policy">
                    <h4 className="_titles_">Payment Policy</h4>
                    {paymentpolicyrender}
                    <p>*All Payment must be cleared before travel start</p>
                  </div>
                  <div className="_pay_policy">
                    <h4 className="_titles_">
                      Cancellation Policy
                      <span className={`text-[12px] font-light`}>
                        (Apply on total Package cost)
                      </span>
                    </h4>
                    {/* <p>(Apply on total Package cost)</p> */}

                    {/* <p>Cancellation charges per person </p> */}
                    {cancellationpolicyrender}
                    <p>*Same Day cancellation No refund</p>
                  </div>
                </div>
                {faqsinfo.length ? (
                  <div>
                    {/* <span></span> */}
                    <h4 className="_titles_">FAQs</h4>
                    <FAQs data={faqsinfo} detail={true} />
                  </div>
                ) : (
                  ""
                )}

                <div className="hotel_accomodation mt-6" id="tnc">
                  <div className="_list_accomodation">
                    <h4 className="_titles_">Terms & Conditions</h4>
                    <ul className={`tnc_d text-sm mt-[30px] mr-0 mb-0`}>
                      {ParseHtml({text:tnc})}
                      <div className="text-right">
                        {tnclimit == 253 || tnclimit == 253 ? (
                          <a
                            onClick={
                              () => setTnclimit(10000)
                              // this.setState({ tnclimit: 10000 })
                            }
                            className="_plus_more"
                          >
                            +more
                          </a>
                        ) : (
                          <a
                            onClick={() => setTnclimit(253)}
                            className="_plus_more"
                          >
                            -less
                          </a>
                        )}
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className={`w-full lg:w-1/3 lg:pl-6`}>
                  <div className={`bets_price pl-0`}>
                    <div className="_best_price_list">
                      <h4>Best Price Guaranteed</h4>
                      <p>
                        We source services directly from the local suppliers. This
                        enables us to keep our rates best in the market.
                      </p>
                    </div>

                    <div className="tour_planner">
                      <h4>Dedicated Tour Planner</h4>
                      <p>
                      As soon as we receive your request, a dedicated tour planner is assigned who helps you from the planning to the completion of your trip and makes it a memorable one
                      </p>
                    </div>


                    <div className="customize">
                      <h4>Customization</h4>
                      <p>
                      A virtuoso prepares your itinerary who has personally traveled there and have thorough knowledge about the destinations.
                      </p>
                    </div>


                    <div className="assistance">
                      <h4>Assistance 24X7</h4>
                      <p>
                      If you are on your trip, there is something bothering you. You can reach out to us at any hour of the day or night
                      </p>
                    </div>


                    <div className="customer">
                      <h4>Customers Delight </h4>
                      <p>
                      Our customers are our top-most priority. You would love to read their experiences with Kiomoi they have shared publicly.
                      </p>
                    </div>


                </div>
              </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
