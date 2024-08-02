import moment from "moment/moment";
import Link from "next/link"
import { BiRupee } from "react-icons/bi";
const Wallet = ({data}) =>{
    // return <h1>Wallet</h1>
    return <>
        <div className="flex flex-wrap justify-between mt-8">
            <h2 className=" text-xl font-semibold mt-2_">My Wallet</h2>
            <div className="flex items-center">
                <Link href="#">
                    <div className="rounded-full bg-[#f06726] px-4 py-1 text-white text-sm">
                        <div>
                            Add Money
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div className=" bg-[#223087] p-6 rounded-xl mt-4">
            <div className="flex flex-wrap items-center justify-between text-white">
                <div>
                    <div className=" text-2xl font-light">Total Balance</div>
                    <div>Transfer Now</div>
                </div>
                <div className="flex items-end">
                    {/* <FaRupeeSign className="text-3xl" /> */}
                    <BiRupee className="text-4xl"/>
                    <div className="text-5xl font-bold pl-2">{data.bal}</div>
                </div>
            </div>  
        </div>
        <div className="mt-8">
            <h2 className="text-xl font-semibold">Recent</h2>
            <div className="mt-4">

                <table className="w-full mt-4">
                    <tr className="flex flex-wrap border-b-2 border-gray-300 py-2 px-2 text-sm lg:text-lg bg-gray-300">
                        <td className="w-1/3">Transection ID</td>
                        <td className="w-1/3 text-center">Date and Time</td>
                        <td className="w-1/3 text-right">Amount</td>
                    </tr>
                    {data.txns.map((e,index)=>{
                        return <>
                            <tr key={index} className="flex flex-wrap border-b-2 border-gray-300 py-2 px-2 text-sm lg:text-lg bg-white">
                                <td className="w-1/3 text-slate-600 text-ellipsis overflow-hidden">
                                    {e.payref}
                                </td>
                                <td className="w-1/3 text-center text-slate-600">
                                    {moment(e.txnTime).format('DD/MM/YYYY, h:mm:ss')}
                                </td>
                                <td className="w-1/3 text-right">
                                    <div className={`font-bold`}>
                                        {e.type== 'CREDIT'?
                                        <div className="text-green-500">
                                            + {e.amount}
                                        </div>
                                        :<div className="text-red-500">
                                            - {e.amount}
                                        </div>
                                        }
                                        
                                    </div>
                                                                    
                                </td>
                            </tr>                                                                                                

                        </>
                    })}
                {/* </div> */}
                </table>



            </div>
        </div>
    </>
}
export default Wallet