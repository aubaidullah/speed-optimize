import { BsThreeDotsVertical } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { BiDownload, BiRupee } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { tw } from "twind";
const Booking = ({e}) =>{
    return <>
    
    <div className="bg-white mt-4 rounded-lg shadow-md mb-4" key={e.id}>
        <div className="p-2 lg:p-6">
            <div className="flex border-b-2 justify-between border-gray-300 pb-2 items-center">
                <div className="text-xl font-bold">Trip ID#{e.id}</div>
                <BsThreeDotsVertical className={tw`lg:hidden text-xl text-gray-500`} />
                <div className={tw`lg:flex flex-wrap text-gray-400 hidden`}>
                    <div className={tw`flex items-center pl-5 cursor-pointer ${e.invoiceurl?"":"hidden"}`}>
                        <div>
                            <BiDownload />
                        </div>
                        <div className="pl-2">
                            <a href={e.invoiceurl} target="_blank">
                                Download Invoice    
                            </a>
                        </div>                                                    
                    </div>

                    <div className={tw`flex items-center pl-5 cursor-pointer ${e.voucherurl?"":"hidden"}`}>
                        <div>
                            <BiDownload />
                        </div>                        
                        <div className="pl-2">
                            <a href={e.voucherurl} target="_blank">
                                Download Itenary
                            </a>                             
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
                <div>Status: <span className={tw`${e?.status=='CANCELLED'?'text-red-500':e?.status=='CONVERTED'?'_b_active':"text-green-500"} font-semibold`}>{e?.status}</span></div>
                <div className="flex flex-wrap mt-2 justify-center">
                    {/* <div className={tw`w-1/3 lg:w-1/4`}>
                        <div>
                            <img className="w-full rounded-lg" src='https://www.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fw_400%2Cc_scale%2Cf_auto%2Fv1556099276%2Fkiomoi%2Frajasthan%2FRajasthan.jpg&w=1920&q=75'/>
                        </div>
                    </div> */}
                    <div className={tw`w-full lg:w-2/3`}>
                        <div className={tw``}>
                            <div>
                                <h2 className="text-xl font-bold">{e?.pname}</h2>
                                <div className={tw`flex flex-wrap mt-1_ flex-col lg:flex-row`}>
                                    <div>
                                        <div className="flex items-center text-slate-700">
                                            <ImLocation />
                                            <div>{e.source}</div>
                                        </div>
                                    </div>
                                    <div className={tw`pl-0 lg:pl-8 text-sm text-slate-700`}>
                                        <div> {e.destination.replace(/,/g,'→')}</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={tw`w-full lg:w-1/3 text-right`}>
                        <div className={tw`_b_active text-3xl font-bold`}>
                            <div className={tw`flex items-end text-right float-right overflow-auto`}>
                                <BiRupee className={tw`text-3xl`} />
                                {e.price}/-
                            </div>

                        </div>
                    </div>
                </div>

                <div className={tw`mt-4`}>
                    <div className={tw`flex bg-slate-100 px-4 py-2 rounded-xl border-2 border-gray-400 text-[13px] lg:text-sm`}>
                        <div className={tw`w-1/3`}>
                            <div>
                                <div className={tw`text-slate-500 text-sm`}>From</div>
                                <div className={tw`font-bold text-slate-700`}>{e.checkin}</div>
                            </div>
                        </div>
                        <div className={tw`w-1/3`}>
                            <div>
                                <div className={tw`text-slate-500 text-sm`}>To</div>
                                <div className={tw`font-bold text-slate-700`}>{e.checkout}</div>
                            </div>                                                                                                                
                        </div>
                        <div className={tw`w-1/3`}>
                            <div>
                                <div className={tw`text-slate-500 text-sm`}>Guest</div>
                                <div className={tw`font-bold text-slate-700`}>{e.adults} Adults, {e.kids} Kids</div>
                            </div>                                                                                                                
                        </div>                                                                                                        
                    </div>
                    <div className="mt-2">
                        <div className={tw`text-[14px] text-slate-500`}>
                            Included: Transfer, Stay, Meals, Sightseeing, Flights
                        </div>
                    </div>
                </div>
            
            </div>    
                
        </div>
    </div>         
    
    </>
}

export default Booking