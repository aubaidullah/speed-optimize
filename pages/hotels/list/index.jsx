import client from "../../../components/Graphql/service"
import { getHotelList } from "../../../components/Graphql/Queries"
import Nav from "../../../components/Nav"
import HotelList from "../../../components/hotel/hotel-list"
import { tw } from "twind"
import * as Constants from '../../../components/Constants'
import SearchBar from "../../../components/hotel/searchBar"
import { useRouter } from "next/router"
import { toTitleCase } from "../../../components/fun"
import BreadCrumbs from "../../../components/breadcrumbs"


const SearchHotel =({hotels})=>{
    const router = useRouter()
    console.log(router.query.city)
    const bread = {
        disabled: {
            item: `${router.query.city}`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            },
            {
                item: "Hotels",
                href: "/hotels"
            }            
        ]
    }    
    return <>
        <Nav />
        

        <section className="container">
            <BreadCrumbs  bread={bread}/>
            <div className={tw`mt-4`}>
                <SearchBar />

            </div>
            <div className={tw`mt-4`}>
                <h2 className={tw`_titles_ mb-4`}>Results in <span className={tw`primary-color`}>{toTitleCase(router.query.city)}</span></h2>
                <HotelList hotels={hotels} />
                
                
                {/* <div className={tw`flex flex-wrap`}>
                    <div className={tw`w-full`}>
                        <HotelList hotels={hotels} />
                    </div>
                    
                </div>     */}

            </div>
        </section>
        


    </>


}


export async function getServerSideProps(context) {
    let _id = context.query.id
    let city = context.query.city

    console.log(_id)
    let payloads = {
        "av": "1.3",
        "id": _id,
        "name": city,
        "pt": "Website",
        "type": "City"
      }
    const res = await client.query({query:getHotelList,variables:{input:payloads}})


    // const meta = await client.query({query:getMetaQuery,variables:{input:{av:"",id:_id,key:'HOTEL',name:"",pt:'WEBSITE',type:"HOTEL"}}})
    // let {name:hotelname,price,cityname} = meta.data.meta.output.hotel

    // // let {finalprice,images} = meta.data.meta.output.package
    // price = `₹${price} `
    
    // const metas ={
    //     title:meta.data.meta.output.tags.title.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname).replace(/<PRICE>/g,price),
    //     longDesc:meta.data.meta.output.tags.longDesc.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname),
    //     keywords:meta.data.meta.output.tags.keywords.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname)
    // }


    return {props:{hotels:res.data.hotels.output.hotels}}
}


export default SearchHotel