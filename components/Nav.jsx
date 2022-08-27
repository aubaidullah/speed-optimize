
import { useEffect, useState } from "react"
import {HiOutlineSearch} from 'react-icons/hi'
import { AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser, FaSearch } from 'react-icons/fa';
import {BsXLg,BsDot} from 'react-icons/bs'
import {Spinner} from 'react-bootstrap'
import * as Constants from './Constants'
import axios from 'axios'
import {FaRupeeSign} from 'react-icons/fa'
import Link from 'next/link'
import {tw} from 'twind'

const Nav = () =>{
const [tripover, setTripover] = useState(false);
const [exploreover, setExploreover] = useState(false);
const [stayover, setStayover] = useState(false);
const [showSearch,SetshowSearch] = useState(false)
const [loading,setLoading] = useState(false)
const [result,setResult] = useState({})
const [searchkey,setSearchkey] = useState({})


const Search = async ()=>{
    setLoading(true)
    const result = await axios.post(Constants.api+'/api/v1/home/search/',{av:'',id:'',pt:'',text:searchkey})
    setResult(result?.data?.output)
    console.log(result?.data?.output)
    setLoading(false)
    // Constants.api
}

useEffect(()=>{
    setResult({})
},[])

const HandleSearch=(s_key)=>{
    // Search()
    if (s_key.length>=3){
        // console.log(s_key)
        setSearchkey(s_key)
        Search()
    }
    else{
        setResult({})
    }
    
}

return <>
        <nav className={tw`shadow-sm_`} style={{overflow:'auto',zIndex:1}}>
            
            {!showSearch?
                
                <div>
                    <div className="item_group flt_left">
                        <div className="logo_item flt_left">
                            <img src="/icons/kiomoi.png" style={{width:'30px'}} />
                        </div>
                        <div className="item_group flt_right">
                            <div className="item flt_left">
                                <Link href={"/holidays/"}>
                                    <div className = "c_it" 
                                        onMouseOver={() => setTripover(true)}
                                        onMouseOut={() => setTripover(false)}
                                    >
                                        <img src={tripover?"/icons/icons/ICO-TRIPS-orange.png":"/icons/icons/ICO TRIPS.png"} />
                                        <span className="nav-text">Trips</span>
                                    </div>
                                </Link>
                                
                            </div>
                            <div className="item flt_left">
                                <Link href={"/travel-guide/"}>
                                    <div className = "c_it"
                                        onMouseOver={() => setExploreover(true)}
                                        onMouseOut={() => setExploreover(false)}                
                                    >
                                        <img src={exploreover?"/icons/icons/ICO-EXPLORE-orange.png":"/icons/icons/ICO EXPLORE.png"} />
                                        <span className="nav-text">Explore</span>
                                    </div>
                                </Link>

                            </div>
                            <div className="item flt_left">
                                <div className = "c_it"
                                    onMouseOver={() => setStayover(true)}
                                    onMouseOut={() => setStayover(false)}                
                                >
                                    <img src={stayover?"/icons/icons/ICO-STAYS-orange.png":"/icons/icons/ICO STAYS.png"} />
                                    <span className="nav-text">Stays</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="item_group flt_right right_icons">
                        <div className="item flt_left" onClick={() =>SetshowSearch(true)}>
                            <HiOutlineSearch 
                            size={"20px"}
                            />
                        </div>
                        <div className="item flt_left"> 
                            <FaRegUser
                            size={"20px"}
                            />
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div>
                        {!loading?
                        <HiOutlineSearch 
                            className="s_icon"
                            // style={{position:'absolute',top:'10px',color:'grey'}}
                            size={"20px"}
                        />
                        
                        :<Spinner className="s_icon" animation="border" style={{color:"#f06726",width: "20px", height: "20px"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        }
                        
                        
                        <BsXLg
                        onClick={() =>SetshowSearch(false)}
                        className="cr_icon"
                        />
                        <input type="text" className="form-control s_form" onChange={()=>HandleSearch(event.target.value)} placeholder="Search anything..." />
                    </div> 
                    <section className="drop_down" style={{boxShadow:'inset 0 -1px 0 0 rgba(0,0,0,.1)'}}>
                        <div>
                            {
                                result.st?
                                result.st.map((e)=>{
                                    return <div className="drop_item" key={e.id}>
                                        <div className="s_name d_content">Tours in {e.name}</div>
                                    </div>
                                }):""
                            }
                            {
                                result.packages?
                                result.packages.map((e)=>{
                                    let aurl =
                                    "/holidays/" +
                                    e.name.trim().replace(/\s+/g,' ').replace(/\s+/g, "-").toLowerCase() + 
                                    "-tour-package-" +
                                    e.id + "/";

                                    return <Link onClick={()=>setSearchkey("")} href={aurl}>
                                        <a onClick={()=>setSearchkey("")} href={aurl}>
                                            <div className={tw`hover:bg-[#fde2df] drop_item`} key={e.id}>
                                                <div className="d_content">
                                                    <div className="flt_left">
                                                        <span className="s_name">{e.name}</span>
                                                    </div>
                                                    <div className="flt_right">
                                                        <FaRupeeSign className={tw`d_price inline`}/>
                                                        <span className="d_price">{e.price/100}</span><BsDot className={`inline d_price`} /><span className="n_d">{e.nights}N & {e.nights+1}D</span>                                        
                                                    </div>
                                                </div>
                                            </div>  
                                        </a>  
                                    </Link>
                                    
                                    
                                }):""
                            }                            
                        </div>
                    </section>
                </div>   
            
            }
            

        </nav>
    </>
}

export default Nav
