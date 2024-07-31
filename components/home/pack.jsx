import { createDetailUrl } from "../fun";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SinglePack from "./s_pack";

const MultiCarousel2 = dynamic(() => import("react-multi-carousel"));

const Pack = ({ data }) => {
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
        items: 4,
        // partialVisibilityGutter: 40,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 40,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
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

  const statepack = data.packages.map(function (item, i) {
    var userRating = [];
    var i = 0;
    for (i; i < Math.floor(parseFloat(item.sratings)); i++) {
      userRating.push(<BsStarFill key={i} className="d_icon_size inline" />);
    }
    if (item.sratings.length != 1) {
      userRating.push(<BsStarHalf key={i} className="d_icon_size inline" />);
    }
    // return userRating

    let aurl = createDetailUrl({ name: item.name, id: item.id });

    var tmp = [];
    var tmp3 = [1];

    for (var i = 0; i < Math.floor(item.sratings); i++) {
      tmp.push(i);
    }

    var tmp2 = [];

    for (var i = 0; i < 5 - Math.floor(item.sratings); i++) {
      tmp2.push(i);
    }

    if (item.sratings - Math.floor(item.sratings) > 0) {
      var star = tmp3.map(function (i) {
        return <i className="fa fa-star-half-o" key={i}></i>;
      });
    } else {
      var star = tmp2.map(function (i) {
        return <i className="fa fa-star-o" key={i}></i>;
      });
    }

    return <SinglePack item={item} i={i} aurl={aurl} userRating={userRating} key={i} />;
  });

  return (
    <>
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
        {statepack}
      </MultiCarousel2>
    </>
  );
};

export default Pack;
