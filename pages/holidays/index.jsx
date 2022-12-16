import axios from "axios"
import Image from "next/image"
// import Package from "../components/package"
// import ListPageMobile from '../components/list_page.mobile'
// import ListPage from '../components/list_page.desktop'
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic';
import {getallpackages,getThemeQuery,getMetaQuery} from '../../components/Graphql/Queries'
import client from '../../components/Graphql/service'
import {getPackages} from '../../redux_fx/actions'
import {useSelector,useDispatch} from 'react-redux'

// import Nav from "../components/Nav";
const Nav = dynamic(() => import('../../components/Nav'))


const MobileList = dynamic(() => import('../../components/list_page.mobile'), {
    ssr: true,
});

const DeskList = dynamic(() => import('../../components/list_page.mobile'), {
    ssr: true,
});


const Home =({data,headers,region,places,theme,meta})=>{
    const [isMobile,setIsMobile]  = useState(headers['user-agent'].includes('android') || headers['user-agent'].includes('iphone'))
    
    const dispatch = useDispatch()
    // const data = useSelector(state=>state.packages)
    
    useEffect(()=>{
        dispatch(getPackages(data))
    },[])
    const pdata = data


    


    
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
        return <><Nav/> <MobileList meta={meta} page_type={'ALL'} data={pdata??[]} region = {region} places={places} isMobile={isMobile} theme={theme}/></>
    }
    else{
        return <><Nav/><DeskList meta={meta} page_type={'ALL'} data = {pdata??[]} region = {region} places={places} isMobile={isMobile} theme={theme}/></>
    }

}

export async function getServerSideProps(context) {
    // Fetch data from external API
    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    const headers = context.req.headers

    const res = await client.query({query:getallpackages,variables:{input:{'av':'1.3','name':'','pt':'WEBSITE'}}})  
    // const data = res.data.allpackage.output.packages.slice(0, 10)

    const data = res.data.allpackage.output.packages

    const region = res.data.allpackage.output.region??null
    const places = res.data.allpackage.output.fcities
    // console.log(places)
    headers['user-agent'] = headers['user-agent'].toLocaleLowerCase()
    const res_theme = await client.query({query:getThemeQuery,variables:{input:{'av':'','id':'','pt':''}}})

    const meta = await client.query({query:getMetaQuery,variables:{input:{av: "1.3",id: 0,key: "HOLIDAYS",name: "",pt: "WEBSITE",type: ""}}})


    // console.log()

    return { props: { data,headers,region,places,theme:res_theme.data.alltheme.output,meta:meta.data.meta.output.tags}}
  }
  


export default Home