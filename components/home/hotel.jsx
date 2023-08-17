// import {tw} from 'twind'
// import MultiCarousel from "react-multi-carousel";
import Link from "next/link";
import dynamic from "next/dynamic";
// import Hotel_Design from '../hotel/hotel';

const Hotel = ({ data }) => {
  const MultiCarousel = dynamic(() => import("react-multi-carousel"));
  const Hotel_Design = dynamic(() => import("../hotel/hotel"));

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

  const hotelRender = data.map(function (item, i) {
    var tmp = [];
    var hurl =
      "/hotel-" +
      item.name.replace(/\s+/g, "-").toLowerCase() +
      "-in-" +
      item.cityname.replace(/\s+/g, "-").toLowerCase() +
      "-" +
      item.id;
    for (var i = 0; i < item.ratings; i++) {
      tmp.push(i);
    }
    var indents = tmp.map(function (i) {
      return <i className="fa fa-star"></i>;
    });
    var tmp2 = [];

    for (var i = 0; i < 5 - item.ratings; i++) {
      tmp2.push(i);
    }
    var star = tmp2.map(function (i) {
      return <i className="fa fa-star-o"></i>;
    });

    return (
      <div key={i}>
        <Hotel_Design item={item} />
      </div>
    );
  });

  return (
    <>
      <section className={`Hotels mt-16`}>
        <div className="container">
          <div className="row_">
            <div className="box_design_common">
              <div
                className={`title_kiomoi flex items-center justify-between mb-6`}
              >
                <div className={`2w-full`}>
                  <h4>Stay like Royal</h4>
                  <p>Discover Incredible Hotels</p>
                </div>
                <div className={`2w-full`}>
                  <Link href="/hotels/">
                    <div href="/hotels/">
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
                {hotelRender}
              </MultiCarousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hotel;
