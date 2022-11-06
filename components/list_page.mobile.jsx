import Package from "../components/package"
import Link from 'next/link'
import {AiOutlineArrowDown,AiOutlineArrowUp} from 'react-icons/ai'
import {BsFilter} from 'react-icons/bs'
import BreadCrumbs from "./breadcrumbs"
import {tw} from 'twind'
import dynamic from 'next/dynamic';
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import FilterBy from "./list/filter"
import { ScrollWrapper } from 'react-bottom-scroll';
import ReactHtmlParser from "react-html-parser";
import { Modal } from "react-bootstrap"
import {BsXLg} from 'react-icons/bs';


// const filtering = useSelector(state=>state.package.package)
// const FilterBy = dynamic(() => import('./list/filter'), {
//     ssr: true,
// });

// const filtr = useSelector(state=>state.filter)
// console.log(filtr)

const ListPageMobile = ({page_type,data,region,places,isMobile,city=undefined,theme=undefined}) =>{
    
    const [filter,setFilter] = useState({keyword:""})
    const [limit,setLimit] = useState(10)
    const [overviewlimit,setOverviewlimit] = useState(200)
    const [overview,setOverview] = useState()
    const [isshow, setIsshow] = useState(false)
    const [pricefilter,setPricefilter] = useState(1)
    const [durationfilter,setDurationfilter] = useState(1)
    const [_places,set_Places] = useState([])
    const [_themes,set_Themes]  = useState([])
    
    const [_pricing,setPrice] = useState({min:0,max:50000})

    const [_min,set_Min] = useState(1)
    const [_max,set_Max]  = useState(100)
    
    



    const filtering = useSelector(state=>state.filter)
    
    const setFiltering = (keyword) =>{
        // console.log(keyword)
        setFilter({keyword:keyword})
    }

    // useEffect(()=>{
    //     setFilter({keyword:city??""})
    // },[])
    console.log(filtering)
    
    // console.log(filter)
    
        const state_bread = {
            disabled:{
                "item":`${region?.name}`
            },
            enabled :[
                {
                    item:"Kiomoi",
                    href:"/"
                },
                {
                    item:"Holidays Bookings",
                    href:"/holidays"
                },
                {
                    item:"India",
                    href:"/holidays"
                },                
            ]
        }    

        const all_bread = {
            disabled:{
                "item":"Holidays Bookings"
            },
            enabled :[
                {
                    item:"Kiomoi",
                    href:"/"
                },                    
            ]
        }
    
    

    var d = region?.desc??""
    // console.log(d)

    useEffect(()=>{
        if (region !== null)
        setOverview(d.substring(0, overviewlimit))
    },[overviewlimit])
    // pcities.some((item) => array.includes(item))
    
    var pack = []
    
    // data.map((
    //     item=>   
    //         item.pcities.split(",").map((e)=>{
            
    //         if(filtering.places.includes(e)){
    //             pack.push(item)
    //         }
    //     })
    
    // )
    
    // )
    
    if(_places.length){
        data = data.filter(e=>e.pcities.split(',').some(x=>_places.includes(x)))
    }

    if(_themes.length){
        data = data.filter(e=>e.theme.split("#").some(x=>_themes.includes(x.trim())))
    }

    // const durationCustom=(duration)=>{

    // }

    data = data.filter(e=>e.nights>=_min && e.nights<=_max && e.finalprice>=_pricing.min && e.finalprice<=_pricing.max)
    

    if(pricefilter){
        data = data.sort((a,b)=>a.finalprice - b.finalprice) 
    }
    else{
        data = data.sort((a,b)=> b.finalprice - a.finalprice)
        // data = data.sort((a,b)=>a.finalprice < b.finalprice) 
        
    }
    

    
    if(durationfilter){
        if (pricefilter)
            data = data.sort((a,b)=>a.nights - b.nights) 
        // else{
        //     data = data.sort((a,b)=>a.nights < b.nights) 
        // }
    }
    else{
        // setPricefilter(0)
        if (!pricefilter){
            data = data.sort((a,b)=>a.nights - b.nights)     
        }
        else{
            data = data.sort((a,b)=>b.nights - a.nights) 
        }
        
    }    
        
            
    // },[pricefilter])

    // data = data.sort((a,b)=>a.finalprice > b.finalprice)
    

    // data.map((item=> item.theme.split("#").map((e)=>{
        
    //     if(filtering.themes.includes(e)){
    //         pack.push(item)
    //     }
    // })
    // ))
    
    // data.map((item=> {
    //     if(item.nights>=filtering.minduration && item.nights<=filtering.maxduration)
    //         {
    //         pack.push(item)
    //     }
    // }
    // ))




    // if(item.nights>=filtering.minduration && item.nights<=filtering.maxduration){

    

    // console.log(pack)
    
    // data = data.filter(arr=>
    //     arr.pcities.split(",").filter((ar=>filtering.places.includes(ar)))
    //     )

    console.log(_places)
    console.log(_themes)
    // console.log(_pricing)
    // console.log(filtering)
    // console.log(pricefilter)
    // console.log(data)
    return <article>

        <BreadCrumbs bread={
            page_type=='STATE'?state_bread:all_bread
            // bread
        
        }/>
        <Modal
            show={isshow}
            animation={false}
            className="login_credential"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered        
        
        >
            <Modal.Body>
                <div style={{overflow:'auto'}}>
                    <span style={{ float: "right", }} aria-hidden="true">
                        <BsXLg 
                        style={{cursor: "pointer" }}
                        onClick={()=>setIsshow(false)}
                        />
                    </span>
                </div>
                <div>
                    <FilterBy _pricing={_pricing} setPrice={setPrice} _min={_min} set_Min={set_Min} _max={_max} set_Max={set_Max} set_Places={set_Places} _places={_places} _themes={_themes} set_Themes={set_Themes} page_type={page_type} filter={filter} setKeyword={setFilter} data={places} theme={theme}/>
                </div>
            </Modal.Body>
            
            
            <div className='bottom_button_filter' onClick={()=>setIsshow(false)}>
                <div className={tw`flex`} style={{height:'100%'}}>
                    <div style={{width:'100%',height:'100%'}} className={tw`flex`}>
                        <div style={{alignSelf:'center',width:'100%',textAlign:'center',fontSize:'20px'}}>Apply</div>
                    </div>
                </div>
                
            </div>
        </Modal>



            <section className="container">
                {/* <div className="row" style={{marginBottom:'30px'}}>
                    <h2>Kiomoi packages</h2>
                </div> */}
                {/* {region?
                <div className={tw`p-4 bg-white mb-4 _box_shadow_`}>
                <h2 className={tw`text-2xl pb-2`}>{region?.name}</h2>
                <div>
                    {ReactHtmlParser(overview)}
                    {overviewlimit == 150 ||
                        overviewlimit == 200 ? (
                        <a
                        onClick={() =>
                            setOverviewlimit(10000)
                        }
                        className="_plus_more"
                        >
                        +more
                        </a>
                    ) : (
                        <a
                        onClick={()=>setOverviewlimit(200)}
                        className="_plus_more"
                        >
                        -less
                        </a>
                    )}

                </div>
                </div>
                
                
                :""
                } */}

                <div className={tw`flex flex-wrap`}>
                    {!isMobile?
                    <div className={tw`w-full lg:w-1/4 pr-5`}>
                        <FilterBy _pricing={_pricing} setPrice={setPrice} _min={_min} set_Min={set_Min} _max={_max} set_Max={set_Max} set_Places={set_Places} _places={_places} _themes={_themes} set_Themes={set_Themes} page_type={page_type} filter={filter} setKeyword={setFilter} data={places} theme={theme}/>
                    </div>:""
                    }


                    <div className={tw`w-full lg:w-3/4 `}>
                        <div className={tw``}>
                            <div className={tw`flex items-center justify-between mb-6 pb-2 border-b`}>
                                <div>
                                    <h3 className={tw`text-base`}>
                                        {
                                            isMobile?"":"Showing"
                                        }
                                        <span className={tw`font-bold ml-2`}>
                                            {pack.length!=0?pack.length:data.length} Packages 
                                        </span>
                                        <span>
                                        {page_type=='STATE'?
                                        <span>
                                            <span> for </span>
                                            <span style={{color:'rgb(240, 103, 38)'}}>{region?.name}</span>
                                        </span>
                                        
                                        :""
                                            // ` for ${region?.name}`:""
                                        }
                                        </span>
                                        
                                    </h3>
                                    
                                </div>
                                {
                                    isMobile==false?<div>
                                    <div className="flex flex-wrap">
                                        <div className={tw`p-2 sort_w text-bold font-gray-400`}>
                                            SORT BY : 
                                        </div>
                                        <div className={tw`p-2 sort_w cursor-pointer`}>
                                            POPULAR
                                        </div>
                                        <div className={tw`${!durationfilter?'_b_active':''} p-2  sort_w cursor-pointer`} onClick={()=>setDurationfilter(!durationfilter)}>
                                            DURATION
                                            {
                                                durationfilter?<AiOutlineArrowDown className={tw`inline`} />:<AiOutlineArrowUp className={tw`inline`} />
                                            }
                                            
                                        </div>
                                        <div className={tw`${!pricefilter?'_b_active':''} p-2 sort_w cursor-pointer`} onClick={()=>setPricefilter(!pricefilter)}>
                                            PRICE
                                            {
                                                pricefilter?<AiOutlineArrowDown className={tw`inline`} />:<AiOutlineArrowUp className={tw`inline`} />
                                            }                                            
                                        </div>                                                                                
                                    </div>
                                </div>
                                :
                                <div>
                                    <BsFilter size={'20px'}
                                    onClick={()=>setIsshow(true)}
                                    />
                                    
                                    </div>
                                }
                                
                            </div>
                        </div>
                        

                        
                            <ScrollWrapper
                            wrapperStyle={{width: '100%',overflowY:'initial'}}
                            bottomCallback={()=>{setLimit(limit+10)}}
                            minScroll={20}
                            className={"row"}
                            // smoothBehavior={true}
                            >
                                <div className="row">
                                    {
                                        data.length?
                                        data.slice(0,limit).map((item,index)=>{
                                            return  item.name.length>=2 &&(item.name.toLowerCase().includes(filter.keyword) || item.cities.toLowerCase().includes(filter.keyword) || item.theme.toLowerCase().includes(filter.keyword))?
                                            <Package key={index} item={item} />:null
                                        }):
                                        <div className={tw`mt-16 mb-16 text-center`}>
                                            <div className={tw`text-2xl font-bold`} style={{color:'#999'}}>
                                                <p className={tw`"`}>No package found</p>
                                                
                                            </div>
                                        </div>
                                    }
                                </div>
                                
                            </ScrollWrapper>
                        
                        

                    </div>
                    
                    
                    
                    

                </div>

                {region?
                <div className={tw`p-4 bg-white_ mb-4 _box_shadow_ title_listing_`}>
                <h1 className={tw`text-2xl pb-2`}>{region?.name}</h1>
                <div>
                    {ReactHtmlParser(overview)}
                    {overviewlimit == 150 ||
                        overviewlimit == 200 ? (
                        <a
                        onClick={() =>
                            setOverviewlimit(10000)
                        }
                        className="_plus_more"
                        >
                        +more
                        </a>
                    ) : (
                        <a
                        onClick={()=>setOverviewlimit(200)}
                        className="_plus_more"
                        >
                        -less
                        </a>
                    )}

                </div>
                </div>
                
                
                :""
                }


            </section>
        </article>
}
export default ListPageMobile