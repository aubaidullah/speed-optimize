import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { imgNameByUrl, jpgToWebp } from "../fun";

import CustomImage from "../Img";

const MultiCarousel2 = dynamic(() => import("react-multi-carousel"));

const HotelByDestination = ({ data }) => {
  const [responsive, Setresponsive] = useState({});

  useEffect(() => {
    const res = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6,
        // partialVisibilityGutter: 40,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
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
      <div className={`hidden lg:carousel-button-group lg:block `}>
        <button
          className={`${currentSlide === 0 ? "disable" : ""} left-custom-btn`}
          onClick={() => previous()}
        />
        <button className="right-custom-btn" onClick={() => next()} />
      </div>
    );
  };

  const hotelRender = data.cities.map((item, i) => {
    const hurl = `/hotels/hotel-in-${item.cname?.toLowerCase()}-${item.cid}/`;
    return (
      <div>
        <div className={`pr-8`}>
          <Link href={hurl}>
            <div href={hurl}>
              <h4 className={`text-center pb-2 font-bold`}>{item.cname}</h4>
              <div className="des_img_hotel">
                <CustomImage 
                  img_url={jpgToWebp({ uri: item.iurl })} 
                  className={`h-full w-[100px]`}
                  alt={imgNameByUrl({ url: item.iurl })}
                  />
                {/* {item.iurl ? (
                  <Image
                    src={jpgToWebp({ uri: item.iurl })}
                    className={`h-full w-[100px]`}
                    alt={imgNameByUrl({ url: item.iurl })}
                    layout="fill"
                  />
                ) : (
                  <img src={item.iurl} alt={item.cname} />
                )} */}
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className={`mt-4`}>
      <h2 className={`_titles_ mb-4`}>Browse by Destination</h2>
      <div className="Shape_42 relative">
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
          {hotelRender}
        </MultiCarousel2>
      </div>
    </div>
  );
};

export default HotelByDestination;
