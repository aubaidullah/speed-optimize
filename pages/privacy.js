import Nav from '../components/Nav';
import { tw } from 'twind'
import * as Constants from '../components/Constants'

const Privacy = () => {
    return <>
        <Nav />
        <section className={tw`md:px-14 custom-font t_box`}>
            <div>
                <div className="terms-inner-section">
                    <center className="mt-4"><img src={`${Constants.assets_api}/public/icons/kiomoi_logo_abstract.png`} className="mx-auto d-block" /></center>
                    <h4 className="text-center color mt-3 text-orange fs-5">A New Sky, A New Life. </h4>
                    <center className="text-center mt-3 mb-4 fs-2">Privacy</center>

                    <div className={tw`terma-box _box_shadow bg-white p-5`}>
                        <p>Your privacy is very important to Kiomoi.com. That's why we've provided this Privacy Policy, which gives you an insight into our policies regarding the collection, use and protection of the personal information of those using Kiomoi.com. Personal information means information that can be linked to a specific individual, including name, postal address, telephone number, e-mail id, and credit card number. We would like to assure you that we follow appropriate standards when it comes to protecting your privacy on our web site. In general, you can visit Kiomoi website without revealing any personal information about yourself. We track the Internet address of the domains from which people visit us and analyze this data for trends and statistics, but the individual user remains anonymous.</p>
                        <h4 className="my-4 fw-bold fs-6">We use Personal Information in order to provide and enhance the Products or Services offered on our Site</h4>
                        <ul className={tw`list-disc terms_condition px-3`} style={{ fontSize: 14 }}>
                            <li>To issue invoices, administer accounts, collect and process payments.</li>
                            <li>To process and track your transactions and to send you information about our and our affiliatesâ„¢ and Ëœbusiness partnersâ„¢ products and services and other information and materials that may be of interest to you.</li>
                            <li>As permitted by, and to comply with, any legal or regulatory requirements or provisions; or for any other purpose to which you consent.</li>
                        </ul>

                        <h4 className="my-4 fw-bold fs-6">From time to time, we may disclose your Personal Information as follows:</h4>
                        <ul className={tw`list-disc terms_condition px-3`} style={{ fontSize: 14 }}>
                            <li>
                                To those travel service providers with which you make arrangements through our Site, for example, airlines, car rental, hotel, ground transportation, attraction, or travel insurance. We provide them with the Personal Information needed to make and complete the purchase, booking, or reservation.</li>
                            <li>
                                To organizations that perform services for or on behalf of Kiomoi, for example to provide customer service, deliver tickets, process credit cards, for research, marketing, data processing, to measure the use of our Site, to facilitate usage by a Visitor. We will share with these companies only that Personal Information which they need to work on our behalf. Some of these service providers may be located in other countries. Your Personal Information will be provided to these organizations only if they agree to use such information solely for the purpose of providing services to Kiomoi and under the instructions of Kiomoi, and with respect to that information, to act in a manner consistent with the relevant principles articulated in this Policy.
                            </li>
                        </ul>
                        <p>Some of our web pages use "cookies" so that we can better serve you with customized information when you return to our site. Cookies are identifiers, which a web site can send to your browser to keep on your computer to facilitate your next visit to our site. You can set your browser to notify you when you are sent a cookie, giving you the option to decide whether or not to accept it. The information we collect and analyze is used to improve our service to you.</p>
                        <p className='mt-3'>If we decide to change this policy in a material way, we will obtain the necessary consents required under applicable privacy laws if we seek to collect, use or disclose Personal Information for purposes other than those to which consent has been obtained, unless otherwise required or permitted by law. If any proposed change is unacceptable to you, you may request that we remove your Personal Information (and/or that of other individuals for whom you made travel reservations or who have received your Alerts) from our records.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Privacy;