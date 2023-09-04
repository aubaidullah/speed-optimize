import Nav from "@/components/Nav";
import BreadCrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
// import { BsPencilFill } from "react-icons/bs";
import { BiDownload, BiPencil } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoDownload } from "react-icons/io5";
import { tw } from "twind";

const User = () =>{

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
            "value":"987547896500",
            "action":"update mobile number"
        },
        {
            "key":"Email ID",
            "value":"jagbhan@gmail.com",
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
            "value":"Jagbhan Singh",
            "action":"Update name"
        },
        {
            "key":"Birthday",
            "value":"07/10/1980",
        },
        {
            "key":"Gender",
            "value":"Male",
            // "action":"Change Password"
        },
        {
            "key":"Marital Status",
            "value":"Married",
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
                        <div className="p-4 bg-white rounded-lg">
                            <div className="w-full">
                                <img className="w-full" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/>
                            </div>
                            
                            <div className="pt-4 text-center">
                                <h2 className="text-xl">Jagbhan Singh</h2>
                                <p className="text-sm">jagbhan@gmail.com</p>
                                <div className="flex text-center items-center m-auto">
                                    <div className="m-auto text-blue-600">

                                        <BiPencil className="inline"/> <div className="inline">Edit</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={tw`w-full lg:w-4/5`}>
                        <div className="pl-4">
                            <div className="bg-white  rounded-lg shadow-md">
                                <div className="flex flex-wrap">
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
                                <div className="bg-white mt-4 rounded-lg shadow-md">
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
                                <div className="flex flex-wrap justify-between">
                                    <h1 className=" text-xl font-semibold mt-2">My Bookings</h1>
                                    <div className="flex items-end">
                                        <div>Show:</div>
                                        <div className="pl-4">All</div>
                                    </div>
                                </div>
                                <div className="bg-white mt-4 rounded-lg shadow-md mb-4">
                                    <div className="p-6">
                                        <div className="flex border-b-2 justify-between border-gray-300 pb-2">
                                            <div className="text-xl font-semibold">Trip ID#12345</div>
                                            <div className="flex flex-wrap text-gray-400">
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
                                                <div className="w-1/4">
                                                    <div>
                                                        <img className="w-full rounded-lg" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/>
                                                    </div>
                                                </div>
                                                <div className="w-3/4">
                                                    <div className="pl-4">
                                                        <div>
                                                            <h2 className="text-2xl font-semibold">Package Name</h2>
                                                            <div className="flex flex-wrap mt-1">
                                                                <div>
                                                                    <div className="flex items-center">
                                                                        <ImLocation />
                                                                        <div>New Delhi</div>
                                                                    </div>
                                                                </div>
                                                                <div className="pl-8">
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

                                <div className="bg-white mt-4 rounded-lg shadow-md mb-4">
                                    <div className="p-6">
                                        <div className="flex border-b-2 justify-between border-gray-300 pb-2">
                                            <div className="text-xl font-semibold">Trip ID#12345</div>
                                            <div className="flex flex-wrap text-gray-400">
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
                                                <div className="w-1/4">
                                                    <div>
                                                        <img className="w-full rounded-lg" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/>
                                                    </div>
                                                </div>
                                                <div className="w-3/4">
                                                    <div className="pl-4">
                                                        <div>
                                                            <h2 className="text-2xl font-semibold">Package Name</h2>
                                                            <div className="flex flex-wrap mt-1">
                                                                <div>
                                                                    <div className="flex items-center">
                                                                        <ImLocation />
                                                                        <div>New Delhi</div>
                                                                    </div>
                                                                </div>
                                                                <div className="pl-8">
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


                                <div className="bg-white mt-4 rounded-lg shadow-md mb-4">
                                    <div className="p-6">
                                        <div className="flex border-b-2 justify-between border-gray-300 pb-2">
                                            <div className="text-xl font-semibold">Trip ID#12345</div>
                                            <div className="flex flex-wrap text-gray-400">
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
                                                <div className="w-1/4">
                                                    <div>
                                                        <img className="w-full rounded-lg" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/>
                                                    </div>
                                                </div>
                                                <div className="w-3/4">
                                                    <div className="pl-4">
                                                        <div>
                                                            <h2 className="text-2xl font-semibold">Package Name</h2>
                                                            <div className="flex flex-wrap mt-1">
                                                                <div>
                                                                    <div className="flex items-center">
                                                                        <ImLocation />
                                                                        <div>New Delhi</div>
                                                                    </div>
                                                                </div>
                                                                <div className="pl-8">
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



                            


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default User