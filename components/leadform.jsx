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
import { tw } from "twind";
// import Modal from "./modal";


const Modal = dynamic(() => import('./modal'))
const LeadGuest = dynamic(() => import('./Leadguest'))
const DatePicker = dynamic(() => import('@amir04lm26/react-modern-calendar-date-picker'))

const LeadForm = ({isshow,packageid,packageName,packPrice,source,changeForm}) =>{
    // console.log(isshow)
    const [show,setShow] = useState(isshow)
    const [gshow,setGshow] = useState(false)
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
    const [ccode,setCcode] = useState("91")
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
                        leaddata.append("countrycodemo",ccode)
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
            setGshow(!gshow)
            // setShow(!show)
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
        
    },[gshow])
    // console.log(ccode)
    return(
        <>
        {gshow ? <LeadGuest show={gshow} setShow={() => setGshow(!gshow)} mobile={mobile} email={email} name = {name} /> : null}
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
                        <div className="flex">
                        <select className={tw`w-1/4 form-control`} onChange={(e)=>setCcode(e.target.value)}>
                        <option value="91">India +91</option>
                        {/* <option value="">phone</option> */}
                        <option value="93">Afghanistan +93</option>
                        <option value="358">Aland Islands +358</option>
                        <option value="355">Albania +355</option>
                        <option value="213">Algeria +213</option>
                        <option value="1684">American Samoa +1684</option>
                        <option value="376">Andorra +376</option>
                        <option value="244">Angola +244</option>
                        <option value="1264">Anguilla +1264</option>
                        <option value="672">Antarctica +672</option>
                        <option value="1268">Antigua and Barbuda +1268</option>
                        <option value="54">Argentina +54</option>
                        <option value="374">Armenia +374</option>
                        <option value="297">Aruba +297</option>
                        <option value="61">Australia +61</option>
                        <option value="43">Austria +43</option>
                        <option value="994">Azerbaijan +994</option>
                        <option value="1242">Bahamas +1242</option>
                        <option value="973">Bahrain +973</option>
                        <option value="880">Bangladesh +880</option>
                        <option value="1246">Barbados +1246</option>
                        <option value="375">Belarus +375</option>
                        <option value="32">Belgium +32</option>
                        <option value="501">Belize +501</option>
                        <option value="229">Benin +229</option>
                        <option value="1441">Bermuda +1441</option>
                        <option value="975">Bhutan +975</option>
                        <option value="591">Bolivia +591</option>
                        <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
                        <option value="387">Bosnia and Herzegovina +387</option>
                        <option value="267">Botswana +267</option>
                        <option value="55">Bouvet Island +55</option>
                        <option value="55">Brazil +55</option>
                        <option value="246">British Indian Ocean Territory +246</option>
                        <option value="673">Brunei Darussalam +673</option>
                        <option value="359">Bulgaria +359</option>
                        <option value="226">Burkina Faso +226</option>
                        <option value="257">Burundi +257</option>
                        <option value="855">Cambodia +855</option>
                        <option value="237">Cameroon +237</option>
                        <option value="1">Canada +1</option>
                        <option value="238">Cape Verde +238</option>
                        <option value="1345">Cayman Islands +1345</option>
                        <option value="236">Central African Republic +236</option>
                        <option value="235">Chad +235</option>
                        <option value="56">Chile +56</option>
                        <option value="86">China +86</option>
                        <option value="61">Christmas Island +61</option>
                        <option value="672">Cocos (Keeling) Islands +672</option>
                        <option value="57">Colombia +57</option>
                        <option value="269">Comoros +269</option>
                        <option value="242">Congo +242</option>
                        <option value="242">Congo, Democratic Republic of the Congo +242</option>
                        <option value="682">Cook Islands +682</option>
                        <option value="506">Costa Rica +506</option>
                        <option value="225">Cote D'Ivoire +225</option>
                        <option value="385">Croatia +385</option>
                        <option value="53">Cuba +53</option>
                        <option value="599">Curacao +599</option>
                        <option value="357">Cyprus +357</option>
                        <option value="420">Czech Republic +420</option>
                        <option value="45">Denmark +45</option>
                        <option value="253">Djibouti +253</option>
                        <option value="1767">Dominica +1767</option>
                        <option value="1809">Dominican Republic +1809</option>
                        <option value="593">Ecuador +593</option>
                        <option value="20">Egypt +20</option>
                        <option value="503">El Salvador +503</option>
                        <option value="240">Equatorial Guinea +240</option>
                        <option value="291">Eritrea +291</option>
                        <option value="372">Estonia +372</option>
                        <option value="251">Ethiopia +251</option>
                        <option value="500">Falkland Islands (Malvinas) +500</option>
                        <option value="298">Faroe Islands +298</option>
                        <option value="679">Fiji +679</option>
                        <option value="358">Finland +358</option>
                        <option value="33">France +33</option>
                        <option value="594">French Guiana +594</option>
                        <option value="689">French Polynesia +689</option>
                        <option value="262">French Southern Territories +262</option>
                        <option value="241">Gabon +241</option>
                        <option value="220">Gambia +220</option>
                        <option value="995">Georgia +995</option>
                        <option value="49">Germany +49</option>
                        <option value="233">Ghana +233</option>
                        <option value="350">Gibraltar +350</option>
                        <option value="30">Greece +30</option>
                        <option value="299">Greenland +299</option>
                        <option value="1473">Grenada +1473</option>
                        <option value="590">Guadeloupe +590</option>
                        <option value="1671">Guam +1671</option>
                        <option value="502">Guatemala +502</option>
                        <option value="44">Guernsey +44</option>
                        <option value="224">Guinea +224</option>
                        <option value="245">Guinea-Bissau +245</option>
                        <option value="592">Guyana +592</option>
                        <option value="509">Haiti +509</option>
                        <option value="39">Holy See (Vatican City State) +39</option>
                        <option value="504">Honduras +504</option>
                        <option value="852">Hong Kong +852</option>
                        <option value="36">Hungary +36</option>
                        <option value="354">Iceland +354</option>
                        <option value="62">Indonesia +62</option>
                        <option value="98">Iran, Islamic Republic of +98</option>
                        <option value="964">Iraq +964</option>
                        <option value="353">Ireland +353</option>
                        <option value="44">Isle of Man +44</option>
                        <option value="972">Israel +972</option>
                        <option value="39">Italy +39</option>
                        <option value="1876">Jamaica +1876</option>
                        <option value="81">Japan +81</option>
                        <option value="44">Jersey +44</option>
                        <option value="962">Jordan +962</option>
                        <option value="7">Kazakhstan +7</option>
                        <option value="254">Kenya +254</option>
                        <option value="686">Kiribati +686</option>
                        <option value="850">Korea, Democratic People's Republic of +850</option>
                        <option value="82">Korea, Republic of +82</option>
                        <option value="383">Kosovo +383</option>
                        <option value="965">Kuwait +965</option>
                        <option value="996">Kyrgyzstan +996</option>
                        <option value="856">Lao People's Democratic Republic +856</option>
                        <option value="371">Latvia +371</option>
                        <option value="961">Lebanon +961</option>
                        <option value="266">Lesotho +266</option>
                        <option value="231">Liberia +231</option>
                        <option value="218">Libyan Arab Jamahiriya +218</option>
                        <option value="423">Liechtenstein +423</option>
                        <option value="370">Lithuania +370</option>
                        <option value="352">Luxembourg +352</option>
                        <option value="853">Macao +853</option>
                        <option value="389">Macedonia, the Former Yugoslav Republic of +389</option>
                        <option value="261">Madagascar +261</option>
                        <option value="265">Malawi +265</option>
                        <option value="60">Malaysia +60</option>
                        <option value="960">Maldives +960</option>
                        <option value="223">Mali +223</option>
                        <option value="356">Malta +356</option>
                        <option value="692">Marshall Islands +692</option>
                        <option value="596">Martinique +596</option>
                        <option value="222">Mauritania +222</option>
                        <option value="230">Mauritius +230</option>
                        <option value="262">Mayotte +262</option>
                        <option value="52">Mexico +52</option>
                        <option value="691">Micronesia, Federated States of +691</option>
                        <option value="373">Moldova, Republic of +373</option>
                        <option value="377">Monaco +377</option>
                        <option value="976">Mongolia +976</option>
                        <option value="382">Montenegro +382</option>
                        <option value="1664">Montserrat +1664</option>
                        <option value="212">Morocco +212</option>
                        <option value="258">Mozambique +258</option>
                        <option value="95">Myanmar +95</option>
                        <option value="264">Namibia +264</option>
                        <option value="674">Nauru +674</option>
                        <option value="977">Nepal +977</option>
                        <option value="31">Netherlands +31</option>
                        <option value="599">Netherlands Antilles +599</option>
                        <option value="687">New Caledonia +687</option>
                        <option value="64">New Zealand +64</option>
                        <option value="505">Nicaragua +505</option>
                        <option value="227">Niger +227</option>
                        <option value="234">Nigeria +234</option>
                        <option value="683">Niue +683</option>
                        <option value="672">Norfolk Island +672</option>
                        <option value="1670">Northern Mariana Islands +1670</option>
                        <option value="47">Norway +47</option>
                        <option value="968">Oman +968</option>
                        <option value="92">Pakistan +92</option>
                        <option value="680">Palau +680</option>
                        <option value="970">Palestinian Territory, Occupied +970</option>
                        <option value="507">Panama +507</option>
                        <option value="675">Papua New Guinea +675</option>
                        <option value="595">Paraguay +595</option>
                        <option value="51">Peru +51</option>
                        <option value="63">Philippines +63</option>
                        <option value="64">Pitcairn +64</option>
                        <option value="48">Poland +48</option>
                        <option value="351">Portugal +351</option>
                        <option value="1787">Puerto Rico +1787</option>
                        <option value="974">Qatar +974</option>
                        <option value="262">Reunion +262</option>
                        <option value="40">Romania +40</option>
                        <option value="7">Russian Federation +7</option>
                        <option value="250">Rwanda +250</option>
                        <option value="590">Saint Barthelemy +590</option>
                        <option value="290">Saint Helena +290</option>
                        <option value="1869">Saint Kitts and Nevis +1869</option>
                        <option value="1758">Saint Lucia +1758</option>
                        <option value="590">Saint Martin +590</option>
                        <option value="508">Saint Pierre and Miquelon +508</option>
                        <option value="1784">Saint Vincent and the Grenadines +1784</option>
                        <option value="684">Samoa +684</option>
                        <option value="378">San Marino +378</option>
                        <option value="239">Sao Tome and Principe +239</option>
                        <option value="966">Saudi Arabia +966</option>
                        <option value="221">Senegal +221</option>
                        <option value="381">Serbia +381</option>
                        <option value="381">Serbia and Montenegro +381</option>
                        <option value="248">Seychelles +248</option>
                        <option value="232">Sierra Leone +232</option>
                        <option value="65">Singapore +65</option>
                        <option value="721">Sint Maarten +721</option>
                        <option value="421">Slovakia +421</option>
                        <option value="386">Slovenia +386</option>
                        <option value="677">Solomon Islands +677</option>
                        <option value="252">Somalia +252</option>
                        <option value="27">South Africa +27</option>
                        <option value="500">South Georgia and the South Sandwich Islands +500</option>
                        <option value="211">South Sudan +211</option>
                        <option value="34">Spain +34</option>
                        <option value="94">Sri Lanka +94</option>
                        <option value="249">Sudan +249</option>
                        <option value="597">Suriname +597</option>
                        <option value="47">Svalbard and Jan Mayen +47</option>
                        <option value="268">Swaziland +268</option>
                        <option value="46">Sweden +46</option>
                        <option value="41">Switzerland +41</option>
                        <option value="963">Syrian Arab Republic +963</option>
                        <option value="886">Taiwan, Province of China +886</option>
                        <option value="992">Tajikistan +992</option>
                        <option value="255">Tanzania, United Republic of +255</option>
                        <option value="66">Thailand +66</option>
                        <option value="670">Timor-Leste +670</option>
                        <option value="228">Togo +228</option>
                        <option value="690">Tokelau +690</option>
                        <option value="676">Tonga +676</option>
                        <option value="1868">Trinidad and Tobago +1868</option>
                        <option value="216">Tunisia +216</option>
                        <option value="90">Turkey +90</option>
                        <option value="7370">Turkmenistan +7370</option>
                        <option value="1649">Turks and Caicos Islands +1649</option>
                        <option value="688">Tuvalu +688</option>
                        <option value="256">Uganda +256</option>
                        <option value="380">Ukraine +380</option>
                        <option value="971">United Arab Emirates +971</option>
                        <option value="44">United Kingdom +44</option>
                        <option value="1">United States +1</option>
                        <option value="1">United States Minor Outlying Islands +1</option>
                        <option value="598">Uruguay +598</option>
                        <option value="998">Uzbekistan +998</option>
                        <option value="678">Vanuatu +678</option>
                        <option value="58">Venezuela +58</option>
                        <option value="84">Viet Nam +84</option>
                        <option value="1284">Virgin Islands, British +1284</option>
                        <option value="1340">Virgin Islands, U.s. +1340</option>
                        <option value="681">Wallis and Futuna +681</option>
                        <option value="212">Western Sahara +212</option>
                        <option value="967">Yemen +967</option>
                        <option value="260">Zambia +260</option>
                        <option value="263">Zimbabwe +263</option>
                        </select>
                        <input
                        pattern="[0-9.]+"
                        type="text"
                            onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                            }}
                            // type="text"
                            className={tw`w-3/4 form-control ml-[20px]`}
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
                        </div>
                        <div className="Invalid_num">
                            {registervalidator.current.message(
                            "mobile",
                            mobile,
                            ccode==="91"?"required|min:10|max:10":"required"
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