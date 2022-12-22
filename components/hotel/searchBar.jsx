import { tw } from "twind"
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {FaRegUser} from 'react-icons/fa'
import axios from "axios";
import * as Constants from '../../components/Constants'
import { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'




const SearchBar = () =>{
    const router = useRouter()
    const [result, setResult] = useState({})
    const [id,setId] = useState({})
    const [checkindate,setCheckindate] = useState("")
    const [checkoutdate,setCheckoutdate] = useState("")
    const [mincheckoutdate,setminCheckoutdate] = useState("")
    const [searchkey,setSearchkey] = useState("")
    const [loading, setLoading] = useState(false)


    var dt = new Date()
    const x = dt.toJSON().split("T")[0].split("-")

    const minDate = {
        "year":x[0],
        "month":x[1],
        "day":x[2]
      }
    
    useEffect(()=>{
      let today = new Date(`${minDate['year']}-${minDate['month']}-${minDate['day']}`)
      setCheckindate({"day":parseInt(minDate['day']),"month":parseInt(minDate['month']),"year":parseInt(minDate['year'])})

      let tomorrow = new Date(`${minDate['year']}-${minDate['month']}-${minDate['day']}`);
      tomorrow.setDate(today.getDate()+2);
      let c = tomorrow.toLocaleDateString().split("/")

      setminCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
      setCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
    },[])

      const Search = async () => {
        setLoading(true)
        const result = await axios.post(Constants.api + '/api/v1/geo/cities/', { av: '', id: '', pt: '', text: searchkey })
        setResult(result?.data?.output)
        setLoading(false)
    }
    const setCheckIn = (date) =>{
        let today = new Date(`${date['year']}-${date['month']}-${date['day']}`)
        let tomorrow = new Date(`${date['year']}-${date['month']}-${date['day']}`);
        tomorrow.setDate(today.getDate()+2);
        let c = tomorrow.toLocaleDateString().split("/")  
        setCheckindate(date)
        setminCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})      
        setCheckoutdate({"day":parseInt(c[0]),"month":parseInt(c[1]),"year":parseInt(c[2])})
        // setCheckoutdate(date)
      }
      const HandleSearch = (s_key) =>{
        if (s_key.length >= 3) {
          setSearchkey(s_key)
          Search()
        }
        else {
            setSearchkey(s_key)
            setResult({})
      }          
      }
      useEffect(()=>{
        setSearchkey(router.query.city)
        setId(router.query.id)
      },[])
      console.log(router)
    return <>
        <div className={tw`mt-4`}>
            <div>
                <div className={tw`flex_`}>
                <h2 className={tw`_titles_`}>Search Home Stay For Your Date</h2>
                <div className={tw`flex Shape_42 flex-wrap`}>
                    <div className={tw`w-full lg:w-1/4 lg:px-2 mb-2`}>
                    <div style={{position:'relative'}}>
                        <input 
                        type={"text"}
                        value={searchkey}
                        // value={searchkey}
                        className={tw`form-control h50 text-capitalize`}
                        placeholder="Search for a destination" 
                        onChange={event => HandleSearch(event.target.value)}

                        />
                    <section className={tw`drop_down container`} style={{ boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,.1)',left:'0',right:'0',borderColor:'transparent',position:'absolute',zIndex:1,border:'1px solid rgba(0,0,0,0.1)',zIndex:3}}>
                        <div>
                        {result?.cities?.map((e, index) => (
                            
                            index<10?
                            <div key={index}>
                            <div href="#" onClick={()=>{setSearchkey(e.name),setResult({}),setId(e.id)}}>
                                <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                    <div className="d_content">
                                        <div className="flt_left">
                                            <span className="s_name">{e?.name}</span>
                                        </div>
                                        {/* <div className="flt_right">
                                            <FaRupeeSign className={tw`d_price inline`} />
                                            <span className="d_price">{e?.price / 100}</span><BsDot className={`inline d_price`} /><span className="n_d">{e?.nights}N & {e?.nights + 1}D</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>:""
                            

                                ))}                      
                        </div>
                    </section>
                    </div>

                    </div>

                    <div className={tw`w-full lg:w-3/4`}>

                    <div className={tw`flex flex-wrap items-center`}>
                    <div className={tw`w-full lg:w-1/3 lg:px-2 mb-2`}>
                        <div className={tw`flex`}>
                            <div style={{position:'relative',zIndex:2}}>
                            {/* calender_multi_clr */}
                                <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} />
                                <div className="ht_label">
                                    Check-in
                                </div>
                                <DatePicker
                                    inputPlaceholder="Check-in"
                                    inputClassName="form-control-hotel rd_left"
                                    // format="dd-MM-y"
                                    value = {checkindate}
                                    minimumDate={minDate}
                                    // onChange={(date) => setCheckindate(date)}
                                    onChange={(date)=>setCheckIn(date)}

                                    required
                                    />
                            </div>
                            <div style={{position:'relative',zIndex:2}}>
                            <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} />
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
                                    // onChange={(date)=>setCheckout(date)}
                                    required
                                    />                                            
                            </div>                                      
                        </div>
                    </div>
                    <div className={tw`w-full lg:w-1/3 px-0 lg:px-2 mb-2`}>

                        <div className={tw``}>
                        <div style={{position:'relative'}}>
                        <FaRegUser
                            className="ht_cal_icon"
                            // onClick={() => setShowLogin(!showLogin)}
                            size={"20px"}
                        />
                        {/* <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} /> */}
                            {/* <div className="ht_label">
                                Guest
                            </div>                                         */}
                        {/* <input type={'text'} className="form-control-hotel" /> */}
                        <select className="form-control h50 ht_select" >
                            <option value="">2 Travellers, 1 Room</option>
                            <option value="">3 Travellers, 1 Room</option>
                            <option value="">4 Travellers, 2 Rooms</option>
                            <option value="">5 Travellers, 2 Rooms</option>
                            <option value="">6 Travellers, 3 Rooms</option>
                            <option value="">7 Travellers, 3 Rooms</option>
                            {/* <option value="">7 Travellers, 4 Rooms</option> */}
                            <option value="">8 Travellers, 4 Rooms</option>
                            <option value="">9 Travellers, 4 Rooms</option>
                            {/* <option value="">9 Travellers, 5 Rooms</option> */}
                            <option value="">10 Travellers, 5 Rooms</option>                                                                                        

                        </select>
                        </div>
                    </div>




                    </div>
                    <div className={tw`w-full lg:w-1/3 lg:px-2 mb-2`}>
                        <Link href={`/hotels/${searchkey?.toLowerCase()}-${id}`}>
                            <button className="btn_listing _btn_clr h50" style={{width:'100%'}}> 
                                Search
                            </button>
                        </Link>

                    </div>                  

                    </div>



                    </div>
                </div>
                </div>
            </div>

            </div>    
    
    </>
}


export default SearchBar