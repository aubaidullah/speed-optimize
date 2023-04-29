import BreadCrumbs from "../../components/breadcrumbs"
import Nav from "../../components/Nav"
import {tw} from 'twind'
import client from "../../components/Graphql/service"
import {getTravelGuideHome,getMetaQuery} from '../../components/Graphql/Queries'
import Image from "next/image"
import ReactHtmlParser from "react-html-parser";
import Link from 'next/link'
import Meta from "../../components/meta"
import { createTGCityURL, createTGCountryURL, createTGStateURL } from "../../components/fun"
import { country } from "../../components/Constants"

const TravelGuide = ({data,meta}) =>{

    const bread = {
        disabled:{
            item: `Travel Guide`
        },
        enabled :[
            {
                item:"Kiomoi",
                href:"/"
            }
        ]
    }


    return <>
            <Meta meta={meta} />
            <Nav />
            <BreadCrumbs bread={bread}/>
            <section className='container'>
                <h1 className={tw`text-2xl font-bold`}>Top Travel Guides</h1>


                <section className={tw`mt-10`}>
                    <div className={tw`flex flex-wrap`}>
                        {data.map((e,index)=>{
                            
                            if(e.geoType=='CITY'){
                                var url = createTGCityURL({city:e.cityName,id:e.id})
                                // var url = `/travel-guide/india/city-${e.cityName.replace(/\s+/g, "-").toLowerCase()}/${e.id}`
                            
                            }else if(e.geoType == 'STATE'){
                                var url = createTGStateURL({city:e.cityName,id:e.id})
                                // var url = `/travel-guide/india/state-${e.cityName.replace(/\s+/g, "-").toLowerCase()}/${e.id}`
                            }else{
                                var url = createTGCountryURL({country:e.cityName,id:e.id})
                                // var url = `/${e.cityName.replace(/\s+/g, "-").toLowerCase()}/${e.id}`
                            }


                            
                            
                            
                            return <div className={tw`w-full lg:w-1/3 md:w-1/2 px-2 mb-5`} key={index}>
                                    
                                    <h2 className={tw`text-xl mb-2 font-bold`}>{e.cityName}</h2>
                                    <Link href={url}>
                                        <a href={url}>
                                            <div className={tw`bg-white rounded-2xl _box_shadow`}>
                                                <div className={tw`h-56`}>
                                                    <img className={tw`rounded-t-2xl h-full w-full`}
                                                        src={e.images}
                                                        alt={`${e.cityName} travel guide`}
                                                    />
                                                </div>
                                                <div className={tw`p-4 trvl_box`}>
                                                    <div className={tw`pt-4 text-sm text-gray-600`}>
                                                        {ReactHtmlParser(e.overviewDesc.substring(0, 150))}
                                                    </div>
                                                    <div className={tw`mt-2`}>
                                                        <div className="_btn_clr w-full text-center text-[12px] pt-[8px] pb-[8px] pl-[15px] pr-[15px] btn_listing">KNOW MORE & GET CUSTOMIZE</div>
                                                    </div>
                                                </div>

                                                
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                        })}

                    </div>
                </section>
            </section>
        </>
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', 's-maxage=10'); 

    const res_travel = await client.query({query:getTravelGuideHome,variables:{input:{'av':'1.3','pt':'WEBSITE','geoid':0,'id':'0','pagenum':0,'pid':0,'type':0}}})
    let data = res_travel.data.travelguide.output


    const meta = await client.query({query:getMetaQuery,variables:{input:{av:"",id:0,key:'TRAVELGUIDES',name:"",pt:'WEBSITE',type:""}}})
    // let {finalprice,images} = meta.data.meta.output.package
    // finalprice = `₹${finalprice} `
    // const metas ={
    //     title:meta.data.meta.output.tags.title.replace(/<CITY>/g,context.query.city).replace(/<PRICE>/g,finalprice),
    //     longDesc:meta.data.meta.output.tags.longDesc.replace(/<CITY>/g,context.query.city),
    //     keywords:meta.data.meta.output.tags.longDesc.replace(/<CITY>/g,context.query.city),
    //     image:images
    // }


    // console.log(data)
    return {props:{data,meta:meta.data.meta.output.tags}}
  }


export default TravelGuide