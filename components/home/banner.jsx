import { Carousel } from "react-responsive-carousel";
import {BsXLg,BsDot} from 'react-icons/bs'
import {HiOutlineSearch} from 'react-icons/hi'


const Banner = ({data}) =>{
    return <>
        {/* <img src={} */}
        <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
            className={"slider_banner slider_overlay"}
        >
            {data.map((e,index)=>{
                return <img src={e.i} key={index} className="img-responsive"/>
            })}


        </Carousel>


        <div className="container">
            <div className="search_input">
                <HiOutlineSearch 
                    className="m_s_icon"
                />
                <input type="text" placeholder="Search Any Destination, Travel Guide, Trip or Stays" className="form-control" />
            </div>
        </div>
    </>
}

export default Banner