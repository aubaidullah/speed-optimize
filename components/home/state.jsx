import {tw} from 'twind'
import MultiCarousel2 from "react-multi-carousel";
import Link from 'next/link'


const State = ({data}) =>{


    const statePackagesRender = data.map(function (item, i) {
        var aurl =
          "/holidays/" +
          // item.nm.replace(/\s+/g, "-").toLowerCase() +
          item.nm.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour/g,'').replace(/&/g,'and') +
          "-tour-packages/" +
          item.id + "/";
  
        return (
          <>
          <Link href={aurl}>
            <a href={aurl}>
              {" "}
              <div class="px-2 _cr_mb">
                <div class="des_img">
                  <img
                    class="img-responsive"
                    style={{borderRadius:'8px'}}
                    src={
                      item.im.split("~")[0]
                        ? item.im.split("~")[0]
                        : "logo-icon.png"
                    }
                    alt=""
                  />
                  <div class="des_cont">
                    <div class="des_location">{item.nm}</div>
                    <div class="listing">{item.cnt} Listings</div>
                  </div>
                </div>
              </div>
            </a>
            </Link>
          </>
        );
      });





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
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          partialVisibilityGutter: 25
        },
      };

    return <div className={tw`mt-16`}>
        
        <div className={`container`}>
            <div className='row'>
                <div className='box_design_common'>
                    <div className={tw`title_kiomoi flex items-center justify-between mb-6`}>
                        <div>
                            <h4>
                                Explore Top Destinations
                            </h4>
                        </div>
                        <div>
                            <Link href={'/holidays'}>
                                <a href={'/holidays/'}>
                                    <div className='btn_view_more'>
                                        View all
                                    </div>
                                    
                                    </a>
                            </Link>
                        </div>

                    </div>

                    <MultiCarousel2 
                    partialVisible={true}
                    autoPlay={true}
                    customTransition="transform 300ms ease-in-out"
                    infinite={true}
                    className="toprated_slide"
                    loop
                    renderButtonGroupOutside={true}
                    //   customButtonGroup={<ButtonGroup />}
                    arrows={false}
                    margin={5}
                    nav
                    responsive={responsive}
                    >
                    {statePackagesRender}
                    </MultiCarousel2>
                </div>
                





            </div>
        </div>
    </div>

}
export default State