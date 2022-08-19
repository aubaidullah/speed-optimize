// import RelatedTour from "../components/detail/related_tours";
import HomePackages from "../components/home/packages";
import { getbanner, getHome,getTravelGuideHome } from "../components/Graphql/Queries";
import client from "../components/Graphql/service";
import Banner from "../components/home/banner"
import State from "../components/home/state";
import Nav from "../components/Nav"
import TravelGuide from "../components/home/travel_guide";
import Hotel from "../components/home/hotel";

const Home_Page = ({home,travel}) =>{

    return <>
    <Nav />
    <Banner data={home.banners} />
    <State data = {home.states}/>
    <TravelGuide data = {travel}/>
    <HomePackages data={home} />
    <Hotel data = {home.hotels}/>
    
    {/* <State data = {home.states}/> */}
        <section className="container">
            <section>
                
            </section>
            
        </section>
    </>

    // return <h1>HomePage</h1>
}

// getbanner



export async function getServerSideProps(context) {
    // Fetch data from external API
    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    // const headers = context.req.headers
    
    const res = await client.query({query:getHome,variables:{input:{'av':'','id':'','pt':''}}})
    const res_travel = await client.query({query:getTravelGuideHome,variables:{input:{'av':'1.3','id':'0','pt':'WEBSITE','geoid':0,'pagenum':1,'pid':0,'size':18,'type':0}}})  
    // const data = res.data.allpackage.output.packages.slice(0, 10)

    // const data = res.data.allpackage.output.packages

    // const region = res.data.allpackage.output.region??null
    // const places = res.data.allpackage.output.fcities
    // console.log(places)
    // console.log(res_travel.data)
    return {props:{home:res.data.home.output,travel:res_travel.data.travelguide.output}}
    // return { props: { data,headers,region,places}}
  }



export default Home_Page