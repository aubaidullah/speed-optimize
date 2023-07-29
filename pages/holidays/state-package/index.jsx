import { useRouter } from "next/router"
import { getallpackages,getThemeQuery,getMetaQuery, getTravelGuideQuery, getreviewsQuery } from "../../../components/Graphql/Queries"
import client from "../../../components/Graphql/service"
// import Nav from "../../../components/Nav"
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic';


const Nav = dynamic(() => import('../../../components/Nav'))


const MobileList = dynamic(() => import('../../../components/list_page.mobile'), {
    ssr: true,
});

const DeskList = dynamic(() => import('../../../components/list_page.mobile'), {
    ssr: true,
});






const StatePackages = ({data,headers,region,places,theme,meta,travel, reviews,faqs}) =>{
    const [isMobile,setIsMobile]  = useState(headers['user-agent'].includes('android') || headers['user-agent'].includes('iphone'))



    // useEffect(()=>{


    // let {finalprice,images} = meta.package
    // finalprice = `₹${finalprice}`

    // var metas = {}
    // metas = meta

    // let metas ={
    //  title:meta.tags.title.replace(/<STATE>/g,'Met').replace(/<PRICE>/g,finalprice).replace(/\[State\ Name\]/g,'Met'),
    //  longDesc:meta.tags.longDesc.replace(/<STATE>/g,name)
    // }

    // })




    useEffect(()=>{
        if (headers['user-agent'].includes('android')==true || headers['user-agent'].includes('iphone')==true){
            setIsMobile(true)
        }
        else{
            setIsMobile(false)
            // return <ListPage data = {data}/>
        }    
    },[isMobile])

    if (isMobile==true){
        // return <ListPageMobile data = {data}/>
        return <><Nav/> <MobileList meta={meta} page_type={'STATE'} data={data??[]} region = {region} places={places} isMobile={isMobile} theme={theme} travel={travel} reviews={reviews} faqs={faqs} /></>
    }
    else{
        return <><Nav/><DeskList meta={meta} page_type={'STATE'} data = {data??[]} region = {region} places={places} isMobile={isMobile} theme={theme} travel={travel} reviews={reviews} faqs={faqs}/></>
    }    




    // const router = useRouter()

    // console.log(router)

    // return <Nav />
}



export async function getServerSideProps(context) {

    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    // console.log(context.query)
    const headers = context.req.headers
    console.log(context.query)
    let payload = {
        av:'1.3',
        id:context.query.id,
        name:context.query.package.replace(/-/g,' '),
        // name:'west bengal',
        pt:'WEBSITE',
        type:'State'
    }
    // console.log(payload)
    const res = await client.query({query:getallpackages,variables:{input:payload}})
    // console.log(res.data)

    const data = res.data.allpackage.output.packages

    const region = res.data.allpackage.output.region??null
    const places = res.data.allpackage.output.fcities

    headers['user-agent'] = headers['user-agent'].toLocaleLowerCase()


    const res_theme = await client.query({query:getThemeQuery,variables:{input:{'av':'','id':'','pt':''}}})
    
    const meta = await client.query({query:getMetaQuery,variables:{input:{av:"",id:0,key:'STATE_HOLIDAYS',name:"",pt:'WEBSITE',type:"STATE"}}})
    let {finalprice,images} = meta.data.meta.output.package
    finalprice = `₹${finalprice} `
    const metas ={
        title:region.metaTitle??meta.data.meta.output.tags.title.replace(/<STATE>/g,context.query.package.replace(/-/g,' ')).replace(/<PRICE>/g,finalprice).replace(/\[State\ Name\]/g,context.query.package.replace(/-/g,' ')),
        longDesc:region.metaDesc??meta.data.meta.output.tags.longDesc.replace(/<STATE>/g,context.query.package.replace(/-/g,' ')),
        keywords:region.metaKeywords??meta.data.meta.output.tags.longDesc.replace(/<STATE>/g,context.query.package.replace(/-/g,' ')),
        image:images
    }


    payload = {
        "av": "",
        "geoid": context.query.id,
        "home": "",
        "id": "",
        "pagenum": 0,
        "pid": 0,
        "pt": "",
        "size": 0,
        "type": "State"
      }
      const res_travel = await client.query({query:getTravelGuideQuery,variables:{input:payload}})



    //   const reviews = await client.query({
    //     query: getreviewsQuery,
    //     variables: {
    //         input: {
    //             av: '1.3',
    //             id: '0',
    //             pt: 'WEBSITE',
    //             geoid: context.query.id,
    //             pagenum: 1,
    //             pid: 0,
    //             size: 10,
    //             'type': 'PACKAGE'
    //         }
    //     }
    // })


    // console.log(reviews.data?.reviews.output)
    
    // finalprice = `₹${finalprice}`

    // meta.data.meta.output.tags.title = meta.data.meta.output.tags.title.replace(/<STATE>/g,context.query.package.replace(/-/g,' ')).replace(/<PRICE>/g,finalprice).replace(/\[State\ Name\]/g,context.query.package.replace(/-/g,' '))


    // meta.data.meta.output.tags.title = meta.data.meta.output.package 

    return { props: { data,headers,region,places,theme:res_theme.data.alltheme.output,meta:metas,travel:res_travel.data.travel.output,reviews: res.data.allpackage.output.reviews??[],faqs:res.data.allpackage.output.faqs??[]}}

}




export default StatePackages


