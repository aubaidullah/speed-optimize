import axios from "axios"
import Image from "next/image"
// import Package from "../components/package"
// import ListPageMobile from '../components/list_page.mobile'
// import ListPage from '../components/list_page.desktop'
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic';


const MobileList = dynamic(() => import('../components/list_page.mobile'), {
    ssr: true,
});

const DeskList = dynamic(() => import('../components/list_page.desktop'), {
    ssr: true,
});


const Home =({data,headers})=>{
    const [isMobile,setIsMobile]  = useState(headers['user-agent'].includes('Android') || headers['user-agent'].includes('IPhone'))
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
        return <MobileList data={data}/>
    }
    else{
        return <DeskList data = {data}/>
    }
    // console.log(headers['user-agent'])
    // return <>
    //     <ListPage data = {data}/>
    // </>
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const res = await axios.post(`https://admintest.kiomoi.com/api/v1/package/list`,{'av':'1.3',name:"",pt:'WEBSITE'})
    const data = res.data.output.packages
    const headers = context.req.headers
    // console.log(data)
    // const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data,headers}}
  }
  


export default Home