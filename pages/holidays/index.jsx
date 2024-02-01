import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  getallpackages,
  getThemeQuery,
  getMetaQuery,
  getHome,
} from "../../components/Graphql/Queries";
import client from "../../components/Graphql/service";
import { getPackages } from "../../redux_fx/actions";
import { useDispatch } from "react-redux";
import SearchBar from "@/components/hotel/searchBar";
import Banner from "@/components/home/banner";
import Themes from "@/components/home/theme";
import HolidayTheme from "@/components/holidays/theme";
import State from "@/components/home/state";
import HomePackages from "@/components/home/packages";
import { tw } from "twind";
import * as Constants from "@/components/Constants";
import CityPackages from "@/components/holidays/CityPackage";
import InternationalPackages from "./international-package";
import InterNationalPackage from "@/components/holidays/International";
// import CityPackages from "./city-package";
// import * Constants from "@/components/Constants"

// import Nav from "../components/Nav";
const Nav = dynamic(() => import("../../components/HomeNav"));

const MobileList = dynamic(() => import("../../components/list_page.mobile"), {
  ssr: true,
});

const DeskList = dynamic(() => import("../../components/list_page.mobile"), {
  ssr: true,
});



const CanvasImg = () =>{
  return <>
    <div className="mt-32 mb-52">
      <div className={tw`bg-[#A6C7EA] h-80 relative`}>
        <div className="container">
          <div className={tw`flex`}>
            <div className={tw`w-1/3`}>
              <div className={tw`absolute`} style={{top:'-15%'}}>
                <img
                    alt="icon"
                    className={`inline w-[80%]`}
                    src={`${
                      Constants.assets_api
                    }/icons/holiday/Component_440/Component_440.png`}
                  />
              </div>
            </div>
            <div className={tw`w-2/3`}>
              <div className={tw`text-[64px]`}>
                <div className={tw`absolute text-[#A6C7EA]`} style={{top:"-24%"}}>
                  Explore Your 
                </div>
                <div className={tw`text-white`}>
                  Best Vacation
                </div>
              </div>
                <div className={tw`text-white`}>
                  <div>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
                  </div>
                  <div className={tw`pt-10 text-lg`}>
                    <ul className={tw`flex flex-wrap`}>
                      <li className={tw`pb-4`} style={{flex:'1 33%'}}>Sikkim</li>
                      <li className={tw`pb-4`} style={{flex:'1 33%'}}>Rajesthan</li>
                      <li className={tw`pb-4`} style={{flex:'1 33%'}}>Himachal Pradesh</li>
                      <li className={tw`pb-4`} style={{flex:'1 33%'}}>Kashmir</li>
                      <li className={tw`pb-4`} style={{flex:'1 33%'}}>Uttarkhand</li>
                      <li className={tw`pb-4`} style={{flex:'1 33%'}}>Uttaranchal</li>
                    </ul>
                  </div>
                </div>
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
    <div className={tw`bg-[#4488E0] h-40 relative rounded-full`}>
      <div className="flex items-center h-full">
        <div className={tw`w-1/2`}>
              <div className={tw`absolute`} style={{top:'-15%'}}>
                <img
                    alt="icon"
                    className={`inline w-[80%]`}
                    src={`${
                      Constants.assets_api
                    }/icons/holiday/bottom_banner.svg`}
                  />
              </div>          
        </div>
        <div className={tw`w-1/2`}>
            <div className={tw`text-xl text-center `}>
              <p className={tw`text-[#FFCC00]`}>Hassle free 24x7 travel assistance</p>
              <div className={tw`text-white pt-4`}>
                <p className={tw`font-bold text-2xl`}>9650687940</p>
                <p>planmytrip@kiomoi</p>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  </>
}




const HolidayPage = ({home,theme}) =>{
  // let img = "https://res.cloudinary.com/kmadmin/image/upload/v1633196081/kiomoi/1633196080048.jpg"
   let img = "https://res.cloudinary.com/kmadmin/image/upload/v1552993397/kiomoi/Pelling/Pelling-2.jpg";
    return <>
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

  return {
    props: {
      home: res.data.home.output,
      theme: res_theme.data.alltheme.output,
    },
  };  


}


export default HolidayPage