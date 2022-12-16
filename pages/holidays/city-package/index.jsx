import { useRouter } from "next/router"
import { getallpackages, getStateByCityQuery,getMetaQuery } from "../../../components/Graphql/Queries"
import client from "../../../components/Graphql/service"
// import Nav from "../../../components/Nav"
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic';
import axios from "axios";


const Nav = dynamic(() => import('../../../components/Nav'))


const MobileList = dynamic(() => import('../../../components/list_page.mobile'), {
    ssr: true,
});

const DeskList = dynamic(() => import('../../../components/list_page.mobile'), {
    ssr: true,
});






const CityPackages = ({data,headers,region,places,city,meta}) =>{
    console.log(city)
    const [isMobile,setIsMobile]  = useState(headers['user-agent'].includes('android') || headers['user-agent'].includes('iphone'))

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
        return <><Nav/> <MobileList meta={meta} page_type={'CITY'} data={data??[]} region = {region} places={places} isMobile={isMobile} city={city} /></>
    }
    else{
        return <><Nav/><DeskList meta={meta} page_type={'CITY'} data = {data??[]} region = {region} places={places} isMobile={isMobile} city={city}/></>
    }    




    // const router = useRouter()

    // console.log(router)

    // return <Nav />
}



export async function getServerSideProps(context) {

    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    // console.log(context.query)
    const headers = context.req.headers
    // getStateByCityQuery
    // const rs = await client.query({query:getStateByCityQuery,variables:{input:{av:'1.3',id:'',pt:'WEBSITE',text:context.query.city}}})

    // console.log(rs.data.state.output)
    // const r = await axios.post("",)








    // let payload = {
    //     av:'1.3',
    //     id:`${rs.data.state.output.id}`,
    //     name:rs.data.state.output.name,
    //     pt:'WEBSITE',
    //     type:'State'
    // }
    let payload = {
        av:'1.3',
        id:``,
        name:context.query.city,
        pt:'WEBSITE',
        type:'CITY'
    }
    console.log(payload)
    const res = await client.query({query:getallpackages,variables:{input:payload}})
    console.log(res.data)
    const data = res.data.allpackage.output?.packages??[]
    const region = res.data.allpackage.output?.region??[]
    const places = res.data.allpackage.output?.fcities??[]


    const meta = await client.query({query:getMetaQuery,variables:{input:{av:"",id:0,key:'CITY_HOLIDAYS',name:"",pt:'WEBSITE',type:"CITY"}}})
    let {finalprice,images} = meta.data.meta.output.package
    finalprice = `₹${finalprice} `
    const metas ={
        title:meta.data.meta.output.tags.title.replace(/<CITY>/g,context.query.city).replace(/<PRICE>/g,finalprice),
        longDesc:meta.data.meta.output.tags.longDesc.replace(/<CITY>/g,context.query.city),
        keywords:meta.data.meta.output.tags.longDesc.replace(/<CITY>/g,context.query.city),
        image:images
    }


    // data = []
    // // headers = []
    // region = []
    // places = []
    headers['user-agent'] = headers['user-agent'].toLocaleLowerCase()
    return { props: { data,headers,region,places,city:context.query.city,meta:metas}}

}




export default CityPackages


