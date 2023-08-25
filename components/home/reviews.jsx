// import MultiCarousel from "react-multi-carousel";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
// import Modal from '../modal'
// import { ImQuotesRight } from 'react-icons/im'
// import * as Constants from '../Constants'
import { tw } from "twind";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";

const MultiCarousel = dynamic(() => import("react-multi-carousel"));
const Modal = dynamic(() => import("../modal"));
const Reviews = ({ data }) => {
  const [isshow, setIsshow] = useState(false);
  const [rv, setRV] = useState({});
  // const

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      // partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  const SReview = ({ item, modal = false }) => {
    var options = { year: "numeric", month: "long", day: "numeric" };

    var tmp = [];
    for (var i = 0; i < item.ratings; i++) {
      tmp.push(i);
    }
    var indents = tmp.map(function (i) {
      return <BsStarFill key={i} className={tw`icon_size inline text-sm`} />;
    });
    var tmp2 = [];
    for (var i = 0; i < 5 - item.ratings; i++) {
      tmp2.push(i);
    }
    var star = tmp2.map(function (i) {
      return <BsStarHalf key={i} className={tw`icon_size inline text-sm`} />;
    });

    let review = item?.review?.length ? item.review : "";

    return (
      <>
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="user_title">{item.cName}</div>
          </div>
          <div>
            <div className="_star ratingstars">
              {indents}
              {star}
            </div>
          </div>
        </div>
        <div className="text-comment">
          {modal == false ? (
            <p>
              {review.substring(0, 150)}
              {review.length > 150 ? (
                <span
                  className="anchor_link pl-2 cursor-pointer"
                  onClick={() => {
                    setRV(item), setIsshow(true);
                  }}
                >
                  read more
                </span>
              ) : (
                ""
              )}
            </p>
          ) : (
            <div className="mb-6">{review}</div>
          )}
        </div>

        <div className="user_verify text-center">
          {/* <div className="user_img_round">
            <img src={`${Constants.assets_api}/public/icons/user_photo.png`} alt="user" />
          </div> */}

          {/* <div className="divider_line"></div> */}
          <div className="verified">
            <span>Verfied Review</span>
            <span> |</span>
            <span>
              {new Date(item.modifiedDate).toLocaleTimeString([], options)}{" "}
            </span>
          </div>
        </div>
      </>
    );
  };

  const ReviewRender = data?.map(function (item, j) {
    if (true) {
      // var options = { year: "numeric", month: "long", day: "numeric" };
      return (
        <div key={j}>
          <div className={`col-sm-12 col-xs-12 _cr_mb px-4`} key={j}>
            <div
              className={tw`comment_box hover:shadow-lg border border-gray-200`}
            >
              <SReview item={item} />
              {/* <div className="qoute_ text-center">
                <ImQuotesRight className={`icon_size inline text-[30px]`} />
              </div> */}
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div>
      <section className={`Reviews mt-16`}>
        <div className="container">
          <div className="row_">
            <div className="box_design_common">
              <div
                className={`title_kiomoi flex items-center justify-between mb-6`}
              >
                <div className={`2w-full`}>
                  <h4>Review & Comments</h4>
                </div>
                <div className={`2w-full`}>
                  <Link href={"/reviews/"}>
                    <div>
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
                {ReviewRender}
              </MultiCarousel>
            </div>
          </div>
        </div>
      </section>

      <Modal changeForm={setIsshow} show={isshow}>
        <div className="mdl">
          <SReview item={rv} modal={true} />
        </div>
      </Modal>
    </div>
  );
};

export default Reviews;
