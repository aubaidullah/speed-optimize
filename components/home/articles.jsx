// import {tw} from 'twind'
// import MultiCarousel from "react-multi-carousel";
import Link from "next/link";
import * as Constants from "../Constants";
import { createArticleURL, imgNameByUrl, jpgToWebp } from "../fun";
import dynamic from "next/dynamic";
import Image from "next/image";
import CustomImage from "../Img";
const MultiCarousel = dynamic(() => import("react-multi-carousel"));
const Articles = ({data}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      // partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      // partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      // partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
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
  
  const articleRender = data.map(function (item, i) {
    var aurl = createArticleURL({ heading: item.heading, id: item.id });
    return (
      <div key={i}>
        <div className="col-sm-12 col-xs-12 _cr_mb px-2" key={i}>
          {/* <Link href={aurl}> */}
            <div className="top_rated_box _box_shadow _bottom popular_dest">
              <div className="recent_img">
                {/* <Image
                  className="img-responsive"
                  src={
                    item.images.length > 0
                      ? jpgToWebp({ uri: item.images })
                      : `${Constants.assets_api}/public/icons/logo-icon.png`
                  }
                  alt={imgNameByUrl({ url: item.images ?? "kiomoi" })}
                  fill
                /> */}
                <CustomImage
                  className="img-responsive"
                  img_url={jpgToWebp({ uri: item.images })}
                  alt={imgNameByUrl({ url: item.images ?? "kiomoi" })}
                />
              </div>

              <div className="price_List">
                <div className="tour_details">
                  <h4 className="my-2">{item.heading}</h4>
                  <Link href={aurl}>
                    <div href={aurl} className="anchor_link _50">
                      Read Full Story{"  "}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          {/* </Link> */}
        </div>
      </div>
    );
  });
  
  return(
        <>
      <section className={`Hotels mt-16 _latest_stories_`}>
        <div className="container">
          <div className="row_">
            <div className="box_design_common bg_orange_">
              <div
                className={`title_kiomoi flex items-center justify-between mb-6`}
              >
                <div className={`2w-full`}>
                  <h4>Latest Articles</h4>
                  {/* <p>Discover Incredible Hotels</p> */}
                </div>
                <div className={`2w-full`}>
                  <Link href="/travel-articles/">
                    <div href="/travel-articles/">
                      <div className="btn_view_more">View All</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="clearfix"></div>
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
                {articleRender}
              </MultiCarousel>
            </div>
          </div>
        </div>
      </section>
    </>
  )  
}


export default Articles;
