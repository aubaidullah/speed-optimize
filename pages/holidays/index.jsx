import dynamic from "next/dynamic";
import {
  getThemeQuery,
  getHome,
  getarticleQuery,
  getreviewsQuery,
} from "../../components/Graphql/Queries";
import client from "../../components/Graphql/service";
// import Banner from "@/components/home/banner";
// import HolidayTheme from "@/components/holidays/theme";
// import State from "@/components/home/state";
// import HomePackages from "@/components/home/packages";
import { tw } from "twind";
import * as Constants from "@/components/Constants";
// import CityPackages from "@/components/holidays/CityPackage";
// import InterNationalPackage from "@/components/holidays/International";
// import Articles from "@/components/home/articles";
// import Reviews from "@/components/home/reviews";
// import Meta from "@/components/meta";
// import CityPackages from "./city-package";
// import * Constants from "@/components/Constants"

// import Nav from "../components/Nav";
const Nav = dynamic(() => import("../../components/HomeNav"));
const Banner = dynamic(() => import("@/components/home/banner"));
const HolidayTheme = dynamic(() => import("@/components/holidays/theme"));
const State = dynamic(() => import("@/components/home/state"));
const HomePackages = dynamic(() => import("@/components/home/packages"));
const CityPackages = dynamic(() => import("@/components/holidays/CityPackage"));
const InterNationalPackage = dynamic(() => import("@/components/holidays/International"));
const Articles = dynamic(() => import("@/components/home/articles"));
const Reviews = dynamic(() => import("@/components/home/reviews"));
const Meta = dynamic(() => import("@/components/meta"));


const CanvasImg = () =>{
  return <>
    <div className="lg:mb-52 mb-16 lg:mt-32 mt-16 ">
      <div className={tw`bg-[#A6C7EA] h-80 relative`}>
        <div className="container">
          <div className={tw`flex`}>
            <div className={tw`w-1/3`}>
              <div className={tw`absolute top-[-6%] lg:top-[-15%]`}>
                <img
                    alt="icon"
                    className={`inline w-[40%] lg:w-[80%]`}
                    src={`${
                      Constants.assets_api
                    }/public/icons/holiday/Component_440/Component_440.png`}
                  />
              </div>
            </div>
            <div className={tw`w-2/3`}>
              <div className={tw`text-[64px] hidden lg:block`}>
                <div className={tw`absolute text-[#A6C7EA]`} style={{top:"-24%"}}>
                  Explore Your 
                </div>
                <div className={tw`text-white`}>
                  Best Vacation
                </div>
              </div>
                <div className={tw`text-white p-6`}>
                  
                  <div className={tw` text-[25px] lg:hidden`}>
                    Explore Your <br /> Best Vacation
                  </div>                  
                  {/* <div className={tw`font-light`}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
                  </div> */}
                  <div className={tw`pt-10 text-sm lg:text-lg hidden lg:block`}>
                    <ul className={tw`flex flex-wrap`}>
                      <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Sikkim</li>
                      <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Rajesthan</li>
                      <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Himachal Pradesh</li>
                      <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Kashmir</li>
                      <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Uttarkhand</li>
                      <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Uttaranchal</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
          <div>
          <div className={tw`p-2 text-sm lg:text-lg lg:hidden text-white`}>
            <ul className={tw`flex flex-wrap`}>
              <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Sikkim</li>
              <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Rajesthan</li>
              <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Himachal Pradesh</li>
              <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Kashmir</li>
              <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Uttarkhand</li>
              <li className={tw`pb-1 lg:pb-4`} style={{flex:'1 33%'}}>Uttaranchal</li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>

  </>
}



const BottomBnner = () =>{
  return <>
  <div className={tw`container my-16`}>
    <div className={tw`bg-[#4488E0] h-80 lg:h-40 relative rounded-[5rem] lg:rounded-full`}>
      <div className="flex items-center h-full flex-wrap">
        <div className={tw`w-full lg:w-1/2`}>
              <div className={tw`absolute top-[-10%] lg:top-[-15%]`}>
                <img
                    alt="icon"
                    className={`lg:inline w-[80%] m-auto lg:m-0`}
                    src={`${
                      Constants.assets_api
                    }/public/icons/holiday/bottom_banner.svg`}
                  />
              </div>          
        </div>
        <div className={tw`w-full lg:w-1/2`}>
            <div className={tw`text-xl text-center `}>
              <p className={tw`text-[#FFCC00]`}>Hassle free 24x7 travel assistance</p>
              <div className={tw`text-white pt-4`}>
                <p className={tw`font-bold text-2xl lg:text-2xl`}>9650687940</p>
                <p>info@kiomoi.com</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  </>
}




const HolidayPage = ({home,theme,articles,reviews,metas}) =>{
  // let img = "https://res.cloudinary.com/kmadmin/image/upload/v1633196081/kiomoi/1633196080048.jpg"
   let img = "https://res.cloudinary.com/kmadmin/image/upload/v1552993397/kiomoi/Pelling/Pelling-2.jpg";
    return <>
        <Meta meta={metas} />
        <Nav />
        {/* <SearchBar /> */}
        <Banner data={home.banners} holiday={true}/>
        <HolidayTheme theme={theme}/>
        <State data={home.states} holiday={true}/>
        <CanvasImg />
        <InterNationalPackage data={home.countries}/>
        <CityPackages data={home.cities}/>
        {/* <InternationalPackages data={home.states} /> */}
        <HomePackages data={home} holiday={true}/>
        <Articles data={articles?.articles} />
        <Reviews data={reviews?.reviews} /> 
        <BottomBnner />
    </>
}


export async function getServerSideProps(context) {

  const res = await client.query({
    query: getHome,
    variables: { input: { av: "", id: "", pt: "" } },
  });


  const res_theme = await client.query({
    query: getThemeQuery,
    variables: { input: { av: "", id: "", pt: "" } },
  });

  const res_article = await client.query({
    query: getarticleQuery,
    variables: {
      input: {
        av: "1.3",
        id: "string",
        pt: "WEBSITE",
        geoid: 0,
        pagenum: 1,
        pid: 0,
        size: 20,
        type: "0",
      },
    },
  });

  const res_review = await client.query({
    query: getreviewsQuery,
    variables: {
      input: {
        av: "1.3",
        id: "0",
        pt: "WEBSITE",
        geoid: 0,
        pagenum: 1,
        pid: 0,
        size: 6,
        type: "",
      },
    },
  });

  const meta = {
    "title":"Book Domestic and International Holiday Tour Packages at Kiomoi",
    "longDesc":"Kiomoi is the place to find the best deals on domestic and international tours. Get up to 30% off on your holiday tours in India by booking your best holiday tour packages!",
    "keywords":"Holiday Packages in India \
    International Holiday Packages \
    Holiday Tour Packages \
    Internation Tours online \
    Best holiday Tour Packages \
    Domestic Holiday Packages \
    Domestic Tour Packages \
    Domestic Tour \
    Domestic Tour Packages in India"
  }

  return {
    props: {
      home: res.data.home.output,
      theme: res_theme.data.alltheme.output,
      articles: res_article.data.articles.output,
      reviews: res_review.data.reviews.output,     
      metas:meta 
    },
  };  


}


export default HolidayPage