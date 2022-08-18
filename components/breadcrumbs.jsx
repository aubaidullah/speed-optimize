import Link from 'next/link'
import {tw} from 'twind'
import {TiChevronRight} from 'react-icons/ti'
const BreadCrumbs = ({bread}) =>{
    
    // const bread = {
    //     disabled:{
    //         "item":"Tour package"
    //     },
    //     enabled :[
    //         {
    //             item:"Kiomoi",
    //             href:"/"
    //         },
    //         {
    //             item:"Kiomoi",
    //             href:"/"
    //         },
    //         {
    //             item:"Kiomoi",
    //             href:"/"
    //         }                        
    //     ]
    // }
    
    return <>
    {/* style={{position:'sticky',top:'60px'}} */}
    <section className='container'>
            <div className='row'>
                <ul className='breadcrumb'>
                    
                    {bread.enabled.map((e,index)=>{
                        return <li key={index}>
                                <>
                                    <Link href={e.href}>
                                        <a href={e.href} className="_b_active">
                                            {e.item}
                                        </a>
                                    </Link>
                                    <TiChevronRight className={tw`bread_icon inline`} />
                                    </>
                                
                            </li>
                    })}
                    <li>
                        {bread.disabled.item}
                    </li>  
                </ul>               
            </div>

        </section>    
    
    </>
}

export default BreadCrumbs