import {tw} from 'twind'
import MultiCarousel from "react-multi-carousel";
import {BsDot,BsStarFill,BsStarHalf} from 'react-icons/bs'
import {ImQuotesRight} from 'react-icons/im'
import Link from 'next/link'

const Reviews = ({data}) =>{
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
        

        const ReviewRender = data.map(function (item, j) {
            var tmp = [];
            for (var i = 0; i < item.ratings; i++) {
              tmp.push(i);
            }
            var indents = tmp.map(function (i) {
            //   return <i className="fa fa-star"></i>;
                return <BsStarFill key={i} className="icon_size inline"/>
            });
            var tmp2 = [];
            for (var i = 0; i < 5 - item.ratings; i++) {
              tmp2.push(i);
            }
            var star = tmp2.map(function (i) {
            //   return <i className="fa fa-star-o"></i>;
                return <BsStarHalf key={i} className="icon_size inline"/>
            });
            if (true) {
              if (item.review.length > 0) {
                var options = { year: "numeric", month: "long", day: "numeric" };
                return (
                  <>
                    <div className={tw`col-sm-12 col-xs-12 _cr_mb px-4`} key={i}>
                      <div className="comment_box _box_shadow">
                        <div className="qoute_ text-center">
                          {/* <i className="fa fa-quote-right " aria-hidden="true"></i> */}
                          <ImQuotesRight className={tw`icon_size inline`} style={{fontSize:'30px'}}/>
                        </div>
                        <div className="text-comment">
                          <p>{item.review.substring(0, 150)}...</p>
                        </div>
      
                        <div className="user_verify text-center">
                          <div className="user_img_round">
                            <img src={`/icons/user_photo.png`} alt="" />
                          </div>
                          <div className="user_title">{item.cName}</div>
                          <div className="divider_line"></div>
                          <div className="_star ratingstars">
                            {indents}
                            {star}
                          </div>
      
                          <div className="verified">
                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                            <span>Verfied Review</span>
                            <span> |</span>
                            <span>
                              {new Date(item.modifiedDate).toLocaleTimeString(
                                [],
                                options
                              )}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            }
          });



        
        return <>
        <section className={tw`Reviews mt-16`}>
            <div className="container">
                <div className='row'>
                    <div className="box_design_common">
                        <div className={tw`title_kiomoi flex items-center justify-between mb-6`}>
                            <div className={tw`2w-full`}>
                                <h4>Review & Comments</h4>
                                <p>See What Other's Have to Say</p>
                            </div>

                            {/* <div className={tw`2w-full`}>
                                <Link href="/reviews/">
                                    <a href="/reviews/">
                                        <div className="btn_view_more">View All</div>
                                    </a>
                                </Link>
                                
                            </div> */}
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
                            {ReviewRender}
                            </MultiCarousel>

                    </div>
                </div>
            </div>
        </section>
    </>        
} 
export default Reviews