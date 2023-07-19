// import Package from "../components/package"
import {AiOutlineArrowDown,AiOutlineArrowUp} from 'react-icons/ai'
import {BsFilter} from 'react-icons/bs'
// import BreadCrumbs from "./breadcrumbs"
import dynamic from 'next/dynamic';
import { useState,useEffect } from "react"
import {tw} from 'twind'
import { useSelector } from "react-redux"
// import FilterBy from "./list/filter"
import { ScrollWrapper } from 'react-bottom-scroll';
import ReactHtmlParser from "react-html-parser";
// import { Modal } from "react-bootstrap"
// import {BsXLg} from 'react-icons/bs';
// import Meta from "./meta"
import { useRouter } from 'next/router'
import { createCountryListURL, createStateListURL } from "./fun"
import State_Attraction from './trave-guide/attractions';
import TopCities from './trave-guide/top_cities';
// import { TableLoading } from './skelton';
// import RelatedTour from './detail/related_tours';
// import Content from './trave-guide/content';
// import Tabs
// import Modal from "./modal"

// const  
const TableLoading = dynamic(() => import('./skelton').then((mod)=>mod.TableLoading),{ssr:false})
const Content = dynamic(() => import('./trave-guide/content'))
const RelatedTour = dynamic(() => import('./detail/related_tours'))
const BreadCrumbs = dynamic(() => import('./breadcrumbs'))
const Meta = dynamic(() => import('./meta'))
const FilterBy = dynamic(() => import('./list/filter'))
const Modal = dynamic(() => import('./modal'))
const Package = dynamic(() => import('../components/package'),{loading:()=> <TableLoading />})

// const filtering = useSelector(state=>state.package.package)
// const FilterBy = dynamic(() => import('./list/filter'), {
//     ssr: true,
// });

// const filtr = useSelector(state=>state.filter)
// console.log(filtr)

const ListPageMobile = ({meta,page_type,data,region,places,isMobile,city=undefined,theme=undefined,related = undefined,travel=undefined}) =>{
    
    const [filter,setFilter] = useState({keyword:""})
    const [limit,setLimit] = useState(10)
    const [overviewlimit,setOverviewlimit] = useState(1000)
    const [overview,setOverview] = useState()
    const [isshow, setIsshow] = useState(false)
    const [pricefilter,setPricefilter] = useState(1)
    const [durationfilter,setDurationfilter] = useState(1)
    const [_places,set_Places] = useState([])
    const [_themes,set_Themes]  = useState([])
    
    const [_pricing,setPrice] = useState({min:0,max:1000000})

    const [_min,set_Min] = useState(1)
    const [_max,set_Max]  = useState(100)
    const router = useRouter()
    // console.log(router)
    
    



    const filtering = useSelector(state=>state.filter)
    
    const setFiltering = (keyword) =>{
        // console.log(keyword)
        setFilter({keyword:keyword})
    }

    // useEffect(()=>{
    //     setFilter({keyword:city??""})
    // },[])
    
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
        const country_st_bread = {
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
                    item:`${region?.sname}`,
                    href : createCountryListURL({cityname:region?.sname,id:region?.cid})
                    // href: `/holidays-international/${region?.sname}-tour-packages/${region?.cid}`
                    // href:`/holidays-international/nepal-tour-packages/153`
                }
            ]
        }        
        const country_bread = {
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
                // {
                //     item:`${region?.sname}`,
                //     href: `/holidays-international/${region?.sname}-tour-packages/${region?.cid}`
                //     // href:`/holidays-international/nepal-tour-packages/153`
                // }
            ]
        }    
        const city_bread = {
            disabled:{
                "item":`${router.query.city}`
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
                {
                    item:`${region?.sname}`,
                    // href:'/holidays'
                    href:createStateListURL({statename:page_type=='STATE'?"":region?.sname,id:region?.sid}),
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
    
    

    // var d = region?.desc??""
    var d = region?.longDesc?.length>20?region?.longDesc:region?.desc??""
    // console.log(d)

    useEffect(()=>{
        if (region !== null)
        {
            if(overviewlimit==1000){
                setOverview(d.substring(0, overviewlimit))
            }
            else{
                setOverview(d)
            }
                
        }
        
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
    console.log(data.length)

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

    // console.log(_places)
    // console.log(_themes)
    // console.log(_pricing)
    // console.log(page_type)
    // console.log(pricefilter)
    // console.log(data.length)
    return <>
    <Meta meta={meta} />
    
    <article>
        {/* <Meta meta={meta} /> */}

        <BreadCrumbs bread={
            // page_type=='STATE'?state_bread:region?.sname == region?.cname?country_bread:page_type=='CITY'?city_bread:all_bread


            page_type=='STATE'?state_bread:page_type=='COUNTRY'?country_bread:page_type=='CITY' && region?.sname == region?.cname?country_st_bread:page_type == 'CITY'?city_bread:all_bread
            // bread
        
        }/>
        <Modal
            show={isshow}
            animation={false}
            className="login_credential"
            backdrop="static"
            changeForm = {setIsshow}
            aria-labelledby="contained-modal-title-vcenter"
            centered        
        
        >
            <div>
                <div>
                    <FilterBy _pricing={_pricing} setPrice={setPrice} _min={_min} set_Min={set_Min} _max={_max} set_Max={set_Max} set_Places={set_Places} _places={_places} _themes={_themes} set_Themes={set_Themes} page_type={page_type} filter={filter} setKeyword={setFilter} data={places} theme={theme}/>
                </div>
            </div>
            
            
            <div className='bottom_button_filter' onClick={()=>setIsshow(false)}>
                <div className={`flex h-full`}>
                    <div className={`flex h-full w-full`}>
                        <div className={`self-center w-full text-center text-[20px]`} 
                        // style={{alignSelf:'center',width:'100%',textAlign:'center',fontSize:'20px'}}
                        >Apply</div>
                    </div>
                </div>
                
            </div>
        </Modal>



            <section className="container m-auto">
                {/* <div className="row" style={{marginBottom:'30px'}}>
                    <h2>Kiomoi packages</h2>
                </div> */}
                {/* {region?
                <div className={`p-4 bg-white mb-4 _box_shadow_`}>
                <h2 className={`text-2xl pb-2`}>{region?.name}</h2>
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
                    {region?
                        <div className={`w-full p-4 bg-white mb-4 _box_shadow_ title_listing_ rounded-md`}>
                        <h1 className={`text-2xl pb-2`}>{region?.name}</h1>
                        <div>
                            {ReactHtmlParser(overview)}
                            {overviewlimit == 250 ||
                                overviewlimit == 1000 ? (
                                <a
                                onClick={() =>
                                    setOverviewlimit(50000)
                                }
                                className="_plus_more"
                                >
                                +more
                                </a>
                            ) : (
                                <a
                                onClick={()=>setOverviewlimit(1000)}
                                className="_plus_more"
                                >
                                -less
                                </a>
                            )}

                        </div>
                        </div>
                        
                        
                        :""
                        }                    
                    {!isMobile?
                    <div className={tw`w-full lg:w-1/4 pr-5`}>
                        <FilterBy _pricing={_pricing} setPrice={setPrice} _min={_min} set_Min={set_Min} _max={_max} set_Max={set_Max} set_Places={set_Places} _places={_places} _themes={_themes} set_Themes={set_Themes} page_type={page_type} filter={filter} setKeyword={setFilter} data={places} theme={theme}/>
                    </div>:""
                    }


                    <div className={tw`w-full lg:w-3/4 `}>
                        


                        
                        
                        <div className={``}>
                            <div className={`flex items-center justify-between mb-6 pb-2 border-b`}>
                                <div>
                                    <h3 className={`text-base`}>
                                        {
                                            isMobile?"":"Showing"
                                        }
                                        <span className={`font-bold ml-2`}>
                                            {pack.length!=0?pack.length:data.length} Tour Packages 
                                        </span>
                                        <span>
                                        {page_type=='STATE' || page_type=='COUNTRY'?
                                        <span>
                                            <span> for </span>
                                            <span className={`text-[#F06726]`}>{region?.name}</span>
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
                                        <div className={`p-2 sort_w text-bold font-gray-400`}>
                                            SORT BY : 
                                        </div>
                                        <div className={`p-2 sort_w cursor-pointer`}>
                                            POPULAR
                                        </div>
                                        <div className={`${!durationfilter?'_b_active':''} p-2  sort_w cursor-pointer`} onClick={()=>setDurationfilter(!durationfilter)}>
                                            DURATION
                                            {
                                                durationfilter?<AiOutlineArrowDown className={`inline`} />:<AiOutlineArrowUp className={`inline`} />
                                            }
                                            
                                        </div>
                                        <div className={`${!pricefilter?'_b_active':''} p-2 sort_w cursor-pointer`} onClick={()=>setPricefilter(!pricefilter)}>
                                            PRICE
                                            {
                                                pricefilter?<AiOutlineArrowDown className={`inline`} />:<AiOutlineArrowUp className={`inline`} />
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
                        

                        <div>
                            <ScrollWrapper
                            wrapperStyle={{width: '100%',overflowY:'initial'}}
                            bottomCallback={()=>{setLimit(limit+10)}}
                            minScroll={20}
                            className={"row"}
                            // smoothBehavior={true}
                            >
                                <div className="row" itemScope itemType="https://schema.org/ItemList">
                                    <meta itemProp='numberOfItems' content={pack.length!=0?pack.length:data.length}/>
                                    {
                                        data.length?
                                        data.slice(0,limit).map((item,index)=>{
                                            return  item.name.length>=2 &&(item.name.toLowerCase().includes(filter.keyword) || item.cities.toLowerCase().includes(filter.keyword) || item.theme.toLowerCase().includes(filter.keyword))?
                                            <Package index={index} item={item} />:null
                                        }):
                                        <div className={`mt-16 mb-16 text-center`}>
                                            <div className={`text-2xl font-bold text-[#999]`}>
                                                <p className={`"`}>No package found</p>
                                                
                                            </div>
                                        </div>
                                    }
                                </div>
                                
                            </ScrollWrapper>
                        </div>
                            
                            
                        
                        

                    </div>
                    
                    
                    
                    
                    

                </div>

                {/* {region?
                <div className={`p-4 bg-white_ mb-4 _box_shadow_ title_listing_`}>
                <h1 className={`text-2xl pb-2`}>{region?.name}</h1>
                <div>
                    {ReactHtmlParser(overview)}
                    {overviewlimit == 150 ||
                        overviewlimit == 200 ? (
                        <a
                        onClick={() =>
                            setOverviewlimit(50000)
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


            </section>
            {
                        page_type=='CITY'?
                            <div className={tw`mt-5 w-full`}>
                                <RelatedTour data={related}/>
                            </div>
                            
                        
                        :""
            }

            {
                travel?
                <>
                <div className='container mt-4'>
                    <h1 className={tw`mt-8 ${isMobile?"text-xl":'text-3xl'} mb-4 text-center font-semibold`}>Read more About {region?.name}</h1>
                    <Content data={travel} collapse={true}/>
                    {/* {data.tg.howToReachwHeading?<Tabs title={data.tg.howToReachwHeading} desc={data.tg.howToReachDesc} />:""}
                    {data.tg.eventsHeading?<Tabs title={data.tg.eventsHeading} desc={data.tg.eventsDesc} />:""}
                    {data.tg.factsHeading?<Tabs title={data.tg.factsHeading} desc={data.tg.factsDesc} />:""}
                    {data.tg.foodHeading?<Tabs title={data.tg.foodHeading} desc={data.tg.foodDesc} />:""}
                    {data.tg.marketHeading?<Tabs title={data.tg.marketHeading} desc={data.tg.marketDesc} />:""} */}
                    {/* {<Tabs} */}
                    {/* <Tabs title={data.tg.factsHeading} desc={data.tg.factsDesc} /> */}
                    {/* <Tabs title={data.tg.foodHeading} desc={data.tg.foodDesc} /> */}
                    {/* <Tabs title={data.tg.marketHeading} desc={data.tg.marketDesc} /> */}
                </div>
                {
                page_type == 'STATE'?
                <div className='container mt-16  '>
                    <div className='box_design_common title_kiomoi'>
                        <h4>Top cities to visit in {region.name}</h4>
                        <div className={`flex flex-wrap mt-4`}>
                            {/* <h2>Top Cities</h2> */}
                            <TopCities data={travel} attlimit={8} _package={true}/>
                        </div>
                    </div>
                </div>:""
                }

                {
                    page_type == 'CITY'?
                        <div className='container_ mt-4'>
                        <State_Attraction data={travel.attn}/>
                    </div>:""
                }


                </>
                :""
            }
        </article>    
    </>
    
    

}
export default ListPageMobile