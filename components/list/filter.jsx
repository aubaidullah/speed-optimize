import {tw} from 'twind'
import Slider from "react-rangeslider";
import { useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clear_filter, duration_filter, getPackages, places_filter, price_filter, setSearchFilter, theme_filter } from '../../redux_fx/actions';

const FilterBy = ({_pricing,setPrice,_min,set_Min,_max,set_Max,set_Places,set_Themes,_places,_themes,page_type,filter,setKeyword,data,theme=undefined}) =>{


    // f.filter(package=>package.name.includes('Shimla'))
    // const filtering = useSelector(state=>state.package.package)
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     setSearchFilter(city)
    //     // if(city!=undefined){
    //     //     setSearchFilter(city)
    //     // }
    // },[])






    const [search,setSearch] = useState("")
    const [places,setPlaces] = useState([])
    const [duration,setDuration] = useState([])
    const [themef,setTheme] = useState([])
    const [maxprice,setMaxprice] = useState(5000)
    const [minprice,setMinprice] = useState(1000)
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


    const setDurationFilter=(f,l)=>{
        set_Min(f)
        set_Max(l)
        // dispatch(duration_filter(f,l))

    }
    const setPriceFilter=(min,max)=>{
        setMaxprice(max)
        setMinprice(min)
        setPrice({min:min,max:max})
        // dispatch(price_filter(min,max))
    }


    const setPlaceFilter=(n_item)=>{

        if (_places.includes(n_item) == true){
            set_Places(_places.filter(item => item !== n_item))
        }
        else{
            console.log(n_item)
            // setPlaces([...places,n_item])
            // set_Places(_places.filter(item => item !== n_item))
            set_Places( arr => [...arr, n_item]);   
        }
        dispatch(places_filter(n_item))
        // set_Places()
        // console.log(places)
    }
    
    const setThemeFilter=(n_item)=>{
        // console.log(_themes)
        // console.log(n_item)
        if (_themes.includes(n_item) == true){
            console.log("existed")
            set_Themes(_themes.filter(item => item !== n_item))
        }
        else{
            console.log("not existed")
            // console.log(n_item.trim())
            set_Themes( arr => [...arr, n_item])
            // setTheme( arr => [...arr, n_item]);
        }
        dispatch(theme_filter(n_item))
    }    

    const placeRender = data.map(function (item, i) {
        if (i < 100) {
          return (
            
              <div className="checkbox" key={i}>
                <label>
                  <input
                    type="checkbox"
                    // checked={chec}
                    checked={_places.includes(item)}
                    className={tw`mr-1`}
                    name="place"
                    onChange={(e)=>setPlaceFilter(item)}
                    // onClick={() => setPlace(item)}
                  />
                  {item}
                </label>
              </div>
            
          );
        }
      });  
      
      const themeRender = theme?.map(function (item, i) {
        if (i < 100) {
          return (
            
              <div className="checkbox" key={i}>
                <label>
                  <input
                    type="checkbox"
                    // checked={chec}
                    className={tw`mr-1`}
                    checked={_themes.includes(item.tag.trim())}
                    name="place"
                    onChange={(e)=>setThemeFilter(item.tag.trim())}
                    // onClick={() => setPlace(item)}
                  />
                  {item.tag}
                </label>
              </div>
            
          );
        }
      });          


    // console.log(places)
    // console.log(themef)

    const clear_filter=()=>{
        set_Max(100)
        set_Min(1)
        set_Places([])
        set_Themes([])
        setKeyword({keyword:''})

        setPriceFilter(0,1000000)

    }

    return <>
    {/* style={{position:'sticky',top:'101px'}} */}
        <div className={tw`bg-white sticky`} style={{borderRadius:'8px'}}>
            <div className={tw`p-3`}>
                <div className={tw`flex items-center justify-between mb-4`}>
                    <h2 className={tw`text-xl font-bold`}>
                        Filter by
                    </h2> 
                    <div className={tw`text-sm`} style={{color:'#f06726',cursor:'pointer'}} onClick={()=>clear_filter()} >Clear all</div>
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
                                <input type={"number"} onChange={(e)=>{setMinprice(e.target.value)}} value={minprice} className={tw`rupees_ip pl-1`} />
                            </div>
                            <div className={tw`range-select range_st ml-2`}>
                                <span> &#8377; </span>
                                <input type={"number"} onChange={(e)=>{setMaxprice(e.target.value)}} value={maxprice} className={tw`rupees_ip pl-1`} />
                            </div>                            
                        </div>
                        <Slider 
                        value={maxprice}
                        min={0}
                        max={50000}
                        step={500}
                        orientation="horizontal"
                        onChange={(value)=>setPriceFilter(minprice,value)}    
                        />
                    </div>
                    <div className={tw`flex items-center justify-between`}>
                        <div>
                            <FaRupeeSign className='inline' />
                            {minprice}
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
                                type="radio"
                                name="days"
                                className={tw`mr-1`}
                                onChange={()=>setDurationFilter(1,7)}
                                checked={_min==1&&_max==7}

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
                                type="radio"
                                name="days"
                                className={tw`mr-1`}
                                onChange={()=>setDurationFilter(7,9)}
                                checked={_min==7&&_max==9}
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
                                type="radio"
                                name="days"
                                className={tw`mr-1`}
                                onChange={()=>setDurationFilter(10,12)}
                                checked={_min==10&&_max==12}
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
                                type="radio"
                                name="days"
                                className={tw`mr-1`}
                                onChange={()=>setDurationFilter(13,100)}
                                checked={_min==13&&_max==100}
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
                {
                    page_type != 'CITY'?
                
                    <div className={tw`border-t border-red-200 py-4`}>
                    <div className={tw`flex items-center justify-between mb-4`}>
                        <h2 className={`Price_name`}>
                        Favourite Places
                        </h2> 
                    </div>
                    <div style={{maxHeight:'300px',overflowY:'scroll'}}>
                        {placeRender}
                    </div>                    

                </div>:""
                }
                {
                    page_type == 'STATE' || page_type == 'ALL'?
                
                    <div className={tw`border-t border-red-200 py-4`}>
                    <div className={tw`flex items-center justify-between mb-4`}>
                        <h2 className={`Price_name`}>
                        Themes of Trip
                        </h2> 
                    </div>
                    <div style={{maxHeight:'300px',overflowY:'scroll'}}>
                        {themeRender}
                    </div>                    

                </div>:""
                }                

{/* placeRender */}

            </div>
            
        </div>
    </>
}

export default FilterBy