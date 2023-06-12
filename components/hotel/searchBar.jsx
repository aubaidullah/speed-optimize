import { tw } from "twind"
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {FaRegUser} from 'react-icons/fa'
import axios from "axios";
import * as Constants from '../../components/Constants'
import { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Image from "next/image";




const _SearchBar = ({img}) =>{
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
      tomorrow.setDate(today.getDate()+1);
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
        tomorrow.setDate(today.getDate()+1);
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
                <h2 className={tw`_titles_ text-white`}>Search Home Stay For Your Date</h2>
                <div className={tw`flex flex-wrap bg-slate-100/40 Shape_42 border-0`}
                // style={{
                // // background:'rgba(251, 250, 250, .3)',
                // border:'none'}}
                >
                    <div className={tw`w-full lg:w-1/4 lg:px-2 mb-2`}>
                    <div>
                        <input 
                        type={"text"}
                        value={searchkey}
                        // value={searchkey}
                        className={tw`form-control h50 text-capitalize relative`}
                        placeholder="Search for a destination" 
                        onChange={event => HandleSearch(event.target.value)}

                        />
                    <section className={tw`drop_down container d_htl`}>
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
                            <div className={tw`relative z-[2]`}>
                                <img src={`${Constants.assets_api}/public/icons/calender_multi_clr.png`} alt="calendar" className={tw`inline ht_cal_icon`} />
                                <div className="ht_label">
                                    Check-in
                                </div>
                                <DatePicker
                                    inputPlaceholder="Check-in"
                                    inputClassName="form-control-hotel rd_left"
                                    value = {checkindate}
                                    minimumDate={minDate}
                                    onChange={(date)=>setCheckIn(date)}

                                    required
                                    />
                            </div>
                            <div className={tw`relative z-[2]`}>
                            <img src={`${Constants.assets_api}/public/icons/calender_multi_clr.png`} alt="calendar" className={tw`inline ht_cal_icon`} />
                                <div className="ht_label">
                                    Check-out
                                </div>
                                <DatePicker
                                    inputPlaceholder="Check-out"
                                    inputClassName="form-control-hotel rd_right"
                                    value = {checkoutdate}
                                    minimumDate={mincheckoutdate}
                                    onChange={(date) => setCheckoutdate(date)}
                                    required
                                    />                                            
                            </div>                                      
                        </div>
                    </div>
                    <div className={tw`w-full lg:w-1/3 px-0 lg:px-2 mb-2`}>

                        <div className={tw``}>
                        <div className={tw`relative`}>
                        <FaRegUser
                            className="ht_cal_icon"
                            size={"20px"}
                        />
                        <select className="form-control h50 ht_select" >
                            <option value="">2 Travellers, 1 Room</option>
                            <option value="">3 Travellers, 1 Room</option>
                            <option value="">4 Travellers, 2 Rooms</option>
                            <option value="">5 Travellers, 2 Rooms</option>
                            <option value="">6 Travellers, 3 Rooms</option>
                            <option value="">7 Travellers, 3 Rooms</option>
                            <option value="">8 Travellers, 4 Rooms</option>
                            <option value="">9 Travellers, 4 Rooms</option>
                            <option value="">10 Travellers, 5 Rooms</option>                                                                                        

                        </select>
                        </div>
                    </div>




                    </div>
                    <div className={tw`w-full lg:w-1/3 lg:px-2 mb-2`}>
                        <Link href={`/hotels/hotel-in-${searchkey?.toLowerCase()}-${id}/`}>
                            <button className={tw`btn_listing _btn_clr h50 w-full`}> 
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



const SearchBar = ({img}) =>{
    return <div className={tw`relative`}>
        {/* <img className={tw`w-full object-cover h-[400px] brightness-[75%]`} alt="banner" src={img}/> */}
        <div className={tw`w-full object-cover h-[400px] brightness-[75%]`}>
            <Image src={img} layout="fill" loading="lazy" alt={img} />
        </div>
        <div className="_container">
            <div className={tw`mt-4 bt-0 lg:bottom-20 absolute left-0 right-0`}>
                <div className="container">
                    <_SearchBar img={img}/>
                </div>
                

            </div>
        </div>
    </div>        
}


export default SearchBar