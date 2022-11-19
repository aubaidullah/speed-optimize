import Image from "next/image"
import { tw } from "twind"
import {BsCheckCircle} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import {MdCheckCircle} from 'react-icons/md'
const Rooms = ({rooms}) =>{
    return <div>
    {rooms.map((e,index)=>{
        return <div className={tw`mt-2`}>
            <div className={tw`flex flex-wrap p-3 bwhite mb-4`} style={{borderRadius:'8px'}}>
                <div className={tw`w-full lg:w-1/4`}>
                    {/* {e.name} */}
                    <img className="hotel_img" src={e.images}/>
                </div>
                <div className={tw`w-full lg:w-3/4`}>
                    <div className={tw`pl-0 lg:pl-4`}>
                        <div className={tw`flex justify-between`}>
                            <div className={tw``}>
                                <h2 className={tw`font-bold text-base`}>{e.name}</h2>
                                <div className={tw`mt-2`}>
                                    <div className={tw`flex flex-wrap`}>
                                        <span className="frieds">                                                                            
                                            <img src={"/icons/friends_.svg"} alt="" />
                                        </span>
                                        <span className='_2_two'>
                                            2
                                        </span>
                                        
                                    </div>
                                </div>                                
                            </div>
                            <div>
                                <div className="price_inr text-right">
                                    <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                    {e.price==0
                                    ?<span>Price On Request</span>
                                    :<span>{e.price}/-</span>
                                    }
                                    
                                </div>
                                <div className="text-right">
                                    <p style={{fontSize:'8.8px',color:'#999'}}>Per person on twin sharing</p>
                                </div>
                            </div>
                                                        
                        </div>
                        
                        


                        <div>
                            {e.amenities.split(',').map((am,index)=>{
                                return <li className={tw`inline pr-2`}>
                                        
                                        <div className={tw`inline`}>
                                            <BsCheckCircle color="#44c554" className={tw`inline`}/>
                                            <div className={tw`pl-1 f12 inline`}>
                                                {am}
                                            </div>
                                            

                                        </div>
                                    </li>
                            })}
                        </div>
                        <div>
                            <div className={tw`flex justify-between`}>
                                <div className={tw`flex checks mt-4`}>
                                    <p>
                                        <MdCheckCircle className='inline' style={{color:'#15be03'}} /> Free Cancellation
                                        {/* <br/><MdCheckCircle className='inline' style={{color:'#15be03'}} /> Part Payment */}
                                    </p>
                                    <p className={tw`pl-2`}>
                                        <MdCheckCircle className='inline' style={{color:'#15be03'}} /> Part Payment
                                    </p>

                                </div>
                                <button className="btn_listing">SEND QUERY</button>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    })}
    </div>
}

export default Rooms