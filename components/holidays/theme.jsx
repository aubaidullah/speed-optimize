
import dynamic from "next/dynamic";
import Link from "next/link";
import * as Constants from "../Constants";
import { tw } from "twind";
import { createThemeListURL } from "../fun";
const MultiCarousel = dynamic(() => import("react-multi-carousel"));


const HolidayTheme = ({theme}) =>{
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
          // partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          partialVisibilityGutter: 40,
        },
    };
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

    const themeRender = theme.map((item,i)=>{
        
        let aurl = createThemeListURL({ cityname: item.tag.trim() });
        return <div key={i}>


        <div className={tw`_service_list_ text-center`}>
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
                <div className={tw`_text_- py-4`}>
                  <h4>{item.tag}</h4>
                  <p>{item.count} Listing</p>
                </div>
              </div>
            </Link>
          </div>


        </div>
    })

    return <>
        <div className={`container mt-16`}>
          <h2 className={tw`text-xl lg:text-2xl pb-4 font-bold`}>Browse by theme</h2>
            <div className={tw`relative`}>
                <MultiCarousel
                    partialVisible={true}
                    autoPlay={false}
                    customTransition="transform 300ms ease-in-out"
                    infinite={true}
                    className="toprated_slide"
                    loop
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                    arrows={false}
                    margin={10}
                    nav
                    responsive={responsive}
                >
                    {themeRender}
                </MultiCarousel>
            </div>

        </div>
    </>
      
}


export default HolidayTheme