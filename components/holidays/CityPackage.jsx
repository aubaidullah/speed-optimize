import { tw } from "twind"
import Link from "next/link";
import Image from "next/image";
import { createCityListURL, createStateListURL } from "../fun";
import { imgNameByUrl } from "../fun";
import * as Constants from "@/components/Constants";
import dynamic from "next/dynamic";
import CustomImage from "../Img";


const CityPackages = ({data}) =>{
    // console.log(data)
    // 
    // const MultiCarousel2 = dynamic(() => import("react-multi-carousel"));
    // const Slider = dynamic(() => import("react-slick"));
    const statePackagesRender = data?.slice(0,5).map(function (item, i) {
        var aurl = createCityListURL({ cityname: item.name, id: item.id });
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
                  <div className="_des_img my-2">
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
                      className={tw`img-responsive rounded-[8px]`}
                      src={
                        // item.im.split("~")[0]
                           item.images
                          ?? `${Constants.assets_api}/public/icons/logo-icon.png`
                      }
                      alt={imgNameByUrl({ url: item.images ?? "kiomoi" })}
                      fill
                    /> */}
                    <CustomImage img_url={item.images} alt={imgNameByUrl({ url: item.images ?? "kiomoi" })} className={`img-responsive rounded-[8px]`} />
                    <div className="des_cont">
                      <div className="des_location">{item.name}</div>
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
          items: 2,
          // partialVisibilityGutter: 40
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2,
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

      const settings = {
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        // adaptiveHeight: true,
        variableWidth: true,
        speed: 500,
        rows: 2,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            // partialVisibilityGutter: 40,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            // partialVisibilityGutter: 40,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            // partialVisibilityGutter: 25,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
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

    return <>
        <div className={tw`container mt-16`}>
        <div className={`flex items-center justify-between mb-6`} >
              <div>
                <h4 className={tw`text-2xl font-bold`}>Trending Now</h4>
              </div>
              <div>
                <Link href={"/holidays/"}>
                  <div href={"/holidays/"}>
                    <div className="btn_view_more">View all</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className={tw`flex flex-wrap-reverse`}>
                {statePackagesRender}
                {/* <Slider {...settings}>{statePackagesRender}</Slider> */}
                {/* <MultiCarousel2
                    partialVisible={true}
                    autoPlay={true}
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
                </MultiCarousel2> */}
            </div>
        </div>
    </>
}

export default CityPackages