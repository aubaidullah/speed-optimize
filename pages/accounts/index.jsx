import client from "@/components/Graphql/service";
import Nav from "@/components/Nav";
import BreadCrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
// import { BsPencilFill } from "react-icons/bs";
import { BiDotsVertical, BiDotsVerticalRounded, BiDownload, BiPencil } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoDownload } from "react-icons/io5";
import { tw } from "twind";
import * as cookie from 'cookie'
import Link from "next/link";
import { getUserById, getWallet } from "@/components/Graphql/Queries";
import Wallet from "@/components/accounts/wallet";
import MyReviews from "@/components/accounts/myReviews";
import { BsThreeDotsVertical } from "react-icons/bs";

const User = ({ profile, wallet }) =>{

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
    <BreadCrumbs bread={bread} />
    <div className="container">
        <div>
            <h1 className="_b_active text-xl font-semibold">My Account</h1>
            <div className="mt-4">
                <div className="flex flex-wrap">
                    <div className={tw`w-full lg:w-1/5`}>
                        <div className="flex flex-wrap items-center p-2 lg:p-4 bg-white rounded-lg">
                            <div className={tw`w-1/4 lg:w-full`}>
                                <img className="w-full rounded-lg" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/>
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
                                        ['My Profile','Booking History','My Wallet','My Reviews'].map((e,index)=>{
                                            return <div className={`pl-6 pr-4 cursor-pointer font-semibold ${index==indx?'_b_active border-b-4 border-[#f06726]':'text-slate-600'} p-2`} onClick={()=>setIndx(index)}>
                                                {e}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            
                            
                            <div className={tw`${indx == 0?'':'hidden'}`} >
                                <div className="bg-white mt-8 rounded-lg shadow-md">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">Login Information*</h3>
                                        {/* <div className="flex flex-wrap justify-between"> */}
                                        <table className="w-full mt-4">
                                            {login_inf.map((e,index)=>{
                                                return <>
                                                    <tr className="flex flex-wrap border-b-2 border-gray-300 py-2">
                                                        <td className="w-1/3 text-slate-500">
                                                            {e.key}
                                                        </td>
                                                        <td className="w-1/3 text-left font-bold">
                                                            {e.value}
                                                        </td>
                                                        <td className="w-1/3 text-right text-blue-500 text-sm">
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
                                        <h3 className="text-xl font-bold">User Information</h3>
                                        {/* <div className="flex flex-wrap justify-between"> */}
                                        <table className="w-full mt-4">
                                            {user_inf.map((e,index)=>{
                                                return <>
                                                    <tr className="flex flex-wrap border-b-2 border-gray-300 py-2">
                                                        <td className="w-1/3 text-slate-500">
                                                            {e.key}
                                                        </td>
                                                        <td className="w-1/3 text-left font-bold">
                                                            {e.value}
                                                        </td>
                                                        <td className="w-1/3 text-right text-blue-500 text-sm">
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

                            <div className={tw`${indx == 1?'':'hidden'}`}>
                                <div className="flex flex-wrap justify-between mt-8">
                                    <h1 className=" text-xl font-semibold">My Bookings</h1>
                                    <div className="flex items-end">
                                        <div>Show:</div>
                                        <div className="pl-4">All</div>
                                    </div>
                                </div>
                                <div className="bg-white mt-4 rounded-lg shadow-md mb-4">
                                    <div className="p-2 lg:p-6">
                                        <div className="flex border-b-2 justify-between border-gray-300 pb-2 items-center">
                                            <div className="text-xl font-semibold">Trip ID#12345</div>
                                            <BsThreeDotsVertical className="text-xl text-gray-500" />
                                            <div className={tw`lg:flex flex-wrap text-gray-400 hidden`}>
                                                <div className="flex items-center pl-5 cursor-pointer">
                                                    <div>
                                                        <BiDownload />
                                                    </div>
                                                    <div className="pl-2">
                                                        Download Invoice    
                                                    </div>                                                    
                                                </div>

                                                <div className="flex items-center pl-5 cursor-pointer">
                                                    <div>
                                                        <BiDownload />
                                                    </div>
                                                    <div className="pl-2">
                                                        Download Itenary 
                                                    </div>                                                    
                                                </div>

                                                <div className="flex items-center pl-5 cursor-pointer">
                                                    <div>
                                                        <AiOutlineEye />
                                                    </div>
                                                    <div className="pl-2">
                                                        View Details    
                                                    </div>                                                    
                                                </div>                                                                                                
                                            </div>
                                        </div>

                                        <div>
                                            <div>Status: <span className="text-green-500">Closed</span></div>
                                            <div className="flex flex-wrap mt-2">
                                                <div className={tw`w-1/3 lg:w-1/4`}>
                                                    <div>
                                                        <img className="w-full rounded-lg" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/>
                                                    </div>
                                                </div>
                                                <div className={tw`w-2/3 lg:w-3/4`}>
                                                    <div className={tw`pl-2 lg:pl-4`}>
                                                        <div>
                                                            <h2 className="text-xl font-semibold">Package Name</h2>
                                                            <div className={tw`flex flex-wrap mt-1_ flex-col lg:flex-row`}>
                                                                <div>
                                                                    <div className="flex items-center text-gray-500">
                                                                        <ImLocation />
                                                                        <div>New Delhi</div>
                                                                    </div>
                                                                </div>
                                                                <div className={tw`pl-0 lg:pl-8 text-sm`}>
                                                                    <div>City 1(1N) → City 2(2N) → City 3(3N) → City 4(4N) → City 5(5N)</div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>


                                    </div>
                                </div>

                            </div>



                            <div className={tw`${indx == 2?'':'hidden'}`}>
                                <Wallet data={wallet}/>
                            </div>

                            <div className={tw`${indx == 3?'':'hidden'}`}>
                                <MyReviews />
                            </div>

                            


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

// getUserById

export async function getServerSideProps(context) {
    // const res = await client.query({
    //     query:getUserById
    // })
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
    console.log(w_res.data.wallet.output)
    return {
        props:{
            profile:res.data.profile,
            wallet:w_res?.data?.wallet?.output
        }
    }
}

export default User