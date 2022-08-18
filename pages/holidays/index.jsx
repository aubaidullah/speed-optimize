import axios from "axios"
import Image from "next/image"
// import Package from "../components/package"
// import ListPageMobile from '../components/list_page.mobile'
// import ListPage from '../components/list_page.desktop'
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic';
import {getallpackages} from '../../components/Graphql/Queries'
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


const Home =({data,headers,region,places})=>{
    const [isMobile,setIsMobile]  = useState(headers['user-agent'].includes('Android') || headers['user-agent'].includes('IPhone'))
    
    const dispatch = useDispatch()
    // const data = useSelector(state=>state.packages)
    
    useEffect(()=>{
        dispatch(getPackages(data))
    },[])
    // const pdata = useSelector(state=>state.package.package)
    // console.log(pdata)

    // const filter = useSelector(state=>state.filter)
    // console.log(filter)
    const pdata = data

    // useEffect(()=>{
    //     if(filter.search.length>=2){
    //         pdata = data.filter(item=>item.name.toLowerCase().includes(filter.search?.toLowerCase()))
    //     }
    //     else{
    //         pdata = data
    //     }
        
    // },[filter.search])

    


    
    useEffect(()=>{
        if (headers['user-agent'].includes('Android')==true || headers['user-agent'].includes('IPhone')==true){
            setIsMobile(true)
        }
        else{
            setIsMobile(false)
            // return <ListPage data = {data}/>
        }    
    },[isMobile])

    if (isMobile==true){
        // return <ListPageMobile data = {data}/>
        return <><Nav/> <MobileList data={pdata??[]} region = {region} places={places} isMobile={isMobile} /></>
    }
    else{
        return <><Nav/><DeskList data = {pdata??[]} region = {region} places={places} isMobile={isMobile}/></>
    }
    // console.log(headers['user-agent'])
    // return <>
    //     <ListPage data = {data}/>
    // </>
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

    return { props: { data,headers,region,places}}
  }
  


export default Home