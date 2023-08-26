import Nav from "@/components/Nav";
import BreadCrumbs from "@/components/breadcrumbs";
// import { BsPencilFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { tw } from "twind";

const User = () =>{
    
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
                            <div className="bg-white p-2 rounded-lg shadow-md">
                                <div className="flex flex-wrap">
                                    {
                                        ['My Profile','Booking History','My Wallet','My Reviews'].map((e,index)=>{
                                            return <div className="pl-6 pr-4 text-slate-600 cursor-pointer font-semibold">
                                                {e}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default User