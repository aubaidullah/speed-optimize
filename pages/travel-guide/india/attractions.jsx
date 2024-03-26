import { useState, useEffect } from "react";
import { tw } from "twind";
import { IoLocationSharp } from "react-icons/io5";
import { CgCheckO } from "react-icons/cg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoInformationCircle } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { getMetaQuery } from "../../../components/Graphql/Queries";
import client from "../../../components/Graphql/service";
import * as Constant from "../../../components/Constants";
import dynamic from "next/dynamic";
import { createTGCityURL, createTGStateURL } from "@/components/fun";

const ParseHtml = dynamic(() => import("@/components/parseToHtml"));
const Nav = dynamic(() => import("@/components/Nav"));
const BreadCrumbs = dynamic(() => import("@/components/breadcrumbs"));
const Meta = dynamic(() => import("@/components/meta"));

const Attraction = ({ data, meta }) => {
  const [overview, setOverview] = useState(null);

  const [limit, setLimit] = useState(200);

  const bread = {
    disabled: {
      item: `${data.atn.name}`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
      {
        item: "Travel Guide",
        href: "/travel-guide/",
      },
      {
        item: data?.stid?.cityName,
        href: createTGStateURL({city:data?.stid?.cityName,id:data?.stid?.id}),
      },
      {
        item: data?.ctid?.cityName,
        href: createTGCityURL({city:data?.ctid?.cityName,id:data?.ctid?.id}),
      },      
    ],
  };

  const facility = [
    {
      icon: "check",
      color: "#00FF00",
      text: "Are food and beverages available on-site",
      available: data.atn.fnbAvailable == true ? "Yes" : "No",
    },
    {
      icon: "cross",
      color: "#ff0000",
      text: "Is visiting duration fixed ?",
      available: data.atn.visitngDuarationFixed == true ? "Yes" : "No",
    },
    {
      icon: "check",
      color: "#ff0000",
      text: "can anyone visit for a full day ?",
      available: data.atn.fullDayVisit == true ? "Yes" : "No",
    },
    {
      icon: "check",
      color: "#00FF00",
      text: "Fee required here ?",
      available: data.atn.anyTicketCost == true ? "Yes" : "No",
    },
    {
      icon: "info",
      color: "#00FF00",
      text: "Is this attraction open round the year ?",
      available: data.atn.attractionOpenFullYear == true ? "Yes" : "No",
    },
    {
      icon: "info",
      color: "#E8A317",
      text: "The attraction closed on the day ?",
      available: data.atn.weeklyoff,
    },
    {
      icon: "info",
      color: "#E8A317",
      text: "The attraction closed during the month ?",
      available: data.atn.monthlyoff,
    },
    {
      icon: "info",
      color: "#E8A317",
      text: "How many entrances gate here ?",
      available: data.atn.numOfEntranceGates,
    },
    {
      icon: "info",
      color: "#E8A317",
      text: "How many exit gates here ?",
      available: data.atn.numOfExitGates,
    },
    {
      icon: "check",
      color: "#00FF00",
      text: "Accessible to Physically challenged ?",
      available:
        data.atn.accessibleToPhysicallyChanllenged == true ? "Yes" : "No",
    },
    {
      icon: "check",
      color: "#00FF00",
      text: "Is the guide available on site ?",
      available: data.atn.guideAvailable == true ? "Yes" : "No",
    },
    {
      icon: "check",
      color: "#00FF00",
      text: "Is the washroom facility available ?",
      available: data.atn.washroom == true ? "Yes" : "No",
    },
  ];

  const imagesRender = data.images.map((img, index) => (
    <div key={index}>
      <img src={img.i} className="img" alt="images" />
    </div>
  ));

  const rightBlock = ({ icon, heading, desc }) => (
    <div className={tw`flex`}>
      <div>
        <img
          src={`${Constant.assets_api}/public/icons/${icon}`}
          alt="icons"
          className={tw`inline h-[15.7px]`}
        />
      </div>
      <div className={tw`ml-2`}>
        <div className={tw`t_12px font-bold`}>{heading}</div>
        <div className="t_12px">{desc}</div>
      </div>
    </div>
  );

  useEffect(() => {
    if (data.atn.desc) setOverview(data.atn.desc.substring(0, limit));
  }, [limit]);

  return (
    <>
      <Meta meta={meta} />
      <Nav />

      <BreadCrumbs bread={bread} />

      <section className="container">
        <h1 className={tw`text-2xl font-bold pb-3`}>{data.atn.name}</h1>

        <div className={tw`flex flex-wrap`}>
          <div className={tw`w-full lg:w-2/3`}>
            <div>
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infinite={true}
                autoPlay={true}
                className=""
              >
                {imagesRender.length > 0 ? (
                  imagesRender
                ) : (
                  <img
                    alt="kiomoi logo"
                    src={`${Constant.assets_api}/public/icons/logo-icon.png`}
                  />
                )}
              </Carousel>
            </div>
          </div>
          <div className={tw`w-full lg:w-1/3`}>
            <div className={tw`pl-0 lg:pl-6 mt-6 lg:mt-0`}>
              <div className="_b_right_list_1">
                <div className="_asia_india">
                  <div className={tw`flex justify-between`}>
                    <div>
                      <IoLocationSharp className="inline" />
                      {data.atn.cityName}
                      <BsDot className={tw`inline`} /> India
                    </div>
                    <div className="cir_bg">{data.city.ratings}/5</div>
                  </div>
                </div>
                <div className={tw`p-2`}>
                  <div className={tw`bg-white pb-2`}>
                    <div className={tw`flex justify-between`}>
                      <div className={tw`w-full lg:1/2`}>
                        {rightBlock({
                          icon: `plane_icon.png`,
                          heading: "NearBy Airport",
                          desc: data.city.nearbyAirport,
                        })}
                      </div>
                      <div className={tw`w-full lg:1/2`}>
                        {rightBlock({
                          icon: "calender_multi_clr.png",
                          heading: "Best Season",
                          desc: data.city.visitTime,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="_b_right_list_1">
                <div className={tw`p-2`}>
                  <div className={tw`bg-white pb-2`}>
                    <div className={tw`flex justify-between`}>
                      <div className={tw`w-full lg:1/2`}>
                        <p>
                          <MdCheckCircle className="inline text-[#15be03] mr-[5px]" />
                          <span className="t_12px">Part Payment Available</span>
                        </p>
                      </div>
                      <div className={tw`w-full lg:1/2`}>
                        <p>
                          <MdCheckCircle className="inline text-[#15be03] mr-[5px]" />
                          <span className="t_12px">
                            100% Satisfaction Guaranteed
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={tw`w-full lg:w-2/3 mt-3`}>
            <div className="_b_right_list_1">
              <div className={tw`bg-white p-3`}>
                <div className={tw`flex justify-between`}>
                  <div className={tw`w-full lg:1/2`}>
                    <ul>
                      <li className={tw`m-4`}>
                        <b>Visiting Time : </b>
                        <span>
                          {data.atn.openingTime} Hrs- {data.atn.closingTime} Hrs
                        </span>
                      </li>
                      <li className={tw`m-4`}>
                        <b>Ideal Duration : </b>
                        <span>{data.atn.idealDuration} </span>
                      </li>
                      <li className={tw`m-4`}>
                        <b>Best for : </b>
                        <span>{data.atn.theme}</span>
                      </li>
                      <li className={tw`m-4`}>
                        <b>Distance from City Centre : </b>
                        <span>{data.atn.distance}</span>
                      </li>
                      <li className={tw`m-4`}>
                        <b>Local Transport Mode : </b>
                        <span>{data.atn.transportation}</span>
                      </li>
                    </ul>
                  </div>
                  <div className={tw`w-full lg:1/2`}>
                    <ul>
                      <li className={tw`m-4`}>
                        <b>Entry Ticket : </b>
                      </li>
                      <li className={tw`m-4`}>
                        <span>
                          <b>Adult :</b>
                        </span>
                        <span>INR {data.atn.adultTicketCost}</span>
                        <span>
                          <b>, Child :</b>
                        </span>
                        <span>INR {data.atn.childTicketCost}</span>
                      </li>
                      <li className={tw`m-4`}>
                        <span>
                          <b>Student :</b>
                        </span>
                        <span>INR {data.atn.studentTicketCost}</span>
                        <span>
                          <b>, Foreigner :</b>
                        </span>
                        <span>INR {data.atn.foreignerTicketCost}</span>
                      </li>
                      <li className={tw`m-4`}>
                        <b>Latitude :</b> <span> {data.atn.lat}</span>
                      </li>
                      <li className={tw`m-4`}>
                        <b>Longitude :</b>
                        <span> {data.atn.lng}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {
              overview?<>
                <h2 className={tw`text-xl font-bold ms-1 my-3`}>Overview</h2>
                <div className={tw``}>
                  <div className="Shape_42">
                    <ParseHtml text={overview} />
                    {/* {ReactHtmlParser(overview)} */}
                    {limit == 150 || limit == 200 ? (
                      <a onClick={() => setLimit(10000)} className="_plus_more">
                        +more
                      </a>
                    ) : (
                      <a onClick={() => setLimit(200)} className="_plus_more">
                        -less
                      </a>
                    )}
                  </div>
                </div>              
              </>:""
            }

            {facility?.map(({ icon, color, text, available }, index) => (
              <div
                key={index}
                className={tw`Shape_42 p-3 my-3 border-1 border-gray-400/25`}
              >
                <div className={tw`flex justify-between`}>
                  <div
                    className={tw`flex gap-4 font-semibold text-lg items-center`}
                  >
                    <div className={tw`text-3xl ms-3 text-[${color}]`}>
                      {icon === "check" ? (
                        <CgCheckO />
                      ) : icon === "cross" ? (
                        <AiOutlineCloseCircle />
                      ) : (
                        <IoInformationCircle />
                      )}
                    </div>
                    {text}
                  </div>
                  <div className={tw`text-lg text-[${color}]`}>{available}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "s-maxage=10");

  let _id = context.query.id;

  const resp = await axios.post(`${Constant.api}/api/v1/attraction/${_id}`, {
    id: _id,
  });

  const meta = await client.query({
    query: getMetaQuery,
    variables: {
      input: {
        av: "",
        id: 0,
        key: "CITY_ATTRACTIONS",
        name: "",
        pt: "WEBSITE",
        type: "",
      },
    },
  });
  // let {finalprice,images} = meta.data.meta.output.package
  // finalprice = `₹${finalprice} `

  const metas = {
    title: meta.data.meta.output.tags.title.replace(
      /<COUNTRY>/g,
      context.query.place,
    ),
    longDesc: meta.data.meta.output.tags.longDesc.replace(
      /<COUNTRY>/g,
      context.query.place,
    ),
    keywords: meta.data.meta.output.tags.keywords.replace(
      /<COUNTRY>/g,
      context.query.place,
    ),
  };

  return {
    props: {
      data: resp.data.output,
      meta: metas,
    },
  };
}

export default Attraction;
