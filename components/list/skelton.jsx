import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { tw } from "twind";


export const BreadCrumbsLoading = () =>{
    return <>
        <div className="container">
            <div className={tw`flex flex-wrap gap-4`} style={{padding:"10px 0"}}>
                <div className={tw`w-[50px]`}>
                   <Skeleton height={15} count={1} />
                </div>
                <div className={tw`w-[70px]`}>
                   <Skeleton height={15} count={1} />
                </div>
                <div className={tw`w-[100px]`}>
                   <Skeleton height={15} count={1} />
                </div>                                
            </div>
        </div>
    </>
}

export const FilterDesktopLoading = () =>{
    return <>
    <div className={tw`w-full lg:w-1/4 pr-5 `}>
        <div className={tw`bg-white px-4`}>
            <div className={tw`flex justify-between`}>
                <div className={tw`w-[60px]`}>
                    <Skeleton height={10} count={1} />
                </div>
                <div className={tw`w-[30px]`}>
                    <Skeleton height={10} count={1} />
                </div>                
            </div>

            <div className={tw`mt-4`}>
                <Skeleton height={100} count={1} />
            </div>
            <div className={tw`mt-4`}>
                <Skeleton height={50} count={1} />
            </div>

            <div className={tw`mt-4`}>
                <Skeleton height={30} count={1} />
            </div>

            <div className={tw`mt-4`}>
                <Skeleton height={100} count={1} />
            </div>            
        </div>        
    </div>
    </>
}