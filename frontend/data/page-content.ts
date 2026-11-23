import source from "./structured-pages.json";

export type ContentImage = {
  src: string | null;
  alt: string;
  source: string;
};

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  items: string[];
  images: ContentImage[];
  subsections: ContentSection[];
};

export type StructuredPage = {
  slug: string;
  title: string;
  publishedAt: string;
  description: string;
  sections: ContentSection[];
  images: ContentImage[];
  links: { label: string; href: string }[];
  tabs: { label: string; content: string }[];
};

export const structuredPages = source as StructuredPage[];

export const centers = [
  {
    name: "Parel Center",
    address: "OPD 217, Gleneagles Hospital, Parel, Mumbai, Gleneagles Hospital, 35, Dr Ernest Borges Rd, opp. Shirodkar High School, Parel East, Parel, Mumbai, Maharashtra 400012",
    day: "Every day",
    timing: "9:30 AM to 4 PM",
  },
  {
    name: "Mira Road Center",
    address: "1st floor OPD - Institute of Medical Science and Research, Evershine Rd, near Mira Road Railway Station, Naya Nagar, Mira Road East, Mira Bhayandar, Maharashtra 401107",
    day: "Every Monday",
    timing: "5 PM to 8 PM",
  },
  {
    name: "Borivali Center",
    address: "Borivali Healthcare,A wing, ⁠4th floor, Lancelot Building, 401, Swami Vivekananda Rd, opp. Kalyan Jewellers, A-Wing, Sumer Nagar, Borivali, Mumbai, Maharashtra 400092",
    day: "Every Tuesday",
    timing: "5 PM to 8 PM",
  },
  {
    name: "Andheri Center",
    address: "Flexrite World - 1st floor -Madura Industrial Estate, Off Veera Desai Rd, Industrial Area, Andheri West, Mumbai, Maharashtra 400047",
    day: "Every Wednesday",
    timing: "6 PM to 8 PM",
  },
  {
    name: "Kemp's Corner Center",
    address: "OPD No. 3 Mumbai Multispeciality Clinic 102, Ganesh Bhavan, beside Telon, 149, August Kranti Rd, Kemps Corner, Mumbai, Maharashtra 400036",
    day: "Every Thursday",
    timing: "5 PM to 8 PM",
  },
  {
    name: "Ghatkopar Center",
    address: "3rd floor, Gopala Clinic, ZEST BUSINESS SPACES, 310-312, Mahatma Gandhi Rd, Anjaria Wadi, Rajawadi Colony, Ghatkopar E, Mumbai, Maharashtra 400077",
    day: "Every Friday",
    timing: "5 PM to 8 PM",
  },
  {
    name: "Malad Center",
    address: "Ground Floor, BUILDING NO 4, SUNRISE PHASE 2, SUNDER CROSS LANE, ORLEM, MALAD (W) , MALAD (West), Mumbai, Maharashtra 400064",
    day: "Every Saturday",
    timing: "5 PM to 8 PM",
  },
];
