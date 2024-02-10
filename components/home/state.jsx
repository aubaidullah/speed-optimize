import { tw } from "twind";
// import MultiCarousel2 from "react-multi-carousel";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import * as Constants from "../Constants";
import { createStateListURL, imgNameByUrl } from "../fun";
import dynamic from "next/dynamic";
import Image from "next/image";

const State = ({ data,holiday=false }) => {
  const MultiCarousel2 = dynamic(() => import("react-multi-carousel"));

  const statePackagesRender = data.map(function (item, i) {
    var aurl = createStateListURL({ statename: item.nm, id: item.id });
    // var aurl =
    //   "/holidays/" +
    //   // item.nm.replace(/\s+/g, "-").toLowerCase() +
    //   item.nm.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour/g,'').replace(/&/g,'and') +
    //   "-tour-packages/" +
    //   item.id + "/";

    return (
      <div key={i}>
        <Link href={aurl}>
          <div href={aurl}>
            {" "}
            <div className={tw`px-2 _cr_mb`}>
              <div className="_des_img">
                {/* <img
                    className={tw`img-responsive rounded-[8px]`}
                    src={
                      item.im.split("~")[0]
                        ? item.im.split("~")[0]
                        : `${Constants.assets_api}/public/icons/logo-icon.png`
                    }
                    alt="kiomoi"
                  /> */}
                <Image
                  className={tw`img-responsive rounded-[8px]`}
                  src={
                    item.im.split("~")[0]
                      ? item.im.split("~")[0]
                      : `${Constants.assets_api}/public/icons/logo-icon.png`
                  }
                  alt={imgNameByUrl({ url: item.im.split("~")[0] ?? "kiomoi" })}
                  fill
                />
                <div className="des_cont">
                  <div className="des_location">{item.nm}</div>
                  <div className="listing">{item.cnt} Listings</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      // partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      // partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 25,
    },
  };
  const ButtonGroup = ({ next, previous, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className={tw`hidden lg:carousel-button-group lg:block `}>
        <button
          className={`${currentSlide === 0 ? "disable" : ""} left-custom-btn`}
          onClick={() => previous()}
        />
        <button className="right-custom-btn" onClick={() => next()} />
      </div>
    );
  };

  return (
    <div className={tw`mt-16`}>
      <div className={`container`}>
        <div className="row_">
          <div className={tw`${holiday==false?'box_design_common':''}`} style={{'backdrop-filter':'blur(30px)'}}>
            <div
              className={tw`${holiday==false?'title_kiomoi':''} flex items-center justify-between mb-6`}
            >
              <div>
                <h4 className={tw`text-xl lg:text-2xl font-bold`}>Explore Top Destinations</h4>
              </div>
              <div>
                <Link href={"/holidays/"}>
                  <div href={"/holidays/"}>
                    <div className="btn_view_more">View all</div>
                  </div>
                </Link>
              </div>
            </div>

            <MultiCarousel2
              partialVisible={true}
              autoPlay={false}
              customTransition="transform 300ms ease-in-out"
              infinite={true}
              className="toprated_slide"
              loop
              renderButtonGroupOutside={true}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
              margin={5}
              nav
              responsive={responsive}
            >
              {statePackagesRender}
            </MultiCarousel2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default State;
