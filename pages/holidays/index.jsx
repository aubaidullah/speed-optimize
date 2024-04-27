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

import * as Constants from "@/components/Constants";
import Content from "@/components/holidays/content";
import FAQs from "@/components/list/faqs";
import Link from "next/link";
import Head from "next/head";
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
    <div className="lg:mb-52 mb-16 lg:mt-32 mt-12 ">
      <div className={`bg-[#A6C7EA] h-[18rem]  lg:h-80 relative`}>
        <div className={`container flex lg:block flex-col justify-between h-full`}>
          <div className={`flex`}>
            <div className={`w-1/3`}>
              <div className={`absolute top-[-6%] lg:top-[-15%]`}>
                <img
                    alt="icon"
                    className={`inline w-[40%] lg:w-[80%]`}
                    src={`${
                      Constants.assets_api
                    }/public/icons/holiday/Component_440/Component_440.png`}
                  />
              </div>
            </div>
            <div className={`w-2/3`}>
              <div className={`text-[64px] hidden lg:block`}>
                <div className={`absolute text-[#A6C7EA]`} style={{top:"-24%"}}>
                  Explore Your 
                </div>
                <div className={`text-white`}>
                  Best Vacation
                </div>
              </div>
                <div className={`text-white p-6`}>
                  
                  <div className={` text-[25px] lg:hidden`}>
                    Explore Your <br /> Best Vacation
                  </div>                  
                  {/* <div className={`font-light`}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
                  </div> */}
                  <div className={`pt-10 text-sm lg:text-lg hidden lg:block`}>
                    <ul className={`flex flex-wrap`}>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/kerala-tour-packages-192"}>Kerala</Link></li>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/cherrapunji-tour-packages-9591"}>Cherrapunjee</Link></li>

                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/kaziranga-tour-packages-4111"}>Kaziranga</Link></li>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/tawang-tour-packages-7941"}>Tawang</Link></li>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/rajasthan-tour-packages-332"}>Rajasthan</Link></li>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/dwarka-tour-packages-2321"}>Dwarka</Link></li>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/odisha-tour-packages-292"}>Odisha</Link></li>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/udaipur-tour-packages-8261"}>Udaipur</Link></li>
                      <li className={`pb-1 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/puri-tour-packages-6451"}>Puri</Link></li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
          <div>
            {/* We need to put Links:  Kerala,  Cherrapunjee, Rajasthan,  Kashmir, Odisha, Udaipur, Puri, Dwarka, Tawang, Kaziranga */}
          <div className={`p-2 text-sm lg:text-lg lg:hidden text-white`}>
            <ul className={`flex flex-wrap`}>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/kerala-tour-packages-192"}>Kerala</Link></li>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/cherrapunji-tour-packages-9591"}>Cherrapunjee</Link></li>

              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/kaziranga-tour-packages-4111"}>Kaziranga</Link></li>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/tawang-tour-packages-7941"}>Tawang</Link></li>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/rajasthan-tour-packages-332"}>Rajasthan</Link></li>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/dwarka-tour-packages-2321"}>Dwarka</Link></li>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/odisha-tour-packages-292"}>Odisha</Link></li>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/udaipur-tour-packages-8261"}>Udaipur</Link></li>
              <li className={`pb-2 font-bold lg:pb-4`} style={{flex:'1 33%'}}><Link href={"/holidays/puri-tour-packages-6451"}>Puri</Link></li>
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
  <div className={`container my-16`}>
    <div className={`bg-[#4488E0] h-80 lg:h-40 relative rounded-[5rem] lg:rounded-full`}>
      <div className="flex items-center h-full flex-wrap">
        <div className={`w-full lg:w-1/2`}>
              <div className={`absolute top-[-10%] lg:top-[-15%]`}>
                <img
                    alt="icon"
                    className={`lg:inline w-[80%] m-auto lg:m-0`}
                    src={`${
                      Constants.assets_api
                    }/public/icons/holiday/bottom_banner.svg`}
                  />
              </div>          
        </div>
        <div className={`w-full lg:w-1/2`}>
            <div className={`text-xl text-center `}>
              <p className={`text-[#FFCC00]`}>Hassle free 24x7 travel assistance</p>
              <div className={`text-white pt-4`}>
                <p className={`font-bold text-2xl lg:text-2xl`}>9650687940</p>
                <p>info@kiomoi.com</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  </>
}


const faq = [
  {
    question:"Why You Should Choose Kiomoi to book holidays?",
    answer:"Kiomoi is a premier travel agency in India that offers a range of holiday packages in India and worldwide. We first understand our clients’ specific needs and preferences and thereafter, we help them plan their itinerary. With our help, you can have memorable experience with us. Being a responsive company, we always get feedback and suggestions from our customers to create memorable holidays. "
  },
  {
    question:"How to Plan Holidays with Kiomoi? ",
    answer:"To book international and domestic holiday packages with us, you just need to visit our website and enter your favourite holiday destination in search field. You can narrow down your search results by place name, price and travel duration. Once you choose your options, you will get a long list of holiday packages on your screen. Select any package that suits your needs perfectly! Either give us a phone call or send your query online. We offer hassle-free booking to all of our clients. With us, it is quite easy to plan your memorable holiday. Our team members will give you immediate support for booking a package in India and across the world"
  },
  {
    question:"What is included in Kiomoi International and Domestic Tour Packages in India?",
    answer:"Whether you are embarking upon a domestic trip or international tour, you can select any of our packages and have a wonderful experience. If we talk about our itinerary, it covers all the main highlights of your favourite destination. No matter, whatever your preferences are, you can pick our last-minute holiday deals, customized honeymoon packages, domestic tour packages, group travel packages, and more. If you are seeking a great experience in a tea garden in Assam or the dunes of Jaisalmer, we have got covered them all. "
  },
  {
    question:"How Can I Customize our Tour Package with Kiomoi? ",
    answer:"For this, you should discuss your specific needs and preferences with our team. We will listen to your concerns carefully and help you develop a well-planned itinerary. By approaching us, you can discover inherent places of India and all over the world. If you want to make your holidays perfect, then you should talk to our experts for the right guidance. Book holiday packages in India with Kiomoi and plan a perfect holiday at your favourite destination. We will help you explore different parts of the country in a safe, enjoyable and convenient way. Plan your trip, choose the best holiday package for you and have a lifetime experience! "
  }  
]



const HolidayPage = ({home,theme,articles,reviews,metas}) =>{
  // let img = "https://res.cloudinary.com/kmadmin/image/upload/v1633196081/kiomoi/1633196080048.jpg"
   let img = "https://res.cloudinary.com/kmadmin/image/upload/v1552993397/kiomoi/Pelling/Pelling-2.jpg";

    const jsonP = {
      "@context": "http://schema.org",
        "@type": "Product",
        "description": "Best offers are available on Domestic and International holiday tour packages at Kiomoi Travel. Book holiday packages at Kiomoi & get upto 30% discount!",
        "name": "Holiday Tour Packages",
        "url": "https://www.kiomoi.com/holidays",
        "image": "https://assets.kiomoi.com/public/icons/holiday/Component_440/Component_440.png",
        "brand": {
          "@type": "Brand",
          "name": "Kiomoi Travel"
        },
        "offers": {
          "@type": "AggregateOffer",
          "highPrice": "000",
          "lowPrice": "000",
          "priceCurrency": "INR"
          
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 5,
          "reviewCount": 585
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": reviews?.reviews[0].cName
            },
            "datePublished": reviews?.reviews[0].modifiedDate,
            "description": reviews?.reviews[0]?.review,
            "name": metas?.title??metas?.metaTitle,
            "reviewRating": {
              "@type": "Rating",
              "bestRating": "5",
              "ratingValue": "5",
              "worstRating": "0"
            }
          }
        ]
      } 



    return <>
      <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonP) }}
        />        
      </Head>
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
        <Content /> 
        <div className="container mt-16">
          <h4 className=" text-xl lg:text-2xl font-bold py-2">
            FAQ
          </h4>
          <FAQs data={faq} detail={true}/>
        </div>
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