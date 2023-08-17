import { BsDot } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import * as Constants from "../Constants";
import Link from "next/link";
import Image from "next/image";
import { imgNameByUrl, jpgToWebp } from "../fun";

const SinglePack = ({ item, aurl, i, userRating }) => {
  return (
    <>
      <Link href={aurl} key={i}>
        <div href={aurl}>
          <div className={`col-sm-12 col-xs-12 pl-[15px] pr-[15px]`}>
            <div className={`top_rated_box _st_box _tr_box bg-white`}>
              <div className="des_img">
                <Image
                  className="img-responsive"
                  fill
                  src={
                    item.images.split("~")[0]
                      ? jpgToWebp({ uri: item.images.split("~")[0] })
                      : `${Constants.assets_api}/public/icons/logo-icon.png`
                  }
                  alt={imgNameByUrl({
                    url: item.images.split("~")[0] ?? item.name,
                  })}
                />
                <div className="content_rated">
                  <div className="nature_text_">
                    <h4>{item.theme?.split("#")[0]}</h4>
                    <span className="days">
                      {item.nights} Days - {item.nights - 1} Nights
                    </span>
                    <div className={`two_peoples flex items-center`}>
                      <span className={`frieds inline`}>
                        <img src={"/icons/friends.svg"} alt="2 peoples" />
                      </span>
                      <span className={`days inline`}> 2 People </span>
                    </div>
                    <div className="_text_trip">
                      <h4>{item.name}</h4>
                      <p>{item.description.substring(0, 70)}...</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="price_List">
                <div className="price_break">
                  {item.percent > 0 ? (
                    <div className="cut_price percentage">
                      {item.percent}% <br /> Off
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="price_break x1">
                  <div className="_star">
                    {/* {indents} */}
                    {userRating}
                  </div>
                  <div className="user_rating">
                    {item.sratings} <BsDot className="inline" />
                    {item.susers} User Rating
                  </div>
                </div>

                {item.discount > 0 ? (
                  <>
                    {/* <span className="_list_p" style={{display:'none'}}>{item.percent}% Off</span> */}
                    <div className={`text-right`}>
                      <FaRupeeSign
                        className={`inline text-[#999] text-[12px] mb-[4px]`}
                      />
                      <del>
                        {/* <i className="fa fa-inr"></i> */}
                        {item.price}/-
                      </del>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="m-bot20"></div>
                    {/* <div className="m-bot20"></div> */}
                  </>
                )}
                <div className={`price_tag flex items-center justify-between`}>
                  <span className="start_from">Started from</span>
                  <span className={`price_inr position`}>
                    <FaRupeeSign
                      className={`inline text-[#f79421] text-[15px] mb-[4px]`}
                    />
                    {item.finalprice}/-
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SinglePack;
