import {FaRegUser} from 'react-icons/fa'
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {FaRupeeSign} from 'react-icons/fa'
import * as Constants from '@/components/Constants'

const RightContent = ({hotel,selectedHotel,checkindate,setCheckindate,checkoutdate,setCheckoutdate,updateHotel}) =>{
    // console.log(hotel)
    var yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    let x = yourDate.toISOString().split('T')[0].split("-")

    const minDate = {
        "year":parseInt(x[0]),
        "month":parseInt(x[1]),
        "day":parseInt(x[2])
      }

    const [mincheckoutdate,setminCheckoutdate] = useState("") 

    useEffect(()=>{
        let today = new Date(`${minDate['year']}-${minDate['month']}-${minDate['day']}`)
        setCheckindate({"day":parseInt(minDate['day']),"month":parseInt(minDate['month']),"year":parseInt(minDate['year'])})
  
        let tomorrow = new Date(`${minDate['year']}-${minDate['month']}-${minDate['day']}`);
        tomorrow.setDate(today.getDate()+1);
        let c = tomorrow.toLocaleDateString().split("/")
  
        setminCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
        setCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
      },[])


    const setCheckIn = (date) =>{
        let today = new Date(`${date['year']}-${date['month']}-${date['day']}`)
        let tomorrow = new Date(`${date['year']}-${date['month']}-${date['day']}`);
        tomorrow.setDate(today.getDate()+1);
        let c = tomorrow.toLocaleDateString().split("/")  
        setCheckindate(date)
        setminCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})      
        setCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
        // setCheckoutdate(date)
    }       

    // useEffect(()=>{
    //     setCheckoutdate(checkindate)
    // },[checkindate])
    
    
    return  <>
    <div className={tw`ml-5`}>
        <div className="Shape_42">

            <div className={tw``}>
                <div className="relative">
                <FaRegUser
                    className="ht_cal_icon"
                    // onClick={() => setShowLogin(!showLogin)}
                    size={"20px"}
                />
                {/* <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} /> */}
                    <div className="ht_label">
                        Guest
                    </div>                                        
                {/* <input type={'text'} className="form-control-hotel" /> */}
                <select className="form-control-hotel">
                    <option value="" onClick={()=>updateHotel({travellers:2,room:1})}>2 Travellers, 1 Room</option>
                    <option value="" onClick={()=>updateHotel({travellers:3,room:1})}>3 Travellers, 1 Room</option>
                    <option value="" onClick={()=>updateHotel({travellers:4,room:2})}>4 Travellers, 2 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:5,room:2})}>5 Travellers, 2 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:6,room:3})}>6 Travellers, 3 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:7,room:3})}>7 Travellers, 3 Rooms</option>
                    {/* <option value="" onClick={()=>updateHotel({travellers:7,room:4})}>7 Travellers, 4 Rooms</option> */}
                    <option value="" onClick={()=>updateHotel({travellers:8,room:4})}>8 Travellers, 4 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:9,room:4})}>9 Travellers, 4 Rooms</option>
                    {/* <option value="" onClick={()=>updateHotel({travellers:9,room:5})}>9 Travellers, 5 Rooms</option> */}
                    <option value="" onClick={()=>updateHotel({travellers:10,room:5})}>10 Travellers, 5 Rooms</option>                                                                                        

                </select>
                </div>
            </div>

            <div className={tw`flex mt-3`}>
                <div className="relative z-999">
                {/* calender_multi_clr */}
                    <img src={`${Constants}/public/icons/calender_multi_clr.png`} alt="calendar icon" className={tw`inline ht_cal_icon`} />
                    <div className="ht_label">
                        Check-in
                    </div>
                    <DatePicker
                        inputPlaceholder="Check-in"
                        inputClassName="form-control-hotel rd_left"
                        // format="dd-MM-y"
                        value = {checkindate}
                        minimumDate={minDate}
                        onChange={(date)=>setCheckIn(date)}
                        required
                        />
                </div>
                <div className="relative z-999">
                <img src={`${Constants.assets_api}/public/icons/calender_multi_clr.png`} alt="calendar icon" className={tw`inline ht_cal_icon`} />
                    <div className="ht_label">
                        Check-out
                    </div>
                    <DatePicker
                        inputPlaceholder="Check-out"
                        inputClassName="form-control-hotel rd_right"
                        // format="dd-MM-y"
                        value = {checkoutdate}
                        minimumDate={mincheckoutdate}
                        onChange={(date) => setCheckoutdate(date)}
                        required
                        />                                            
                </div>                                      
            </div>

            <div className={tw`flex items-center mt-3`}>
                {hotel.hotel.price
                ?<>
                    <div className="price_inr">
                    <FaRupeeSign className='inline text-[#f79421] text-[15px] mb-[4px]'/>
                        <span>{selectedHotel?.price}/-</span>
                    </div>
                    {/* <div className={tw`ml-3 f_12 c_gray`}>
                        per night
                    </div> */}
                </>:<div className="price_inr">Price on Request</div>}
            </div>

            <div className={tw`mt-3`}>
                <button className="w-full btn_listing _btn_clr">
                    Book
                </button>
            </div>


            
        </div>
    </div>
</>
}


export default RightContent
