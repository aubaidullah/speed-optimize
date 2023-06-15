// import Nav from "../../components/HomeNav"
import { tw } from "twind"
import { useState,useEffect } from "react";
import client from "../../components/Graphql/service";
import { getHotelList,getMetaQuery } from "../../components/Graphql/Queries";
// import MultiCarousel2 from "react-multi-carousel";
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import axios from 'axios'
import * as Constants from '../../components/Constants'
// import Meta from "../../components/meta";
// import HotelList from "../../components/hotel/hotel-list";
// import SearchBar from "../../components/hotel/searchBar";
// import BreadCrumbs from "../../components/breadcrumbs";
import dynamic from "next/dynamic";
// import HotelByDestination from "@/components/hotel/by-destination";


const Nav = dynamic(() => import('@/components/HomeNav'))
const HotelByDestination = dynamic(() => import('@/components/hotel/by-destination'))

const HotelList = dynamic(() => import('@/components/hotel/hotel-list'))
const SearchBar = dynamic(() => import('@/components/hotel/searchBar'))
const BreadCrumbs = dynamic(() => import('@/components/breadcrumbs'))       
const Meta = dynamic(() => import('@/components/meta'))


const Hotels = ({data,meta}) =>{
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)
  const [checkindate,setCheckindate] = useState("")
  const [checkoutdate,setCheckoutdate] = useState("")
  const [mincheckoutdate,setminCheckoutdate] = useState("")
  const [searchkey,setSearchkey] = useState("")
  





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




    const bimg = "https://testkiomoi.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fv1552993397%2Fkiomoi%2FPelling%2FPelling-2.jpg&w=1920&q=75"
    return <>
     <Meta meta={meta} />
     <Nav />

     <SearchBar img={bimg}/>
     <BreadCrumbs bread={bread} />
     <section className="container">
      

        <div className={tw`mt-4`}>
          
        </div>



        
        <HotelByDestination data={data}/>
        {/* <div className={tw`mt-4`}>
            <h2 className={tw`_titles_ mb-4`}>Browse by Destination</h2>
            <div className="Shape_42 relative">
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
        </div> */}

        <div className={tw`mt-4 inline`}>
            <h2 className={tw`_titles_ mb-4`}>Explore</h2>
              <HotelList hotels={data.hotels} />

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