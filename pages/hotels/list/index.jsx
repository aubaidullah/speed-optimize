import client from "../../../components/Graphql/service"
import { getHotelList } from "../../../components/Graphql/Queries"
// import Nav from "../../../components/Nav"
import Nav from "../../../components/HomeNav"
import HotelList from "../../../components/hotel/hotel-list"
import { tw } from "twind"
import * as Constants from '../../../components/Constants'
import SearchBar from "../../../components/hotel/searchBar"
import { useRouter } from "next/router"
import { toTitleCase } from "../../../components/fun"
import BreadCrumbs from "../../../components/breadcrumbs"


const SearchHotel =({hotels,info})=>{
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
    // const _hotels = hotels.sort((a,b)=>b.images.length - a.images.length)
    // const bimg = "https://seotest.kiomoi.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fv1552993398%2Fkiomoi%2FPelling%2FPelling.jpg&w=3840&q=75"
    const bimg = "https://testkiomoi.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fkmadmin%2Fimage%2Fupload%2Fv1552993397%2Fkiomoi%2FPelling%2FPelling-2.jpg&w=1920&q=75"
    // https://res.cloudinary.com/kmadmin/image/upload/v1633196081/kiomoi/1633196080048.jpg.jpg
    return <>

        
        <Nav />
        <SearchBar img={info?info.i:bimg} />
        {/* <div style={{position:'relative'}}>
            <img style={{width:'100%',objectFit:'cover',height:'400px',filter:'brightness(75%)'}} src={info.i}/>
            <div className="_container">
                <div className={tw`mt-4 bt-0 lg:bottom-20`} style={{position:'absolute',left:0,right:0}}>
                    <div className="container">
                        <SearchBar />
                    </div>
                    

                </div>
            </div>
        </div>         */}
        <BreadCrumbs  bread={bread}/>
        <section className="container">

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

    const hotels = res.data.hotels.output.hotels
    const info = res.data.hotels.output.images
    return {props:{hotels:hotels,info:info}}
}


export default SearchHotel