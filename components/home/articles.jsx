import {tw} from 'twind'
import MultiCarousel from "react-multi-carousel";
import Link from 'next/link'
import ReactHtmlParser from "react-html-parser";

const Articles = ({data}) =>{
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




    const articleRender = data.map(function (item, i) {
        var aurl = "/travel-articles/"+item.heading.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").replace(/--/g,'-').toLowerCase()+"/"+item.id+"/"
        var d = item.description;
        var res = d.substring(0, 50);  
        return (
          <div key={i}>
            <div className="col-sm-12 col-xs-12 _cr_mb px-2" key={i}>
              <div className="top_rated_box _box_shadow _bottom popular_dest">
                <div className="recent_img">
                  <img
                    className="img-responsive"
                    src={item.images.length > 0 ? item.images : "/icons/logo-icon.png"}
                    alt=""
                  />
                </div>

                <div className="price_List">
                <div className="tour_details">
                  <h4 className='my-2'>{item.heading}</h4>
                  <div className="t_detail">{ReactHtmlParser(res)} </div>
                  <Link href={aurl}>
                  <a href={aurl} className="anchor_link _50">
                    Read Full Story{"  "}
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </a>
                  </Link>
                </div>
              </div>                  


              </div>
            </div>
          </div>
        );
      });







    return <>
        <section className={tw`Hotels mt-16 _latest_stories_`}>
            <div className="container">
                <div className='row'>
                    <div className="box_design_common bg_orange_">
                        <div className={tw`title_kiomoi flex items-center justify-between mb-6`}>
                            <div className={tw`2w-full`}>
                                <h4>Latest Stories</h4>
                                {/* <p>Discover Incredible Hotels</p> */}
                            </div>
                            <div className={tw`2w-full`}>
                                <Link href="/travel-articles/">
                                    <a href="/travel-articles/">
                                        <div className="btn_view_more">View All</div>
                                    </a>
                                </Link>
                                
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <MultiCarousel
                            partialVisible={true}
                            autoPlay={true}
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

}

export default Articles