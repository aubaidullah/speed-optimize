import { tw } from "twind"
import {AiOutlineUp,AiOutlineDown, AiOutlineSearch, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useState } from "react"

const FAQs = ({data}) =>{

    const [collapse,setCollapse] = useState(0)

    return <>
        <div itemScope itemType="https://schema.org/FAQPage">
        {
            data.map((item,index)=>{
                return <>
                    <div className="p-4 bg-white border-b" key={index} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                        <div className={tw`flex justify-between cursor-pointer`} onClick={()=>setCollapse(index==collapse?-1:index)}>
                            <div className="flex items-center text-md font-semibold">
                                {/* <AiOutlineSearch className={tw`text-[#f05927] text-xl`}/> */}
                                <div>{index+1}.</div>
                                <div className="ml-2"  itemProp="name">
                                    {item.question}
                                </div>
                            </div>

                            <div>
                                {
                                    collapse==index?<AiOutlineMinus />:<AiOutlinePlus/>
                                }
                                
                            </div>
                        </div>
                        <div className={tw`ans mt-2 ${collapse==index?'':'hidden'}`}  itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                            <div className={tw`pl-6 leading-8`} itemProp="text">
                                {item.answer}
                            </div>
                        </div>
                        
                    </div>
                </>
            })
        }
        </div>
    </>
}

export default FAQs