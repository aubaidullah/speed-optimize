import client from "@/components/Graphql/service";
import Nav from "@/components/Nav";
import BreadCrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { tw } from "twind";
import * as cookie from 'cookie'
import { getBookingHistory, getUserById, getWallet } from "@/components/Graphql/Queries";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import Login from "@/components/register";

const User = ({ profile, wallet, bookings }) =>{
    const Booking = dynamic(() => import("@/components/accounts/booking_block"));
    const Wallet = dynamic(() => import("@/components/accounts/wallet"));
    const MyReviews = dynamic(() => import("@/components/accounts/myReviews"));        

    const [indx,setIndx] = useState(0)
    
    const bread = {
        enabled:[
            {
            'item':'Kiomoi',
            'href':'/'
            },
        ],
        disabled:{
            'item':'My Account'
        }
    }


    const login_inf = [
        {
            "key":"Mobile Number",
            "value":profile.mobile,
            "action":"update mobile number"
        },
        {
            "key":"Email ID",
            "value":profile.email,
            "action":"Update number"
        },
        {
            "key":"Password",
            "value":"********",
            "action":"Change Password"
        }
    ]

    const user_inf = [
        {
            "key":"Name",
            "value":`${profile.fname} ${profile.lname}`,
            "action":"Update name"
        },
        {
            "key":"Birthday",
            "value":profile?.dob,
        },
        {
            "key":"Gender",
            "value":profile?.gender,
            // "action":"Change Password"
        },
        {
            "key":"Marital Status",
            "value":profile?.maritalStatus,
            // "action":"Change Password"
        }

    ]
    
    
    return <>
    
    <Nav/>
    {/* <h1>User</h1> */}
    {
        Cookies.get("userid")!=undefined
        ?
        <>
        <BreadCrumbs bread={bread} />
        <div className="container">
            <div>
                <h1 className="_b_active text-xl font-semibold">My Account</h1>
                <div className="mt-4">
                    <div className="flex flex-wrap">
                        <div className={tw`w-full lg:w-1/5`}>
                            <div className="flex flex-wrap p-2 lg:p-4 bg-white rounded-lg">
                                <div className={tw`w-1/4 lg:w-full h-full_ lg:h-28`}>
                                    <div className={tw`h-full bg-slate-500 rounded-lg flex text-white`}>
                                        <span className="m-auto text-center capitalize text-3xl">{profile?.fname[0]}{profile?.lname[0]}</span>
                                    </div>
                                    
                                    {/* <img className="w-full rounded-lg" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/> */}
                                </div>
                                
                                <div className={tw`w-3/4 lg:w-full pt-0 lg:pt-4 text-left lg:text-center pl-2 lg:pl-0`}>
                                    <h2 className="text-2xl">{profile?.fname} {profile?.lname}</h2>
                                    <p className="text-sm">{profile?.email}</p>
                                    <div className="flex text-center items-center m-auto float-right lg:float-none">
                                        <div className="right-0 m-auto text-blue-600 cursor-pointer">
                                            <BiPencil className="inline"/> <div className="inline">Edit</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={tw`w-full mt-4 lg:w-4/5 lg:mt-0`}>
                            <div className={tw`p-0 lg:pl-4`}>
                                <div className="bg-white  rounded-lg shadow-md">
                                    <div className="flex overflow-hidden">  
                                        {
                                            ['Bookings','Wallet','Reviews','Profile'].map((e,index)=>{
                                                return <div className={`pl-6 pr-4 cursor-pointer font-semibold ${index==indx?'_b_active border-b-4 border-[#f06726]':'text-slate-600'} p-2`} onClick={()=>setIndx(index)} key={index}>
                                                    {e}
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                
                                
    
    
                                <div className={tw`${indx == 0?'':'hidden'}`}>
                                    <div className="flex flex-wrap justify-between mt-8">
                                        <h1 className=" text-xl font-semibold">My Bookings</h1>
                                        <div className="flex items-end">
                                            <div>Show:</div>
                                            <div className="pl-4">All</div>
                                        </div>
                                    </div>
    
                                    {
                                        bookings.map((e,index)=>{
                                        return <Booking e={e} />
                                        
                                        } 
                                    )}
                                </div>
    
    
    
                                <div className={tw`${indx == 1?'':'hidden'}`}>
                                    <Wallet data={wallet}/>
                                </div>
    
                                <div className={tw`${indx == 2?'':'hidden'}`}>
                                    <MyReviews />
                                </div>
    
                                <div className={tw`${indx == 3?'':'hidden'}`} >
                                    <div className="bg-white mt-8 rounded-lg shadow-md">
                                        <div className="p-6">
                                            <div className="flex justify-between">
                                                <h3 className="text-xl font-bold">Login Information*</h3>
                                                <div className="text-blue-600 cursor-pointer">
                                                    <BiPencil className="inline"/> <div className="inline">Edit</div>
                                                </div>                                            
                                            </div>
                                            
                                            {/* <div className="flex flex-wrap justify-between"> */}
                                            <table className="w-full mt-4">
                                                {login_inf.map((e,index)=>{
                                                    return <>
                                                        <tr className="flex flex-wrap border-b-2 border-gray-300 py-2" key={index}>
                                                            <td className="w-1/2 lg:w-1/3 text-slate-500">
                                                                {e.key}
                                                            </td>
                                                            <td className="w-1/2 lg:w-1/3 text-left font-bold">
                                                                {e.value}
                                                            </td>
                                                            <td className="hidden lg:block w-1/3 text-right text-blue-500 text-sm">
                                                                {e.action}
                                                            </td>
                                                        </tr>                                                                                                
    
                                                    </>
                                                })}
                                            {/* </div> */}
                                            </table>
                                        </div>
                                    </div>
    
                                    <div className="bg-white mt-4 rounded-lg shadow-md">
                                        <div className="p-6">
                                            <div className="flex justify-between">
                                                <h3 className="text-xl font-bold">User Information</h3>
                                                <div className="text-blue-600 cursor-pointer">
                                                    <BiPencil className="inline"/> <div className="inline">Edit</div>
                                                </div>                                            
                                            </div>                                        
                                            {/* <div className="flex flex-wrap justify-between"> */}
                                            <table className="w-full mt-4">
                                                {user_inf.map((e,index)=>{
                                                    return <>
                                                        <tr className="flex flex-wrap border-b-2 border-gray-300 py-2">
                                                            <td className="w-1/2 lg:w-1/3 text-slate-500">
                                                                {e.key}
                                                            </td>
                                                            <td className="w-1/2 lg:w-1/3 text-left font-bold">
                                                                {e.value}
                                                            </td>
                                                            <td className="hidden lg:block text-right text-blue-500 text-sm">
                                                                {e?.action}
                                                            </td>
                                                        </tr>                                                                                                
    
                                                    </>
                                                })}
                                            {/* </div> */}
                                            </table>
                                        </div>
                                    </div>
                                </div>                            
    
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        :<Login show = {true} />
    }

    </>
}

// getUserById

export async function getServerSideProps(context) {
    // const res = await client.query({
    //     query:getUserById
    // })
    try{
        const parsedCookies = cookie.parse(context.req.headers.cookie);
    

        // console.log(parsedCookies['userid'])
    let userid = parsedCookies['userid']
    const res = await client.query({
        query:getUserById,
        variables:{input:{id:userid}}
    })
    // console.log(res.data.profile)
    let payload = {
        "av": "",
        "id": 0,
        "page": 1,
        "pt": "",
        "size": 10,
        "status": "",
        "userid": userid
    }
    const w_res = await client.query({
        query: getWallet,
        variables:{input:payload}
    })
    // console.log(w_res.data.wallet.output)
    // payload['status'] = 'confirmed'
    const booking_res = await client.query({
        query:getBookingHistory,
        variables: {input: payload}
    })

    // console.log(booking_res.data.bookings.output)
    return {
        props:{
            profile:res.data.profile,
            wallet:w_res?.data?.wallet?.output,
            bookings:booking_res?.data?.bookings?.output?.bookings
        }
    }
    }
    catch{
        return {
            redirect:{
            permanent: false,
            destination: "/",
            },
            props:{}
        }
    }


}

export default User