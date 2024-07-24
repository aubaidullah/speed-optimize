
import Slider from "react-rangeslider";
import { useEffect, useState, useRef } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { places_filter, theme_filter } from "../../redux_fx/actions";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { createStateListURL, toTitleCase } from "../fun";
// import Link from 'next/link';

const FilterBy = ({
  _pricing,
  setPrice,
  _min,
  set_Min,
  _max,
  set_Max,
  set_Places,
  set_Themes,
  _places,
  _themes,
  page_type,
  filter,
  setKeyword,
  data,
  theme = undefined,
}) => {
  // f.filter(package=>package.name.includes('Shimla'))
  // const filtering = useSelector(state=>state.package.package)
  const dispatch = useDispatch();
  
  const router = useRouter();
  // console.log(router)
  
  const theme_ref = useRef([]);
  
  const [maxprice, setMaxprice] = useState(5000);
  const [minprice, setMinprice] = useState(1000);
  const [dur, setDur] = useState(false);
  const [fav, setFav] = useState(false);
  const [thm, setThm] = useState(router.query?.theme ?? false);
  
  // useEffect(() => {
  //   if (router.query?.theme != undefined) {
  //     // set_Themes
  //     set_Themes(router.query?.theme.split(",").map((e) => toTitleCase(e)));
  //     theme_ref.current = router.query?.theme.split(",");
  //   }
    
  //   // if (router.query?.)
  // });
  // return <h1>Filter</h1>
  // console.log(router.query)

  const setDurationFilter = (f, l) => {
    set_Min(f);
    set_Max(l);
  };
  const setPriceFilter = (min, max) => {
    setMaxprice(max);
    setMinprice(min);
    setPrice({ min: min, max: max });
  };

  const updateUrl = (e) => {
    console.log(e);
  };

  const setPlaceFilter = (n_item) => {
    if (_places.includes(n_item) == true) {
      set_Places(_places.filter((item) => item !== n_item));
    } else {
      console.log(n_item);
      // setPlaces([...places,n_item])
      // set_Places(_places.filter(item => item !== n_item))
      set_Places((arr) => [...arr, n_item]);
    }
    dispatch(places_filter(n_item));
    // set_Places()
    // console.log(places)
  };

  const setThemeFilter = (n_item) => {
    if (_themes.includes(n_item) == true) {
      // console.log("existed")
      set_Themes(_themes.filter((item) => item !== n_item));
      theme_ref.current = theme_ref.current.filter((item) => item !== n_item);
    } else {
      theme_ref.current.push(n_item);
      set_Themes((arr) => [...arr, n_item]);
    }

    if ("/holidays/state-package" === router.pathname) {
      const as_url = createStateListURL({
        statename: router.query.package,
        id: router.query.id,
      });
      router.push(`${as_url}`, `${as_url}?theme=${theme_ref.current}`, {
        shallow: true,
      });
    }
  };

  const placeRender = data?.map(function (item, i) {
    if (i < 100) {
      return (
        <div className="checkbox" key={i}>
          <label>
            <input
              type="checkbox"
              // checked={chec}
              checked={_places.includes(item)}
              className={`mr-1`}
              name="place"
              onChange={(e) => setPlaceFilter(item)}
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
            {/* <Link> */}
            <>
              <input
                type="checkbox"
                // checked={chec}
                className={`mr-1`}
                checked={_themes.includes(item.tag.trim())}
                name="place"
                // onChange={}
                onChange={(e) => {
                  setThemeFilter(item.tag.trim()), updateUrl(item.tag.trim());
                }}
                // onClick={() => setPlace(item)}
              />
              {item.tag}
            </>
            {/* </Link> */}
          </label>
        </div>
      );
    }
  });

  // console.log(places)
  // console.log(themef)
  // console.log(router)

  const clear_filter = () => {
    set_Max(100);
    set_Min(1);
    set_Places([]);
    set_Themes([]);
    setKeyword({ keyword: "" });

    setPriceFilter(0, 1000000);
  };

  return (
    <>
      <div className={`bg-white mt-6 h_sticky rounded-lg`}>
        <div className={`p-3`}>
          <div className={`flex items-center justify-between mb-4`}>
            <div className={`text-xl font-bold`}>Filter by</div>
            <div
              className={`text-sm cursor-pointer text-[#f06726]`}
              onClick={() => clear_filter()}
            >
              Clear all
            </div>
          </div>
          <div className={`pb-4`}>
            <input
              value={filter?.keyword}
              // onChange={(e)=>{setFiltering===undefined?{}:setFiltering(e.target.value)}}
              onChange={(e) => setKeyword({ keyword: e.target.value })}
              type={"text"}
              className="form-control"
              placeholder="Search place by name"
            />
          </div>

          <div className={`border-t border-gray-200 py-4`}>
            <div className={`flex items-center justify-between mb-4`}>
              <div>Price</div>
            </div>
            <div>
              <div className={`flex justify-between`}>
                <div className={`range-select range_st mr-2`}>
                  <span> &#8377; </span>
                  <input
                    type={"number"}
                    onChange={(e) => {
                      setMinprice(e.target.value);
                    }}
                    value={minprice}
                    className={`rupees_ip pl-1`}
                  />
                </div>
                <div className={`range-select range_st ml-2`}>
                  <span> &#8377; </span>
                  <input
                    type={"number"}
                    onChange={(e) => {
                      setMaxprice(e.target.value);
                    }}
                    value={maxprice}
                    className={`rupees_ip pl-1`}
                  />
                </div>
              </div>
              <Slider
                value={maxprice}
                min={0}
                max={50000}
                step={500}
                orientation="horizontal"
                onChange={(value) => setPriceFilter(minprice, value)}
              />
            </div>
            <div className={`flex items-center justify-between`}>
              <div>
                <FaRupeeSign className="inline" />
                {minprice}
              </div>
              <div>
                <FaRupeeSign className="inline" />
                {maxprice}
              </div>
            </div>
          </div>

          <div className={`border-t border-gray-200 py-4`}>
            <div className={`flex items-center justify-between`}>
              <div
                className={`flex justify-between items-center w-full cursor-pointer`}
                onClick={() => setDur(!dur)}
              >
                <div className={`Price_name`}>Duration (in Days)</div>
                <div className="w-full_">
                  {dur ? (
                    <AiOutlineMinus className={`font-bold text-xl`} />
                  ) : (
                    <AiOutlinePlus className={`font-bold text-xl`} />
                  )}
                </div>
              </div>
            </div>

            <div className={`check_list ${dur ? "block" : "hidden"}`}>
              <div className="checkbox">
                <label>
                  <input
                    type="radio"
                    name="days"
                    className={`mr-1`}
                    onChange={() => setDurationFilter(1, 7)}
                    checked={_min == 1 && _max == 7}

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
                    className={`mr-1`}
                    onChange={() => setDurationFilter(7, 9)}
                    checked={_min == 7 && _max == 9}
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
                    className={`mr-1`}
                    onChange={() => setDurationFilter(10, 12)}
                    checked={_min == 10 && _max == 12}
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
                    className={`mr-1`}
                    onChange={() => setDurationFilter(13, 100)}
                    checked={_min == 13 && _max == 100}
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
          {page_type != "CITY" ? (
            <div className={`border-t border-gray-200 py-4`}>
              <div className={`flex items-center justify-between`}>
                <div
                  className={`flex justify-between items-center w-full cursor-pointer`}
                  onClick={() => setFav(!fav)}
                >
                  <div className={`Price_name`}>Favourite Places</div>
                  <div className="w-full_">
                    {fav ? (
                      <AiOutlineMinus className={`font-bold text-xl`} />
                    ) : (
                      <AiOutlinePlus className={`font-bold text-xl`} />
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`max-h-[300px] overflow-y-scroll ${
                  fav ? "block" : "hidden"
                }`}
              >
                {placeRender}
              </div>
            </div>
          ) : (
            ""
          )}
          {page_type == "STATE" || page_type == "ALL" ? (
            <div className={`border-t border-gray-200 py-4`}>
              <div className={`flex items-center justify-between`}>
                <div
                  className={`flex justify-between items-center w-full cursor-pointer`}
                  onClick={() => setThm(!thm)}
                >
                  <div className={`Price_name`}>Themes of Trip</div>
                  <div className="w-full_">
                    {thm ? (
                      <AiOutlineMinus className={`font-bold text-xl`} />
                    ) : (
                      <AiOutlinePlus className={`font-bold text-xl`} />
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`max-h-[300px] overflow-y-scroll ${
                  thm ? "block" : "hidden"
                }`}
              >
                {themeRender}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* placeRender */}
        </div>
      </div>
    </>
  );
};

export default FilterBy;
