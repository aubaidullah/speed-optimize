import Link from "next/link";
import { tw } from "twind"
import * as Constants from "../Constants"

const Themes = ({data}) =>{
    console.log(data)

    const themeRender = data.map(function (item, i) {
        // var img = "";
        if (i < 5) {
          return (
            <>
              <div className="_service_list">
                <div className="ellipse_3">
                <Link href={`/holidays/theme-${item.tag.trim().toLowerCase().replace(/\s+/g,"-")}/`}>
                    <a href={`/holidays/theme-${item.tag.trim().toLowerCase().replace(/\s+/g,"-")}/`}>
                        {" "}
                        <div className="icon_display">
                        <img alt="icon" className={tw`initial`} src={`${Constants.assets_api}/public/icons/Ico_${item.tag.trim()}.png`} />
                        </div>
                    </a>
                  </Link>
                </div>
                <Link href={`/holidays/theme-${item.tag.trim().toLowerCase().replace(/\s+/g,"-")}/`}>
                <a href={`/holidays/theme-${item.tag.trim().toLowerCase().replace(/\s+/g,"-")}/`}>
                  <div className="_text_-">
                    <h4>{item.tag}</h4>
                    <p>{item.count} Listing</p>
                  </div>
                </a>
                </Link>
              </div>
            </>
          );
        }
      })










    return <>
    <div className={`container mt-16`}>
        <div className={tw`flex`}>
            <div className={tw`hidden lg:w-1/3 lg:block`}>
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
                        <a href="/holidays/">Read More</a>
                    </Link>
                                        
                </div>
            </div>
            <div className={tw`w-full lg:w-2/3`}>
                <div>
                    {themeRender}                    
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Themes
