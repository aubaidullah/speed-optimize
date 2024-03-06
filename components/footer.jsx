import { tw } from "twind";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import {
  TiSocialYoutubeCircular,
  TiSocialLinkedinCircular,
} from "react-icons/ti";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import * as Constants from "./Constants";
import { useState } from "react";


const links = {
  "Best Domestic Holiday Tour Packages":[
      {
          "heading":"Sikkim Tour Packages",
          "url":"https://www.kiomoi.com/holidays/sikkim-tour-packages-342"
      },
      {
          "heading":"Arunachal Tour Packages",
          "url":"https://www.kiomoi.com/holidays/arunachal-pradesh-tour-packages-32"
      },
     {
          "heading":"Meghalaya Tour Packages",
          "url":"https://www.kiomoi.com/holidays/meghalaya-tour-packages-242"
      }, 
     {
          "heading":"Assam Tour Packages",
          "url":"https://www.kiomoi.com/holidays/assam-tour-packages-42"
      },
      {
          "heading":"Ladakh Tour Packages",
          "url":"https://www.kiomoi.com/holidays/ladakh-tour-packages-422"
      }, 
     {
          "heading":"Himachal Tour Packages",
          "url":"https://www.kiomoi.com/holidays/himachal-pradesh-tour-packages-142"
      },
    {
          "heading":"Kashmir Tour Packages",
          "url":"https://www.kiomoi.com/holidays/jammu-and-kashmir-tour-packages-152"
      },
    {
          "heading":"Rajasthan Tour Packages",
          "url":"https://www.kiomoi.com/holidays/rajasthan-tour-packages-332"
      },
    {
          "heading":"Andaman Tour Packages",
          "url":"https://www.kiomoi.com/holidays/andaman-and-nicobar-tour-packages-12"
      },
    {
          "heading":"Uttarakhand Tour Packages",
          "url":"https://www.kiomoi.com/holidays/uttarakhand-tour-packages-392"
      },
    {
          "heading":"Goa Tour Packages",
          "url":"https://www.kiomoi.com/holidays/goa-tour-packages-112"
      },
    {
          "heading":"North East Tour Packages",
          "url":"https://www.kiomoi.com/holidays/best-of-north-east-tour-package-212"
      },
    {
          "heading":"Delhi Tour Packages",
          "url":"https://www.kiomoi.com/holidays/delhi-tour-packages-102"
      },
    {
          "heading":"Ooty Tour Packages",
          "url":"https://www.kiomoi.com/holidays/ooty-tour-packages-5901"
      },
     {
          "heading":"Gangtok Tour Packages",
          "url":"https://www.kiomoi.com/holidays/gangtok-tour-packages-2601"
      },
     {
          "heading":"Shimla Tour Packages",
          "url":"https://www.kiomoi.com/holidays/shimla-tour-packages-7341"
      },
      {
          "heading":"Manali Tour Packages",
          "url":"https://www.kiomoi.com/holidays/manali-tour-packages-5001"
      },
    {
          "heading":"Manali Tour Packages",
          "url":"https://www.kiomoi.com/holidays/manali-tour-packages-5001"
      },
    {
          "heading":"Jim Corbett Tour Packages",
          "url":"https://www.kiomoi.com/holidays/jim-corbett-tour-packages-1721"
      },
    {
          "heading":"Mussoorie Tour Packages",
          "url":"https://www.kiomoi.com/holidays/mussoorie-tour-packages-5431"
      },
     {
          "heading":"Kerala Tour Packages",
          "url":"https://www.kiomoi.com/holidays/kerala-tour-packages-192"
      },
     {
          "heading":"Darjeeling Tour Packages",
          "url":"https://www.kiomoi.com/holidays/darjeeling-tour-packages-1871"
      },
    {
          "heading":"Leh Ladakh Tour Packages",
          "url":"https://www.kiomoi.com/holidays/ladakh-tour-packages-422"
      },
     {
          "heading":"Nainital Tour Packages",
          "url":"https://www.kiomoi.com/holidays/nainital-tour-packages-5561"
      },
    {
          "heading":"Kedarnath Tour Packages",
          "url":"https://www.kiomoi.com/holidays/kedarnath-tour-packages-9521"
      },
    {
          "heading":"CharDham Tour Packages",
          "url":"https://www.kiomoi.com/holidays/chardham-yatra-from-delhi-tour-package-127"
      },
    {
          "heading":"Dharamshala Tour Packages",
          "url":"https://www.kiomoi.com/holidays/dharamshala-tour-packages-2111"
      },
      {
          "heading":"Jaipur Tour Packages",
          "url":"https://www.kiomoi.com/holidays/jaipur-tour-packages-3251"
      },
     {
          "heading":"Jodhpur Tour Packages",
          "url":"https://www.kiomoi.com/holidays/jodhpur-tour-packages-3501"
      },
    {
          "heading":"Udaipur Tour Packages",
          "url":"https://www.kiomoi.com/holidays/udaipur-tour-packages-8261"
      },
     {
          "heading":"Mount Abu Tour Packages",
          "url":"https://www.kiomoi.com/holidays/mount-abu-tour-packages-5321"
      },
     {
          "heading":"Tawang Tour Packages",
          "url":"https://www.kiomoi.com/holidays/tawang-tour-packages-7941"
      },
     {
          "heading":"Shillong Tour Packages",
          "url":"https://www.kiomoi.com/holidays/shillong-tour-packages-7331"
      },
    {
          "heading":"Mahabaleshwar Tour Packages",
          "url":"https://www.kiomoi.com/holidays/mahabaleshwar-tour-packages-4901"
      },
    {
          "heading":"Kaziranga Tour Packages",
          "url":"https://www.kiomoi.com/holidays/kaziranga-tour-packages-4111"
      },
     {
          "heading":"Karnataka Tour Packages",
          "url":"https://www.kiomoi.com/holidays/karnataka-tour-packages-172"
      },
    {
          "heading":"Srinagar Tour Packages",
          "url":"https://www.kiomoi.com/holidays/srinagar-tour-packages-7721"
      },
    {
          "heading":"Dehradun Tour Packages",
          "url":"https://www.kiomoi.com/holidays/dehradun-tour-packages-1921"
      },
    {
          "heading":"Uttar Pradesh Tour Packages",
          "url":"https://www.kiomoi.com/holidays/uttar-pradesh-tour-packages-382"
      },
    {
          "heading":"Agra Tour Packages",
          "url":"https://www.kiomoi.com/holidays/agra-tour-packages-61"
      },
     {
          "heading":"Mathura Tour Packages",
          "url":"https://www.kiomoi.com/holidays/mathura-tour-packages-5131"
      },
    {
          "heading":"Vrindavan Tour Packages",
          "url":"https://www.kiomoi.com/holidays/vrindavan-tour-packages-8611"
      },
    {
          "heading":"Ayodhya Tour Packages",
          "url":"https://www.kiomoi.com/holidays/ayodhya-tour-packages-421"
      },
    {
          "heading":"Varanasi Tour Packages",
          "url":"https://www.kiomoi.com/holidays/varanasi-tour-packages-8491"
      },
     {
          "heading":"Gujarat Tour Packages",
          "url":"https://www.kiomoi.com/holidays/gujarat-tour-packages-122"
      },
     {
          "heading":"Dwarka Tour Packages",
          "url":"https://www.kiomoi.com/holidays/dwarka-tour-packages-2321"
      },
     {
          "heading":"Somnath Tour Packages",
          "url":"https://www.kiomoi.com/holidays/somnath-tour-packages-7621"
      },
    {
          "heading":"Ahmedabad Tour Packages",
          "url":"https://www.kiomoi.com/holidays/ahmedabad-tour-packages-8871"
      },
     {
          "heading":"Odisha Tour Packages",
          "url":"https://www.kiomoi.com/holidays/odisha-tour-packages-292"
      },
     {
          "heading":"Bhubaneswar Tour Packages",
          "url":"https://www.kiomoi.com/holidays/bhubaneswar-tour-packages-1091"
      },
     {
          "heading":"Puri Tour Packages",
          "url":"https://www.kiomoi.com/holidays/puri-tour-packages-6451"
      },
    {
          "heading":"Kaziranga Tour Packages",
          "url":"https://www.kiomoi.com/holidays/kaziranga-tour-packages-4111"
      },
     {
          "heading":"Manas Tour Packages",
          "url":"https://www.kiomoi.com/holidays/manas-tour-packages-5011"
      },
     {
          "heading":"Cherrapunji Tour Packages",
          "url":"https://www.kiomoi.com/holidays/cherrapunji-tour-packages-9591"
      }
  ],
  "Top Selling International Tour Packages":[
      {
          "heading":"Maldives Tour Package",
          "url":"https://www.kiomoi.com/holidays/maldives-tour-packages-1333"
      },
      {
          "heading":"Bali Tour Packages",
          "url":"https://www.kiomoi.com/holidays/bali-tour-packages-13111"
      },
      {
          "heading":"Dubai Tour Packages",
          "url":"https://www.kiomoi.com/holidays/dubai-tour-packages-13051"
      },
    {
          "heading":"Singapore Tour Packages",
          "url":"https://www.kiomoi.com/holidays/singapore-tour-packages-1963"
      },
     {
          "heading":"Nepal Tour Packages",
          "url":"https://www.kiomoi.com/holidays/nepal-tour-packages-1533"
      },
     {
          "heading":"Thailand Tour Packages",
          "url":"https://www.kiomoi.com/holidays/thailand-tour-packages-2173"
      },
     {
          "heading":"Bhutan Tour Packages",
          "url":"https://www.kiomoi.com/holidays/bhutan-tour-packages-253"
      },
    {
          "heading":"Sri Lanka Tour Packages",
          "url":"https://www.kiomoi.com/holidays/lanka--tour-packages-12451"
      },
     {
          "heading":"Bangkok Tour Packages",
          "url":"https://www.kiomoi.com/holidays/bangkok-tour-packages-13211"
      },
    {
          "heading":"Pattaya Tour Packages",
          "url":"https://www.kiomoi.com/holidays/pattaya-tour-packages-13221"
      },
    {
          "heading":"Kathmandu Tour Packages",
          "url":"https://www.kiomoi.com/holidays/kathmandu-tour-packages-12881"
      },
     {
          "heading":"Cambodia Tour Packages",
          "url":"https://www.kiomoi.com/holidays/cambodia-tour-packages-363"
      },
    {
          "heading":"Indonesia Tour Packages",
          "url":"https://www.kiomoi.com/holidays/indonesia-tour-packages-1023"
      },
    {
          "heading":"United Arab Emirates Tour packages",
          "url":"https://www.kiomoi.com/holidays/united-arab-emirates-tour-packages-2293"
      }
  ],
  "Top Selling Domestic Honeymoon Packages":[
      {
          "heading":"Himachal Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-himachal-pradesh-142"
      },
      {
          "heading":"Kashmir Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-jammu-and-kashmir-152"
      },
      {
          "heading":"Rajasthan Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-rajasthan-332"
      },
     {
          "heading":"Kerala Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-kerala-192"
      },
    {
          "heading":"Uttarakhand Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-uttarakhand-392"
      },
    {
          "heading":"Sikkim Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-sikkim-342"
      },
    {
          "heading":"Shimla Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-shimla-7341"
      },
    {
          "heading":"Manali Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-manali-5001"
      },
    {
          "heading":"Darjeeling Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-darjeeling-1871"
      },
     {
          "heading":"Ooty Honeymoon Package",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-ooty-5901"
      },
    {
          "heading":"Gangtok Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-gangtok-2601"
      },
    {
          "heading":"Meghalaya Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-meghalaya-242"
      },
    {
          "heading":"Cherrapunji Honeymoon Package",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-cherrapunji-9591"
      },
    {
          "heading":"Goa Honeymoon Package",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-goa-112"
      },
    {
          "heading":"Mussoorie Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-mussoorie-5431"
      },
     {
          "heading":"Nainital Honeymoon Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages-in-nainital-5561"
      }
  ],
 "Top Places to Visit in India":[
      {
          "heading":"Best Places To Visit In Delhi",
          "url":"https://www.kiomoi.com/states/delhi/top-places-to-visit-18"
      },
      {
          "heading":"Best Places To Visit In Rajasthan",
          "url":"https://www.kiomoi.com/travel-articles/best-places-to-visit-in-rajasthan-101"
      },
      {
          "heading":"Best Places To Visit In Gujarat",
          "url":"https://www.kiomoi.com/states/gujarat/top-places-to-visit-42"
      },
   {
          "heading":"Best Places To Visit In Ladakh",
          "url":"https://www.kiomoi.com/travel-articles/15-best-places-to-visit-in-ladakh:-enjoy-nature-adventure-86"
      },
   {
          "heading":"Best Places To Visit In Andaman",
          "url":"https://www.kiomoi.com/states/andaman%20&%20nicobar/top-places-to-visit-41"
      },
   {
          "heading":"Best Places To Visit In Arunachal Pradesh",
          "url":"https://www.kiomoi.com/states/arunachal%20pradesh/top-places-to-visit-12"
      },
    {
          "heading":"Best Places To Visit In Sikkim",
          "url":"https://www.kiomoi.com/states/sikkim/top-places-to-visit-2"
      },
   {
          "heading":"Best Places To Visit In Darjeeling",
          "url":"https://www.kiomoi.com/cities/darjeeling/top-sightseeing-places-and-attractions-to-visit-47"
      },
   {
          "heading":"Best Places To Visit In Meghalaya",
          "url":"https://www.kiomoi.com/states/meghalaya/top-places-to-visit-30"
      },
    {
          "heading":"Best Places To Visit In Gangtok",
          "url":"https://www.kiomoi.com/cities/gangtok/top-sightseeing-places-and-attractions-to-visit-49"
      },
   {
          "heading":"Best Places To Visit In Uttarakhand",
          "url":"https://www.kiomoi.com/states/uttarakhand/top-places-to-visit-39"
      },
   {
          "heading":"Best Places To Visit In Kerala",
          "url":"https://www.kiomoi.com/states/kerala/top-places-to-visit-25"
      },
    {
          "heading":"Best Places To Visit In Karnatka",
          "url":"https://www.kiomoi.com/states/karnataka/top-places-to-visit-24"
      },
   {
          "heading":"Best Places To Visit In Kasauli",
          "url":"https://www.kiomoi.com/cities/kasauli/top-sightseeing-places-and-attractions-to-visit-54"
      },
   {
          "heading":"Best Places To Visit In Maharashtra",
          "url":"https://www.kiomoi.com/states/maharashtra/top-places-to-visit-28"
      },
   {
          "heading":"Best Places To Visit In Himachal Pradesh",
          "url":"https://www.kiomoi.com/states/himachal%20pradesh/top-places-to-visit-21"
      },
   {
          "heading":"Best Places To Visit In Madhya Pradesh",
          "url":"https://www.kiomoi.com/states/madhya%20pradesh/top-places-to-visit-27"
      },
    {
          "heading":"Best Places To Visit In Kashmir",
          "url":"https://www.kiomoi.com/states/jammu%20and%20kashmir/top-places-to-visit-22"
      },
   {
          "heading":"Best Places To Visit In Manali",
          "url":"https://www.kiomoi.com/cities/manali/top-sightseeing-places-and-attractions-to-visit-63"
      },
   {
          "heading":"Best Places To Visit In Pondicherry",
          "url":"https://www.kiomoi.com/states/pondicherry/top-places-to-visit-33"
      },
    {
          "heading":"Best Places To Visit In Agra",
          "url":"https://www.kiomoi.com/cities/agra/top-sightseeing-places-and-attractions-to-visit-141"
      },
   {
          "heading":"Best Places To Visit In Haridwar",
          "url":"https://www.kiomoi.com/cities/haridwar/top-sightseeing-places-and-attractions-to-visit-51"
      },
   {
          "heading":"Best Places To Visit In Jim Corbett",
          "url":"https://www.kiomoi.com/cities/haridwar/top-sightseeing-places-and-attractions-to-visit-51"
      },
   {
          "heading":"Best Places To Visit In Uttar Pradesh",
          "url":"https://www.kiomoi.com/states/uttar%20pradesh/top-places-to-visit-38"
      },
   {
          "heading":"Best Places To Visit In Shillong",
          "url":"https://www.kiomoi.com/states/maharashtra/top-places-to-visit-28"
      },
   {
          "heading":"Best Places To Visit In Assam",
          "url":"https://www.kiomoi.com/states/assam/top-places-to-visit-11"
      },
   {
          "heading":"Best Places To Visit In West Bengal",
          "url":"https://www.kiomoi.com/states/west%20bengal/top-places-to-visit-40"
      },
   {
          "heading":"Best Places To Visit In Zira",
          "url":"https://www.kiomoi.com/cities/ziro/top-sightseeing-places-and-attractions-to-visit-92"
      },
   {
          "heading":"Best Places To Visit In Cherrapunji",
          "url":"https://www.kiomoi.com/cities/cherrapunji/top-sightseeing-places-and-attractions-to-visit-90"
      },
   {
          "heading":"Best Places To Visit In Tawang",
          "url":"https://www.kiomoi.com/cities/tawang/top-sightseeing-places-and-attractions-to-visit-87"
      },
    {
          "heading":"Best Places To Visit In Alleppey",
          "url":"https://www.kiomoi.com/cities/alleppey/top-sightseeing-places-and-attractions-to-visit-86"
      },
   {
          "heading":"Best Places To Visit In Kaziranga",
          "url":"https://www.kiomoi.com/cities/kaziranga/top-sightseeing-places-and-attractions-to-visit-56"
      },
   {
          "heading":"Best Places To Visit in Daman and Diu",
          "url":"https://www.kiomoi.com/states/daman%20and%20diu/top-places-to-visit-17"
      },
   {
          "heading":"Best Places To Visit in Odisha",
          "url":"https://www.kiomoi.com/states/odisha/top-places-to-visit-32"
      },
   {
          "heading":"Best Places To Visit in Tripura",
          "url":"https://www.kiomoi.com/states/tripura/top-places-to-visit-37"
      },
   {
          "heading":"Best Places To Visit in Lachen",
          "url":"https://www.kiomoi.com/cities/lachen/top-sightseeing-places-and-attractions-to-visit-107"
      },
    {
          "heading":"Best Places To Visit in Pelling",
          "url":"https://www.kiomoi.com/cities/pelling/top-sightseeing-places-and-attractions-to-visit-109"
      },
    {
          "heading":"Best Places To Visit in Ahmedabad",
          "url":"https://www.kiomoi.com/cities/ahmedabad/top-sightseeing-places-and-attractions-to-visit-131"
      }
 ],
 "Popular Links":[
      {
          "heading":"Holidays",
          "url":"https://www.kiomoi.com/holidays"
      },
      {
          "heading":"Honeymoon Tour Packages",
          "url":"https://www.kiomoi.com/holidays/honeymoon-tour-packages"
      },
      {
          "heading":"Family Tour packages",
          "url":"https://www.kiomoi.com/holidays/family-tour-packages"
      },
   {
          "heading":"Sikkim Tour Packages",
          "url":"https://www.kiomoi.com/holidays/sikkim-tour-packages-342"
      },
   {
          "heading":"Gujarat Tour Packages",
          "url":"https://www.kiomoi.com/holidays/gujarat-tour-packages-122"
      },
   {
          "heading":"Meghalaya Tour Packages",
          "url":"https://www.kiomoi.com/holidays/meghalaya-tour-packages-242"
      },
   {
          "heading":"Dalhousie Tour Packages",
          "url":"https://www.kiomoi.com/holidays/dalhousie-tour-packages-1801"
      },
   {
          "heading":"Himachal Tour Packages",
          "url":"https://www.kiomoi.com/holidays/himachal-pradesh-tour-packages-142"
      },
   {
          "heading":"Darjeeling Tour Packages",
          "url":"https://www.kiomoi.com/holidays/darjeeling-tour-packages-1871"
      },
   {
          "heading":"Gangtok Tour Packages",
          "url":"https://www.kiomoi.com/holidays/gangtok-tour-packages-2601"
      },
   {
          "heading":"Weekend Getaway",
          "url":"https://www.kiomoi.com/holidays/weekend-gateway-tour-packages"
      },
   {
          "heading":"Culture and Heritage Tours India",
          "url":"https://www.kiomoi.com/holidays/culture-&-heritage-tour-packages"
      },
   {
          "heading":"Wildlife Tour Packages",
          "url":"https://www.kiomoi.com/holidays/wildlife-tour-packages"
      },
    {
          "heading":"Beach Tour Packages",
          "url":"https://www.kiomoi.com/holidays/beach-tour-packages"
      },
    {
          "heading":"Hill Station Tour Packages",
          "url":"https://www.kiomoi.com/holidays/beach-tour-packages"
      }
  ]
}





const Footer = () => {
  const [collapse,setCollapse] = useState(null)

  return (
    <div className={tw`w-100 overflow-hidden mt-5`}>
      <div className={tw``}>
        <div className={tw`container py-4`}>
          <div className={tw``}>
            {Object.keys(links).map((item,index)=>{
              return <div>
              <h3 className={tw`text-sm lg:text-xl font-semibold mt-8 mb-4 cursor-pointer`} onClick={()=>setCollapse(index == collapse ? -1 : index)}>{item}</h3>
              <div className={tw`flex flex-wrap gap-4 ${collapse == index ? "" : "hidden lg:flex"}`}>
                {links[item].map((i,ind)=>{
                  return <div className={tw`hover:text-gray-800 text-sm font-light`}>
                      <Link href={i.url.replace("https://www.kiomoi.com",'')}>
                        <div className={tw`text-sm px-4 py-2 bg-white _b_active rounded-full border-2 border-gray-300 hover:shadow-lg transition-shadow`}>
                          {i.heading}
                        </div>
                      </Link>                  
                    </div>
                })}
              </div>
              </div>
            })}
          </div>
        </div>
      </div>


      <div className={tw`flex justify-center py-3 bg-[#505050]`}>
        <ul className={tw`flex gap-2 custom-footer`}>
          <li className={`cursor-pointer text-sm md:text-sm`}>
            <Link href="/aboutus/">About us </Link>
            <span className={`fs-6 md:fs-4`}> | </span>
          </li>
          <li className={`cursor-pointer text-sm md:text-sm`}>
            <Link href="/privacy/">Privacy </Link>
            <span className={`fs-6 md:fs-4`}> | </span>
          </li>
          <li className={`cursor-pointer text-sm md:text-sm`}>
            <Link href="/terms-and-conditions/">Term & Conditions </Link>
            <span className={`fs-6 md:fs-4`}> | </span>
          </li>
          <li className={`cursor-pointer text-sm md:text-sm`}>
            <Link href="/bookingdetail/">My Bookings </Link>
            <span className={`fs-6 md:fs-4`}></span>
          </li>
        </ul>
      </div>
      <div className={tw`flex pb-3 pt-4 bg-[#373739]`}>
        <div className="row w-full">
          <div className="flex flex-wrap">
            <div
              className={tw`w-full lg:w-1/3 payment_secure flex flex-col justify-center items-center px-4 md:px-0 col-12 col-md-4`}
            >
              <div>
                <h4 className={`mb-3 text-center md:text-start`}>
                  Secure Payment
                </h4>
                <div className={`flex gap-3 mb-4 md:mb-0`}>
                  <span>
                    <img
                      src={`${Constants.assets_api}/public/icons/payment_icons/1.png`}
                      alt="payment_icon"
                    />
                  </span>
                  <span>
                    <img
                      src={`${Constants.assets_api}/public/icons/payment_icons/2.png`}
                      alt="payment_icon"
                    />
                  </span>
                  <span>
                    <img
                      src={`${Constants.assets_api}/public/icons/payment_icons/3.png`}
                      alt="payment_icon"
                    />
                  </span>
                  <span>
                    <img
                      src={`${Constants.assets_api}/public/icons/payment_icons/4.png`}
                      alt="payment_icon"
                    />
                  </span>
                  <span>
                    <img
                      src={`${Constants.assets_api}/public/icons/payment_icons/5.png`}
                      alt="payment_icon"
                    />
                  </span>
                </div>
              </div>
            </div>
            {/* <hr className={`col-12 col-md-4 text-white w-80 m-auto mb-3 d-block d-md-none`} /> */}
            <div
              className={tw`w-full lg:w-1/3 payment_secure follow-links col-12 col-md-4`}
            >
              <h4 className={`mb-3 px-3 md:px-0 text-center`}>FOLLOW US ON</h4>
              <ul
                className={`flex justify-center px-3 md:px-0 gap-4 mb-3 md:mb-0`}
              >
                <li className={`cursor-pointer text-4xl`}>
                  <a href="https://www.facebook.com/thekiomoi/" target="_blank">
                    <FaFacebook />
                  </a>
                </li>
                <li className={`cursor-pointer text-4xl`}>
                  <a href="https://twitter.com/ki_omoi" target="_blank">
                    <AiFillTwitterCircle />
                  </a>
                </li>
                <li className={`cursor-pointer text-4xl`}>
                  <a
                    href="https://www.instagram.com/kiomoi_in/"
                    target="_blank"
                  >
                    <AiFillInstagram />
                  </a>
                </li>
                <li className={`cursor-pointer text-4xl`}>
                  <a
                    href="https://www.youtube.com/channel/UCPq6EimDUQ2eknEJgyLqnnA"
                    target="_blank"
                  >
                    <TiSocialYoutubeCircular />
                  </a>
                </li>
                <li className={`cursor-pointer text-4xl`}>
                  <a
                    href="https://www.linkedin.com/company/kiomoi/"
                    target="_blank"
                  >
                    <TiSocialLinkedinCircular />
                  </a>
                </li>
              </ul>
            </div>
            {/* <hr className={`col-12 col-md-4 text-white w-80 m-auto mb-4 d-block d-md-none`} /> */}
            <div
              className={tw`w-full lg:w-1/3 col-12 col-md-4 flex justify-center items-center px-4 md:px-0`}
            >
              <div className={`whatsapp-footer flex gap-4`}>
                <img
                  src={`${Constants.assets_api}/public/icons/whatsapp.png`}
                  alt="whatsapp"
                />
                <div className="WhatsApp_">
                  <h4 className={`text-md md:text-lg font-bold mb-2`}>
                    WHATSAPP
                  </h4>
                  <a
                    className={`text-md md:text-lg text-gray-200`}
                    href="whatsapp://send?phone=+919650687940"
                  >
                    +919650687940
                  </a>
                </div>
              </div>
            </div>
            {/* <hr className={`col-12 col-md-4 text-white w-80 m-auto my-4 d-block d-md-none`} /> */}
          </div>

          <div className={`container text_footer_bottom text-center mt-6`}>
            <div>
              <p>H-187, Lohia Road, Sector-63, Noida 201301 India</p>
              <p>
                Call: +91- 8448298660 / +91- 9650687940 | Email:{" "}
                <a href="mailto:info@kiomoi.com">info@kiomoi.com</a>
              </p>
            </div>
            <p>Copyright 2022 © Kiomoi Rights Reserved.</p>
            <p>Kiomoi Travel Services Pvt. Ltd.</p>
            <p>
              The content and images used on this site are copyright protected
              and copyrights vests with the respective owners. The usage of the
              content and images on this website is intended to promote the
              works and no endorsement of the artist shall be implied.
              Unauthorized use is prohibited and punishable by law.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
