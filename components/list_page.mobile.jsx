import Package from "../components/package"
import Link from 'next/link'
// import {TiChevronRight} from 'react-icons/ti'
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
import {BsXLg} from 'react-icons/bs'

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
    const[isshow, setIsshow] = useState(false)

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
    
    data.map((
        item=>   
            item.pcities.split(",").map((e)=>{
            
            if(filtering.places.includes(e)){
                pack.push(item)
            }
        })
    
    )
    
    )

    data.map((item=> item.theme.split("#").map((e)=>{
        
        if(filtering.themes.includes(e)){
            pack.push(item)
        }
    })
    ))
    
    data.map((item=> {
        
        if (item.finalprice >=filtering.min && item.finalprice <= filtering.max){
            pack.push(item)
        }


        if(item.nights>=filtering.minduration && item.nights<=filtering.maxduration)
            {
            pack.push(item)
        }
    }
    ))    

    // if(item.nights>=filtering.minduration && item.nights<=filtering.maxduration){

    

    // console.log(pack)
    
    // data = data.filter(arr=>
    //     arr.pcities.split(",").filter((ar=>filtering.places.includes(ar)))
    //     )


    console.log(filtering)
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
                    <FilterBy page_type={page_type} filter={filter} setKeyword={setFilter} data={places} theme={theme}/>
                </div>
            </Modal.Body>

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
                        <FilterBy page_type={page_type} filter={filter} setKeyword={setFilter} data={places} theme={theme}/>
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
                                        <div className={tw`p-2  sort_w cursor-pointer`}>
                                            DURATION
                                        </div>
                                        <div className={tw`p-2 sort_w cursor-pointer`}>
                                            PRICE
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
                                        pack.length?
                                        pack.slice(0,limit).map((item,index)=>{
                                            return  item.name.length>=2 &&(item.name.toLowerCase().includes(filter.keyword) || item.cities.toLowerCase().includes(filter.keyword) || item.theme.toLowerCase().includes(filter.keyword))?
                                            <Package key={index} item={item} />:null
                                        }):
                                        data.slice(0,limit).map((item,index)=>{
                                            return  item.name.length>=2 &&(item.name.toLowerCase().includes(filter.keyword) || item.cities.toLowerCase().includes(filter.keyword) || item.theme.toLowerCase().includes(filter.keyword))?
                                            <Package key={index} item={item} />:null
                                        })                                        
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