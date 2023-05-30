import { tw } from 'twind';
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { TiSocialYoutubeCircular, TiSocialLinkedinCircular } from 'react-icons/ti';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import * as Constants from './Constants'

const Footer = () => {
    return (
        <div className={tw`w-100 overflow-hidden mt-5`}>
            <div className={tw`flex justify-center py-3 bg-[#505050]`}>
                <ul className={tw`flex gap-2 custom-footer`}>
                    <li className={tw`cursor-pointer text-sm md:text-sm`}>
                        <Link href="/aboutus/">About us </Link>
                        <span className={tw`fs-6 md:fs-4`}> | </span>
                    </li>
                    <li className={tw`cursor-pointer text-sm md:text-sm`}>
                        <Link href="/privacy/">Privacy </Link>
                        <span className={tw`fs-6 md:fs-4`}> | </span>
                    </li>
                    <li className={tw`cursor-pointer text-sm md:text-sm`}>
                        <Link href="/terms-and-conditions/">Term & Conditions </Link>
                        <span className={tw`fs-6 md:fs-4`}> | </span>
                    </li>
                    <li className={tw`cursor-pointer text-sm md:text-sm`}>
                        <Link href="/bookingdetail/">My Bookings </Link>
                        <span className={tw`fs-6 md:fs-4`}></span>
                    </li>
                </ul>
            </div>
            <div className={tw`flex pb-3 pt-4 bg-[#373739]`}>
                <div className='row w-full'>
                    <div className='flex flex-wrap'>
                    
                    <div className={tw`w-full lg:w-1/3 payment_secure flex flex-col justify-center items-center px-4 md:px-0 col-12 col-md-4`}>
                        <div>
                            <h4 className={tw`mb-3 text-center md:text-start`}>Secure Payment</h4>
                            <div className={tw`flex gap-3 mb-4 md:mb-0`}>
                                <span>
                                    <img
                                        src={`${Constants.assets_api}/public/icons/payment_icons/1.png`}
                                        alt="payment_icon"
                                    />
                                </span>
                                <span>
                                    <img
                                        src={`${Constants.assets_api}/public/icons/payment_icons/2.png`}
                                        alt="payment_icon"
                                    />
                                </span>
                                <span>
                                    <img
                                        src={`${Constants.assets_api}/public/icons/payment_icons/3.png`}
                                        alt="payment_icon"
                                    />
                                </span>
                                <span>
                                    <img
                                        src={`${Constants.assets_api}/public/icons/payment_icons/4.png`}
                                        alt="payment_icon"
                                    />
                                </span>
                                <span>
                                    <img
                                        src={`${Constants.assets_api}/public/icons/payment_icons/5.png`}
                                        alt="payment_icon"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <hr className={tw`col-12 col-md-4 text-white w-80 m-auto mb-3 d-block d-md-none`} /> */}
                    <div className={tw`w-full lg:w-1/3 payment_secure follow-links col-12 col-md-4`}>
                        <h4 className={tw`mb-3 px-3 md:px-0 text-center`}>FOLLOW US ON</h4>
                        <ul className={tw`flex justify-center px-3 md:px-0 gap-4 mb-3 md:mb-0`}>
                            <li className={tw`cursor-pointer text-4xl`}>
                                <a href="https://www.facebook.com/thekiomoi/" target="_blank">
                                    <FaFacebook />
                                </a>
                            </li>
                            <li className={tw`cursor-pointer text-4xl`}>
                                <a href="https://twitter.com/ki_omoi" target="_blank">
                                    <AiFillTwitterCircle />
                                </a>
                            </li>
                            <li className={tw`cursor-pointer text-4xl`}>
                                <a href="https://www.instagram.com/kiomoi_travel/" target="_blank">
                                    <AiFillInstagram />
                                </a>
                            </li>
                            <li className={tw`cursor-pointer text-4xl`}>
                                <a href="https://www.youtube.com/channel/UCPq6EimDUQ2eknEJgyLqnnA" target="_blank">
                                    <TiSocialYoutubeCircular />
                                </a>
                            </li>
                            <li className={tw`cursor-pointer text-4xl`}>
                                <a href="https://www.linkedin.com/company/kiomoi/" target="_blank">
                                    <TiSocialLinkedinCircular />
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <hr className={tw`col-12 col-md-4 text-white w-80 m-auto mb-4 d-block d-md-none`} /> */}
                    <div className={tw`w-full lg:w-1/3 col-12 col-md-4 flex justify-center items-center px-4 md:px-0`}>
                        <div className={tw`whatsapp-footer flex gap-4`}>
                            <img
                                src={`${Constants.assets_api}/public/icons/whatsapp.png`}
                                alt="whatsapp"
                            />
                            <div className="WhatsApp_">
                                <h4 className={tw`text-md md:text-lg font-bold mb-2`}>WHATSAPP</h4>
                                <a className={tw`text-md md:text-lg text-white`} href="whatsapp://send?phone=+919650687940">
                                    +919650687940
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* <hr className={tw`col-12 col-md-4 text-white w-80 m-auto my-4 d-block d-md-none`} /> */}
                    
                    </div>
                    
                    
                    <div className={tw`container text_footer_bottom text-center mt-6`}>
                        <div>
                            <p>
                                H-187, Lohia Road, Sector-63, Noida 201301 India
                            </p>
                            <p>
                                Call: +91- 8448298660 / +91- 9650687940 | Email: <a href='mailto:info@kiomoi.com'>info@kiomoi.com</a>
                            </p>
                            
                        </div>
                        <p>
                            Copyright 2022 © Kiomoi Rights Reserved.
                        </p>
                        <p>Kiomoi Travel Services Pvt. Ltd.</p>
                        <p>
                            The content and images used on this site are copyright protected
                            and copyrights vests with the respective owners. The usage of
                            the content and images on this website is intended to promote
                            the works and no endorsement of the artist shall be implied.
                            Unauthorized use is prohibited and punishable by law.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;