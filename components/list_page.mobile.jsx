import {
  AiOutlineArrowDown,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { BsArrowRight, BsFilter } from "react-icons/bs";
import {FaPhoneAlt} from 'react-icons/fa'
// import {FaArrowRight} from 'react-icons/fa'
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { tw } from "twind";
// import { useSelector } from "react-redux"
import { ScrollWrapper } from "react-bottom-scroll";
import { useRouter } from "next/router";
import {
  createCountryListURL,
  createStateListURL,
  createTGCityURL,
  createTGCountryURL,
  createTGStateURL,
  createThemeStateListURL,
  toTitleCase,
} from "./fun";
import Link from "next/link";
import Image from "next/image";
import ParseHtml from "./parseToHtml";
// import { SimilarTourLoading } from './skelton';
// import CityTags from './list/city_tags';
// import State_Attraction from './trave-guide/attractions';
// import TopCities from './trave-guide/top_cities';
// import Reviews from './home/reviews';
// import FAQs from './list/faqs';
// import Articles from './home/articles';

// const
const TableLoading = dynamic(
  () => import("./skelton").then((mod) => mod.TableLoading),
  { ssr: false },
);
// const Content = dynamic(() => import('./trave-guide/content'))
const RelatedTour = dynamic(() => import("./detail/related_tours"));
const BreadCrumbs = dynamic(() => import("./breadcrumbs"));
const Meta = dynamic(() => import("./meta"));
const FilterBy = dynamic(() => import("./list/filter"));
const Modal = dynamic(() => import("./modal"));
const Package = dynamic(() => import("../components/package"), {
  loading: () => <TableLoading />,
});
const CityTags = dynamic(() => import("./list/city_tags"));
const FAQs = dynamic(() => import("./list/faqs"));
const Articles = dynamic(() => import("./home/articles"));
const Reviews = dynamic(() => import("./home/reviews"));
const TopCities = dynamic(() => import("./trave-guide/top_cities"));
const State_Attraction = dynamic(() => import("./trave-guide/attractions"));
const LeadForm = dynamic(() => import("./leadform"));
// const filtering = useSelector(state=>state.package.package)
// const FilterBy = dynamic(() => import('./list/filter'), {
//     ssr: true,
// });

// const filtr = useSelector(state=>state.filter)
// console.log(filtr)

const ListPageMobile = ({
  meta,
  page_type,
  data,
  region,
  places,
  isMobile,
  city = undefined,
  theme = undefined,
  related = undefined,
  travel = undefined,
  reviews = undefined,
  faqs = undefined,
  articles = undefined,
  cities = undefined,
  desc = undefined,
  theme_desc = undefined,
  pthemes = undefined
}) => {
  const [filter, setFilter] = useState({ keyword: "" });
  const [limit, setLimit] = useState(10);
  const [pcount,setPcount] = useState(0)
  const [overviewlimit, setOverviewlimit] = useState(500);
  const [overview, setOverview] = useState(region?.longDesc?.length > 20 ? region?.longDesc : region?.desc ?? "");
  const [isshow, setIsshow] = useState(false);
  const [pricefilter, setPricefilter] = useState(0);
  const [priority,setPriority] = useState(1)
  const [durationfilter, setDurationfilter] = useState(0);
  const [_places, set_Places] = useState([]);
  const [_themes, set_Themes] = useState([]);
  const [sendquery, setSendquery] = useState(false);
  const [modalinfo, setModalinfo] = useState({});
  const p_ref = useRef(0);
  const MINUTE_MS = useRef(8500)
  const POPUPFORM = useRef(false)

  const [_pricing, setPrice] = useState({ min: 0, max: 1000000 });

  const [_min, set_Min] = useState(1);
  const [_max, set_Max] = useState(100);
  const router = useRouter();

  // router.push(
  //     {
  //         query:{
  //             "filter":_themes
  //         }
  //     },
  //     {pathname:`/${router.asPath}?filter=${_themes}`},
  //     {shallow: true}

  // )

  // console.log(router.query.filter)

  const state_bread = {
    disabled: {
      item: `${region?.name}`,
    },
    enabled: [
      {
        item: "Kiomoi",
        href: "/",
      },
      {
        item: "Holidays Bookings",
        href: "/holidays",
      },
      // {
      //   item: "India",
      //   href: "/holidays",
      // },
    ],
  };
  const country_st_bread = {
    disabled: {
      item: `${region?.name}`,
    },
    enabled: [
      {
        item: "Kiomoi",
        href: "/",
      },
      {
        item: "Holidays Bookings",
        href: "/holidays",
      },
      {
        item: `${region?.sname}`,
        href: createCountryListURL({
          cityname: region?.sname,
          id: region?.cid,
        }),
        // href: `/holidays-international/${region?.sname}-tour-packages/${region?.cid}`
        // href:`/holidays-international/nepal-tour-packages/153`
      },
    ],
  };
  const country_bread = {
    disabled: {
      item: `${region?.name}`,
    },
    enabled: [
      {
        item: "Kiomoi",
        href: "/",
      },
      {
        item: "Holidays Bookings",
        href: "/holidays",
      },
      // {
      //     item:`${region?.sname}`,
      //     href: `/holidays-international/${region?.sname}-tour-packages/${region?.cid}`
      //     // href:`/holidays-international/nepal-tour-packages/153`
      // }
    ],
  };
  const city_bread = {
    disabled: {
      item: `${router.query.city}`,
    },
    enabled: [
      {
        item: "Kiomoi",
        href: "/",
      },
      {
        item: "Holidays Bookings",
        href: "/holidays",
      },
      // {
      //   item: "India",
      //   href: "/holidays",
      // },
      {
        item: `${region?.sname}`,
        // href:'/holidays'
        href: createStateListURL({
          statename: page_type == "STATE" ? "" : region?.sname,
          id: region?.sid,
        }),
      },
    ],
  };

  const all_bread = {
    disabled: {
      item: "Holidays Bookings",
    },
    enabled: [
      {
        item: "Kiomoi",
        href: "/",
      },
    ],
  };

  // var d = region?.desc??""
  var d = region?.longDesc?.length > 20 ? region?.longDesc : region?.desc ?? "";
  // var d = desc;
  // console.log(d)

  useEffect(() => {
    if (region !== null || theme_desc !=undefined) {
      if (overviewlimit == 500) {
        theme_desc == undefined ?
        setOverview(d.substring(0, overviewlimit))
        :setOverview(theme_desc.substring(0, overviewlimit))
      } else {
        theme_desc == undefined ?
        setOverview(d)
        :setOverview(theme_desc.substring(0, overviewlimit))
      }
    }
  }, [overviewlimit]);
  // pcities.some((item) => array.includes(item))

  var pack = [];

  // useEffect(()=>{
  //     try{
  //         const n = router.query.filter.split(",").map(arr => toTitleCase(arr))
  //         console.log(n)
  //         set_Themes(arr => [...arr, ...n])
  //     }catch{

  //     }

  // },[])

  if (_places.length) {
    data = data.filter((e) =>
      e.pcities.split(",").some((x) => _places.includes(x)),
    );
  }

  if (_themes.length) {
    data = data.filter((e) =>
      e.theme.split("#").some((x) => _themes.includes(x.trim())),
    );
  }

  // const durationCustom=(duration)=>{

  // }

  data = data.filter(
    (e) =>
      e.nights >= _min &&
      e.nights <= _max &&
      e.finalprice >= _pricing.min &&
      e.finalprice <= _pricing.max,
  );
  // console.log(data.length);



  if (priority) {
    // setPrice(0)
    // setDurationfilter(0)
    data = data.sort((a, b) => a.priority - b.priority).sort((a,b) => a.priority === b.priority?a.finalprice - b.finalprice:"");
  } 
  // else {
  //   data = data.sort((a, b) => b.priority - a.priority);
  // }

  if (pricefilter) {
    // setDurationfilter(0)
    // setPriority(0)
    data = data.sort((a, b) => a.finalprice - b.finalprice);
  } 
  // else {
  //   data = data.sort((a, b) => b.finalprice - a.finalprice);
  //   // data = data.sort((a,b)=>a.finalprice < b.finalprice)
  // }


  // if (durationfilter) {
  //   // setPriority(0)
  //   // setPriority(0)
  //   data = data.sort((a, b) => a.nights - b.nights);
  // } else {
  //   data = data.sort((a, b) => b.nights - a.nights);
  // }

  if (durationfilter) {
    data = data.sort((a, b) => b.nights - a.nights);
    // else{
    //     data = data.sort((a,b)=>a.nights < b.nights)
    // }
  } 
  // else {
  //   // setPricefilter(0)
  //   if (!pricefilter) {
  //     data = data.sort((a, b) => a.nights - b.nights);
  //   } else {
  //     data = data.sort((a, b) => b.nights - a.nights);
  //   }
  // }

  // },[pricefilter])

  // data = data.sort((a,b)=>a.finalprice > b.finalprice)

  // data.map((item=> item.theme.split("#").map((e)=>{

  //     if(filtering.themes.includes(e)){
  //         pack.push(item)
  //     }
  // })
  // ))

  // data.map((item=> {
  //     if(item.nights>=filtering.minduration && item.nights<=filtering.maxduration)
  //         {
  //         pack.push(item)
  //     }
  // }
  // ))

  // if(item.nights>=filtering.minduration && item.nights<=filtering.maxduration){

  // console.log(pack)

  // data = data.filter(arr=>
  //     arr.pcities.split(",").filter((ar=>filtering.places.includes(ar)))
  //     )

  // console.log(_places)
  // console.log(_themes)
  // console.log(_pricing)
  // console.log(page_type)
  // console.log(pricefilter)
  // console.log(data.length)

  const tgURL =
    page_type == "CITY"
      ? createTGCityURL({ city: travel?.tg?.cityName, id: travel?.tg?.id })
      : page_type == "STATE"
      ? createTGStateURL({ city: travel?.tg?.cityName, id: travel?.tg?.id })
      : createTGCountryURL({
          country: travel?.tg?.cityName,
          id: travel?.tg?.id,
        });


      const updateChangeForm = (val) => {
        setSendquery(val);
      };

      const _sendquery = (price, id, name, city) => {
        // console.log("sldkf")
        setModalinfo({
          id,
          name,
          city,
          price,
        });
        setSendquery(true);
        POPUPFORM.current = true
      };

      useEffect(()=>{
        // let MINUTE_MS = 10000
        const interval = setInterval(() => {
          if (true){
              if (p_ref.current < 2 && POPUPFORM.current == false){
                p_ref.current  = p_ref.current + 1
                _sendquery(
                  0,
                  data[0].id,
                  `Limited Period Offer! Upto 30% Off on ${travel?.tg?.cityName ?? router.query.city  ?? router.query.theme} Tour Packages`,
                  "",
                )
                MINUTE_MS.current = 120000
              } 
          }
          }, MINUTE_MS.current);
        return () => clearInterval(interval);
      },[])

        return (
    <>
      <Meta meta={meta} />

      <article>
        {/* <Meta meta={meta} /> */}

        <BreadCrumbs
          bread={
            // page_type=='STATE'?state_bread:region?.sname == region?.cname?country_bread:page_type=='CITY'?city_bread:all_bread

            page_type == "STATE"
              ? state_bread
              : page_type == "COUNTRY"
              ? country_bread
              : page_type == "CITY" && region?.sname == region?.cname
              ? country_st_bread
              : page_type == "CITY"
              ? city_bread
              : all_bread
            // bread
          }
        />
        <Modal
          show={isshow}
          animation={false}
          className="login_credential"
          backdrop="static"
          changeForm={setIsshow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div>
            <div>
              <FilterBy
                _pricing={_pricing}
                setPrice={setPrice}
                _min={_min}
                set_Min={set_Min}
                _max={_max}
                set_Max={set_Max}
                set_Places={set_Places}
                _places={_places}
                _themes={_themes}
                set_Themes={set_Themes}
                page_type={page_type}
                filter={filter}
                setKeyword={setFilter}
                data={places}
                theme={theme}
              />
            </div>
          </div>

          <div
            className="bottom_button_filter"
            onClick={() => setIsshow(false)}
          >
            <div className={`flex h-full`}>
              <div className={`flex h-full w-full`}>
                <div
                  className={`self-center w-full text-center text-[20px]`}
                  // style={{alignSelf:'center',width:'100%',textAlign:'center',fontSize:'20px'}}
                >
                  Apply
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <section className="container m-auto">
          <div className={tw`flex flex-wrap`}>
            {region ? (
              <div
                className={`w-full p-4 bg-white mb-4 _box_shadow_ title_listing_ rounded-md`}
              >
                {overview?.includes("<h1") ? (
                  // <div className={`text-2xl pb-2 _b_active font-bold`}>
                  //   {region?.name} Tour packages
                  // </div>
                  ""
                ) : (
                  <h1 className={`text-2xl pb-2`}>
                    {region?.name?? toTitleCase(router.query.theme) }  Tour packages
                  </h1>
                )}

                <div>
                  {/* {ReactHtmlParser(overview)} */}
                  {/* {ParseHtml({text:overview})} */}
                  <div className="__description_">
                    {ParseHtml({text:overview})}
                  </div>
                  
                  
                  
                  {overviewlimit == 250 || overviewlimit == 500 ? (
                    <a
                      onClick={() => setOverviewlimit(50000)}
                      className="_plus_more"
                    >
                      +more
                    </a>
                  ) : (
                    <a
                      onClick={() => setOverviewlimit(500)}
                      className="_plus_more"
                    >
                      -less
                    </a>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            {!isMobile ? (
              <div className={tw`w-full lg:w-1/4 pr-5`}>
                <FilterBy
                  _pricing={_pricing}
                  setPrice={setPrice}
                  _min={_min}
                  set_Min={set_Min}
                  _max={_max}
                  set_Max={set_Max}
                  set_Places={set_Places}
                  _places={_places}
                  _themes={_themes}
                  set_Themes={set_Themes}
                  page_type={page_type}
                  filter={filter}
                  setKeyword={setFilter}
                  data={places}
                  theme={theme}
                />
              </div>
            ) : (
              ""
            )}

            <div className={tw`w-full lg:w-3/4 `}>
            <div className={tw`mb-2`}>
             {page_type == "STATE"?
              <div className={tw`flex flex-wrap gap-3`}>
                {pthemes.map((e,index)=>{
                  return (
                    <Link key={index} href={createThemeStateListURL({statename:region?.name,id:router.query.id,themeName:e.theme})}>
                      <p className={tw` border border-gray-500 px-2 py-1 font-semibold text-slate-600 rounded-lg`}>{e.theme} tour packages</p>
                    </Link>
                  )
                })}
              </div>  
            :""}
            </div>
              <div className={``}>
                <div
                  className={`flex items-center justify-between mb-6 pb-2 border-b`}
                >
                  <div>
                    <h3 className={`text-base`}>
                      {isMobile ? "" : "Showing"}
                      <span className={`font-bold ml-2`}>
                        {pack.length != 0 ? pack.length : data.length} Tour
                        Packages
                      </span>
                      <span>
                        {
                          page_type == "STATE" || page_type == "COUNTRY" ? (
                            <span>
                              <span> for </span>
                              <span className={`text-[#F06726]`}>
                                {region?.name}
                              </span>
                            </span>
                          ) : (
                            ""
                          )
                          // ` for ${region?.name}`:""
                        }
                      </span>
                    </h3>
                  </div>
                  {isMobile == false ? (
                    <div>
                      <div className="flex flex-wrap">
                        <div className={`p-2 sort_w text-bold font-gray-400`}>
                          SORT BY :
                        </div>
                        
                        
                        <div
                          className={`${
                            !priority ? "_b_active" : ""
                          } p-2 sort_w cursor-pointer`}
                          onClick={() => {setPricefilter(0),setDurationfilter(0), setPriority(!priority)}}
                        >
                          POPULAR
                          {priority ? (
                            <AiOutlineArrowDown className={`inline`} />
                          ) : (
                            <AiOutlineArrowUp className={`inline`} />
                          )}
                        </div>

                        <div
                          className={`${
                            !durationfilter ? "_b_active" : ""
                          } p-2  sort_w cursor-pointer`}
                          onClick={() => {setPricefilter(0),setPriority(0), setDurationfilter(!durationfilter)}}
                        >
                          DURATION
                          {durationfilter ? (
                            <AiOutlineArrowDown className={`inline`} />
                          ) : (
                            <AiOutlineArrowUp className={`inline`} />
                          )}
                        </div>
                        <div
                          className={`${
                            !pricefilter ? "_b_active" : ""
                          } p-2 sort_w cursor-pointer`}
                          onClick={() => {setPriority(0), setDurationfilter(0), setPricefilter(!pricefilter)}}
                        >
                          PRICE
                          {pricefilter ? (
                            <AiOutlineArrowDown className={`inline`} />
                          ) : (
                            <AiOutlineArrowUp className={`inline`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <BsFilter size={"20px"} onClick={() => setIsshow(true)} />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <ScrollWrapper
                  wrapperStyle={{ width: "100%", overflowY: "initial" }}
                  bottomCallback={() => {
                    setLimit(limit + 10);
                  }}
                  minScroll={20}
                  className={"row"}
                >
                  <div
                    className="row"
                    itemScope
                    itemType="https://schema.org/ItemList"
                  >
                    <meta
                      itemProp="numberOfItems"
                      content={pack.length != 0 ? pack.length : data.length}
                    />
                    {data.length ? (
                      data.slice(0, limit).map((item, index) => {
                        return item.name.length >= 2 &&
                          (item.name.toLowerCase().includes(filter.keyword) ||
                            item.cities
                              .toLowerCase()
                              .includes(filter.keyword) ||
                            item.theme
                              .toLowerCase()
                              .includes(filter.keyword)) ? (
                          // <div>package</div>:""
                          <Package index={index} item={item} POPUPFORM = {POPUPFORM} />
                        ) : null;
                      })
                    ) : (
                      <div className={`mt-16 mb-16 text-center`}>
                        <div className={`text-2xl font-bold text-[#999]`}>
                          <p className={`"`}>No package found</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollWrapper>
              </div>
            </div>
          </div>
        </section>
        {page_type == "CITY" ? (
          <div className={tw`mt-5 w-full`}>
            {/* <SimilarTourLoading /> */}
            <RelatedTour data={related} />
          </div>
        ) : (
          ""
        )}
        {page_type == "STATE" || page_type == "COUNTRY" ? (
          <div className="mt-4 container">
            <div
              className={tw`mt-8 ${
                isMobile ? "text-xl" : "text-2xl"
              } mb-4 text-center_ font-semibold text-gray-600`}
            >
              Related Tour Packages in {region?.name}
            </div>
            <CityTags cities={cities} />
          </div>
        ) : (
          ""
        )}
        {(page_type == "STATE" ||
          page_type == "CITY" ||
          page_type == "COUNTRY") &&
        faqs.length != 0 ? (
          <div className="mt-4 container">
            <div
              className={tw`mt-8 ${
                isMobile ? "text-xl" : "text-2xl"
              } mb-4 text-center_ font-semibold text-gray-600`}
            >
              FAQs for {region.name}
            </div>
            <FAQs data={faqs} />
          </div>
        ) : (
          ""
        )}

        {travel ? (
          <>
            <div className="container mt-8">
              {/* <h1 className={tw`mt-8 ${isMobile?"text-xl":'text-2xl'} mb-4 text-center_ font-semibold`}>Read more About {region?.name}</h1> */}
              {/* <Content data={travel} collapse={true}/> */}

              <Link
                // href={createTGStateURL({city:travel.tg.cityName,id:travel.tg.id})}
                href={tgURL}
              >
                {/* Travel Guide {travel.tg.cityName} */}
                <div
                  className={tw`flex flex-wrap items-center bg-white p-4 lg:p-6 rounded-lg hover:shadow-lg transition-shadow`}
                >
                  <div className={tw`w-full lg:w-1/2`}>
                    <div className="relative h-40 lg:h-60">
                      <Image
                        className="rounded-lg"
                        src={travel.images[0]?.i}
                        fill
                      />
                    </div>
                  </div>
                  <div
                    className={tw`w-full lg:w-1/2 pl-4 lg:pl-0 pt-4 lg:pt-0`}
                  >
                    <div>
                      <h3
                        className={tw`text-2xl lg:text-3xl font-bold text-center text-gray-500`}
                      >
                        More about {travel.tg.cityName} tourism{" "}
                        <BsArrowRight className="inline _b_active font-bold" />{" "}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {(page_type == "STATE" || page_type == "COUNTRY") && travel?.ctg ? (
              <div className="container mt-16  ">
                <div className="box_design_common title_kiomoi">
                  <h4>Top cities to visit in {region.name}</h4>
                  <div className={`flex flex-wrap mt-4`}>
                    {/* <h2>Top Cities</h2> */}
                    <TopCities data={travel} attlimit={8} _package={true} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {page_type == "CITY" && travel.attn.length != 0 ? (
              <div className="container_ mt-4">
                <State_Attraction data={travel.attn} />
              </div>
            ) : (
              ""
            )}
            {reviews != undefined && reviews?.length != 0 ? (
              <Reviews data={reviews} />
            ) : (
              ""
            )}
            {/* page_type == "STATE" ||  */}

            {page_type == "CITY" ? (
              <>{articles.length ? <Articles data={articles} /> : ""}</>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </article>



      <div className="bottom_bar">
        <div className={tw`h-full`}>
          <div className={tw`flex h-full shadow-[3px 1px 4px]`}>
            <a
              href="tel:+919650687940"
              className="w-full"
            >
              <div className="flex items-center w-full bottom_bt text-[22px] m-auto justify-center">
                <FaPhoneAlt />
                <div className="pl-2">Call</div>

              </div>
            </a>
          </div>
        </div>
      </div>




      {sendquery ? (
        <LeadForm
          isshow={sendquery}
          packageid={modalinfo.id}
          packageName={modalinfo.name}
          changeForm={updateChangeForm}
        />
      ) : (
        ""
      )}

    </>
  );
};
export default ListPageMobile;
