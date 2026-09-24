import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Joytour Holidays tour booking terms and conditions covering reservations, cancellations, refunds, amendments, travel documents, accommodation, pricing, and responsibilities.",
};

interface Section {
  id: string;
  number: string;
  title: string;
  body: Block[];
}

type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] };

const sections: Section[] = [
  {
    id: "reservation",
    number: "1",
    title: "Reservation, Deposit & Full Payment",
    body: [
      {
        kind: "p",
        text: "1.1 If your minimum deposit is less than the required amount, kindly top up the difference within the next two (2) days.",
      },
      {
        kind: "table",
        headers: ["Tour Type", "Minimum Deposit Required (SGD per person)"],
        rows: [
          ["All Group Tour Packages (except Cruise)", "$800.00 – $1,000.00"],
          ["All Group Tour Packages with Domestic Flight & Arctic Packages", "$2,000.00"],
          [
            "Cruise & Special Departure Group Tour Packages, South America Tour Packages",
            "$4,000.00",
          ],
          ["Free & Easy Packages", "80% of total tour fare"],
          [
            "Tours organised by third (3rd) parties (e.g. luxury cruise, overseas land operator, airline, etc.)",
            "Amount per Terms & Conditions stipulated by principal suppliers",
          ],
        ],
      },
      {
        kind: "p",
        text: "1.2 Payment of deposit does not constitute confirmation of the tour. All group tours are subject to a minimum group size (as determined by the Company) in order for the confirmation to be effected and for the departure to be finalised.",
      },
      {
        kind: "p",
        text: "1.3 Full payment is required no later than twenty-one (21) days prior to departure. In case of tours in peak season, full payment must be made one month before departure. If full payment is not received by the stipulated deadline, the Company reserves the right to forfeit the deposit and cancel the reservation. In such an event, the cancellation fee as stated in Section 2 is payable by the Customer.",
      },
      {
        kind: "p",
        text: "1.4 By making deposit and balance payment, it is deemed that you have read, understood and accepted the Tour Booking Terms and Conditions in the booking form.",
      },
      {
        kind: "p",
        text: "1.5 The Company reserves the right to request for a top-up on initial deposit for immediate issuance of air tickets, to avoid incurring additional surcharges.",
      },
      {
        kind: "p",
        text: "1.6 Customers must top-up the deposits for ticket issuance as and when the air-tickets are required to be issued by the airlines at the stipulated dateline without prior notice. Failure to do so, the Company has the right to cancel the tour and the deposit will be forfeited.",
      },
    ],
  },
  {
    id: "cancellation-customer",
    number: "2",
    title: "Cancellation by the Customer",
    body: [
      {
        kind: "p",
        text: "2.1 Cancellation of booking must be made in writing or in person to avoid any misunderstandings.",
      },
      {
        kind: "p",
        text: "2.2 The following cancellation fees apply once any group tour package booking is made:",
      },
      {
        kind: "table",
        headers: [
          "No. of Days Between Departure and Receipt of Cancellation Notice",
          "Minimum Cancellation Fee per Person (SGD)",
        ],
        rows: [
          ["35 working days or more", "100% of minimum deposit amount"],
          [
            "15 to 34 working days",
            "100% of minimum deposit amount or 50% of tour fare + taxes, whichever is higher",
          ],
          [
            "8 to 14 working days",
            "100% of minimum deposit amount or 75% of tour fare + taxes, whichever is higher",
          ],
          ["7 working days and below", "Full tour fare + taxes"],
        ],
      },
      {
        kind: "p",
        text: "2.3 The above cancellation fees apply if the air-tickets are not issued. If the air-tickets are issued, the value of the air-tickets will be added onto the cancellation fees. The Company reserves the right to issue air-tickets without prior notice. If the deposit amount is insufficient to cover the cancellation fee, the Customer must pay for the difference.",
      },
      {
        kind: "p",
        text: "2.4 'Working days' refer to Mondays to Fridays, excluding public holidays.",
      },
      {
        kind: "p",
        text: "2.5 For Free and Easy packages, administrative fees and/or minimum one (1) night hotel rate will be imposed for those travel documents not issued. Upon issuance of travel documents, changes will not be allowed and have no refund value.",
      },
      {
        kind: "p",
        text: "2.6 For any cancellation of one customer in a twin/double sharing room, the other customer sharing the same room will need to top up an additional single supplement charge, unless the customer who cancelled had paid the full tour fare and taxes as the cancellation fee.",
      },
    ],
  },
  {
    id: "cancellation-company",
    number: "3",
    title: "Cancellation by the Company",
    body: [
      {
        kind: "p",
        text: "3.1 The Company acts as an agent for service suppliers. After deposit or full payment has been made, all arrangements are still subject to final confirmation by service suppliers. At times due to low subscription for a group tour, the Company may choose to cancel the entire tour fourteen (14) days prior to departure.",
      },
      {
        kind: "p",
        text: "3.2 The Company shall also not be held liable for any contingent costs incurred by the Customer arising from the cancellation.",
      },
      {
        kind: "p",
        text: "3.3 The Company may recommend alternative tours either to the same destination or other tours, based on the current tour fare of that cancellation period. All prior special discounts given will not be extended for the alternative tours. Should the Customer decide not to accept the alternatives, a full refund on the amount paid by the Customer will be made accordingly by the Company without further obligation or liabilities on the part of the Company, and the Customer shall be deemed to have agreed to release the Company from all liabilities or damages in connection with the cancellation. There shall be no claim for inconvenience, loss of leave and transportation cost due to the cancellation of tour.",
      },
    ],
  },
  {
    id: "refund-policy",
    number: "4",
    title: "Refund Policy",
    body: [
      {
        kind: "p",
        text: "4.1 No refunds will be made with respect to accommodation, meals, sightseeing tours or any other services included in the tour fare but not utilised by the Customer, either in part or full, or when the Customer amends, cancels or otherwise changes any arrangements after commencement of the tour.",
      },
      {
        kind: "p",
        text: "4.2 All refunds will be made within fifteen (15) working days. For credit card payments, refunds will be made through the credit card company and subject to individual bank processing time.",
      },
      {
        kind: "p",
        text: "4.3 Air tickets with refund value will only be refunded to Customers within fifteen (15) working days after the respective airlines have refunded to the Company. The standard processing period for air-ticket refunds varies from three (3) to six (6) months (subject to individual airlines). However, group and promotional tickets are non-refundable.",
      },
      {
        kind: "p",
        text: "4.4 During peak period, the refund process may be longer due to increase in transactions.",
      },
    ],
  },
  {
    id: "amendment-passenger",
    number: "5",
    title: "Amendment to Bookings (Requested by Passengers)",
    body: [
      {
        kind: "p",
        text: "5.1 For any changes in departure date or tour type, cancellation fees apply as listed under Section 2 on Cancellation by the Customer.",
      },
      {
        kind: "p",
        text: "5.2 For every request made regardless of whether any previous amendment was confirmed by airlines, hotel or otherwise, there will be a minimum fee of $100.00 per person per amendment. This does not include any other fees imposed by the airlines, ground operator or hotel.",
      },
      {
        kind: "p",
        text: "5.3 A postponement of tour by the Customer for any reason is considered as cancellation. Under such circumstances, the above Cancellation Policies will apply accordingly.",
      },
      {
        kind: "p",
        text: "5.4 Any changes made by the Customer to the existing booking must be in writing or in person at least twenty-one (21) days before the tour, after which strictly NO amendments are allowed, or cancellation fee applies.",
      },
      {
        kind: "p",
        text: "5.5 Any replacement or change of passengers will be considered as a cancellation and not an amendment. This term is applicable to all cases, including but not restricted to medical and pregnancy cases.",
      },
    ],
  },
  {
    id: "amendment-company",
    number: "6",
    title: "Amendment to Tour Itinerary by Company",
    body: [
      {
        kind: "p",
        text: "The Company makes reasonable effort to avoid changes in the itinerary. However, the Company reserves the right to make minor changes at any time due to unforeseen circumstances, especially during peak periods or in the event of other circumstances beyond our control.",
      },
    ],
  },
  {
    id: "extension",
    number: "7",
    title: "Extension of Stay / Deviation",
    body: [
      {
        kind: "p",
        text: "7.1 Extension of stay may be permitted at the end of tour, subject to the restriction of the air ticket, seat availability and hotel confirmation prior to the commencement of the tour. All requests must be made before issuance of air tickets. If the extension of stay/deviation is unable to be confirmed three (3) weeks prior to the group's departure date, the passenger is deemed to stick to the original tour schedule. In the event that the original schedule has been changed by the Company, any extra cost will be borne by the Customer.",
      },
      {
        kind: "p",
        text: "7.2 Cancellation fee is also applicable if the Customer cancels the booking because the extension/deviation is unable to be confirmed prior to departure.",
      },
      {
        kind: "p",
        text: "7.3 Extension of stay/deviation will be at the Customer's own expense and transfer to the airport will not be provided.",
      },
      {
        kind: "p",
        text: "7.4 It is the Customer's responsibility to hold firm confirmation of their return flight and to re-confirm their flight 72 hours prior to their return date.",
      },
      {
        kind: "p",
        text: "7.5 The air ticket issued is a special ticket, restricted to the specific airline only. It is non-negotiable, non-endorsable, non-reissuable, non-refundable & non-reroutable. Any alteration in routing or dates by the Customer is solely at his/her own risk. The Company and its associated agents will not be held responsible for any inconvenience caused and extra expenses incurred. No refunds will be made for any unused air ticket, accommodation, meals, or sightseeing in part or full.",
      },
    ],
  },
  {
    id: "documents",
    number: "8",
    title: "Travel Documents, Travel Insurance & Travel Vouchers",
    body: [
      { kind: "h3", text: "8.1 Passport and Other Travel Documents" },
      {
        kind: "p",
        text: "It is the Customer's sole responsibility to ensure that he/she has a valid passport with minimum six (6) months validity from the date of scheduled return to Singapore, as well as the necessary visas, vaccinations, health certificates and all necessary travel documents as required by various government authorities of the destinations of travel.",
      },
      { kind: "h3", text: "8.2 Visa" },
      {
        kind: "p",
        text: "The Customer may seek advice from the Company on visa application; however, it is the Customer's own responsibility to obtain a valid visa.",
      },
      {
        kind: "list",
        items: [
          "8.2.1 If for any reason, application for visa or exit permit is rejected (please refer to clause 2.2).",
          "8.2.2 It is the Customer's responsibility to check that multi-entry visas have the correct entry dates and destinations before travelling. Please be aware that for some itineraries you may travel through a country without making an overnight stop but you will still require a visa to enter/exit the country.",
          "8.2.3 In consideration of the interests of other passengers in the same group, the Company strongly discourages all passengers from applying for Visa Upon Arrival at the destination country. The Company takes no responsibility for being unable to wait for passengers who apply for Visa Upon Arrival at the Customs.",
          "8.2.4 The Company will not be responsible for any expenses, reimbursement or refund of the tour fare if the Customer is deported or refused entry by immigration authorities on the tour for whatever reasons, including improper travel documents, quarantine, custom regulations, possession of unlawful items or irregularities that may cause harm or damage to person or property.",
          "8.2.5 For non-Singapore passport holders, please request for the Company to check on visa requirements. The Company renders assistance in visa application wherever possible. The Company cannot, however, guarantee the approval of visa applications. This service is subject to (auxiliary) fees. Please check with the Company on the amount.",
        ],
      },
      { kind: "h3", text: "8.3 Travel Insurance" },
      {
        kind: "list",
        items: [
          "8.3.1 Arrangement of travel insurance coverage is strongly recommended with respect to unforeseen circumstances such as flight cancellation, trip cancellation, loss of deposit, baggage, personal accident, injury, illness, etc. Under no circumstances shall the Company be construed as a carrier under a contract for safe carriage of the Customer or his/her baggage and other personal belongings.",
          "8.3.2 The Company shall not be responsible for any loss or damage in relation to flight cancellation, trip cancellation, loss of personal baggage, accidents, injuries and illness.",
          "8.3.3 Should there be any amendment to the date and duration of travel, it is the Customer's responsibility to inform the travel insurance company to amend the date and duration of the insurance coverage.",
          "8.3.4 The Company will be pleased to assist in the enquiries of any travel insurance and related matters.",
        ],
      },
      { kind: "h3", text: "8.4 Travel Vouchers" },
      {
        kind: "p",
        text: "The Company issues travel vouchers from time to time as part of its promotional activities. The Terms and Conditions for the redemption of travel vouchers are clearly spelt out in the appropriate documents and shall be binding on the Customer.",
      },
    ],
  },
  {
    id: "general",
    number: "9",
    title: "General Matters Relating to Tours",
    body: [
      { kind: "h3", text: "9.1 Accommodation" },
      {
        kind: "p",
        text: "Accommodation is as specified in the tour brochure / itinerary / tour booking form. In the event the specified accommodation is not available, every effort will be made to scout for an alternative in another accommodation of similar standard. Hotel room sizes, facilities and services may vary in different countries. Accommodation for adults is based on twin-share, double or triple-share rooms. Different room types might not be on the same level. Single room occupancy comes with an additional cost.",
      },
      {
        kind: "list",
        items: [
          "9.1.1 Room size is generally slightly smaller than what you may be used to. Space is a precious commodity in Europe and especially in its busiest cities. Many of the buildings will have been in existence for hundreds of years and were not built with the modern traveller in mind. The upside is that they are usually in excellent locations and have a fascinating story to tell.",
          "9.1.2 Bed sizes may also differ. In Europe, King and Queen-sized beds are very rare. Here, double beds are the norm and you may often find that a double room consists of two twin beds pushed together instead of a full bed, made up with one set of linen. You may also find that twin beds will be placed very close together.",
          "9.1.3 A triple room is the same size as a twin-share room. The third bed is always a roll-away bed or sofa bed added into the room. As a result, you may feel that the room is very cramped and small.",
          "9.1.4 Europeans are very socially and environmentally conscious, especially about air-conditioning in Europe. During autumn and winter seasons, the central air-conditioning will be switched off in the hotel rooms. So, do not expect that the air-conditioning will be switched on in the room. You may open the windows to let cold air in, where possible.",
        ],
      },
      { kind: "h3", text: "9.2 Special Request" },
      {
        kind: "p",
        text: "If there are any requests regarding special meals, dietary requirements, adjoining rooms, flight seating arrangement and so on, please inform the Company upon booking. However, such requests are strictly subject to confirmation and availability by the airlines/hotels. There are no halal meals on tour.",
      },
      { kind: "h3", text: "9.3 Baggage" },
      {
        kind: "p",
        text: "The Customer is usually allowed check-in baggage not exceeding twenty (20) kilograms. Only one piece of hand-luggage not exceeding seven (7) kilograms is allowed on board the aircraft. Excess baggage charges must be borne by the Customer and are subject to individual airlines' company policy.",
      },
      { kind: "h3", text: "9.4 Meals" },
      {
        kind: "list",
        items: [
          "9.4.1 Meals, including meals served on flights, are as indicated in the tour brochure/itinerary/tour booking form. In the event where in-flight meals are not served due to whatever reasons, there shall be no refund or replacement.",
          "9.4.2 You and your travelling companions will generally dine together at a designated time. Tables will often vary in size and free seating enables you to dine with family members or new travelling companions each evening. A breakfast buffet is included daily and will reflect the local region's tastes and culture. Very occasionally, an early departure may result in a light breakfast box for you to take away if applicable. Lunches are sometimes included but are usually an opportunity for the guest to enjoy some free time to visit a local café, bar or restaurant and eat where the locals do. Your tour manager will be able to provide you with a range of options to suit all tastes and preferences.",
        ],
      },
      { kind: "h3", text: "9.5 Seat Rotation" },
      {
        kind: "p",
        text: "For the convenience of all members of the group, passengers may be requested to rotate their seating arrangements on the coach during the period of the tour. Please cooperate when requested to do so by the tour manager / tour leader / guide.",
      },
      { kind: "h3", text: "9.6 Motor-coach" },
      {
        kind: "p",
        text: "For selected itineraries with Wi-Fi on coach using 3G mobile network, it means that the connection is slower than standard broadband and at times may not be available. It is good for checking emails, web browsing and updating social media accounts, but less so for streaming videos or large photo uploads.",
      },
      { kind: "h3", text: "9.7 Single Room Supplement" },
      {
        kind: "p",
        text: "Please note that customers paying for single room occupancy supplement charge will be allocated a single room. The single room supplement charge as indicated in the booking form applies. Hotels will try their best to upgrade twin/double room for guests who opt for single room occupancy, but this may not be possible in the event when hotel occupancy rate is high.",
      },
      { kind: "h3", text: "9.8 Suggested Excursion" },
      {
        kind: "p",
        text: "Optional list may be subject to change, depending on the time you are travelling or local circumstances including weather and days of the week. Further information will be provided by your Tour Manager / Guides during the tour.",
      },
      { kind: "h3", text: "9.9 Flights" },
      {
        kind: "p",
        text: "The tour group might be comprised of flights on different airlines, so the Tour Manager may not be on the same flight as the group. If the group is not on the same flight as the Tour Manager, the group will have to proceed to transit on their own. There will be a check-in staff at Singapore Changi Airport to assist the group to check in if the Tour Manager is not flying together.",
      },
    ],
  },
  {
    id: "pricing",
    number: "10",
    title: "Pricing Policies",
    body: [
      { kind: "h3", text: "10.1 Tour Fare Includes" },
      {
        kind: "p",
        text: "Return economy class group tour air ticket, local transport, accommodation, admission fees, meals and sightseeing programme as stipulated in the tour brochure / itinerary / tour booking form.",
      },
      { kind: "h3", text: "10.2 Tour Fare Excludes" },
      {
        kind: "p",
        text: "Airport taxes, airport security taxes, airline insurance surcharges, fuel taxes, visa fees, travel insurance, customs user fees as specified by the airlines and airport authorities; local transfer not stated in the itinerary (e.g. free & easy, deviation), laundry, excess baggage charges, beverages, room services, gratuities to drivers and tour managers / local guides and tips to hotel porters (if any); and personal expenses. Please refer to the Company for visa fees, gratuities to drivers and tour managers / local guides, and tips to hotel porters.",
      },
      { kind: "h3", text: "10.3 Cancellation Fee" },
      {
        kind: "p",
        text: "For Clause 2 — Cancellation by the Customer — tour fare refers to the selling tour fare plus airport taxes, airport security taxes, airline insurance surcharges and fuel taxes.",
      },
      { kind: "h3", text: "10.4 Child Fare" },
      {
        kind: "p",
        text: "Child fare is applicable to children below twelve (12) years old on the scheduled date of departure & departure date from Singapore. The child fare is based on a twin-sharing accommodation with two adults and no additional bed will be provided. A surcharge will be imposed where an extra bed is required for the child or where the child occupies a room with only one adult.",
      },
      { kind: "h3", text: "10.5 Mode of Payment" },
      {
        kind: "p",
        text: "Payment may be made in cash, by NETS, PAYNOW, AXS, cheques or credit cards. Cheques will only be accepted if presented to the Company at least seven (7) working days before scheduled tour departure. Credit card payment may incur additional surcharge for special promotion packages — refer to our staff for confirmation. Overseas bank transfer may incur additional surcharge and to be borne by the Customer.",
      },
    ],
  },
  {
    id: "responsibility",
    number: "11",
    title: "Responsibility",
    body: [
      {
        kind: "p",
        text: "11.1 The Company acts as an agent for the carriers, transportation companies, hotels and other principals of the tour packages. The Company accepts no responsibility for any injuries, losses, damages, accidents, flight cancellations, delays, theft, quarantine, customs regulations, strikes, weather hazards, political unrest, changes in itineraries, deportation or refusal of entry by Immigration Authorities resulting from improper travel documents, possession of unlawful items or irregularities that may cause damage to person or property. Any losses and/or expenses incurred are the responsibility of the passenger. Ensuring all proper travel documentation is in place is the sole responsibility of the Customer.",
      },
      {
        kind: "p",
        text: "11.2 The failure of the Customer to follow reasonable instructions, including but not limited to check-in and check-out places or times or other cause and the losses and/or expenses resulting therefrom shall be borne by the Customer.",
      },
      { kind: "h3", text: "11.3 The Company reserves the right to:" },
      {
        kind: "list",
        items: [
          "11.3.1 Alter tour itineraries, travel arrangements, accommodation due to unforeseen changes.",
          "11.3.2 Cancel any reservations prior to departure for reasons, including but not limited to insufficient number of participants. The Company will recommend alternative tours, preferably to the same destination or to other destinations. Should the Customer decide not to accept the alternatives, the deposit or tour fare is to be refunded without further obligation on the part of the Company, upon the Customer's surrender to the Company of all documents issued by the Company for the purpose of the tour package.",
          "11.3.3 Require any individual to withdraw from the tour if it is deemed that his/her behaviour is detrimental to or incompatible with the health, safety, interests, harmony and welfare of the other tour participants and the tour group as a whole. Under such circumstances, the Company shall be under no liability thereafter to any such person.",
          "11.3.4 Specify the language in which the tour guide will conduct commentary in.",
        ],
      },
      {
        kind: "p",
        text: "11.4 No tour guides, tour managers, tour leaders or other employees or agents of the Company are authorised to commit the Company to any liability and the Company shall not be bound by any statement or representation unless it is in writing and signed by a Management Executive of the Company.",
      },
      {
        kind: "p",
        text: "11.5 All verbal agreements must be stated in writing and duly signed by the Manager.",
      },
      {
        kind: "p",
        text: "11.6 The Company reserves the right to take photographs and videos of the Customer while he/she is on tour with the Company, to be used for advertising in brochures or publicity materials without obtaining any further consent from the Customer.",
      },
      {
        kind: "p",
        text: "11.7 All tour fares for the respective tour packages are correct at the time of reservation. The Company reserves the right to revise the tour fares and to determine the date of commencement of such revised tour fares.",
      },
    ],
  },
  {
    id: "complaint",
    number: "12",
    title: "Complaint & Claim",
    body: [
      {
        kind: "p",
        text: "Should you encounter a problem during your tour, kindly inform the Joytour Holidays Tour Manager or local supplier immediately, who will try to make things right. If the matter was not resolved locally, please submit feedback to Joytour Holidays in writing within seven (7) days from the date of return. It is important to provide us the information quickly. Please quote your booking reference number and all relevant information. Failure to follow this procedure may delay or deny us the opportunity to investigate and rectify the problem, which may affect the way your complaint is dealt with and your rights under this contract.",
      },
    ],
  },
  {
    id: "miscellaneous",
    number: "13",
    title: "Miscellaneous",
    body: [
      {
        kind: "p",
        text: "The Company reserves the right to change, amend, insert or delete any Tour Booking Terms and Conditions contained within this document, as the case may be, without prior notice. The Tour Booking Terms and Conditions complement those Terms and Conditions contained in the relevant documents provided by third (3rd) party service providers such as airlines or cruise tickets, hotel check-ins etc.",
      },
    ],
  },
];

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="bg-[color:var(--brand-cream)] px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="kicker">Legal · Joytour Holidays Pte Ltd</p>
          <h1 className="mt-4 max-w-3xl">
            Tour Booking{" "}
            <span className="text-[color:var(--brand-orange)]">Terms & Conditions</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-[color:var(--brand-text)]">
            You and your travelling companions are deemed to have read, understood and
            accepted the following Terms and Conditions. Joytour Holidays Pte Ltd is
            referred to as &quot;the Company&quot; below.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal-deep)]">
              Contents
            </p>
            <nav
              aria-label="Page contents"
              className="mt-4 space-y-2 border-l border-[color:var(--brand-border)] pl-4 text-[0.9rem]"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-[color:var(--brand-muted)] transition hover:text-[color:var(--brand-orange)]"
                >
                  <span className="font-medium text-[color:var(--brand-ink)]">
                    {s.number}.
                  </span>{" "}
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-16">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-32">
                <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal-deep)]">
                  Section {s.number}
                </p>
                <h2 className="mt-3">{s.title}</h2>
                <div className="mt-7 space-y-5 text-[1rem] leading-[1.75] text-[color:var(--brand-text)]">
                  {s.body.map((block, i) => {
                    if (block.kind === "p") {
                      return <p key={i}>{block.text}</p>;
                    }
                    if (block.kind === "h3") {
                      return (
                        <h3
                          key={i}
                          className="pt-3 font-display text-[1.15rem] font-bold leading-[1.18] tracking-[0.005em] text-[color:var(--brand-ink)]"
                        >
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.kind === "list") {
                      return (
                        <ul key={i} className="list-none space-y-3">
                          {block.items.map((item, j) => (
                            <li
                              key={j}
                              className="rounded-[16px] bg-[color:var(--brand-cream)] px-5 py-4"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.kind === "table") {
                      return (
                        <div
                          key={i}
                          className="overflow-x-auto rounded-[18px] border border-[color:var(--brand-border)]"
                        >
                          <table className="w-full text-[0.95rem]">
                            <thead className="bg-[color:var(--brand-cream)] text-left text-[color:var(--brand-ink)]">
                              <tr>
                                {block.headers.map((h, k) => (
                                  <th
                                    key={k}
                                    className="px-5 py-3 font-display text-[0.95rem] font-bold tracking-[0.005em]"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {block.rows.map((row, k) => (
                                <tr
                                  key={k}
                                  className="border-t border-[color:var(--brand-divider)]"
                                >
                                  {row.map((cell, l) => (
                                    <td
                                      key={l}
                                      className="px-5 py-4 align-top leading-[1.55]"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--brand-ink)] px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal)]">
            Questions?
          </p>
          <h2 className="mt-3 text-white">
            Talk to{" "}
            <span className="text-[color:var(--brand-orange)]">a planner</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-[1.7] text-white/80">
            If anything in these terms isn&apos;t clear, send us a message and a planner
            will walk you through it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="brand-pill">
              Send an Enquiry
            </Link>
            <a
              href="https://wa.me/6586299765"
              target="_blank"
              rel="noreferrer"
              className="brand-pill-ghost"
            >
              WhatsApp +65 8629 9765
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
