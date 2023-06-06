import { Carousel } from "react-responsive-carousel";
import { jpgToWebp } from '@/components/fun';
import Image from "next/image";
const _Carousel = ({data}) =>{
    return (

        <Carousel
            showStatus={false}
            showThumbs={false}
            showArrows={true}
            showIndicators={false}
            infinite={true}
            autoPlay={true}
            className="slider_banner slider_overlay"
        >
            {data?.package.images.split(',').map((e, index) => {
                return e?<Image className='img' src={jpgToWebp({uri:e})} layout="fill" key={index} alt={data?.package?.name} />:""
            })}
        </Carousel>


    )
}

export default _Carousel