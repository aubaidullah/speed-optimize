import Nav from '../../components/Nav'
import * as Constants from '../../components/Constants'
import { Carousel } from "react-responsive-carousel";
import {BsDot,BsStarFill,BsStarHalf,BsChevronDown,BsChevronRight} from 'react-icons/bs'
import Image from 'next/image'
import RightBar from '../../components/detail/rightbar';
import Content from '../../components/detail/content';
import RelatedTour from '../../components/detail/related_tours'
import client from '../../components/Graphql/service'
import {getpackage,getrelatedpackage} from '../../components/Graphql/Queries'
import {tw} from 'twind'
import BreadCrumbs from '../../components/breadcrumbs';
import {
    useRouter
  } from 'next/router'
// import { Carousel } from "react-responsive-carousel";


const DetailPage = ({data,related}) =>{

    var userRating = []
    var i =0
    for(i;i<Math.floor(parseFloat(data.package.sratings));i++){
        userRating.push(<BsStarFill key={i} className={tw`d_icon_size inline`}/>)
    }
    if (data.package.sratings.length!=1){
        userRating.push(<BsStarHalf key={i} className={tw`d_icon_size inline`}/>)
    }

    const bread = {
        disabled:{
            item: `${data.package.name} Tour package ${data.package.id}`
        },
        enabled :[
            {
                item:"Kiomoi",
                href:"/"
            },
            {
                item:"Holidays Booking",
                href:"/holidays/"
            },
            {
                item:"India",
                href:"/holidays/"
            }            
        ]
    }


    return <>
        <Nav/>
        <BreadCrumbs bread={bread}/>
        <section className='container'>
            <div className='row'>
                <div className='col-sm-8 col-xs-6'>
                    <h1 className='h1_title'>{data.package.name}</h1>
                    <div>
                        <div className='_inline__'>
                            {userRating}
                        </div>

                        <div className="_inline__ rating d_rating">
                            <span>4.5 <BsDot className={tw`inline`}/> 26 Rating</span>
                        </div>                        
                    </div>
                
                </div>
                <div className='col-sm-4 col-xs-6'>

                </div>
            </div>

            <div className='container'>

            </div>


        </section>


        <section className='container'>
            <div className='row'>
                <div className="col-sm-12 col-xs-12">
                    <div className="detail_slide_nav _30px">
                        <ul>
                            <li>
                            <a href="#photos" className="_c_default">
                                Photos
                            </a>
                            </li>
                            <li>
                            <a href="#overview">Overview</a>
                            </li>
                            <li>
                            <a href="#itinery">Itinerary</a>
                            </li>
                            <li>
                            <a href="#hotels">Hotels</a>
                            </li>
                            <li>
                            <a href="#inclusions">Inclusions</a>
                            </li>
                            <li>
                            <a href="#tnc">T&C</a>
                            </li>
                        </ul>
                </div>
              
              
              
              
              
              
              
                </div>
            
            
                <div className='col-sm-8 col-xs-12' id="photos">
                    <div class="slider_details">
                        <Carousel
                            showStatus={false}
                            showThumbs={false}
                            showArrows={true}
                            showIndicators={false}
                            infinite={true}
                            autoPlay={true}
                            class="slider_banner slider_overlay"
                        >
                            {data.package.images.split(',').map((e,index)=>{
                                return <Image className='img' src={e} layout="fill" key={index} />
                            })}
                        </Carousel>
                    </div>
                </div>
                <div className='col-sm-4 col-xs-12'>
                    <RightBar data={data}/>
                </div>
            </div>
        </section>
        <section className='inclusions'>
            <Content data = {data}/>
            <RelatedTour data={related} />
        </section>


    </>
}


export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    let query = context.params['name]-tour-package-[id']

    let name = query.split('-tour-package-')[0]
    let _id = query.split('-tour-package-')[1]

    const res = await client.query({query:getpackage,variables:{input:{id:_id}}})  
    
    let postD = {"av":"1.3","id":0,"name":res.data.package.output.package.region.split(",")[0],"pt":"WEBSITE","type":"STATE"}
    const relatedpack = await client.query({query:getrelatedpackage,variables:{input:postD}})
    
    return {props:{data:res.data.package.output,related:relatedpack.data.package.output}}
  }



export default DetailPage