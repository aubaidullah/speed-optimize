import { useEffect, useState } from "react";
import MultiCarousel2 from "react-multi-carousel";
import {BsDot,BsStarFill,BsStarHalf,BsChevronDown} from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import {tw} from 'twind'


const RelatedTour = ({data}) =>{

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
    

    const stars = () =>{
        var userRating = []
        var i =0
    
        for(i;i<Math.floor(parseFloat(data.package.sratings));i++){
            userRating.push(<BsStarFill key={i} className="d_icon_size inline"/>)
        }
        if (data.package.sratings.length!=1){
            userRating.push(<BsStarHalf key={i} className="d_icon_size inline"/>)
        }
        return userRating
    }
    



    const ButtonGroup = ({ next, previous, ...rest }) => {
        const {
          carouselState: { currentSlide },
        } = rest;
        return (
          <div className="carousel-button-group">
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
          <Link href={aurl}>
            <a>
              <div className="col-sm-12 col-xs-12" style={{paddingLeft:'15px',paddingRight:'15px'}}>
                <div className="top_rated_box _st_box _tr_box">
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
                        <div className="two_peoples">
                          <span className="frieds">
                            <img src={"/icons/friends.svg"} alt="" />
                          </span>
                          <span className="days"> 2 People </span>
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

                        {/* <i className="fa fa-circle" aria-hidden="true"></i> */}
                        <BsDot className={tw`inline`} />
                        {item.susers} User Rating
                      </div>
                    </div>
  
                    {item.discount > 0 ? (
                      <>
                        <span className="_list_p">{item.percent}% Off</span>
                        <div className="cut_price price-cut text-right">
                          <del>
                            <i className="fa fa-inr"></i>
                            {item.price}/-
                          </del>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="m-bot20"></div>
                        <div className="m-bot20"></div>
                      </>
                    )}
                    <div className={tw`price_tag flex justify-between items-center`} >
                      <span className="start_from">Started from</span>
                      <span className="price_inr" style={{ position: "unset" }}>
                        <i className="fa fa-inr"></i>
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









    return <>
    <section className="TopRatedTours">
        <div className="container">
            <div className="row">
                <div className="box_design_common">
                    <div className={tw`title_kiomoi flex items-center justify-between mb-6`}>
                        
                        <div className={tw`2w-full`}>
                            <h4>Similar Tours on Kiomoi</h4>
                            <p></p>
                        </div>
                        <div className={tw`2w-full`}>
                            <a href="/holidays">
                                <div className="btn_view_more">View All</div>
                            </a>
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
    </>
}




export async function getServerSideProps(context) {
    console.log(context)
    // context.res.setHeader('Cache-Control', 's-maxage=10'); 
    // let query = context.params['name]-tour-package-[id']

    // let name = query.split('-tour-package-')[0]
    // let _id = query.split('-tour-package-')[1]

    const res = await client.query({query:getpackage,variables:{input:{id:_id}}})    
    return {props:{data:res.data.package.output}}
  }



export default RelatedTour