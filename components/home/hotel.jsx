import {tw} from 'twind'
import MultiCarousel from "react-multi-carousel";
import Link from 'next/link'

const Hotel = ({data}) =>{
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
          partialVisibilityGutter: 40
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
            <div className="col-sm-12 col-xs-12 _cr_mb px-4" key={i}>
              <div className="top_rated_box _box_shadow _bottom _hotel_shadow">
                <div className="des_img">
                  <img
                    className="img-responsive"
                    src={item.images.length > 0 ? item.images : "/logo-icon.png"}
                    alt=""
                  />
                  <div className="content_">
                    <div className="person_">
                      <div className="item_list">
                        <i className="fa fa-user-o"></i>
                        <span>1 Person</span>
                      </div>
                      <div className="item_list text-right">
                        <span>{item.name} </span>
                        <span>{item.locality} </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="royal-details">
                  <h4>{item.name}</h4>
                  <p>{item.locality}</p>
                </div>
                <div className="price_List royal_list">
                  <div className="cut_price price-cut text-right">
                    <del></del>
                  </div>
                  <div className={tw`price_tag flex items-cetner justify-bewteen`}>
                    <a href={hurl} className="btn_anchor">
                      View Details
                    </a>
                    {item.price > 0 ? (
                      <>
                        <span className="price_inr price_royal">
                          <i className="fa fa-inr"></i>
                          {item.price}
                        </span>
                      </>
                    ) : (
                      <span className="price_inr price_royal royal-text">
                        Price on Request
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });







    return <>
        <section className={tw`Hotels mt-16`}>
            <div className="container">
                <div className='row_'>
                    <div className="box_design_common">
                        <div className={tw`title_kiomoi flex items-center justify-between mb-6`}>
                            <div className={tw`2w-full`}>
                                <h4>Stay like Royal</h4>
                                <p>Discover Incredible Hotels</p>
                            </div>
                            <div className={tw`2w-full`}>
                                <Link href="/travel-guide/">
                                    <a href="/travel-guide/">
                                        <div className="btn_view_more">View All</div>
                                    </a>
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

}

export default Hotel