import Image from "next/image";

import { BsCheckCircle } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import LeadForm from "../leadform";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
// import { Collapse,Accordion } from 'react-bootstrap';
import { useEffect } from "react";

const Rooms1 = ({ rooms, selectedRoom, selectRoom }) => {
  const [sendquery, setSendquery] = useState(false);
  // const [modalcity,setModalcity] = useState()
  const [modalinfo, setModalinfo] = useState({});

  const updateChangeForm = (val) => {
    setSendquery(val);
  };

  const _sendquery = (price, id, name, city) => {
    setModalinfo({
      id,
      name,
      city,
      price,
    });
    setSendquery(true);
  };

  return (
    <div>
      {rooms.map((e, index) => {
        return (
          <div className={`mt-2`}>
            <div className={`flex flex-wrap p-3 bwhite mb-4 rounded-[8px]`}>
              <div className={`w-full lg:w-1/4`}>
                {/* {e.name} */}
                <img className="hotel_img" src={e.images} alt={e.name} />
              </div>
              <div className={`w-full lg:w-3/4`}>
                <div className={`pl-0 lg:pl-4`}>
                  <div className={`flex justify-between`}>
                    <div className={``}>
                      <h2 className={`font-bold text-base`}>{e.name}</h2>
                      <div className={`mt-2`}>
                        <div className={`flex flex-wrap`}>
                          <span className="frieds">
                            <img src={"/icons/friends_.svg"} alt="2 people" />
                          </span>
                          <span className="_2_two">2</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="price_inr text-right">
                        <FaRupeeSign
                          className={`inline text-[#f79421] text-[15px] mb-[4px]`}
                        />
                        {e.price == 0 ? (
                          <span>Price On Request</span>
                        ) : (
                          <span>{e.price}/-</span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className={`text-[8.8px] text-[#999]`}>
                          Per person on twin sharing
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {e.amenities.split(",").map((am, index) => {
                      return (
                        <li className={`inline pr-2`}>
                          <div className={`inline`}>
                            <BsCheckCircle
                              color="#44c554"
                              className={`inline`}
                            />
                            <div className={`pl-1 f12 inline`}>{am}</div>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                  <div className={`flex flex-wrap items-center pt-2`}>
                    <div className={`font-bold f12`}>Meal : </div>
                    <div className={`f12 pl-1`}>
                      {e.meals == "CP"
                        ? "CP - Room with Breakfast"
                        : e.meals == "MAP"
                        ? "MAP - Room with Breakfast, Dinner"
                        : e.meals == "AP"
                        ? "AP - Room with Breakfast, Lunch and Dinner"
                        : ""}
                    </div>
                  </div>
                  <div>
                    <div className={`flex justify-between`}>
                      <div className={`flex checks mt-4`}>
                        <p>
                          <MdCheckCircle
                            className={`inline text-[#15be03]`}
                          />{" "}
                          Free Cancellation
                          {/* <br/><MdCheckCircle className='inline' style={{color:'#15be03'}} /> Part Payment */}
                        </p>
                        <p className={`pl-2`}>
                          <MdCheckCircle
                            className={`inline text-[#15be03]`}
                          />{" "}
                          Part Payment
                        </p>
                      </div>
                      <button
                        className={`btn_listing ${
                          selectedRoom.id == e.id &&
                          selectedRoom.meals == e.meals
                            ? "_selected"
                            : ""
                        }`}
                        onClick={() => selectRoom(e)}
                        // onClick={()=>_sendquery(e.price,e.id,e.name,e.hid)}
                      >
                        {selectedRoom.id == e.id &&
                        selectedRoom.meals == e.meals
                          ? "Selected"
                          : "Select and Book"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <LeadForm
        key={1}
        isshow={sendquery}
        packageid={modalinfo.id}
        packageName={modalinfo.name}
        changeForm={updateChangeForm}
      />
    </div>
  );
};

const Rooms = ({ rooms, selectedRoom, selectRoom }) => {
  const [sendquery, setSendquery] = useState(false);
  // const [modalcity,setModalcity] = useState()
  const [modalinfo, setModalinfo] = useState({});
  const [collapse, setCollapse] = useState(null);
  // const [first,setFirst] = useState(true)

  const updateChangeForm = (val) => {
    setSendquery(val);
  };

  useEffect(() => {
    setCollapse(0);
  }, []);

  return (
    <div>
      {rooms.map((e, index) => {
        return (
          <div className={`mt-2`}>
            <div
              className={`flex flex-wrap bwhite mb-4 rounded-[8px] border-1 border-slate-300`}
            >
              <div
                className={`p-2 bg-[#F8F8F8] w-full rounded-[8px] border-1 border-slate-300`}
              >
                <div
                  className={`flex justify-between cursor-pointer text-[#4393F9]`}
                  onClick={() =>
                    collapse === index ? setCollapse(null) : setCollapse(index)
                  }
                >
                  <div className={`flex items-center`}>
                    {collapse === index ? (
                      <IoMdArrowDropdown className={`font-bold text-xl`} />
                    ) : (
                      <IoMdArrowDropright className={`font-bold text-xl`} />
                    )}

                    <h2 className={`font-bold`}>{e.name}</h2>
                  </div>
                  {collapse != index ? (
                    <div>
                      <div className="price_inr">
                        <FaRupeeSign
                          className={`inline text-[#f79421] text-[15px] mb-[4px]`}
                        />
                        {e.price == 0 ? (
                          <span>Price On Request</span>
                        ) : (
                          <span>{e.price}/-</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {collapse != index ? (
                <div className={`w-full p-2 px-4`}>
                  <div className={`flex justify-between`}>
                    <div className={`flex flex-wrap`}>
                      <span className="frieds">
                        <img src={"/icons/friends_.svg"} alt="2 peoples" />
                      </span>
                      <span className="_2_two">2</span>
                    </div>
                    <div>
                      <span className={`font-bold text-gray-500`}>
                        Bedroom:
                      </span>
                    </div>
                    <div>
                      <span className={`font-bold text-gray-500`}>
                        Living Room:
                      </span>
                    </div>
                    <div>
                      <span
                        className={`cursor-pointer text-[#f79421]`}
                        onClick={() =>
                          collapse === index
                            ? setCollapse(index)
                            : setCollapse(index)
                        }
                      >
                        Full Details
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div in={collapse === index ? true : false}>
                <div className={`w-full p-4`}>
                  <div className={`flex flex-wrap`}>
                    <div className={`w-full lg:w-1/4`}>
                      <img
                        className="hotel_img"
                        src={e.images}
                        alt="hotel images"
                      />
                    </div>
                    <div className={`w-full lg:w-3/4`}>
                      <div className={`flex justify-between pl-4`}>
                        <div>
                          <div className={`flex flex-wrap`}>
                            <span className="frieds">
                              <img src={"/icons/friends_.svg"} alt="2 people" />
                            </span>
                            <span className="_2_two">2</span>
                          </div>
                          <div className={`w-full pt-2`}>
                            <div className={`font-bold text-gray-500`}>
                              BedRoom :{" "}
                            </div>
                            <div className={`font-bold text-gray-500`}>
                              Room Size :{" "}
                            </div>
                            <div className={`font-bold text-gray-500`}>
                              Living Room :{" "}
                            </div>
                          </div>
                        </div>

                        <div className={`text-right`}>
                          <div className={`text-gray-500`}>
                            1 Room Per Night
                          </div>
                          <div className="price_inr">
                            <FaRupeeSign
                              className={`inline text-[#f79421] text-[15px] mb-[4px]`}
                            />
                            {e.price == 0 ? (
                              <span>Price On Request</span>
                            ) : (
                              <span>{e.price}/-</span>
                            )}
                          </div>
                          <div>
                            <div
                              className={`flex flex-wrap items-center pt-2`}
                            >
                              <div className={`font-bold f12`}>Meal : </div>
                              <div className={`f12 pl-1`}>
                                {e.meals == "CP"
                                  ? "CP - Room with Breakfast"
                                  : e.meals == "MAP"
                                  ? "MAP - Room with Breakfast, Dinner"
                                  : e.meals == "AP"
                                  ? "AP - Room with Breakfast, Lunch and Dinner"
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`flex justify-between`}>
                    <div className={`pt-3`}>
                      {e.amenities.split(",").map((am, index) => {
                        return (
                          <li className={`inline`}>
                            <div className={``}>
                              <BsCheckCircle
                                color="#44c554"
                                className={`inline`}
                              />
                              <div
                                className={`pl-1 f12 inline text-gray-500`}
                              >
                                {am}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </div>
                    <div className={``}>
                      <button
                        className={`btn_listing ${
                          selectedRoom.id == e.id &&
                          selectedRoom.meals == e.meals
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => selectRoom(e)}
                        // onClick={()=>_sendquery(e.price,e.id,e.name,e.hid)}
                      >
                        {selectedRoom.id == e.id &&
                        selectedRoom.meals == e.meals
                          ? "Selected"
                          : "Select and Book"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <LeadForm
        key={1}
        isshow={sendquery}
        packageid={modalinfo.id}
        packageName={modalinfo.name}
        changeForm={updateChangeForm}
      />
    </div>
  );
};

export default Rooms;
