import RelatedTour from "../components/detail/related_tours";
import { getbanner, getHome } from "../components/Graphql/Queries";
import client from "../components/Graphql/service";
import Banner from "../components/home/banner"
import State from "../components/home/state";
import Nav from "../components/Nav"

const Home_Page = ({home}) =>{

    return <>
    <Nav />
    <Banner data={home.banners} />
    <State data = {home.states}/>
    {/* <RelatedTour data={home} /> */}
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
    // const data = res.data.allpackage.output.packages.slice(0, 10)

    // const data = res.data.allpackage.output.packages

    // const region = res.data.allpackage.output.region??null
    // const places = res.data.allpackage.output.fcities
    // console.log(places)
    // console.log(res.data.home.output)
    return {props:{home:res.data.home.output}}
    // return { props: { data,headers,region,places}}
  }



export default Home_Page