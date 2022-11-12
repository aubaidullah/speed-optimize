import {tw} from 'twind'
import Slider from 'react-slick'
import ReactHtmlParser from "react-html-parser";
import Link from 'next/link'

const TravelGuide = ({data}) =>{


    const SampleNextArrow = (props)=> {
        const { className, style, onClick } = props;
        // {tw`hidden lg:carousel-button-group lg:block `}
        return <div className={tw`hidden lg:block custom-btn right-custom-btn`} onClick={onClick}/>;
      }
  
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return <div className={tw`hidden lg:block custom-btn left-custom-btn`} onClick={onClick}/>;
      }





      const articleRender = data?.map(function (item, i) {
        let aurl = "#";
  
        if (item.geoType == "CITY") {
   
          aurl = "/travel-guide/india/city-" + item.cityName.replace(/\s+/g, "-").toLowerCase() + "/"+item.id+"/"
          // aurl =
          //   "/city-travel-guide-" +
          //   item.cityName.replace(/\s+/g, "-").toLowerCase() +
          //   "-india/" +
          //   item.id + "/";
        } else if (item.geoType == "COUNTRY") {
          console.log(item)
          try{
            aurl = "/travel-guide/" + item.cityName.replace(/\s+/g, "-").toLowerCase() + "/" + item.cityId;
          }catch{
            aurl = "/travel-guide/" + item.name.replace(/\s+/g, "-").toLowerCase() + "/" + item.cityId;
          }
            
          //travel-guide/india/96
          // aurl =
          //   "/travel-guide-" +
          //   item.cityName.replace(/\s+/g, "-").toLowerCase() +
          //   "/" +
          //   item.id + "/";
        } else {
          try{
            aurl = `/travel-guide/india/state-` + item.cityName.replace(/\s+/g, "-").toLowerCase() + "/" +item.id +"/"
          }catch{
            aurl = `/travel-guide/india/state-` + item.name.replace(/\s+/g, "-").toLowerCase() + "/" +item.id +"/"
          }
          
          // aurl =
          //   "/travel-guide-india-" +
          //   item.cityName +
          //   "/" +
          //   item.id + "/";
        }
        // console.log(item)
        var d = ReactHtmlParser(item.overviewDesc?.substring(0, 100)??item.ds.substring(0, 100));
  
        return (
          <div key={i}>
          <Link href={aurl}>
            <a href={aurl}>
              <div className="col-sm-12 col-xs-12 _cr_mb px-2" key={i}>
                <div className={tw`box_1 flex`}>
                  <div className={tw`_inline col-sm-4 col-xs-5 pyce inline`}>
                    <div className="row">
                      <img
                        className="img-responsive"
                        src={
                          item.images.length > 0 ? item.images : "logo-icon.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={tw`_inline col-sm-8 col-xs-7 pt-2 pb-2 pl-3 pr-3`}>
                    <h4>{item.cityName??item.name}</h4>
                    <div className='p'>{d}..</div>
                  </div>
                </div>
              </div>
            </a>
            </Link>
          </div>
        );
      });







    const settings = {
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        // adaptiveHeight: true,
        variableWidth: true,
        speed: 500,
        rows: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            // partialVisibilityGutter: 40,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            // partialVisibilityGutter: 40,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            // partialVisibilityGutter: 25,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };



    return <>
        <section className={tw`Travel Guide mt-16`}>
            <div className="container">
                <div className='row_'>
                    <div className="box_design_common">
                        <div className={tw`title_kiomoi flex items-center justify-between mb-6`}>
                            
                            <div className={tw`2w-full`}>
                                <h4>Places you can explore</h4>
                                <p></p>
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
                        <Slider {...settings}>
                            {articleRender}
                        </Slider>

                    </div>
                </div>

            </div>

        </section>
    </>
}


// export async function getServerSideProps(context) {
//     // Fetch data from external API
//     context.res.setHeader('Cache-Control', 's-maxage=10'); 
//     // const headers = context.req.headers
//     console.log("sdfklsdjf lksd lkfjsdf")
//     const res = await client.query({query:getTravelGuideHome,variables:{input:{'av':'1.3','id':'0','pt':'WEBSITE','geoid':0,'pagenum':1,'pid':0,'size':18,'type':0}}})  
//     // const data = res.data.allpackage.output.packages.slice(0, 10)

//     // const data = res.data.allpackage.output.packages

//     // const region = res.data.allpackage.output.region??null
//     // const places = res.data.allpackage.output.fcities
//     // console.log(places)
//     // console.log(res.data.home.output)
//     console.log(res.data)
//     console.log(res.data.travelguide.output)
//     return {props:{data:res.data.travelguide.output}}
//     // return { props: { data,headers,region,places}}
//   }



// getTravelGuideHome




export default TravelGuide