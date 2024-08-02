// import Nav from '../components/Nav';
import Link from "next/link";
import { GrClose } from "react-icons/gr";
// import { Modal } from 'react-bootstrap';
import { useState } from "react";

import * as Constants from "../components/Constants";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("../components/Nav"));

const Privacy = () => {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  return (
    <>
      <Nav />
      <section className={`md:px-14 custom-font t_box`}>
        <div>
          <div className="terms-inner-section">
            <center className="mt-4">
              <img
                src={`${Constants.assets_api}/public/icons/kiomoi_logo_abstract.png`}
                alt="kiomoi logo"
                className="mx-auto d-block"
              />
            </center>
            <h4 className="text-center color mt-3 text-orange fs-5">
              A New Sky, A New Life.{" "}
            </h4>

            <div className="row gy-4 mt-3 mb-5">
              <div className="col-md-4">
                <div className={`about-popup cursor-pointer`}>
                  <span
                    onClick={() => setFirst(!first)}
                    className="_box_shadow"
                  >
                    <figure>
                      <img
                        alt="payment icon"
                        src={`${Constants.assets_api}/public/icons/ico_payment.png`}
                      />
                    </figure>
                    <p>Secure Payment</p>
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`about-popup cursor-pointer`}>
                  <span
                    onClick={() => setSecond(!second)}
                    className="_box_shadow"
                  >
                    <figure>
                      <img
                        alt="career icon"
                        src={`${Constants.assets_api}/public/icons/ico_career.png`}
                      />
                    </figure>
                    <p>Career</p>
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`about-popup cursor-pointer`}>
                  <span
                    onClick={() => setThird(!third)}
                    className="_box_shadow"
                  >
                    <figure>
                      <img
                        alt="contact icon"
                        src={`${Constants.assets_api}/public/icons/ico_contactph.png`}
                      />{" "}
                    </figure>
                    <p>Contact us</p>
                  </span>
                </div>
              </div>
            </div>

            <div className={`p-4`}>
              <h4 className="text-center text-uppercase mb-4 fw-bold fs-6">
                About Us
              </h4>
              <p className="text-cente">
                At Kiomoi a travel platform, we are offering each and every one
                of our customers with a special, tailor-made, handheld bespoke
                travel experience & Activities. We are focused on the homestay
                bookings sector and want to help both Indian holidaymakers and
                In-bound travellers to experience India through the eyes of the
                warm hospitality provided by experienced hosts who understand
                the needs of each traveller as an individual. If you are looking
                for Hotels bookings, Holidays and Vacations, Staycations, Travel
                experiences, activities or Adventure holidays, the team at
                Kiomoi is vastly experienced in all these aspects, with the
                added advantage of actually having been there and done that our
                selves. The Kiomoi team further specializes in revenue &
                inventory Distribution management, content Marketer with an eye
                on growing business and revenue for our partners for homes
                stays, villas, bungalows and boutique stays Kiomoi has created
                holidayâ€™s packages, homestay bookings and revenue management
                option for thousands of customers with the express goal that
                â€œevery customer mattersâ€ be it on the traveller side or on
                the business side. When you get in touch with Kiomoi, you get in
                touch with the soul of travel because the word Kiomoi itself
                means â€œThoughtful Hospitalityâ€ Join hands with Kiomoi and
                immerse yourself into a world of experiences.
              </p>
            </div>

            <div className={`terma-box _box_shadow bg-white my-5 p-5`}>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                Team
              </h4>
              <p className="text-center">
                It is actually the concerted efforts of Team Kiomoi who are
                helping us to achieve high voltage performance and
                differentiates the folks on the awards podium from those who
                'also ran'. At present the following teams are working at Kiomoi
              </p>
            </div>

            <div className={`terma-box _box_shadow bg-white my-5 p-5`}>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                Founder
              </h4>
              <p className="text-center">
                Kiomoi is a travel start-up founded by veterans of the online
                travel industry and worked with the best online travel brands of
                the country as a core team members.
              </p>
            </div>

            <div className={`terma-box _box_shadow bg-white my-5 p-5`}>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                Sales Team
              </h4>
              <p className="text-center">
                A young bunch, who are the lifeline of Kiomoi, they are
                responsible for capturing and converting the leads. Always busy
                like a bee.
              </p>
            </div>

            <div className={`terma-box _box_shadow bg-white my-5 p-5`}>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                B.D. Team
              </h4>
              <p className="text-center">
                A portfolio that involves lots of traveling across the country,
                signing up best local suppliers, best experiences (Home stays,
                Hotels, Car vendors & Local guides) to keep Kiomoi offering most
                cost effective and competitive with best of care.
              </p>
            </div>

            <div className={`terma-box _box_shadow bg-white my-5 p-5`}>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                Tech Team
              </h4>
              <p className="text-center">
                The 'brain of Kiomoi' Takes care of all the hardcore tech things
                like site enhancement, maintenance of existing sites, Admin,
                Booking Engine optimization et al. They are the people working
                relentlessly to troubleshoot all the involved systemsâ€¦
              </p>
            </div>

            <div className={`terma-box _box_shadow bg-white my-5 p-5`}>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                Content & SEO
              </h4>
              <p className="text-center">
                Responsible for all matters 'Cerebral' the very face behind the
                soon to be launched Travel Guides, Blogs, PRs and all that you
                see written at Kiomoi's website. SEO is virtually a one-man army
                constantly pushing and striving for improving the rankings and
                search ability of Kiomoi.
              </p>
            </div>

            <div className={`terma-box _box_shadow bg-white my-5 p-5`}>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                Career
              </h4>
              <p className="text-center">
                Yes! We are Hiring! If you feel that you can add some value in
                any of the domain you are welcome, please share your profile on
                info@kiomoi.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <div show={first} animation={false}>
        <div>
          <span
            style={{ position: "absolute", top: 25, right: 25 }}
            onClick={() => setFirst(!first)}
            aria-hidden="true"
          >
            <GrClose style={{ cursor: "pointer" }} />
          </span>
          <center>
            {" "}
            <img
              alt="kiomoi logo"
              src={`${Constants.assets_api}/public/icons/kiomoi_logo_abstract.png`}
              className="mx-auto d-block"
            />
          </center>
          <h4 className="text-center color mb-3">100% Secure Payment </h4>
          <ul className="model-pay flex justify-content-between align-items-center gap-3 my-5">
            <li>
              {" "}
              <a href="#">
                <img
                  alt="verify icon"
                  src={`${Constants.assets_api}/public/icons/versign.png`}
                />{" "}
              </a>
            </li>
            <li>
              {" "}
              <a href="#">
                <img
                  alt="mastercard icon"
                  src={`${Constants.assets_api}/public/icons/mastercard.png`}
                />{" "}
              </a>
            </li>
            <li>
              {" "}
              <a href="#">
                <img
                  alt="razorpay icon"
                  src={`${Constants.assets_api}/public/icons/rozorpay.png`}
                />{" "}
              </a>
            </li>
            <li>
              {" "}
              <a href="#">
                <img
                  alt="visacard icon"
                  src={`${Constants.assets_api}/public/icons/visa.png`}
                />{" "}
              </a>
            </li>
            <li>
              {" "}
              <a href="#">
                <img
                  alt="upi icon"
                  src={`${Constants.assets_api}/public/icons/upi.png`}
                />{" "}
              </a>
            </li>
          </ul>
          <Link href="/bookingdetail">
            <div className="proce-pay btn btn_login">Procees to Payment</div>
          </Link>
        </div>
      </div>
      <div show={second} animation={false}>
        <div>
          <span
            style={{ position: "absolute", top: 25, right: 25 }}
            onClick={() => setSecond(!second)}
            aria-hidden="true"
          >
            <GrClose style={{ cursor: "pointer" }} />
          </span>
          <center>
            {" "}
            <img
              src={`${Constants.assets_api}/public/icons/kiomoi_logo_abstract.png`}
              className="mx-auto d-block"
              alt="kiomoi icon"
            />
          </center>
          <h4 className="text-center color my-3 text-orange font-bold">
            Career
          </h4>
          <center>
            {" "}
            <img
              src={`${Constants.assets_api}/public/icons/file.png`}
              className="mx-auto d-block"
              alt="career icon"
            />
          </center>
          <p className="text-center mt-3 mb-2">
            Please Send your Latest CV to{" "}
          </p>
          <center>
            <a
              href="mailto:CAREER@KIOMOI.COM"
              className="career-a font-semibold"
              style={{ color: "#007bff" }}
            >
              CAREER@KIOMOI.COM
            </a>
          </center>
        </div>
      </div>
      <div show={third} animation={false}>
        <div>
          <span
            style={{ position: "absolute", top: 25, right: 25 }}
            onClick={() => setThird(!third)}
            aria-hidden="true"
          >
            <GrClose style={{ cursor: "pointer" }} />
          </span>
          <center>
            {" "}
            <img
              src={`${Constants.assets_api}/public/icons/kiomoi_logo_abstract.png`}
              className="mx-auto d-block"
              alt="kiomoi logo"
            />
          </center>
          <h4 className="text-center color my-3 text-orange font-bold">
            Contact Us
          </h4>
          <center>
            {" "}
            <img
              src={`${Constants.assets_api}/public/icons/file.png`}
              className="mx-auto d-block"
              alt="icon"
            />
          </center>
          <p className="text-center mt-3 mb-2">
            For and booking, query or help please call us at{" "}
          </p>
          <center>
            <a
              href="mailto:CAREER@KIOMOI.COM"
              className="career-a font-semibold"
              style={{ color: "#007bff" }}
            >
              CAREER@KIOMOI.COM
            </a>
          </center>
        </div>
      </div>
    </>
  );
};

export default Privacy;
