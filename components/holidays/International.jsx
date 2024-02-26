import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createCountryListURL, imgNameByUrl } from "../fun";
import { tw } from "twind";

const CustomImage = dynamic(() => import("../Img"));
const MultiCarousel2 = dynamic(() => import("react-multi-carousel"));

const InterNationalPackage = ({ data }) => {
  const [responsive, Setresponsive] = useState({});

  useEffect(() => {
    const res = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        // partialVisibilityGutter: 40,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        // partialVisibilityGutter: 40,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 40,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        partialVisibilityGutter: 40,
      },
    };
    Setresponsive(res);
  }, []);

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
  const packages = data.map(function (item, i) {
    var aurl = createCountryListURL({ cityname: item.nm, id: item.id });
    // var aurl =
    //   "/holidays/" +
    //   // item.nm.replace(/\s+/g, "-").toLowerCase() +
    //   item.nm.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour/g,'').replace(/&/g,'and') +
    //   "-tour-packages/" +
    //   item.id + "/";

    return (
      <div key={i} style={{flex :'1 33%'}}>
        <Link href={aurl}>
          <div href={aurl}>
            {" "}
            <div className={tw`px-2 _cr_mb`}>
              <div className={tw`my-2 des_img_hotel h-[150px]`}>
                {/* <img
                    className={tw`img-responsive rounded-[8px]`}
                    src={
                      item.im.split("~")[0]
                        ? item.im.split("~")[0]
                        : `${Constants.assets_api}/public/icons/logo-icon.png`
                    }
                    alt="kiomoi"
                  /> */}
                {/* <Image
                  className={tw`rounded-[8px] h-full`}
                  src={
                    item.im.split("~")[0]
                      ? item.im.split("~")[0]
                      : `${Constants.assets_api}/icons/kiomoi_logo_abstract.png`
                  }
                  alt={imgNameByUrl({ url: item.im.split("~")[0] ?? "kiomoi" })}
                  fill
                /> */}
                <CustomImage img_url={item.im.split("~")[0]} className={`rounded-[8px] h-full`} alt={imgNameByUrl({ url: item.im.split("~")[0] ?? "kiomoi" })}/>
              </div>
              <div className="des_cont_">
                  <div className={tw`des_location font-bold`}>{item.nm}</div>
                  {/* <div className="listing">{item.cnt} Listings</div> */}
                </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });


  return (
    
    <div className={tw` container mt-16`}>
      <h2 className={tw`mb-4`}>
          <div>
                <h4 className={tw`text-xl lg:text-2xl font-bold`}>International Destinaions</h4>
            </div>
      </h2>
      <div className="Shape_42_ relative">
        <div className="clearfix"></div>
        <MultiCarousel2
          partialVisible={true}
          autoPlay={false}
          customTransition="transform 300ms ease-in-out"
          infinite={true}
          className="toprated_slide state_tour"
          loop
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
          arrows={false}
          margin={10}
          nav
          responsive={responsive}
        >
          {packages}
        </MultiCarousel2>
      </div>
    </div>
  );
};

export default InterNationalPackage;
