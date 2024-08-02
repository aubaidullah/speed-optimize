// import Nav from '../components/Nav';

import dynamic from "next/dynamic";

const Nav = dynamic(() => import("../components/Nav"));
const TNC = () => {
  return (
    <>
      <Nav />

      <section className={`md:px-14 custom-font t_box`}>
        <div>
          <div className="terms-inner-section">
            <center className="mt-4">
              <img
                alt="kiomoi logo"
                src={"icons/kiomoi_logo_abstract.png"}
                className="mx-auto d-block"
              />
            </center>
            <h4 className="text-center color mt-3 text-orange fs-5">
              A New Sky, A New Life.{" "}
            </h4>
            <center className="text-center mt-3 mb-4 fs-2">
              Terms and Conditions{" "}
            </center>

            <div className={`terma-box _box_shadow bg-white p-5`}>
              <p>
                Welcome to Kiomoi.com! Kiomoi Travel Services Private Limited
                (KTSPL) you (The User) are deemed to have accepted the terms and
                conditions listed below. (KTSPL ) reserves the right to add,
                delete, alter or modify these terms and conditions at any time.
                The User is therefore advised to read carefully these terms and
                conditions each time he or she uses the service(s) of (KTSPL ).
                All products/services and information displayed on Kiomoi.com
                constitute an "invitation to offer". Your order for booking
                constitutes your "offer" which shall be subject to the terms and
                conditions as listed below. Kiomoi reserves the right, in its
                sole discretion, to terminate the access to the Kiomoi website
                and the related services or any portion thereof at any time,
                without notice. The agreement between you and the Kiomoi.com
                shall be subject to the following terms and conditions :-
              </p>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                User Agreement
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  The User certifies that he/she is at least 18 (eighteen) years
                  of age or has the consent of a parent or legal guardian.
                </li>
                <li>
                  These terms and conditions supersede all previous
                  representations, understandings, or agreements and shall
                  prevail notwithstanding any variance with any other terms of
                  any order submitted. By using the services of KTSPL you agree
                  to be bound by the Terms and Conditions.
                </li>
                <li>
                  All prices, unless indicated otherwise are in Indian Rupees.
                </li>
                <li>
                  All prices and availability of products are subject to change
                  without prior notice at the sole discretion of Kiomoi.com.
                </li>
                <li>
                  KTSPL reserves the right to refuse or cancel any booking
                  placed for a hotel/package that is listed at an incorrect
                  price. This shall be regardless of whether the order has been
                  confirmed and/or payment been levied via credit card. In the
                  event the payment has been processed by Kiomoi.com the same
                  shall be credited to your credit card account and duly
                  notified to you by email.
                </li>
                <li>
                  In a credit card transaction, you must use your own credit
                  card. KTSPL will not be liable for any credit card fraud. The
                  liability to use a card fraudulently will be on the user and
                  the onus to 'prove otherwise' shall be exclusively on the
                  user.
                </li>
                <li>
                  Any request for cancellations of orders once duly placed on
                  the site, shall be subjected to due retention charges as
                  informed in the confirmation voucher.
                </li>
                <li>
                  In the event that a non-delivery occurs on account of a
                  mistake by you (i.e. wrong name or address) any extra cost
                  incurred by KTSPL for redelivery shall be claimed from the
                  User placing the booking.
                </li>
                <li>
                  {" "}
                  KTSPL shall not be liable for any delay / non-delivery of
                  booked services by the agents, trade organisations, hotels /
                  car rentals/ air lines etc. (vendors), flood, fire, wars, acts
                  of God or any cause that is beyond the control of KTSPL
                </li>
                <li>
                  Notwithstanding anything contained herein KTSPL acts only as
                  booking agent to facilitate / integrate transactions between
                  the buyers and sellers through various platforms (online web
                  store, call centre, mail order catalogues, SMS. etc.) for
                  various vendors and shall in no way be responsible for any
                  quality of product, damages, losses, expenses and/or taxes
                  incurred by Users qua the bookings. In no event shall KTSPL ,
                  its directors, officials, representatives and employees be
                  liable for any damages relating to products sold through it's
                  various platforms.
                </li>
                <li>
                  {" "}
                  Presently, the service(s) of KTSPL are being offered at a
                  nominal fee, however, KTSPL reserves the right to amend the
                  charges for any or such facilities and offers.
                </li>
                <li>
                  The User agrees to use the services provided by KTSPL , its
                  affiliates, consultants and contracted companies, for lawful
                  purposes only.
                </li>
                <li>
                  The User agrees to provide authentic and true information.
                  KTSPL reserves the right to confirm and validate the
                  information and other details provided by the User at any
                  point of time. If upon confirmation such User details are
                  found not to be true (wholly or partly), KTSPL has the right
                  in its sole discretion to reject the registration and debar
                  the User from using the Services of Kiomoi.com and / or other
                  affiliated websites without prior intimation whatsoever.
                </li>
                <li>
                  KTSPL will not be responsible for any damage suffered by users
                  from use of the services on this site. This without limitation
                  includes loss of revenue/data resulting from delays,
                  non-deliveries, cancellations, missed bookings, or service
                  interruptions as may occur because of any act / omission of
                  the hotel. This disclaimer of liability also applies to any
                  damages or injury caused by any failure of performance, error,
                  omission, interruption, deletion, defect, delay in operation
                  or transmission, computer virus, communication line failure,
                  theft or destruction or unauthorised access to, alteration of,
                  or use of record, whether for breach of contract, tortuous
                  behaviour, negligence, or under any other cause of action.
                </li>
                <li>
                  The User expressly agrees that the use of service(s)
                  Kiomoi.com is at the User's sole risk. The Service(s) of
                  Kiomoi.com is provided on an "as is" basis without warranties
                  of any kind, whether express or implied. KTSPL its affiliates,
                  employees, agents, consultants, contracted companies make no
                  warranties of any kind, whether expressed or implied, for the
                  service it is providing or as to the results that may be
                  obtained from use of the Service, or as to the accuracy,
                  reliability or content of any information, service, or
                  merchandise provided through this Service. KTSPL does not
                  represent or warrant to maintain the confidentiality of
                  information; although KTSPL current practice is to utilise
                  reasonable efforts to maintain such confidentiality. It is
                  also clearly understood that all warranties, implied or
                  express take place between the vendors and the User.
                </li>
                <li>
                  This agreement shall be construed in accordance with the
                  applicable laws of India. The Court at Delhi shall have
                  exclusive jurisdiction in any proceedings arising out of this
                  agreement.
                </li>
              </ul>
              <h4 className="text-center text-uppercase my-4 fw-bold fs-6">
                Terms of Service
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  The User certifies that he/she is at least 18 (eighteen) years
                  of age or has the consent of a parent or legal guardian.
                </li>
                <li>
                  These terms and conditions supersede all previous
                  representations, understandings, or agreements and shall
                  prevail notwithstanding any variance with any other terms of
                  any order submitted. By using the services of KTSPL you agree
                  to be bound by the Terms and Conditions.
                </li>
                <li>
                  All prices, unless indicated otherwise are in Indian Rupees.
                </li>
                <li>
                  All prices, unless indicated otherwise are in Indian Rupees.
                </li>
                <li>
                  All prices and availability of products are subject to change
                  without prior notice at the sole discretion of Kiomoi.com.
                </li>
              </ul>
              <h4 className="text-uppercase my-4 fw-bold fs-6">
                Hotel Booking Terms &amp; Conditions
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  All bookings are subjected to 2.5% bank transaction charges on
                  credit card/net banking/debit card refunds.
                </li>
                <li>
                  Cancellation made within 7 days of the check in date is
                  subjected to full retention of booking amount.
                </li>
                <li>
                  Cancellation made within 15 days of check in date and more
                  than 7 days of check in date will incur minimum 50%
                  cancellation charges although KIOMOI / Hotel reserves the
                  right to retain 100% of the booking amount subjected to peak
                  season.
                </li>
                <li>
                  Cancellation made more than 15 days of check in date will
                  incur minimum 20% cancellation charges although KIOMOI / Hotel
                  reserves the right to retian 100% of booking amount subjected
                  to peak season.
                </li>
                <li>
                  Cancellations are strictly subjected to the place, hotel and
                  season for which booking is made. Some hotels might have non
                  refundable policy during peak/festive season and special
                  offers.
                </li>
                <li>
                  All the bookings made for Hotels for Long Weekends, Special
                  occasions and Festive season will be on 100% advance and non
                  refundable. Due to the heavy traffic during this holiday
                  period, no post pay at hotels would be accepted.
                </li>
                <li>
                  Kiomoi.com reserves the right to include its own
                  non-refundable service charges of minimum INR 250 per room per
                  night.
                </li>
                <li>
                  A modification fee of INR 500 per request will apply if you
                  wish to change or cancel any part of your booking which is
                  applicable for any hotel bookings plus a difference in rates
                  will be charged for changes to be made to the reservation
                  subject to availability.
                </li>
                <li>
                  All cancellation or modification must be informed to us
                  directly via e-mail or fax with the KIOMOI Booking Reference #
                  mentioned in it. No mail or fax would be entertained without
                  the KIOMOI Booking Reference # mentioned in it. KIOMOI will
                  not be accountable for responding to any such requests.
                </li>
                <li>
                  Cancellation or modification made directly at the hotel will
                  not be entertained.
                </li>
                <li>
                  All other amendments would be done as per the hotels policy on
                  case to case basis.
                </li>
                <li>
                  We take at least 07 working days to process refunds for
                  bookings cancelled or modified. Kindly note that even if the
                  refund is done from our end, your bank may not process it till
                  your next billing cycle.
                </li>
                <li>
                  The Standard check in time is 12.00 Noon &amp; check out time
                  is 12.00 Noon. However these timings may vary from hotel to
                  hotel.
                </li>
                <li>
                  Early check in or late check out is subject to availability
                  and may be chargeable by the hotel. However, few hotels follow
                  a 24hrs check in and check out policy, which would be informed
                  to you at the time of the booking.
                </li>
                <li>
                  Kid's tariff applies only to children up to 11 years of age.
                  Children above 11 years are charged as adults.
                </li>
                <li>
                  Kid's under 5 sharing a existing bed with their parents in the
                  same room are normally not charged. Hotels will, however, levy
                  a meal supplement charge for children and few hotels may
                  charge for the stay as well which is subject to hotel policy.
                </li>
                <li>
                  Meal plan definitions - EP-room only, CP-room with breakfast,
                  MAP-room with breakfast, lunch/dinner, AP-room with breakfast,
                  lunch and dinner.
                </li>
                <li>
                  The booking price inclusions are as per the plan stated above.
                </li>
                <li>
                  All other extra / incidental charges are to be settled
                  directly by the customer with the Hotel.
                </li>
              </ul>
              <h4 className="text-uppercase my-4 fw-bold fs-6">
                Tour Booking Terms &amp; Conditions
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  The Standard Hotel check-in 1400 Hrs &amp; Check-out time is
                  1100 Hrs. However, these timings may vary from hotel to hotel
                  and city to city.
                </li>
                <li>
                  Early check-in or late check-out is strictly subjected to
                  availability and may be chargeable by the hotel..
                </li>
                <li>
                  As per Government regulations, it is mandatory for all guests
                  above 18 Years of age to show a valid photo identity card (PAN
                  Not valid) and address proof at the time to check-in.
                </li>
                <li>
                  Some hotels do not allow unmarried/unrelated couples to
                  check-in. This is the hotel full discretion and no refund
                  would be applicable and Kiomoi will not be responsible in case
                  the hotel denies check-in under such circumstances.
                </li>
                <li>
                  Minor Child (0-5 yrs) Child with parent No Extra Bed (6-12
                  yrs) above 12 Year will be Considered adult and Extra bed
                  charges will be applicable accordingly or as per policy.
                </li>
                <li>
                  In case of Proposed/ Quoted hotel sold-out/overbooked, similar
                  category or upgraded hotel will be provided.
                </li>
                <li>
                  All the tour bookings made for Long Weekends, special
                  occasions and Festive season will be on 100% advance and non
                  refundable. Due to the heavy traffic during this holiday
                  period, no post pay or partial payment for any tour would be
                  accepted.
                </li>
                <li>
                  Wherever room category is not mentioned in the final proposal
                  or on our web product, Standard / Starting category of room
                  will be provided.
                </li>
                <li>
                  All cancellations or modifications must be informed to Kiomoi
                  via e-mail/phone with Kiomoi booking reference mentioned in it
                  and shall be done as per the hotel / Trip cancellation
                  policies and subject to availability and fare difference if
                  any.
                </li>
                <li>
                  Cab &amp; Driver details will be provided 24 hours before the
                  Trip Start and communicated on mail / phone/ Whats App as
                  applicable.
                </li>
                <li>
                  All extras e.g. laundry charges, telephone bills or meals
                  which are not included in the booking need to settled directly
                  by the guest with the hotel.
                </li>
                <li>
                  Meal plan definitions - EP-room only, CP-room with breakfast,
                  MAP-room with breakfast, lunch/dinner, AP-room with breakfast,
                  lunch and dinner.
                </li>
                <li>
                  All sightseeing will be as per the Itinerary point-to-point
                  basis (car will not be on disposal) any extra running will be
                  paid directly to the driver.
                </li>
                <li>
                  In hilly area's Air conditioning of the car will not be
                  working (No AC in hills) you may ask the driver for the same
                  and can pay directly..
                </li>
                <li>
                  Any cost escalation due to natural calamities, Traffic, Low
                  and order issues, Political unrest, flight cancellation,
                  flight missing, and other unforeseen situations will be born
                  by the customer, Kiomoi will not be responsible in such case..
                </li>
                <li>
                  Flight, Train , Bus and Forest Safaris booking are always
                  subject to availability and will be booked on actual with a
                  minimum convenience fee and will not be part of land pacakge.
                </li>
                <li>
                  All Remote area where permits are required fee will be charged
                  as per the guidelines and always will be subject to
                  availability.
                </li>
                <li>
                  All payments for International tours to be made in USD unless
                  mentioned in other currency (Current Exchange rates will be
                  applicable and all Exchange difference will be born by
                  Customer).
                </li>
                <li>
                  Granting visa, Inner line permits and any permits are sole
                  discretion of concern authorities and respective Country,
                  Kiomoi will just facilitate/help but not responsible for the
                  delay, declined or cancellation.
                </li>
                <li>
                  If Visa, Interline permit, or any entry permit declined by
                  concerned country or authority, Kiomoi will not be responsible
                  and booking will be canceled as per the cancellation policy
                  only.
                </li>
                <li>
                  Cancellation fee/ Charges will be calculated on the total
                  Package cost (before tax) not on advance.
                </li>
                <li>
                  Cancellations or amendments made directly with hotel or
                  supplier shall not be entertained.
                </li>
                <li>
                  Once a booking is modified once, it cannot be modified again
                  and you will be notified immediately after the cancellation
                  with the refund amount.
                </li>
                <li>
                  The refund shall be processed immediately post-cancellation as
                  your payment source. However, your bank may take some time as
                  per its processing policy.( 07-15 Days).
                </li>
              </ul>
              <h4 className="text-uppercase my-4 fw-bold fs-6">
                Visa &amp; Insurance Terms &amp; Conditions
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  Kiomoi acts as a facilitator for processing Visa applications.
                  We will guide customers on Visa formalities &amp; Visa
                  documentation for specific destinations. The discretion to
                  grant/reject Visa rests solely with the concerned embassy and
                  Kiomoi will not be responsible for rejection of any
                  applications. The visa fee is non-refundable in case of
                  rejected visa applications.
                </li>
                <li>
                  While we strive to provide a seamless Visa experience to the
                  customers, Kiomoi will not be held responsible for unforeseen
                  changes to Visa formalities levied by the embassy during the
                  document submission and processing phase.
                </li>
                <li>
                  Insurance once applied is subject to 100% cancellation fee and
                  is non-refundable.
                </li>
              </ul>
              <h4 className="text-uppercase my-4 fw-bold fs-6">
                Online Card Payments Policy
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  Visa/ Master /Amex /Dinner/Rupay Card payments are processed
                  through an online payment gateway system. You need not worry
                  about your credit card information falling into the wrong
                  hands because your bank will authorise the credit card
                  transaction directly without any information passing through
                  us. In approximately 25-30 seconds (depending on your internet
                  connection) your bank will issue, using the online payment
                  gateway, an authorisation code and confirmation of completion
                  of transaction(s).
                </li>
                <li>
                  Kiomoi.com, uses the payment gateway who are Verisign
                  Certified Sites, who uses the latest 128 bit encryption
                  technology and other sophisticated methods to protect your
                  credit card information. You can book your product using SSL
                  encryption (the internet standard for secure transactions). In
                  fact, transacting online with a credit card at the Website is
                  even safer than using a credit card at a restaurant because we
                  do not retain your credit card information. You can be assured
                  that Kiomoi.com offers you the highest standards of security
                  currently available on the internet so as to ensure that your
                  shopping experience is private, safe and secure.
                </li>
                <li>
                  If the payment on the credit card is declined for some reason,
                  alternate payment instructions must be received by Kiomoi.com
                  before 72 hours prior to the time of departure; else, the
                  order is liable to be cancelled.
                </li>
              </ul>
              <h4 className="text-uppercase my-4 fw-bold fs-6">
                Delivery of Services How do I get a refund after cancellation my
                booking?
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  After cancellation your booking, we will send you an email at
                  your email id stating the refund amount.
                </li>
                <li>
                  The refund shall be processed within 30 working days from the
                  date of the e-mail. If we have received the payment through a
                  valid credit card, then the same will be refunded to your
                  credit card only. Payments made using any other mode of
                  payment will be refunded by cash deposit at your account
                  within a maximum of 30 working days from the date of the
                  cancellation e-mail received.
                </li>
                <li>
                  In some of the cases where refund is not possible by Cash
                  deposit &amp; Credit Card, Kiomoi.com issue a credit note for
                  the same amount and it can be utilize for the future booking.
                </li>
                <li>What are the cancellation/Amendment charges?</li>
                <li>
                  Kiomoi.com charges minimum INR 500 as a Cancellation/Amendment
                  charges service fee from its customers additional to
                  fare/tariff defrential charges applicable in booking. The
                  cancellation service fee will be also be levied in cases where
                  a customer is entitled to a full refund. We recommend that
                  customer read individual Hotel terms and conditions in order
                  to seek more clarifications.
                </li>
                <li>
                  The above mentioned cancellation process and refund processing
                  time may vary. In case of lost or damaged E-voucher, the
                  refund process cannot be initiated with the Hotel. Refund
                  would be through cash transfer at your account.
                </li>
                <li>
                  In case you avail the website's hotel reservation services and
                  thereafter, not contactable on the contact details provided in
                  this regard, then the hotel reservation selected by you will
                  stand cancelled and Kiomoi.com would not be liable for any
                  charges/expenses incurred by you, either directly or
                  indirectly in this regard.
                </li>
              </ul>
              <h4 className="text-uppercase mt-4 mb-2 fw-bold fs-6">
                Promotion &amp; Promo Codes
              </h4>
              Kiomoi.com generates promotion codes from time to time which may
              be availed on the site as a discount coupon.
              <h4 className="my-4 fw-bold fs-6">
                Car Cancellation Terms &amp; Conditions:
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  Between 24 hours to 3 days before journey the cancellation
                  charge is 100%. Between 3 days to 1 week before journey the
                  cancellation charge is 10%.
                </li>
                <li>
                  A modification fee of minimum INR 250 per request will apply
                  if you wish to change or cancel any part of your booking plus
                  a difference in rates will be charged for changes to be made
                  to the reservation subject to availability.
                </li>
                <li>
                  In case the cab operator changes the type of vehicle due to
                  some reason, KIOMOI will refund the differential amount to the
                  customer upon being intimated by the customers in 24 hours of
                  the journey.
                </li>
                <li>
                  We take at least 07-15 working days to process refunds for
                  bookings cancelled or modified.
                </li>
                <li>
                  Please note that the cancellation fee and cancellation period
                  may differ from one cab operator to another. Please contact
                  any of our support executives for complete details or send us
                  an e-mail at info@kiomoi.com
                </li>
              </ul>
              <h4 className="text-centertext-uppercase my-4 fw-bold fs-6">
                Instant Booking (Book Now Option)
              </h4>
              <ul className={`list-disc terms_condition px-3 text-[14px]`}>
                <li>
                  You must have completed 18 years of age to check in this
                  hotel.
                </li>
                <li>
                  We are not holding any hotel/package booking; this booking is
                  reconfirmed within 24 working hours.
                </li>
                <li>
                  Rates are valid for Indian Resident and non-Indian residents
                  having work permit in India. (Non Indian Resident has to pay
                  the additional or the same amount as per the hotel Policy)
                </li>
                <li>
                  Incase of non-availability of hotel similar category of hotel,
                  will be provided by Kiomoi.com.
                </li>
                <li>
                  Incase same category hotel is not available; customer has to
                  pay the additional cost of Hotel and package booking and
                  customer has the option to get the full refund for the same
                  booking excluding the service charge.
                </li>
                <li>
                  A sudden increment in cost of Hotel/Package booking, and Tax,
                  Customer has to pay the additional cost.
                </li>
                <li>
                  For all pick up arrangement, customer has to send the pick up
                  details like flight/ Train Number, Booking Confirmation id,
                  date and time at least 7 days before the check in date
                  to info@kiomoi.com
                </li>
                <li>
                  Your credit card is charged with the total cost above at time
                  of purchase. Prices and room availability is not guaranteed
                  until full payment is received.
                </li>
                <li>
                  The price shown above DOES NOT include any applicable hotel
                  service fees, charges for optional incidentals (such as mini
                  bar snacks or telephone calls), or regulatory surcharges. The
                  hotel will assess these fees, charges, and surcharges upon
                  checkout.
                </li>
                <li>
                  Kiomoi.com, reserve the rights to modify or cancel the booking
                  without prior notice.
                </li>
                <li>
                  Kiomoi.com reserve the right to cancel the booking, incase of
                  cancellation of booking, full amount excluding the service
                  charge will be refunded to customer within 30 working days.
                </li>
                <li>
                  All other refund takes minimum 7 working days or depends on
                  case-to-case basis.
                </li>
                <li>
                  The standard check-in and checkout time is 12:00 noon. Early
                  check-in and late checkouts are on request, subject to
                  availability and may be chargeable by the hotel.
                </li>
                <li>
                  For cancellations product standard policy will be applicable
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TNC;
