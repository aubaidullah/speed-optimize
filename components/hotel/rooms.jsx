import Image from "next/image"
import { tw } from "twind"
import {BsCheckCircle} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import {MdCheckCircle} from 'react-icons/md'
import { useState } from "react"
import LeadForm from "../leadform"
import {IoMdArrowDropright,IoMdArrowDropdown} from 'react-icons/io'
import { Collapse,Accordion } from 'react-bootstrap';
import { useEffect } from "react"

const Rooms1 = ({rooms,selectedRoom,selectRoom}) =>{

    const [sendquery,setSendquery] = useState(false)
    // const [modalcity,setModalcity] = useState()
    const [modalinfo,setModalinfo] = useState({})
    
    const updateChangeForm=(val)=>{
        setSendquery(val)
      }

      const _sendquery = (price, id, name, city) => {
        setModalinfo({
            id,name,city,price
        })
        setSendquery(true)
      };      

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
                        <div className={tw`flex flex-wrap items-center pt-2`}>
                            <div className={tw`font-bold f12`} >Meal : </div>
                            <div className={tw`f12 pl-1`}>
                                {e.meals == 'CP'?'CP - Room with Breakfast'
                                :e.meals == 'MAP'?'MAP - Room with Breakfast, Dinner'
                                :e.meals == 'AP'?'AP - Room with Breakfast, Lunch and Dinner':''
                                }
                                
                                </div>
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
                                <button className={tw`btn_listing ${selectedRoom.id == e.id && selectedRoom.meals == e.meals ?'_selected':''}`} 
                                onClick={()=>selectRoom(e)}
                                // onClick={()=>_sendquery(e.price,e.id,e.name,e.hid)}
                                >
                                {selectedRoom.id == e.id && selectedRoom.meals == e.meals?'Selected':'Select and Book'}
                                    
                                </button>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    })}

    <LeadForm key={1}
        isshow = {sendquery}
        packageid={modalinfo.id}
        packageName={modalinfo.name}
        changeForm = {updateChangeForm}
        />    
    </div>
}

const Rooms = ({rooms,selectedRoom,selectRoom}) =>{
    const [sendquery,setSendquery] = useState(false)
    // const [modalcity,setModalcity] = useState()
    const [modalinfo,setModalinfo] = useState({})
    const [collapse, setCollapse] = useState(null);
    // const [first,setFirst] = useState(true)
    
    const updateChangeForm=(val)=>{
        setSendquery(val)
      }

      useEffect(()=>{
        setCollapse(0)
      },[])


      return <div>

      {rooms.map((e,index)=>{
          return <div className={tw`mt-2`}>
              <div className={tw`flex flex-wrap bwhite mb-4`} style={{borderRadius:'8px',border:'1px solid rgba(0,0,0,0.1)'}}>
                <div className={tw`p-2 bg-gray-300 w-full`} style={{background:'#F8F8F8',borderRadius:'8px 8px 0 0',border:'1px solid rgba(0,0,0,0.1)'}}>
                    <div className={tw`flex justify-between cursor-pointer`} style={{color:'rgb(67, 147, 249)'}} onClick={() => collapse === index ? setCollapse(null) : setCollapse(index)}>
                        <div className={tw`flex items-center`} >
                            {collapse===index?
                                <IoMdArrowDropdown className={tw`font-bold text-xl`}/>
                                :<IoMdArrowDropright className={tw`font-bold text-xl`}/>
                            }
                            
                            <h2 className={tw`font-bold`}>{e.name}</h2>
                        </div>
                        {collapse != index?
                        <div>
                            <div className="price_inr">
                                <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                {e.price==0
                                ?<span>Price On Request</span>
                                :<span>{e.price}/-</span>
                                }
                                
                            </div>  
                        </div>:""                        
                        }
                    </div>
                </div>
                {collapse != index?    
                    <div className={tw`w-full p-2 px-4`}>
                        <div className={tw`flex justify-between`}>
                            <div className={tw`flex flex-wrap`}>
                                <span className="frieds">                                                                            
                                    <img src={"/icons/friends_.svg"} alt="" />
                                </span>
                                <span className='_2_two'>
                                    2
                                </span>
                            </div>
                            <div>
                                <span className={tw`font-bold text-gray-500`}>Bedroom:</span>
                            </div>
                            <div>
                                <span className={tw`font-bold text-gray-500`}>Living Room:</span>
                            </div>                            
                            <div>
                                <span className={tw`cursor-pointer`} style={{color:'rgb(67, 147, 249)'}} onClick={() => collapse === index ? setCollapse(index) : setCollapse(index)}>Full Details</span>
                            </div>

                        </div>
                    
                    </div>
                        
                        :""
                    }                

                <Collapse in={collapse === index ? true : false}>
                    <div className={tw`w-full p-4`}>
                        <div className={tw`flex flex-wrap`}>
                            <div className={tw`w-full lg:w-1/4`}>
                                <img className="hotel_img" src={e.images}/>
                            </div>
                            <div className={tw`w-full lg:w-3/4`}>
                            <div className={tw`flex justify-between pl-4`}>
                                <div>
                                    <div className={tw`flex flex-wrap`}>

                                        <span className="frieds">                                                                            
                                            <img src={"/icons/friends_.svg"} alt="" />
                                        </span>
                                        <span className='_2_two'>
                                            2
                                        </span>
                                    </div>
                                    <div className={tw`w-full pt-2`}>
                                        <div className={tw`font-bold text-gray-500`}>BedRoom : </div>
                                        <div className={tw`font-bold text-gray-500`}>Room Size : </div>
                                        <div className={tw`font-bold text-gray-500`}>Living Room : </div>
                                    </div>
                                </div>

                                <div>
                                    <div className={tw`text-gray-500`}>1 Room Per Night</div>
                                    <div className="price_inr">
                                        <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                        {e.price==0
                                        ?<span>Price On Request</span>
                                        :<span>{e.price}/-</span>
                                        }
                                        
                                    </div>                                
                                </div>

                            </div>
                            </div>


                        </div>

                        <div className={tw`flex justify-between`}>
                            <div className={tw`pt-3`}>
                                {e.amenities.split(',').map((am,index)=>{
                                    return <li className={tw`inline`}>
                                            
                                            <div className={tw``}>
                                                <BsCheckCircle color="#44c554" className={tw`inline`}/>
                                                <div className={tw`pl-1 f12 inline text-gray-500`}>
                                                    {am}
                                                </div>
                                                

                                            </div>
                                        </li>
                                })}                            
                            </div>
                            <div className={tw``}>
                                <button className={tw`btn_listing ${selectedRoom.id == e.id && selectedRoom.meals == e.meals ?'selected':''}`} 
                                onClick={()=>selectRoom(e)}
                                // onClick={()=>_sendquery(e.price,e.id,e.name,e.hid)}
                                >
                                {selectedRoom.id == e.id && selectedRoom.meals == e.meals?'Selected':'Select and Book'}
                                    
                                </button>                            
                            </div>

                        </div>
                    </div>
                </Collapse>
              
              

              
              </div>
          </div>
      })}
  
      <LeadForm key={1}
          isshow = {sendquery}
          packageid={modalinfo.id}
          packageName={modalinfo.name}
          changeForm = {updateChangeForm}
          />    
      </div>

}

export default Rooms