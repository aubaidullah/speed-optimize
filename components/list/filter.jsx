import {tw} from 'twind'
import Slider from "react-rangeslider";
import { useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPackages, setSearchFilter } from '../../redux_fx/actions';

const FilterBy = ({filter,setKeyword,data}) =>{


    // f.filter(package=>package.name.includes('Shimla'))
    // const filtering = useSelector(state=>state.package.package)
    const dispatch = useDispatch()






    const [search,setSearch] = useState("")
    const [maxprice,setMaxprice] = useState(5000)
    // console.log(data)

    // useEffect(()=>{
    //     if(search.length>=2){
    //         // const x = filtering.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    //         dispatch(setSearchFilter(search))
    //         // console.log(filtering.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())))
    //         // dispatch(filtering.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())))
    //     }
    //     else{
    //         dispatch(setSearchFilter(""))
    //     }
        
    // },[search])


    const placeRender = data.map(function (item, i) {
        // let chec = filterplace.indexOf(item) !== -1 ? true : "";
        if (i < 100) {
          return (
            
              <div className="checkbox" key={i}>
                <label>
                  <input
                    type="checkbox"
                    // checked={chec}
                    className={tw`mr-1`}
                    name="place"
                    // onClick={() => setPlace(item)}
                  />
                  {item}
                </label>
              </div>
            
          );
        }
      });    




    return <>
    {/* style={{position:'sticky',top:'101px'}} */}
        <div className={tw`bg-white sticky`}>
            <div className={tw`p-3`}>
                <div className={tw`flex items-center justify-between mb-4`}>
                    <h2 className={tw`text-xl font-bold`}>
                        Filter by
                    </h2> 
                    <div className={tw`text-sm`} style={{color:'#f06726'}}>Clear all</div>
                </div>
                <div className={tw`pb-4`}>
                    <input
                    value={filter?.keyword}
                    // onChange={(e)=>{setFiltering===undefined?{}:setFiltering(e.target.value)}}
                    onChange={(e)=> setKeyword({keyword:e.target.value})}
                    type={"text"} 
                    className="form-control" 
                    placeholder="Search place by name" />
                </div>


                <div className={tw`border-t border-red-200 py-4`}>
                    <div className={tw`flex items-center justify-between mb-4`}>
                        <h2>
                            Price
                        </h2> 
                    </div>
                    <div>
                        <div className={tw`flex justify-between`}>
                            <div className={tw`range-select range_st mr-2`}>
                                <span> &#8377; </span>
                                <input type={"number"} onChange={(e)=>console.log(e.target.value)} className={tw`rupees_ip pl-1`} />
                            </div>
                            <div className={tw`range-select range_st ml-2`}>
                                <span> &#8377; </span>
                                <input type={"number"} onChange={(e)=>console.log(e.target.value)} value={maxprice} className={tw`rupees_ip pl-1`} />
                            </div>                            
                        </div>
                        <Slider 
                        value={maxprice}
                        min={5000}
                        max={500000}
                        step={500}
                        orientation="horizontal"
                        onChange={(value)=>setMaxprice(value)}    
                        />
                    </div>
                    <div className={tw`flex items-center justify-between`}>
                        <div>
                            <FaRupeeSign className='inline' />
                            0
                        </div>
                        <div>
                            <FaRupeeSign className='inline' />
                            {maxprice}
                        </div>
                    </div>

                </div>


                <div className={tw`border-t border-red-200 py-4`}>
                    <div className={tw`flex items-center justify-between mb-4`}>
                        <h2 className={`Price_name`}>
                            Duration (in Days)
                        </h2> 
                    </div>

                    <div className='check_list'>

                        <div className="checkbox">
                            <label>
                            <input
                                type="checkbox"
                                name="days"
                                className={tw`mr-1`}
                                // checked={checked1}
                                // onClick={() =>
                                // this.changefilterduration(1, 7)
                                // }
                            />
                            1 to 7
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                            <input
                                type="checkbox"
                                name="days"
                                className={tw`mr-1`}
                                // checked={checked7}
                                // onClick={() =>
                                // this.changefilterduration(7, 9)
                                // }
                            />
                            7 to 9
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                            <input
                                type="checkbox"
                                name="days"
                                className={tw`mr-1`}
                                // checked={checked10}
                                // onClick={() =>
                                // this.changefilterduration(10, 12)
                                // }
                            />
                            10 to 12
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                            <input
                                type="checkbox"
                                name="days"
                                className={tw`mr-1`}
                                // checked={checked13}
                                // onClick={() =>
                                // this.changefilterduration(13, 100)
                                // }
                            />
                            13 or more
                            </label>
                        </div>


                    </div>
                </div>

                <div className={tw`border-t border-red-200 py-4`}>
                    <div className={tw`flex items-center justify-between mb-4`}>
                        <h2 className={`Price_name`}>
                        Favourite Places
                        </h2> 
                    </div>
                    <div style={{maxHeight:'300px',overflowY:'scroll'}}>
                        {placeRender}
                    </div>                    

                </div>
{/* placeRender */}

            </div>
            
        </div>
    </>
}

export default FilterBy