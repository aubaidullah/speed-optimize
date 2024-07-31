import Link from "next/link";
import * as Constants from "../Constants";
import { createThemeListURL } from "../fun";
import { useState } from "react";

const Themes = ({ data }) => {

  const [theme,setTheme] = useState(5)
  // console.log(data)

  const themeRender = data.map(function (item, i) {
    // var img = "";
    if (i < theme) {
      let aurl = createThemeListURL({ cityname: item.tag.trim() });
      return (
        
          <div className="_service_list" key={i}>
            <div className="ellipse_3">
              <Link href={aurl}>
                <div href={aurl}>
                  {" "}
                  <div className="icon_display">
                    <img
                      alt="icon"
                      className={`inline`}
                      src={`${
                        Constants.assets_api
                      }/public/icons/Ico_${item.tag.trim()}.png`}
                    />
                  </div>
                </div>
              </Link>
            </div>
            <Link href={aurl}>
              <div href={aurl}>
                <div className="_text_-">
                  <h4>{item.tag}</h4>
                  <p>{item.count} Listing</p>
                </div>
              </div>
            </Link>
          </div>
        
      );
    }
  });

  return (
    <>
      <div className={`container mt-16`}>
        <div className={`flex`}>
          <div className={`hidden lg:w-1/3 lg:block`}>
            <div className="kiomoi_box _clr_brand">
              <h1 className="text-[16px] pb-2">Kiomoi: Best Travel Planner Website in India</h1>
              {/* <h5>Kiomoi Book Domestic and International Holidays</h5> */}
              <p>Discover the World with Kiomoi Travels- Your passport to unforgettable adventures!</p>
              <p>
              As, the best travel website, Kiomoi Travels, don’t just plan trip; we craft experience that stay in your memory forever. Whether you crave the thrill of adventure, the calm nature, or the richness of cultural exploration, Kiomoi Travels has the perfect itinerary waiting for you.
              </p>
              <p>
              Our passionate staff of travel specialists makes sure that every part of your trip is well-planned, from making hotel reservations to setting thrilling adventures. Our carefully chosen locations throughout the world are sure to satisfy and wanderlust - driven spirit.
              </p>
              <p>
              But the journey is just as important as the final goal. Every stage of your journey will be filled with adventure, comfort, and outstanding support when you work with Kiomoi Travels.              
              </p>
              <p>
              So Why Wait? Enjoy your next journey with Kiomoi Travels as its best travel website and let the world be your playground. Your dream vacation awaits – book now and make memories that will last a lifetime!
              </p>

              {/* <p>
                        Kiomoi is one of India's leading online travel portals,
                        offering holiday packages in India and abroad. Yatra offers
                        value for money packages, luxury packages, group departures
                        as well as customized packages.
                    </p>
                    <p>
                        Kiomoi was one of the first aggregators of holiday packages
                        and since 2015 it has provided a forum for agents and
                        holiday package sellers to sell their packages directly on
                        the Yatra website. This has enabled Yatra to give a wide
                        range of holiday packages including niche and exotic
                        packages to its customers, while providing localised
                        services.
                    </p> */}
              {/* <Link href="/holidays/">
                <div href="/holidays/">Read More</div>
              </Link> */}
            </div>
          </div>
          <div className={`w-full lg:w-2/3`}>
            {themeRender}
            <div className={`_service_list ${theme!=5?"hidden":""}`}>
              <div className="ellipse_3 cursor-pointer hover:shadow-lg" onClick={()=>setTheme(20)}>
                <div href={"#"}>
                  <div href={"#"}>
                    {" "}
                    <div className={`icon_display _text_`}>
                      <div
                        alt="icon"
                        className={`inline text-xl text-[#f06726] font-semibold`}
                      >
                          Show more                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Themes;
