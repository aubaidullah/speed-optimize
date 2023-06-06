// import {useEffect,useState} from 'react'
import * as Constants from "./Constants";
import { useState,useEffect,useRef } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import SimpleReactValidator from "simple-react-validator";
import swalr from '@sweetalert/with-react'
import axios from "axios";
// import LeadGuest from './Leadguest'
import swal from "sweetalert";
import Cookie from 'js-cookie'
import dynamic from "next/dynamic";
// import { tw } from "twind";
// import Modal from "./modal";


const Modal = dynamic(() => import('./modal'))
const LeadGuest = dynamic(() => import('./Leadguest'))
const DatePicker = dynamic(() => import('@amir04lm26/react-modern-calendar-date-picker'))

const LeadForm = ({isshow,packageid,packageName,packPrice,source,changeForm}) =>{
    // console.log(isshow)
    const [show,setShow] = useState(isshow)
    const [msg,setMsg] = useState("Send Enquiry")
    const [isclick,setIsclick] = useState(false)
    // const [name,setName] = useState(localStorage.getItem('username')??"")
    // const [email,setEmail] = useState(localStorage.getItem('useremail')??"")
    // const [mobile,setMobile] = useState(localStorage.getItem('userphone')??"")

    const [name,setName] = useState(Cookie.get('username')??"")
    const [email,setEmail] = useState(Cookie.get('useremail')??"")
    const [mobile,setMobile] = useState(Cookie.get('userphone')??"")    


    const [city,setCity] = useState("")
    const [traveldate,setTraveldate] = useState("")
    const [duration,setDuration] = useState("")
    const [adult,setAdult] = useState("")
    const [children,setChildren] = useState("")
    const [rerender, setRerender] = useState(false);
    
    const [open, setOpen] = useState(false);
    // const registervalidator = new SimpleReactValidator();
    const registervalidator = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState();

    // const [show, setShow] = useState(false);

    // console.log(show)
    var dt = new Date()
    const x = dt.toJSON().split("T")[0].split("-")

    const minDate = {
        "year":x[0],
        "month":x[1],
        "day":x[2]
      }

    const handleQuerysubmit = async () => {
    
        var tDate = `${traveldate['year'].toString()}-${traveldate['month'].toString().padStart(2,0)}-${traveldate['day'].toString().padStart(2,0)}`
        var dd = new Date(tDate)
        var newdate = new Date(tDate);
        console.log("checkindate...")
        console.log(dd)
        newdate.setDate(dd.getDate()+parseInt(duration))
        newdate = newdate.toLocaleDateString().split("/")

        const checkoutdate = newdate[2]+"-"+newdate[1].padStart(2,0)+"-"+newdate[0].padStart(2,0)

        console.log(traveldate)
        
        // if (localStorage.getItem('userid')) {
            // if (traveldate != "") {
            // if (false) {
                console.log(registervalidator.current.allValid())    
                if (registervalidator.current.allValid()) {
                    if (Cookie.get('userid')) {
                        if (isclick === false){
                            setIsclick(true)
                            setMsg("Please wait....")
                        }
                        let leaddata = new FormData(); //leaddata object
                        leaddata.append("platform", Constants.pt);
                        leaddata.append("name", name);
                        leaddata.append("email", email);
                        leaddata.append("mobile", mobile);
                        leaddata.append("adults", adult);
                        leaddata.append("childcount", children.length==0?0:children);
                        leaddata.append("cname", city);
                        leaddata.append("from", tDate);
                        leaddata.append("to", checkoutdate);
                        leaddata.append("pid", packageid);
                        leaddata.append("query", "");
                        leaddata.append("btype", "package");
                        console.log(checkoutdate)
                        const res = await axios.post(Constants.api + "/api/v1/lead/submit", leaddata)
                        console.log(res)
                        if (res?.data?.result == "success") {
                            changeForm(false)

                            gtag('event', 'conversion', {'send_to': 'AW-852061552/PkRJCKD_yJMBEPDapZYD'});
                                // <swal
                                //   showCloseButton
                                //   confirmBtnBsStyle="primary"
                                //   customIcon={require("../assets/download.png")}
                                // >
                                setName(Cookie.get('username')??"")
                                setEmail(Cookie.get('useremail')??"")
                                setMobile(Cookie.get('userphone')??"")
                                setCity("")
                                setTraveldate("")
                                setDuration("")
                                setAdult("")
                                setChildren("")
                                setMsg("Send Enquiry")
                                setIsclick(false)
                                swalr(
                                // "",
                                    <>
                                    <div className={`text-center mb-[15px]`}>
                                    <img alt="kiomoi" src={`${Constants.assets_api}/public/icons/download.png`} className={`inline m-auto`} />
                                    <p className={`pt-[10px] text-center text-[15px]`}>Thanks for query with Kiomoi, your reference number is <b>{res.data.output}</b></p>
                                    <p className={`text-center text-[10px]`}>We assure you within 24 hours response. Feel free to call us on <span className={`text-[#f16625]`}>+919650687940</span> or drop a mail on <a href={`mailto:info@kiomoi.com?Subject=Query regarding reference number "+${res.data.output} +"`} target='_top'><span className={`text-[#f16625]`} >info@kiomoi.com</span></a> for a sooner response</p>
                                    </div>
                                    </>,
                                    {
                                    buttons:false,
                                    timer: 4000,
                                    }
                                );
                                return true
                                // </swal>
                                // swal("", "Your Reference ID is " + res.data.output, "success");
                            } else {
                                swal(res.data.msg);
                            }

                    }
                    else{
                        return false
                    }
                } else {
                    console.log("show the message")    
                    registervalidator.current.showMessages()
                    forceUpdate(1)
                    return true
                    // return false
                };
                // forceUpdate()
            //   this.forceUpdate();
            // }
        // }
        // else{
        //     return false    
        // }
        
    


    };

    const handleSubmit =  async (e) =>{
        e.preventDefault()
        const result = await handleQuerysubmit()
        console.log(result)
        if (!result) {
            setOpen(!open)
            setShow(!show)
            // console.log("lskdjflksdjlkfjds")
        }        
    }

    console.log(isshow)
    useEffect(()=>{
        if (name != '' && email!= '' && mobile!='' && city!='' && traveldate!='' && duration!='' && adult!='') {

            console.log("Submit")
            handleQuerysubmit()
            return
        }
        
    },[show])
    return(
        <>
        {show ? <LeadGuest show={show} setShow={() => setShow(!show)} mobile={mobile} email={email} name = {name} /> : null}
        <Modal changeForm = {changeForm} show = {isshow}>
            
            <form onSubmit={handleSubmit} className={`bg-white`}>
              <div className="wrapper-box">
                <div className="wrapper_login">
                  <div className="body_login">
                    <div className="login_header">
                      <div className={`flex align-center`}>
                        <img
                            src={`${Constants.assets_api}/public/icons/logo-icon.png`}
                            height="50"
                            alt="kiomoi"
                            className={`m-auto`}
                            // style={{margin:'0 auto'}}
                        />

                      </div>
                      
                      <h4 className={`text-xl`}>{packageName}</h4>
                    </div>


                <div className="form-group ">
                    <input
                        type="text"
                        className="form-control"
                        name="fname"
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                        placeholder="Enter your Name"

                        // value={localStorage.getItem('username')??name}
                        disabled={Cookie.get('username')?true:false}


                        required
                    />

                    <div className="Invalid_num">
                        {registervalidator.current.message(
                        "name",
                        name,
                        "required"
                        )}
                    </div>
                    </div>

                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your Email ID"
                        required
                        // value={localStorage.getItem('useremail')??email}
                        disabled={Cookie.get('useremail')?true:false}
                        
                    />
                    <div className="Invalid_num">
                        {registervalidator.current.message(
                        "email",
                        email,
                        "required|email"
                        )}
                    </div>
                    </div>
                    <div className="form-group">
                    <input
                    pattern="[0-9.]+"
                    type="text"
                        onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                        }}
                        // type="text"
                        className="form-control"
                        name="mobile"
                        onChange={(e)=>setMobile(e.target.value)}
                        value={mobile}
                        placeholder="Enter your 10 digit Mobile Number "
                        maxLength={10}
                        max={10}
                        size={10}
                        
                        // value={localStorage.getItem('userphone')??mobile}
                        disabled={Cookie.get('userphone')?true:false}

                        required
                    />
                    <div className="Invalid_num">
                        {registervalidator.current.message(
                        "mobile",
                        mobile,
                        "required|min:10|max:10"
                        )}
                    </div>
                    </div>
                    <div className="form-group">
                    {/* <input
                        type="city"
                        className="form-control"
                        name="city"
                        onChange={this.cityhandleChange}
                        value={this.state.value}
                        placeholder="Enter your city"
                    /> */}
                    <input  list="citiess" placeholder="I Am Travelling From" onChange={(e)=>setCity(e.target.value)} value={city} name="city" className="form-control" id="Starting_City" required/>
                    <datalist id="citiess"> 
                        <option value="" id="sc_">Travelling from </option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Kolkatta">Kolkatta</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option className={`text-gray-500`} disabled>---------------------------</option>
                        <option value="Agartala">Agartala</option>
                        <option value="Agra">Agra</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Ahmednagar">Ahmednagar</option>
                        <option value="Aizawal">Aizawal</option>
                        <option value="Ajmer">Ajmer</option>
                        <option value="Aligarh">Aligarh</option>
                        <option value="Allahabad">Allahabad</option>
                        <option value="Ambala">Ambala</option>
                        <option value="Amritsar">Amritsar</option>
                        <option value="Anand">Anand</option>
                        <option value="Anantapur">Anantapur</option>
                        <option value="Andra Pradesh">Andra Pradesh</option>
                        <option value="Ankleshwar">Ankleshwar</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Asansol">Asansol</option>
                        <option value="Assam">Assam</option>
                        <option value="Aurangabad">Aurangabad</option>
                        <option value="Bareilly">Bareilly</option>
                        <option value="Bathinda">Bathinda</option>
                        <option value="Belgaum">Belgaum</option>
                        <option value="Bellary">Bellary</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Bhagalpur">Bhagalpur</option>
                        <option value="Bharuch">Bharuch</option>
                        <option value="Bhavnagar">Bhavnagar</option>
                        <option value="Bhillai">Bhillai</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Bhubaneshwar">Bhubaneshwar</option>
                        <option value="Bhuj">Bhuj</option>
                        <option value="Bidar">Bidar</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Bilaspur">Bilaspur</option>
                        <option value="Bokaro">Bokaro</option>
                        <option value="Calicut">Calicut</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Cochin">Cochin</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Cuddalore">Cuddalore</option>
                        <option value="Cuttak">Cuttak</option>
                        <option value="Dadra & Nagar Haveli-Silvassa">Dadra & Nagar Haveli-Silvassa</option>
                        <option value="Dalhousie">Dalhousie</option>
                        <option value="Daman & Diu">Daman & Diu</option>
                        <option value="Dehradun">Dehradun</option>
                        <option value="Dhanbad">Dhanbad</option>
                        <option value="Dharmasala">Dharmasala</option>
                        <option value="Dharwad">Dharwad</option>
                        <option value="Dimapur">Dimapur</option>
                        <option value="Durgapur">Durgapur</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Erode">Erode</option>
                        <option value="Faizabad">Faizabad</option>
                        <option value="Faridabad">Faridabad</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Gangtok">Gangtok</option>
                        <option value="Ghaziabad">Ghaziabad</option>
                        <option value="Gir">Gir</option>
                        <option value="Goa">Goa</option>
                        <option value="Gorakhpur">Gorakhpur</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Gulbarga">Gulbarga</option>
                        <option value="Guntakal">Guntakal</option>
                        <option value="Guntur">Guntur</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Guwahati">Guwahati</option>
                        <option value="Gwalior">Gwalior</option>
                        <option value="Haldia">Haldia</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Hisar">Hisar</option>
                        <option value="Hosur">Hosur</option>
                        <option value="Hubli">Hubli</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Imphal">Imphal</option>
                        <option value="Indore">Indore</option>
                        <option value="Itanagar">Itanagar</option>
                        <option value="Jabalpur">Jabalpur</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Jaisalmer">Jaisalmer</option>
                        <option value="Jalandhar">Jalandhar</option>
                        <option value="Jalgaon">Jalgaon</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jammu">Jammu</option>
                        <option value="Jamnagar">Jamnagar</option>
                        <option value="Jamshedpur">Jamshedpur</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Jodhpur">Jodhpur</option>
                        <option value="kakinada">kakinada</option>
                        <option value="Kandla">Kandla</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Karnal">Karnal</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerela">Kerela</option>
                        <option value="Kharagpur">Kharagpur</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Kolar">Kolar</option>
                        <option value="Kolhapur">Kolhapur</option>
                        <option value="Kolkatta">Kolkatta</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Kota">Kota</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Kulu/Manali">Kulu/Manali</option>
                        <option value="kurnool">kurnool</option>
                        <option value="Kurukshetra">Kurukshetra</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Ludhiana">Ludhiana</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Mangalore">Mangalore</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Mathura">Mathura</option>
                        <option value="Meerut">Meerut</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Mohali">Mohali</option>
                        <option value="Moradabad">Moradabad</option>
                        <option value="Mumbai Suburbs">Mumbai Suburbs</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Mysoru/Mysore">Mysoru/Mysore</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Nagerkoil">Nagerkoil</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Nasik">Nasik</option>
                        <option value="Navi Mumbai">Navi Mumbai</option>
                        <option value="Nellore">Nellore</option>
                        <option value="Nizamabad">Nizamabad</option>
                        <option value="Noida">Noida</option>
                        <option value="Noida">Noida</option>
                        <option value="Ooty">Ooty</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Palghat">Palghat</option>
                        <option value="Panipat">Panipat</option>
                        <option value="Panjim/Panaji">Panjim/Panaji</option>
                        <option value="Paradeep">Paradeep</option>
                        <option value="Pathankot">Pathankot</option>
                        <option value="Patiala">Patiala</option>
                        <option value="Patna">Patna</option>
                        <option value="Pondichery">Pondichery</option>
                        <option value="Porbandar">Porbandar</option>
                        <option value="Pune">Pune</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Puri">Puri</option>
                        <option value="Raipur">Raipur</option>
                        <option value="Rajahmundry">Rajahmundry</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Ranchi">Ranchi</option>
                        <option value="Rohtak">Rohtak</option>
                        <option value="Roorkee">Roorkee</option>
                        <option value="Rourkela">Rourkela</option>
                        <option value="Salem">Salem</option>
                        <option value="Shillong">Shillong</option>
                        <option value="Shimla">Shimla</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Silchar">Silchar</option>
                        <option value="Siliguri">Siliguri</option>
                        <option value="Solapur">Solapur</option>
                        <option value="Srinagar">Srinagar</option>
                        <option value="Surat">Surat</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Tamil Nadu-Other">Tamil Nadu-Other</option>
                        <option value="Thanjavur">Thanjavur</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Tirunalveli">Tirunalveli</option>
                        <option value="Tirupati">Tirupati</option>
                        <option value="Trichy">Trichy</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Trivandrum">Trivandrum</option>
                        <option value="Tuticorin">Tuticorin</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Ujjain">Ujjain</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttaranchal">Uttaranchal</option>
                        <option value="Vadodara/Baroda">Vadodara/Baroda</option>
                        <option value="Valsad">Valsad</option>
                        <option value="Vapi">Vapi</option>
                        <option value="Varanasi/Banaras">Varanasi/Banaras</option>
                        <option value="Vasco Da Gama">Vasco Da Gama</option>
                        <option value="Vellore">Vellore</option>
                        <option value="Vijayawada">Vijayawada</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                        <option value="Warangal">Warangal</option>
                        <option value="West Bengal">West Bengal</option>
                    </datalist>
                    <div className="Invalid_num">
                        {registervalidator.current.message(
                        "city",
                        city,
                        "required"
                        )}
                    </div>
                    </div>
                {/* <div>
                    <div style={{width:'50%',fontWeight:'bold'}}>
                        Departure Date
                    </div>
                    <div style={{width:'50%',fontWeight:'bold'}}>
                        Duration
                    </div>
                </div> */}


                <div className={`form-group flex`}>
                    
                    <div className={`w-full`}>

                    {/* <input 
                    type="text"
                    name = "date" 
                    onFocus = {this._onFocus} 
                    onBlur={this._onBlur}
                    
                    onChange = {this.checkindateChange}
                    placeholder="Departure Date"
                    className="form-control" style={{marginTop:'5px',marginRight:'10px'}} min = {dateT} required></input>
                    */}
                    
                    {/* <input type="date" placeholder="yyyy/mm/dd" className='form-control' style={{marginTop:'5px',marginRight:'10px'}}></input> */}
                    
                    <DatePicker
                    // style={{marginTop:'5px'}}
                    // minDate = {new Date()}
                    inputPlaceholder="Departure Date"
                    inputClassName="form-control"
                    // format="dd-MM-y"
                    value = {traveldate}
                    minimumDate={minDate}
                    onChange={(date) => setTraveldate(date)}
                    required
                    // withPortal
                    // value = "sdlfsdlkf"
                    // value = {this.state.cDate}
                    // fixedHeight
                    />


                    <div className="Invalid_num">
                        {registervalidator.current.message(
                        "date",
                        traveldate,
                        "required"
                        )}
                    </div>
                    </div>
                    
                    {/* <DatePicker
                    
                    /> */}
                    <div className={`ml-[20px] w-full`}>
                    <input
                        pattern="[0-9.]+"
                        type="number"

                        onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                        }}
                        
                        name="days"
                        className='form-control' 
                        placeholder="Days" 
                        // style={{marginTop:'5px'}}
                        min="1"
                        onChange={(e)=>setDuration(e.target.value)}
                        required
                    >
                    </input>
                    
                    <div className="Invalid_num">
                        {registervalidator.current.message(
                        "days",
                        duration,
                        "required"
                        )}
                    </div>
                    </div>
                </div>
                    
        {/* 
                    {this.state.checkoutdate == "" ? (
                    <>
                        {" "}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            variant="inline"
                            name="checkoutdate"
                            className="form-control"
                            onChange={this.checkoutdateChange.bind(this)}
                            dateFormat="yyyy-mm-dd"
                            placeholderText="Check out date"
                        />
                        </MuiPickersUtilsProvider>
                    </>
                    ) : (
                    <>
                        <div className="form-control">
                        <b style={{padding:'0px'}}> {this.state.checkoutdate} </b>{" "}

                        <i className="fa fa-pencil" onClick={() => this.changecheckoutdate()} style={{float:'right'}} aria-hidden="true"></i>
                        </div>
                    </>
                    )} */}
                    {/* <div className="form-group">
                    <input
                        type="specialrequest"
                        className="form-control"
                        name="specialrequest"
                        onChange={this.specialrequesthandleChange}
                        value={this.state.value}
                        placeholder="Any Special Request"
                    />
                    </div> */}
                    <div className={`form-group flex`}>
                    <div className={`w-full`}>
                        <input
                        pattern="[0-9.]+"
                        type="text"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}

                        // type="adults"
                        className={`form-control mr-[10px] mt-[0]`}
                        name="adults"
                        onChange={(e)=>setAdult(e.target.value)}
                        value={adult}
                        placeholder="Adults"
                        min = "1"
                        // style={{marginRight:'10px',marginTop:'0px'}}
                        maxLength={2}
                        required
                        />

                        <div className="Invalid_num">
                        {registervalidator.current.message(
                            "adults",
                            adult,
                            "required"
                        )}
                        </div>
                    </div>


                    <div className={`ml-[20px] w-full`}>
                        <input
                        pattern="[0-9.]+"
                        type="text"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        // type="children"
                        className={`form-control mt-0`}
                        name="children"
                        onChange={(e)=>setChildren(e.target.value)}
                        value={children}
                        min="0"
                        // size={2}
                        // max={2}
                        maxLength={2}
                        placeholder="Children(5-12 yrs)"
                        // style={{marginTop:'0px'}}
                        
                        />
                    </div>



                    </div>
                    {/* <div className="form-group">
                    
                    </div> */}



                    
                    <div className="form-group">
                      <button className="btn_listing _btn_clr w-full" type="submit">
                        {msg}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            
        </Modal>
      </>
    )
}

export default LeadForm