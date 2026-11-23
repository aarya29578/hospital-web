import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import AppointmentForm from "../components/AppointmentForm";
import { FloatingActions, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { Breadcrumb, ContentTabs, EditorialSection, LightboxGallery, QuickContact, TreatmentLayout } from "../components/StructuredContent";
import { centers, structuredPages } from "../../data/page-content";
import type { StructuredPage } from "../../data/page-content";

const treatments = new Set([
  "best-joint-replacement-surgeon-in-mumbai",
  "sports-medicine",
  "best-spine-surgeon-in-mumbai",
  "trauma-surgery-specialist-in-mumbai",
  "pediatric-orthopedic-surgeon-in-mumbai",
  "orthopedic-oncologist",
  "regenerative-conservative-medicine",
  "musculoskeletal-diagnosis",
]);

const getPage = (slug: string) => structuredPages.find((page) => page.slug === slug);

export function generateStaticParams() {
  return structuredPages.filter((page) => page.slug !== "home-2").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return { title: "Page not found" };
  return {
    title: `${page.title} - Mumbai Ortho Total`,
    description: page.description.slice(0, 160),
  };
}

function PageShell({ page, children, showTitle = true }: { page: StructuredPage; children: ReactNode; showTitle?: boolean }) {
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        {showTitle && <div className="page-title-band">
          <p className="eyebrow">Mumbai Ortho Total</p>
          <h1>{page.title}</h1>
          <Breadcrumb title={page.title} />
        </div>}
        {children}
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}

function AboutMot({ page }: { page: StructuredPage }) {
  const intro = page.sections.find((section) => section.heading.toLowerCase().includes("about"));
  const values = intro?.subsections ?? [];
  const other = page.sections.filter((section) => section !== intro && section.heading);
  const valuePills = ["Precision Care", "Cutting-Edge Tech", "Rapid Recovery", "Holistic Rehab"];
  return (
    <>
      <section className="about-intro section">
        <div><p className="eyebrow">About Mumbai Ortho Total</p><h2>{intro?.heading || page.title}</h2></div>
        <div>{intro?.paragraphs.map((paragraph, i) => <p className="about-lede" key={i}>{paragraph}</p>)}</div>
      </section>
      <section className="section values-section">
        <div className="numbered-values">
          {values.map((value, index) => (
            <article className="numbered-value" key={value.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{value.heading}</h2>{value.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
            </article>
          ))}
        </div>
        <div className="pill-row" aria-label="Care principles">{valuePills.map((label) => <span className="tag-pill" key={label}>{label}</span>)}</div>
      </section>
      {other.map((section, index) => <EditorialSection key={`${section.heading}-${index}`} section={section} index={index} />)}
      <ContentTabs tabs={page.tabs} />
    </>
  );
}

function AboutDoctor({ page }: { page: StructuredPage }) {
  const degree = page.sections.find((section) => /M\.S\. Ortho/i.test(section.heading));
  const fellowships = page.sections.find((section) => section.heading.toLowerCase() === "fellowships");
  const specialty = page.sections.find((section) => section.heading.toLowerCase().includes("specialty"));
  const clinicOverview = page.sections.find((section) => section.heading === "About Mumbai Ortho Total Clinics");
  const sourceHeading = page.sections.find((section) => section.heading.includes("Giirish"));
  const hiddenPlaceholderHeadings = new Set(["Dr. John Doe — Specialist in Joint Replacement & Arthroscopy"]);
  const remaining = page.sections.filter((section) =>
    section !== degree && section !== fellowships && section !== specialty &&
    section !== clinicOverview && section !== sourceHeading &&
    !hiddenPlaceholderHeadings.has(section.heading) &&
    !section.heading.toLowerCase().includes("awards and honours"),
  );
  const portrait = page.images.find((image) => image.src?.startsWith("/images/11875-")) ??
    { src: "/images/12620-WhatsApp-Image-2025-08-21-at-12.38.00-PM.jpeg", alt: "Dr. Girish Bhalerao", source: "" };
  const certificates = page.images.filter((image) => /Excellence|Award/i.test(image.source) || image.alt === "Award2" || image.alt === "Award 2");
  const awardImages = certificates.length ? certificates : page.images.filter((image) => image.src && image !== portrait);
  const specialtyItems = specialty?.items ?? [];
  const fellowshipItems = [...new Map((fellowships?.items ?? []).map((item) => [
    item.replace(/^▶\s*/, "").normalize("NFKD").replace(/[^a-z0-9]/gi, "").toLowerCase(),
    item.replace(/^▶\s*/, ""),
  ])).values()];
  const biography = (clinicOverview?.paragraphs ?? remaining.flatMap((section) => section.paragraphs))
    .filter((paragraph) => !paragraph.startsWith("Experienced orthopaedic surgeon with international fellowships"));

  return (
    <>
      <section className="doctor-profile section">
        <div className="portrait-frame"><Image src={portrait.src!} alt={portrait.alt || "Dr. Girish Bhalerao"} fill sizes="(max-width: 760px) 90vw, 40vw" /></div>
        <div className="doctor-profile-copy">
          {sourceHeading && <p className="eyebrow">{sourceHeading.heading}</p>}
          <p className="eyebrow">Founder &amp; Director</p>
          <h2>Dr. Girish <em>Bhalerao</em></h2>
          <p className="doctor-degrees">M.S. ORTHO, D. ORTHO, D.N.B. ORTHO</p>
          {degree?.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          {biography.map((paragraph, i) => <p key={`bio-${i}`}>{paragraph}</p>)}
        </div>
      </section>
      {fellowships && (
        <section className="section timeline-section">
          <p className="eyebrow">Fellowships</p><h2>{fellowships.heading}</h2>
          <ol className="fellowship-list">{fellowshipItems.map((item, index) => <li key={`${item}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
        </section>
      )}
      {specialty && (
        <section className="section specialty-section">
          <p className="eyebrow">MOT Specialties</p><h2>{specialty.heading}</h2>
          <ul className="specialty-grid">{specialtyItems.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
        </section>
      )}
      {awardImages.length > 0 && (
        <section className="section awards-section">
          <p className="eyebrow">Awards and Honours</p><h2>Awards and Honours</h2>
          <LightboxGallery images={awardImages} certificate />
        </section>
      )}
      {clinicOverview && clinicOverview.subsections.length > 0 && (
        <section className="section clinic-values">
          <h2>{clinicOverview.heading}</h2>
          <div className="numbered-values">
            {clinicOverview.subsections.map((subsection, index) => (
              <article className="numbered-value" key={subsection.heading}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h2>{subsection.heading}</h2>{subsection.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</div>
              </article>
            ))}
          </div>
        </section>
      )}
      {remaining.filter((section) => section.heading && !hiddenPlaceholderHeadings.has(section.heading) && !/M\.S\. Ortho|Fellowships|Specialty|Awards/i.test(section.heading)).map((section, index) => <EditorialSection key={`${section.heading}-${index}`} section={section} index={index} />)}
      <QuickContact />
    </>
  );
}

function CenterCards({ showMaps = false }: { showMaps?: boolean }) {
  return (
    <div className={showMaps ? "center-grid contact-center-grid" : "center-grid"}>
      {centers.map((center) => (
        <article className="center-card" key={center.name}>
          <h3>{center.name}</h3>
          {showMaps && <div className="center-map"><iframe title={`${center.name} map`} loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(center.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`} /><a className="map-overlay" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`} target="_blank" rel="noreferrer"><MapPin size={16} aria-hidden="true" />Open in Maps <ArrowUpRight size={16} aria-hidden="true" /></a></div>}
          <p>{center.address}</p>
          <strong><Clock3 size={18} aria-hidden="true" />{center.day}, {center.timing}</strong>
          <a href="tel:+918390172375"><Phone size={18} aria-hidden="true" />+91 8390172375</a>
        </article>
      ))}
    </div>
  );
}

function AppointmentPage({ page, contact = false }: { page: StructuredPage; contact?: boolean }) {
  const sections = page.sections.filter((section) => section.heading && !/Quick Appointment|Frequently Asked Questions|Contact Information/i.test(section.heading));
  const faqQuestions = [
    { question: "What conditions do you treat?", answer: "We treat joint pain, fractures, arthritis, spine issues, and sports injuries." },
    { question: "Do all orthopedic problems need surgery?", answer: "" },
    { question: "Do you offer physiotherapy and rehabilitation?", answer: "" },
    { question: "What are your clinic timings?", answer: "" },
    { question: "Do you accept insurance or mediclaim?", answer: "" },
  ];
  return (
    <>
      {contact ? (
        <>
          <section className="section contact-intro"><p className="eyebrow">Contact Information</p><h2>Our <em>Locations</em></h2><p>Send us a Message</p></section>
          <section className="section contact-layout"><div><AppointmentForm contact /><div className="contact-details"><h2>Contact Information</h2><p><Phone size={20} /> <a href="tel:+918390172375">+91 8390172375</a></p><p><Mail size={20} /> <a href="mailto:girish.bhalerao.mot@gmail.com">girish.bhalerao.mot@gmail.com</a></p></div></div><div><h2>Clinic Locations &amp; Timings</h2><CenterCards showMaps /></div></section>
          <section className="section faq-section"><p className="eyebrow">Frequently Asked Questions</p><h2>Frequently Asked Questions</h2><div className="faq-grid">{faqQuestions.map(({ question, answer }) => <details key={question}><summary>{question}</summary>{answer && <p>{answer}</p>}</details>)}</div></section>
        </>
      ) : (
        <>
          <section className="appointment-overview section">
            <div><p className="eyebrow">{page.title}</p><h2>Book Your <em>Appointment</em></h2>{sections.flatMap((section) => section.paragraphs).slice(0, 3).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            <div className="why-book-card"><h3>Why Choose Mumbai Ortho Total?</h3><ul>{sections.flatMap((section) => section.items).slice(0, 4).map((item, index) => <li key={index}>{item}</li>)}</ul><p>Need assistance? Call us on <a href="tel:+918390172375">+91 8390172375</a> or email <a href="mailto:info@mumbaiorthototal.in">info@mumbaiorthototal.in</a>.</p></div>
            <AppointmentForm />
          </section>
        </>
      )}
    </>
  );
}

function NewsPage({ page }: { page: StructuredPage }) {
  const titles = page.sections.map((section) => section.heading).filter((heading) => heading && heading !== "News");
  const images = page.images;
  return (
    <section className="section news-section">
      <p className="eyebrow">{page.title}</p><h2>News</h2>
      <div className="news-grid">
        {titles.map((title, index) => {
          const link = page.links[index];
          return (
            <article className="news-card" key={`${title}-${index}`}>
              {images[index]?.src ? <div className="news-image"><Image src={images[index].src!} alt={images[index].alt || title} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw" /></div> : <div className="news-image-placeholder">Image unavailable</div>}
              <p className="news-date">Date not listed on source page</p>
              <h3>{title}</h3>
              {link && <a href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={16} aria-hidden="true" /></a>}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function GalleryPage({ page }: { page: StructuredPage }) {
  return <section className="section gallery-section"><p className="eyebrow">{page.title}</p><h2>Moments of <em>Excellence</em></h2><LightboxGallery images={page.images} /></section>;
}

function LegalPage({ page }: { page: StructuredPage }) {
  return <article className="legal-copy">{page.sections.map((section, index) => <section key={`${section.heading}-${index}`}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}{section.items.length > 0 && <ul>{section.items.map((item, i) => <li key={i}>{item}</li>)}</ul>}</section>)}</article>;
}

function GenericPage({ page }: { page: StructuredPage }) {
  return <section className="section generic-content">{page.sections.map((section, index) => <EditorialSection key={`${section.heading}-${index}`} section={section} index={index} />)}</section>;
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page || page.slug === "home-2") notFound();

  let content: ReactNode;
  if (treatments.has(slug)) {
    content = <TreatmentLayout title={page.title} sections={page.sections} images={page.images} tabs={page.tabs} />;
  } else if (slug === "about-mot") {
    content = <AboutMot page={page} />;
  } else if (slug === "about-dr-girish-bhalerao") {
    content = <AboutDoctor page={page} />;
  } else if (slug === "gallery") {
    content = <GalleryPage page={page} />;
  } else if (slug === "news") {
    content = <NewsPage page={page} />;
  } else if (slug === "contact") {
    content = <AppointmentPage page={page} contact />;
  } else if (slug === "book-appointment") {
    content = <AppointmentPage page={page} />;
  } else if (slug === "privacy-policy-2" || slug === "terms-of-service") {
    content = <LegalPage page={page} />;
  } else {
    content = <GenericPage page={page} />;
  }

  return <PageShell page={page} showTitle={!treatments.has(slug)}>{content}</PageShell>;
}
