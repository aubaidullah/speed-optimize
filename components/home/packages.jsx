import {useEffect,useState} from 'react'
import MultiCarousel2 from "react-multi-carousel";
import {BsDot,BsStarFill,BsStarHalf,BsChevronDown} from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import {FaRupeeSign} from 'react-icons/fa'
import {tw} from 'twind'

const HomePackages = ({data}) =>{
    const [responsive,Setresponsive] = useState({})


    useEffect(()=>{
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
          Setresponsive(res)      
    },[])



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


    const statePackagesRender = data.packages.map(function (item, i) {
        var userRating = []
        var i =0
    
        for(i;i<Math.floor(parseFloat(item.sratings));i++){
            userRating.push(<BsStarFill key={i} className="d_icon_size inline"/>)
        }
        if (item.sratings.length!=1){
            userRating.push(<BsStarHalf key={i} className="d_icon_size inline"/>)
        }
        // return userRating

        let aurl =
        "/holidays/" +
        item.name.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").toLowerCase() + 
        "-tour-package-" +
        item.id + "/";
  
  
        var tmp = [];
        var tmp3 = [1];
  
        for (var i = 0; i < Math.floor(item.sratings); i++) {
          tmp.push(i);
        }
  
        var indents = tmp.map(function (i) {
          return <i className="fa fa-star"></i>;
        });
        var tmp2 = [];
  
        for (var i = 0; i < 5 - Math.floor(item.sratings); i++) {
          tmp2.push(i);
        }
  
        if (item.sratings - Math.floor(item.sratings) > 0) {
          var star = tmp3.map(function (i) {
            return <i className="fa fa-star-half-o"></i>;
          });
        } else {
          var star = tmp2.map(function (i) {
            return <i className="fa fa-star-o"></i>;
          });
        }
        
        
        
        
        return (
          <Link href={aurl} key={i}>
            <a href={aurl}>
              <div className="col-sm-12 col-xs-12" style={{paddingLeft:'15px',paddingRight:'15px'}}>
                <div className={tw`top_rated_box _st_box _tr_box bg-white`}>
                  <div className="des_img">
                    <Image
                      className="img-responsive"
                      layout="fill"
                      src={
                        item.images.split("~")[0]
                          ? item.images.split("~")[0]
                          : "/logo-icon.png"
                      }
                      alt=""
                    />
                    <div className="content_rated">
                      <div className="nature_text_">
                        <h4>{item.theme?.split("#")[0]}</h4>
                        <span className="days">
                          {item.nights} Days - {item.nights - 1} Nights
                        </span>
                        <div className={tw`two_peoples flex items-center`}>
                          <span className={tw`frieds inline`}>
                            <img src={"icons/friends.svg"} alt="" />
                          </span>
                          <span className={tw`days inline`}> 2 People </span>
                        </div>
                        <div className="_text_trip">
                          <h4>{item.name}</h4>
                          <p>{item.description.substring(0, 70)}...</p>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="price_List">
                    <div className="price_break">
                      {item.percent > 0 ? (
                        <div className="cut_price percentage">
                          {item.percent}% <br /> Off
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="price_break x1">
                      <div className="_star">
                        {/* {indents} */}
                        {userRating}
                      </div>
                      <div className="user_rating">
                        {item.sratings}{" "}
                        <BsDot className='inline'/>
                        {item.susers} User Rating
                      </div>
                    </div>
  
                    {item.discount > 0 ? (
                      <>
                        <span className="_list_p" style={{display:'none'}}>{item.percent}% Off</span>
                        <div className={tw`text-right`}>
                        <FaRupeeSign className='inline' style={{color:"#999",fontSize:'12px',marginBottom:'4px'}} />
                          <del>
                            {/* <i className="fa fa-inr"></i> */}
                            {item.price}/-
                          </del>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="m-bot20"></div>
                        {/* <div className="m-bot20"></div> */}
                      </>
                    )}
                    <div className={tw`price_tag flex items-center justify-between`}>
                      <span className="start_from">Started from</span>
                      <span className="price_inr" style={{ position: "unset" }}>
                      <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                        {item.finalprice}/-
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })


      return     <section className={tw`TopRatedTours mt-16`}>
      <div className="container">
          <div className="row">
              <div className="box_design_common_" style={{position:'relative'}}>
                  <div className={tw`title_kiomoi flex items-center justify-between mb-6`}>
                      
                      <div className={tw`2w-full`}>
                          <h4>Top Rated Tours</h4>
                          <p></p>
                      </div>
                      <div className={tw`2w-full`}>
                          <Link href={'/holidays/'}>
                            <a href="/holidays/">
                                <div className="btn_view_more">View All</div>
                            </a>
                          </Link>

                      </div>

                  </div>
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
                      {statePackagesRender}
                  </MultiCarousel2>


              </div>
          </div>
      </div>
  </section>
}

export default HomePackages