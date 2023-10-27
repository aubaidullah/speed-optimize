import { useState } from "react";
import { tw } from "twind";
import * as Constants from "../Constants";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import {
  BsDot,
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsFillCheckCircleFill,
  BsPlusLg,
} from "react-icons/bs";
import swal from "sweetalert";
import Guest from '@/components/guest'


const ReviewRender = ({ reviews }) => {
  const [maxReview, setMaxreview] = useState(5);

  return (
    <>
      {reviews?.reviews.slice(0, maxReview).map(function (item, index) {
        return (
          <div className={tw`my-5`}>
            <div
              className={tw`w-full lg:w-2/3 flex flex-col md:flex-row justify-between items-start md:items-center`}
            >
              <div className={tw`flex justify-between items-center gap-3 ms-2`}>
                <div className="coment_photo bg-gray-500 rounded-full flex justify-center">
                  <div
                    // src={`${Constants.assets_api}/public/icons/user_photo.png`}
                    className={tw`rounded-full flex items-center text-white text-xl`}
                    alt="user icon"
                  >
                  {item.cName[0]}
                  </div>
                </div>
                <div className="coment_title-">
                  <h3 className={tw`text-md font-semibold fs-6`}>{item.cName}</h3>
                </div>
              </div>
              <div className={tw`w-full md:w-auto`}>
                <div>
                  <div className={tw`flex flex-row-reverse`}>
                    {Array.from("12345")
                      .reverse()
                      .map((i) =>
                        Number(i) <= item.ratings ? (
                          <BsStarFill
                            key={i}
                            className={tw`d_icon_size inline`}
                          />
                        ) : (
                          <BsStar key={i} className={tw`d_icon_size inline`} />
                        ),
                      )}
                  </div>
                </div>
                <div className={tw`flex flex-row-reverse items-center`}>
                  <div>
                    <BsFillCheckCircleFill
                      size={10}
                      className={tw`inline mr-[3px]`}
                      color="gray"
                    />
                    <span className={tw`text-xs`}>Verfied Review</span>
                    <span className={tw`mx-1`}> | </span>
                    <span className={tw`text-xs`}>
                      {moment(item.modifiedDate).format("DD MMMM YYYY, HH:MM")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={tw`ms-2 mt-2 w-full lg:w-2/3`}>
              <p className={tw`text-md ms-2 mt-2`}>{item.review}</p>
              {/* <details>
                <summary className={tw`text-xs font-semibold text-[#f06726]`}>
                  <span>Read</span>
                </summary>
                <p className={tw`text-md ms-2 mt-2`}>{item.review}</p>
              </details> */}
            </div>
          </div>
        );
      })}
    </>
  );
};

const Reviews = ({ reviews, data }) => {
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  const [maxReview, setMaxReview] = useState(5);
  const [show,setShow] = useState(false)

  const reviewSubmit = async (e) => {
    e?.preventDefault();
    if (!rating) {
      swal("Please give stars");
      return;
    }
    if (localStorage.getItem("userid")) {
      let leaddata = new FormData();

      images.forEach((image) => leaddata.append("files", image));

      leaddata.append("pid", data?.package.id);
      leaddata.append("pname", data?.package.name);
      leaddata.append("mobile", localStorage.getItem("userphone"));
      leaddata.append("userid", localStorage.getItem("userid"));
      leaddata.append("name", localStorage.getItem("username"));
      leaddata.append("review", reviewText);
      leaddata.append("ratings", rating);
      leaddata.append("ptype", "STATE");
      leaddata.append("recommended", true);
      leaddata.append("bdate", moment(new Date()).format("YYYY-M-D"));

      const response = await axios.post(
        Constants.api + "/api/v1/review/add",
        leaddata,
      );

      if (response?.data?.result === "success") {
        swal("", "Thanks for your Valuable Feedback. ", "success");
        setReviewText("");
        setImages([]);
      }

      return;
    } else {
      setShow(!show);
    }
  };

  const uploadMultipleFiles = (e) => {
    let fileArray = [];
    // this.fileObj.push(e.target.files)
    for (let i = 0; i < e.target.files.length; i++) {
      fileArray.push(URL.createObjectURL(e.target.files[i]));
    }
    setImages(fileArray);
    // this.setState({ file: this.fileArray })
  };
  // console.log(filearry)
  console.log(images);

  return (
    
    <section className="container">
      {show ? <Guest show={show} setShow={() => setShow(!show)} /> : null}
      <div className={tw`title_kiomoi`}>
        <h4>Give Your Review on this Package</h4>
        <form onSubmit={reviewSubmit}>
          <div
            className={tw`box_comment_post Shape_42 p-3 p-md-4 p-lg-5 mt-4 w-full lg:w-2/3`}
          >
            <div className={tw`flex justify-between items-center`}>
              <div>
                <span
                  className={tw`text-xs md:text-lg font-semibold md:font-normal`}
                >
                  Your Feedback*
                </span>
              </div>
              <div>
                <div className={tw`flex items-center`}>
                  <span className={tw`text-xs md:text-base me-1`}>
                    Rate your trip :{" "}
                  </span>
                  <ReactStars
                    count={5}
                    value={rating}
                    onChange={(rating) => setRating(rating)}
                    size={20}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </div>

            <div className="form-group style_form mt-2 h-[130px]">
              <textarea
                className={tw`form-control h-full`}
                name="review"
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Please write at least 100 characters about your experience at this destination."
              />
            </div>
            <div className={tw`flex justify-between`}>
              <div
                className={tw`flex items-center text-xs md:text-lg font-semibold md:font-normal`}
              >
                <div>Upload Photos</div>
                <label htmlFor="contained-button-file">
                  <div className={tw`border p-2 ms-3 cursor-pointer`}>
                    <div class="upload_box">
                      <label
                        class="custom-file-upload"
                        for="file-upload"
                        id="custom-text"
                      >
                        <BsPlusLg className="cursor-pointer" />
                      </label>
                      <input
                        className="hidden"
                        id="file-upload"
                        name="uploaded_file"
                        type="file"
                        onChange={(e) => uploadMultipleFiles(e)}
                        multiple
                      />
                    </div>
                  </div>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className={`btn_anchor submit_btn _btn_post px-4`}
                >
                  Submit
                </button>
              </div>
            </div>

            <div className={tw`flex flex-wrap mt-4`}>
              {images &&
                images.map((image, i) => {
                  return (
                    <div key={i} className={tw`w-1/3 lg:w-1/4 p-1 lg:p-2`}>
                      <div>
                        <img
                          className="w-full h-[100px] lg:h-[200px]"
                          src={image}
                          // src={URL.createObjectURL(image)}
                          // alt="Image"
                          style={{
                            background: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundOrigin: "unset",
                            backgroundPosition: "top",
                          }}
                        ></img>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </form>
      </div>
      <div className="">
        <div className={tw`title_kiomoi`}>
          <h4>Reviews</h4>
          <hr className={tw`w-full lg:w-2/3 mt-3`} />
        </div>
        <div className="_line_review"></div>
        {reviews?.reviews.length > 0 ? (
          <ReviewRender reviews={reviews} />
        ) : (
          "No Reviews yet"
        )}
        {reviews?.reviews.length > 0 && maxReview == 5 ? (
          <div
            className={tw`text-[#999] w-full hover:text-black lg:w-2/3 flex flex-row-reverse text-lg font-bold cursor-pointer`}
            onClick={() => setMaxReview(reviews.count)}
          >
            View All
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Reviews;
