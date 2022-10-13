import { useRouter } from "next/router"
import { getallpackages,getThemeQuery } from "../../../components/Graphql/Queries"
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






const StatePackages = ({data,headers,region,places,theme}) =>{
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
        return <><Nav/> <MobileList page_type={'STATE'} data={data??[]} region = {region} places={places} isMobile={isMobile} theme={theme}  /></>
    }
    else{
        return <><Nav/><DeskList page_type={'STATE'} data = {data??[]} region = {region} places={places} isMobile={isMobile} theme={theme}/></>
    }    




    // const router = useRouter()

    // console.log(router)

    // return <Nav />
}



export async function getServerSideProps(context) {

    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    // console.log(context.query)
    const headers = context.req.headers

    let payload = {
        av:'1.3',
        id:context.query.id,
        name:context.query.package.replace(/-/g,' '),
        // name:'west bengal',
        pt:'WEBSITE',
        type:'State'
    }
    console.log(payload)
    const res = await client.query({query:getallpackages,variables:{input:payload}})
    console.log(res.data)

    const data = res.data.allpackage.output.packages

    const region = res.data.allpackage.output.region??null
    const places = res.data.allpackage.output.fcities

    headers['user-agent'] = headers['user-agent'].toLocaleLowerCase()


    const res_theme = await client.query({query:getThemeQuery,variables:{input:{'av':'','id':'','pt':''}}})


    return { props: { data,headers,region,places,theme:res_theme.data.alltheme.output}}

}




export default StatePackages


