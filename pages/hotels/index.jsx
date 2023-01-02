import Nav from "../../components/HomeNav"
import { tw } from "twind"
import { useState,useEffect } from "react";
import client from "../../components/Graphql/service";
import { getHotelList,getCitiesQuery,getMetaQuery } from "../../components/Graphql/Queries";
// import {BsDot,BsStarFill,BsStarHalf,BsFillMoonFill} from 'react-icons/bs'
import MultiCarousel2 from "react-multi-carousel";
import Image from "next/image";
import Slider from 'react-slick'
import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import { BsDot,BsStarHalf } from "react-icons/bs";
import Link from "next/link";
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {FaRegUser} from 'react-icons/fa'
import axios from 'axios'
import * as Constants from '../../components/Constants'
import Meta from "../../components/meta";
import HotelList from "../../components/hotel/hotel-list";
import SearchBar from "../../components/hotel/searchBar";
import BreadCrumbs from "../../components/breadcrumbs";


const Hotels = ({data,meta}) =>{
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)
    const [responsive,Setresponsive] = useState({})
    const [checkindate,setCheckindate] = useState("")
    const [checkoutdate,setCheckoutdate] = useState("")
    const [mincheckoutdate,setminCheckoutdate] = useState("")
    const [searchkey,setSearchkey] = useState("")


    useEffect(()=>{
        const res = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 6,
              // partialVisibilityGutter: 40,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 6,
              // partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 2,
              partialVisibilityGutter: 40,
            },
          };  
          Setresponsive(res)      
    },[])    




    const bread = {
      disabled: {
          item: `Hotels`
      },
      enabled: [
          {
              item: "Kiomoi",
              href: "/"
          }
      ]
  }


    
    // console.log(data)
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

      const SampleNextArrow = (props)=> {
        const { className, style, onClick } = props;
        // {tw`hidden lg:carousel-button-group lg:block `}
        return <div className={tw`hidden lg:block custom-btn right-custom-btn`} onClick={onClick}/>;
      }
  
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return <div className={tw`hidden lg:block custom-btn left-custom-btn`} onClick={onClick}/>;
      }      

    const hotelRender = data.cities.map((item, i)=>{
       const hurl = `/hotels/hotel-in-${item.cname?.toLowerCase()}-${item.cid}/`
        return <div>
                    <div className={tw`pr-8`}>
                        <Link href={hurl}>
                          <a href={hurl}>
                              <h4 className={tw`text-center pb-2 font-bold`}>{item.cname}</h4>
                              <div className="des_img_hotel">
                                  
                                  {item.iurl
                                  ?<Image src={item.iurl} className={tw``} style={{height:'100%',width:'100px'}} layout="fill" />
                                  :<img src={item.iurl} />
                                  }
                              </div>
                          </a>
                        </Link>
                        
                    </div>
                </div>
    })


    const settings = {
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
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



    

    var dt = new Date()
    const x = dt.toJSON().split("T")[0].split("-")

    const minDate = {
        "year":x[0],
        "month":x[1],
        "day":x[2]
      }
    
    useEffect(()=>{
      let today = new Date(`${minDate['year']}-${minDate['month']}-${minDate['day']}`)
      setCheckindate({"day":parseInt(minDate['day']),"month":parseInt(minDate['month']),"year":parseInt(minDate['year'])})

      let tomorrow = new Date(`${minDate['year']}-${minDate['month']}-${minDate['day']}`);
      tomorrow.setDate(today.getDate()+2);
      let c = tomorrow.toLocaleDateString().split("/")

      setminCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
      setCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
    },[])

      const Search = async () => {
        setLoading(true)
        const result = await axios.post(Constants.api + '/api/v1/geo/cities/', { av: '', id: '', pt: '', text: searchkey })
        setResult(result?.data?.output)
        setLoading(false)
    }



      const HandleSearch = (s_key) =>{
        if (s_key.length >= 3) {
          setSearchkey(s_key)
          Search()
        }
        else {
            setSearchkey(s_key)
            setResult({})
      }          
      }

      // console.log(result)
      const setCheckIn = (date) =>{
        let today = new Date(`${date['year']}-${date['month']}-${date['day']}`)
        let tomorrow = new Date(`${date['year']}-${date['month']}-${date['day']}`);
        tomorrow.setDate(today.getDate()+2);
        let c = tomorrow.toLocaleDateString().split("/")  
        setCheckindate(date)
        setminCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})      
        setCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
        // setCheckoutdate(date)
      }
    const bimg = "https://testkiomoi.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fv1552993397%2Fkiomoi%2FPelling%2FPelling-2.jpg&w=1920&q=75"
    return <>
     <Meta meta={meta} />
     <Nav />

     <SearchBar img={bimg}/>
     <BreadCrumbs bread={bread} />
     <section className="container">
      

        <div className={tw`mt-4`}>
          
        </div>



        
        
        <div className={tw`mt-4`}>
            <h2 className={tw`_titles_ mb-4`}>Browse by Destination</h2>
            <div className="Shape_42" style={{position:"relative"}}>
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
                      {hotelRender}
                  </MultiCarousel2>                
            </div>
        </div>

        <div className={tw`mt-4`} style={{display:'unset'}}>
            <h2 className={tw`_titles_ mb-4`}>Explore</h2>
              <HotelList hotels={data.hotels} />
                {/* <Slider {...settings}>
                    {exploreRender}
                </Slider> */}


        </div>
     </section>
     
    </>
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', 's-maxage=10');
    let payloads = {
        "av": "",
        "id": 0,
        "name": "",
        "pt": "",
        "type": ""
      }
    const res = await client.query({query:getHotelList,variables:{input:payloads}})
    const meta = await client.query({query:getMetaQuery,variables:{input:{av: "1.3",id: 0,key: "HOTELS",name: "",pt: "WEBSITE",type: ""}}})
    // console.log(res.data.hotels.output)
    return {props:{data:res.data.hotels.output,meta:meta.data.meta.output.tags}}
}

export default Hotels