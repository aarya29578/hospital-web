import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { FloatingActions, SiteFooter, SiteHeader } from "./components/SiteChrome";
import { centers } from "../data/page-content";

const services = [
  ["Physiotherapy & Rehabilitation", "12621-physical-therapy.png"],
  ["Yoga, Pilates & Calisthenics", "12622-exercise.png"],
  ["Sports Nutrition", "12623-diet.png"],
  ["Sports Psychotherapy", "12624-therapy.png"],
];
const team = [
  ["Team image1", "12628-WhatsApp-Image-2025-09-26-at-12.15.18-PM-scaled-1.jpeg"],
  ["Team image2", "12629-WhatsApp-Image-2025-09-26-at-12.15.34-PM-scaled.jpeg"],
  ["Team image3", "12630-WhatsApp-Image-2025-09-26-at-12.16.17-PM-scaled.jpeg"],
  ["Team image4", "12631-WhatsApp-Image-2025-09-26-at-12.20.29-PM-scaled.jpeg"],
  ["Team image5", "12632-WhatsApp-Image-2025-09-26-at-12.20.29-PM-1-scaled-1.jpeg"],
];
const treatments = [
  ["Joint Replacement", "/best-joint-replacement-surgeon-in-mumbai/"],
  ["Sports Medicine", "/sports-medicine/"],
  ["Spine Treatment", "/best-spine-surgeon-in-mumbai/"],
  ["Trauma & Fractures", "/trauma-surgery-specialist-in-mumbai/"],
  ["Paediatric Orthopaedics", "/pediatric-orthopedic-surgeon-in-mumbai/"],
  ["Orthopaedic Oncology", "/orthopedic-oncologist/"],
  ["Regenerative & Conservative Medicine", "/regenerative-conservative-medicine/"],
  ["Musculoskeletal Diagnosis", "/musculoskeletal-diagnosis/"],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-wordmark" aria-hidden="true">MOT</div>
          <div className="hero-copy">
            <p className="eyebrow">Orthopaedic care · Mumbai</p>
            <h1>Return to <em>movement.</em></h1>
            <p className="hero-lede">Your destination for comprehensive care of total joint-related issues, all under one roof.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/book-appointment/">Book Appointment <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a className="button button-ghost" href="tel:+918390172375">Call +91 8390172375</a>
            </div>
          </div>
          <div className="hero-portrait">
            <Image src="/images/12620-WhatsApp-Image-2025-08-21-at-12.38.00-PM.jpeg" alt="Dr. Girish Bhalerao" fill priority sizes="(max-width: 760px) 100vw, 44vw" />
          </div>
          <div className="floating-card floating-card-expertise"><span>01</span><strong>Joint Replacement</strong><small>Knee · Hip · Shoulder</small></div>
          <div className="floating-card floating-card-care"><span>02</span><strong>Personalised care</strong><small>Diagnosis to rehabilitation</small></div>
        </section>

        <section className="intro section">
          <div className="section-heading"><p className="eyebrow">Welcome to Mumbai Ortho Total</p><h2>Care built around <em>how you move.</em></h2></div>
          <div className="intro-grid">
            <p>Your destination for comprehensive care of total joint-related issues, all under one roof. From precise diagnosis and advanced minimally-invasive surgery to personalised rehabilitation and long-term follow-up, we combine world-class clinical expertise with the latest medicine &amp; instruments to restore mobility and improve quality of life. Our multidisciplinary team tailors each treatment plan to your lifestyle and goals, ensuring safer procedures, faster recovery and a confident return to daily activities.</p>
            <div className="value-grid" aria-label="Care principles">
              {["Precision Care", "Cutting-Edge Tech", "Rapid Recovery", "Holistic Rehab"].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}
            </div>
          </div>
        </section>

        <section className="experience-row section">
          <div className="experience-photo"><Image src="/images/11192-16-years-of-experience.png" alt="16 years of experience" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
          <div className="experience-copy"><p className="eyebrow">Mumbai Ortho Total</p><h2>High Quality Services for You.</h2><p>At Mumbai Ortho Total, we provide advanced orthopedic care with a focus on restoring mobility, reducing pain, and improving your overall quality of life.</p></div>
        </section>

        <section className="medical-services section">
          <div className="section-heading"><p className="eyebrow">Our Service</p><h2>Orthopaedic <em>treatments.</em></h2></div>
          <div className="treatment-link-grid">{treatments.map(([title, href], index) => <Link className="treatment-link-card" key={href} href={href}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div>
        </section>

        <section className="doctor section">
          <div className="doctor-image"><Image src="/images/10866-dr-girish-bhalerao.png" alt="Dr. Girish Bhalerao" fill sizes="(max-width: 760px) 100vw, 38vw" /></div>
          <div className="doctor-copy">
            <p className="eyebrow">Founder &amp; Director</p>
            <h2>Dr. Girish <em>Bhalerao</em></h2>
            <p className="credentials">M.S. ORTHO, D. ORTHO, D.N.B. ORTHO</p>
            <p>Founder &amp; Director of Mumbai Ortho Total</p>
            <p>With extensive experience in orthopedic surgery, Dr. Bhalerao is dedicated to providing the highest standard of care to his patients. His expertise spans joint replacement, arthroscopy, and complex orthopedic procedures.</p>
            <Link className="text-link" href="/about-dr-girish-bhalerao/">About Dr. Girish Bhalerao <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="services section">
          <div className="section-heading"><p className="eyebrow">Allied Services</p><h2>Allied Services</h2></div>
          <div className="service-grid">
            {services.map(([title, image]) => <article className="service-card" key={title}><div className="service-photo"><Image src={`/images/${image}`} alt={title} fill sizes="(max-width: 760px) 45vw, 25vw" /></div><h3>{title}</h3></article>)}
          </div>
        </section>

        <section className="team-section section">
          <div className="section-heading"><p className="eyebrow">Mumbai Ortho Total</p><h2>Our Team</h2></div>
          <div className="team-grid">
            {team.map(([alt, image]) => <figure key={image}><div className="team-photo"><Image src={`/images/${image}`} alt={alt} fill sizes="(max-width: 760px) 45vw, 20vw" /></div><figcaption>{alt}</figcaption></figure>)}
          </div>
        </section>

        <section className="locations section">
          <div className="section-heading"><p className="eyebrow"><MapPin size={16} aria-hidden="true" /> Find our clinics near you</p><h2>Our <em>Locations</em></h2></div>
          <div className="center-grid">
            {centers.map((center) => (
              <article className="center-card" key={center.name}>
                <h3>{center.name}</h3><p>{center.address}</p>
                <strong>{center.day}, {center.timing}</strong>
                <a href="tel:+918390172375"><Phone size={18} aria-hidden="true" />+91 8390172375</a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`} target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight size={16} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
