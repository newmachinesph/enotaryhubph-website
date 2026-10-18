import type { SiteCopy } from "./types";

/**
 * Filipino copy — written and staged, not yet routed.
 *
 * Ported from the v1 site, which used the standard Philippine business
 * register: Filipino prose with English legal and technical terms left intact
 * ("Electronic Notary Public", "notarial act", "two-way audio at video"),
 * because those are the terms the Rules themselves use.
 *
 * Typing this as SiteCopy means a key added to `en` fails the build here until
 * it is translated. That is intentional — silent English fallbacks are how
 * half-translated sites happen.
 */
export const fil: SiteCopy = {
  nav: {
    how: "Paano ito gumagana",
    business: "Para sa negosyo",
    notaries: "Para sa notaryo",
    articles: "Mga artikulo",
    contact: "Makipag-ugnayan sa Amin",
  },

  common: {
    waitlist: "Sumali sa launch list",
    contact: "Magpadala ng tanong",
    learn: "Tingnan ang bawat hakbang",
    launchNote: "Inihahanda para sa paglulunsad sa Pilipinas.",
    official: "Gabay ng Supreme Court",
    informationOnly: "Para sa impormasyon lamang · Hindi legal advice",
    footerStatement:
      "Mas malinaw na daan papunta sa seryosong legal na gawain.",
    compliance:
      "Ang availability, eligibility ng dokumento, at bawat electronic notarial act ay nakadepende sa Rules on Electronic Notarization, accreditation ng facility, at pagsusuri ng Electronic Notary Public.",
    skipToContent: "Dumiretso sa nilalaman",
    openMenu: "Buksan ang menu",
    closeMenu: "Isara ang menu",
    commandHint: "Maghanap",
    commandTitle: "Navigation",
    commandPlaceholder: "I-type ang pangalan ng pahina",
    commandEmpty: "Walang tumugma.",
  },

  home: {
    eyebrow: "Electronic notarization para sa Pilipinas",
    lead: "Ihanda ang dokumento, kumpletuhin ang required checks, humarap sa Electronic Notary Public, at tanggapin ang finished record. Makikita sa eNotaryHub ang buong daan.",
    launchStatus:
      "Paalala: Aktibong dinedebelop ang eNotaryHub PH habang hinahabol namin ang buong accreditation sa Supreme Court at sa Electronic Notarization Administrator. Hindi pa available ang electronic notarization services kasama ang commissioned Electronic Notaries Public. Salamat sa pagdaan habang ginagawa namin ito, abangan ninyo!",
    scrollCue: "Ang proseso",

    introKicker: "Ang planong proseso",
    introTitle: "Isang Dokumento. Apat na Bantay na Sandali.",
    introBody:
      "Hindi signature button ang electronic notarization. Kailangang magtugma ang dokumento, ang mga tao, ang identity checks, ang location, ang live appearance, at ang records bago kumpletuhin ng notaryo ang act.",
    steps: [
      {
        title: "Maghanda",
        body: "I-upload ang unsigned electronic document, ilagay ang lahat ng kailangang kalahok, at sabihin kung ano ang kailangan ninyo.",
      },
      {
        title: "Mag-verify",
        body: "Kumpletuhin ang identity, credential, at location checks bago gawin ang notarial act.",
      },
      {
        title: "Humaharap at Lumagda",
        body: "Makipagkita sa notaryo sa accredited facility, o sa live remote session kung pinapayagan.",
      },
      {
        title: "Tumanggap",
        body: "Kunin ang electronically notarized document at ang impormasyong kailangan para ma-verify o mabalikan ang transaction.",
      },
    ],
    stepStates: ["Request", "Checks", "Live Act", "Record"],

    sessionKicker: "Remote appearance at signing",
    sessionTitle:
      "Lumagda ng Dokumento Kahit Saan sa Pilipinas, sa Pamamagitan ng Remote Appearance at Signing.",
    sessionBody:
      "Humarap sa commissioned Electronic Notary Public sa live, two-way audio at video, nang hindi na kailangang magbiyahe papuntang opisina. Sa iisang lugar na inaasikaso ang identity, credentials, location, at ang record ng session.",
    /* Anim na punto, hindi apat: dito na napasama ang accredited facility at
       notary review nang pagsamahin ang hiwalay na rules section. */
    sessionPoints: [
      "Live two-way audio at video",
      "Identity at credential verification",
      "Location checks para sa remote acts",
      "Pagsusuri ng notaryo bago ituloy ang act",
      "Isinasagawa sa accredited facility",
      "Session records ayon sa Rules",
    ],
    sessionNote:
      "Sa karaniwang remote electronic notarization, kailangang nasa Pilipinas ang mga kalahok. May limitadong exceptions ang Rules para sa principal na nasa Philippine embassy, consular office, o office ng honorary consul sa abroad.",

    audienceTitle: "Para sa Abogado, Law Firm, at Kliyente.",
    audienceBody:
      "Iisa ang mga tuntunin para sa lahat, pero magkakaiba ang pangangailangan ng bawat panig. May malinaw na simula para sa bawat grupo.",
    audiences: [
      {
        title: "Para sa Kliyente",
        body: "Alamin kung ano ang ihahanda, sino ang kailangang humarap, at bakit maaaring humingi pa ng detalye ang notaryo.",
        cta: "Basahin ang proseso",
        page: "how",
      },
      {
        title: "Para sa Law Firm",
        body: "Iwasang mawala sa iba't ibang inbox ang paulit-ulit na requests, participants, at completed documents.",
        cta: "Tingnan ang business pages",
        page: "business",
      },
      {
        title: "Para sa Commissioned Electronic Notaries Public",
        body: "Suriin ang planong workspace para sa intake, sessions, electronic execution, at records.",
        cta: "Tingnan ang notary pages",
        page: "notaries",
      },
    ],

    manifestoTitle: "Nagbabago ang Screen. Hindi ang Tungkulin ng Notaryo.",
    manifestoBody:
      "Puwedeng gawing mas madaling sundan ng teknolohiya ang daan. Hindi nito puwedeng alisin ang identity check, palitan ang live appearance, o magdesisyong dapat ituloy ang dokumento.",

    waitlistKicker: "Launch list",
    waitlistTitle: "Malaman Kung Kailan Bubukas ang eNotaryHub PH.",
    waitlistBody:
      "Aktibong dinedebelop ang eNotaryHub PH habang hinahabol namin ang buong accreditation sa Supreme Court at sa Electronic Notarization Administrator. Iwan ang inyong details at ipapaalam namin agad kapag available na ang electronic notarization.",

    faqTitle: "Mga Unang Tanong ng Karamihan",
    faqIntro:
      "Maiikling sagot batay sa A.M. No. 24-10-14-SC. Ang commissioned notary pa rin ang magpapasya kung maaaring ituloy ang request.",
    faqs: [
      {
        question: "Maaari na ba akong mag-request ngayon?",
        answer:
          "Hindi pa. Inihahanda pa ang public launch ng eNotaryHub at hindi pa kami tumatanggap ng notarization requests.",
      },
      {
        question: "Notarized na ba kapag may electronic signature?",
        answer:
          "Hindi. Magkaiba ang signature at notarial act. Kailangang gawin ng notaryo ang tamang act at ilakip ang electronic notarial certificate at seal.",
      },
      {
        question: "Lahat ba ng dokumento ay puwedeng electronically notarized?",
        answer:
          "Hindi. Hindi saklaw ng rules ang ilang acts at documents, kasama ang notarial wills, deposition taking, at paper documents na may handwritten signature o mark. Ang iba pang eligibility questions ay nakadepende sa dokumento at review ng notaryo.",
      },
      {
        question: "Puwede ba akong sumali sa remote session mula saanman?",
        answer:
          "Huwag itong ipagpalagay. Sa karaniwang remote electronic notarization, kailangang nasa Pilipinas ang mga kalahok. May limitadong cases para sa principal na nasa Philippine embassy, consular office, o office ng honorary consul sa abroad.",
      },
    ],
  },

  how: {
    eyebrow: "Paano gumagana ang electronic notarization",
    title: "Alamin ang Susunod Bago Magsimula.",
    lead: "Nag-iiba ang eksaktong act ayon sa dokumento. Ito ang planong daloy ng request sa eNotaryHub.",
    steps: [
      {
        index: "1.0",
        title: "Ilarawan ang Request",
        body: "Piliin ang kailangang service, i-upload ang unsigned electronic document, at idagdag ang bawat principal at witness.",
      },
      {
        index: "2.0",
        title: "Kumpletuhin ang Checks",
        body: "Ibigay ang kailangang detalye at tapusin ang identity, credential, at location verification sa facility.",
      },
      {
        index: "3.0",
        title: "Hintayin ang Review",
        body: "Susuriin ng Electronic Notary Public ang request, titiyaking maaari itong ituloy, at magtatakda ng session.",
      },
      {
        index: "4.0",
        title: "Humaharap nang Live",
        body: "Sumali sa live session kasama ang notaryo at ibang kailangang tao. Gumagamit ang remote session ng two-way audio at video at maaaring i-record.",
      },
      {
        index: "5.0",
        title: "Lumagda at Kumpletuhin ang Act",
        body: "Sundin ang instruction ng notaryo para sa kailangang signature, oath, acknowledgment, o witnessing.",
      },
      {
        index: "6.0",
        title: "Tanggapin ang Record",
        body: "Tanggapin ang electronically notarized document. Kukumpletuhin ng notaryo ang certificate, seal, at required record entries.",
      },
    ],
    prepareTitle: "Ihanda Ito Bago Mag-request",
    prepareIntro:
      "Makakatulong ang mga ito sa review ng notaryo. Hindi nito ginagarantiya na eligible ang dokumento.",
    prepare: [
      "Kumpletong electronic document sa accepted format",
      "Kasalukuyang government-issued photo ID",
      "Device na may camera at stable internet para sa remote session",
      "Bawat kailangang principal at witness",
      "Document at format requirements ng tatanggap",
    ],
    ctaTitle: "Gustong Maabisuhan Kapag Bukas Na?",
    ctaBody:
      "Sumali sa launch list, o ikuwento ang document process na madalas ninyong hawakan.",
  },

  business: {
    eyebrow: "Para sa mga organisasyon sa Pilipinas",
    title: "Ilayo ang Requests sa Kalat na Inbox.",
    lead: "Planong workspace para sa legal, HR, finance, operations, at administrative teams na nagko-coordinate ng notarization work.",
    pains: [
      {
        title: "Isang Request Record",
        body: "Panatilihing magkakasama ang dokumento, participants, status, at completed output ng iisang request.",
      },
      {
        title: "Malinaw na Gawain",
        body: "Ipakita sa signatories at witnesses ang kailangan nilang ibigay bago matuloy ang session.",
      },
      {
        title: "Access Ayon sa Role",
        body: "Bigyan ang requesters, reviewers, at records staff ng access na kailangan sa kanilang bahagi ng trabaho.",
      },
      {
        title: "Records na Madaling Hanapin",
        body: "Ayusin ang completed documents at transaction details para makuha ulit ng team kapag kailangan.",
      },
    ],
    useTitle: "Para sa Pang-araw-araw na Business Work",
    useIntro:
      "Ang eligibility ng dokumento ay nakadepende sa rules at review ng notaryo. Ito ang common workflows na dapat pag-usapan habang binubuo ang produkto.",
    uses: [
      "Corporate secretary at board documents",
      "Employment at HR declarations",
      "Vendor at commercial documents",
      "Affidavits at sworn statements",
      "Authorizations at powers of attorney",
      "Paulit-ulit na client document requests",
    ],
    ctaTitle: "Ikuwento kung Paano Ito Ginagawa ng Team Ngayon.",
    ctaBody:
      "Ibahagi ang request volume, participants, at records na kailangang i-coordinate ng team. Gagamitin namin ang context na ito sa business release.",
  },

  notaries: {
    eyebrow: "Para sa Electronic Notaries Public",
    title: "Notaryo Pa Rin ang May Hawak sa Act.",
    lead: "Pinaplano ang eNotaryHub bilang work surface para sa commissioned Electronic Notaries Public, hindi kapalit ng professional judgment o responsibilidad.",
    toolsTitle: "Support para sa Gawaing Nakapaligid sa Act",
    toolsIntro:
      "Dapat makatulong ang bawat bahagi sa pag-apply ng rules, pag-review ng request, pagsasagawa ng session, at pagpapanatili ng required record.",
    tools: [
      {
        title: "Request Intake",
        body: "Kolektahin ang electronic document, participant details, authority documents, at requested notarial act para sa review.",
      },
      {
        title: "Eligibility Review",
        body: "Panatilihing magkakasama ang material na kailangan para magpasya kung maaaring ituloy ang request.",
      },
      {
        title: "Identity at Location Evidence",
        body: "Suriin ang identity, liveness, credential, at geolocation checks ng facility.",
      },
      {
        title: "Session Control",
        body: "Dalhin ang kailangang tao sa live appearance at panatilihing nakikita ang dokumento habang isinasagawa ito.",
      },
      {
        title: "Electronic Execution",
        body: "Ilapat ang kailangang signatures, electronic notarial certificate, at electronic notarial seal sa facility.",
      },
      {
        title: "Notarial Records",
        body: "Panatilihin ang Electronic Notarial Book, kaugnay na recordings, at retained records ayon sa rules.",
      },
    ],
    principle:
      "Maaaring suportahan ng teknolohiya ang notarial act. Nananatiling responsable ang Electronic Notary Public sa maayos na pagsasagawa nito.",
    principleSource:
      "Product principle mula sa Rules on Electronic Notarization",
    ctaTitle: "Tumulong Suriin ang Notary Workflow.",
    ctaBody:
      "Maaaring makipag-ugnayan ang practicing notaries tungkol sa intake, session, recordkeeping, at facility requirements bago magbukas ang onboarding.",
  },

  contact: {
    eyebrow: "Makipag-ugnayan",
    title: "Ikuwento ang Magulong Bersyon.",
    lead: "Sabihin kung paano dumadaan ang notarization requests sa team ninyo ngayon, o magtanong tungkol sa planong service. Tao ang magbabasa nito.",
    note: "Inihahanda pa ang eNotaryHub at hindi pa ito tumatanggap ng notarization requests.",
    nameLabel: "Pangalan ninyo",
    namePlaceholder: "Juan dela Cruz",
    emailLabel: "Email",
    emailPlaceholder: "ikaw@halimbawa.com",
    orgLabel: "Organisasyon",
    orgPlaceholder: "Opsyonal",
    messageLabel: "Ano ang hawak ninyo ngayon?",
    messagePlaceholder:
      "Paano dumarating ang dokumento sa inyo, sino ang kailangang lumagda, at saan ito bumabagal.",
    submit: "Magpadala ng tanong",
    submitting: "Ipinapadala",
    success: "Natanggap. May tao na magbabasa nito at sasagot sa email.",
    errorRequired: "Kailangan itong sagutan.",
    errorEmail: "Maglagay ng email na masasagot namin.",
    errorGeneric: "Hindi naipadala. Subukan ulit maya-maya.",
  },
};
