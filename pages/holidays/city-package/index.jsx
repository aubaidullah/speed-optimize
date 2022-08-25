import { useRouter } from "next/router"
import { getallpackages, getStateByCityQuery } from "../../../components/Graphql/Queries"
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






const CityPackages = ({data,headers,region,places}) =>{
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
        return <><Nav/> <MobileList data={data??[]} region = {region} places={places} isMobile={isMobile} /></>
    }
    else{
        return <><Nav/><DeskList data = {data??[]} region = {region} places={places} isMobile={isMobile}/></>
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
    const rs = await client.query({query:getStateByCityQuery,variables:{input:{av:'1.3',id:'',pt:'WEBSITE',text:context.query.city}}})

    console.log(rs.data.state.output)
    // const r = await axios.post("",)








    let payload = {
        av:'1.3',
        id:`${rs.data.state.output.id}`,
        name:rs.data.state.output.name,
        pt:'WEBSITE',
        type:'State'
    }
    console.log(payload)
    const res = await client.query({query:getallpackages,variables:{input:payload}})
    console.log(res.data)
    const data = res.data.allpackage.output.packages
    const region = res.data.allpackage.output.region??null
    const places = res.data.allpackage.output.fcities



    // data = []
    // // headers = []
    // region = []
    // places = []
    headers['user-agent'] = headers['user-agent'].toLocaleLowerCase()
    return { props: { data,headers,region,places}}

}




export default CityPackages


