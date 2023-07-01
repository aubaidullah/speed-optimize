import Link from "next/link";
import * as Constants from "../Constants"
import { createThemeListURL } from "../fun";

const Themes = ({data}) =>{
    // console.log(data)

    const themeRender = data.map(function (item, i) {
        // var img = "";
        if (i < 5) {
          let aurl = createThemeListURL({cityname:item.tag.trim()})
          return (
            <>
              <div className="_service_list">
                <div className="ellipse_3">
                <Link href={aurl}>
                    <div href={aurl}>
                        {" "}
                        <div className="icon_display">
                        <img alt="icon" className={`inline`} src={`${Constants.assets_api}/public/icons/Ico_${item.tag.trim()}.png`} />
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
            </>
          );
        }
      })










    return <>
    <div className={`container mt-16`}>
        <div className={`flex`}>
            <div className={`hidden lg:w-1/3 lg:block`}>
                <div className="kiomoi_box _clr_brand">
                    <h4>Kiomoi Holidays</h4>
                    <h5>Kiomoi Book Domestic and International Holidays</h5>
                    <p>
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
                    </p>
                    <Link href="/holidays/">
                        <div href="/holidays/">Read More</div>
                    </Link>
                                        
                </div>
            </div>
            <div className={`w-full lg:w-2/3`}>
                <div>
                    {themeRender}                    
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Themes
