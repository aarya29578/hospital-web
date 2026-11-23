"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Mail, MapPin, Phone, X } from "lucide-react";
import { useState } from "react";
import type { ContentImage, ContentSection } from "../../data/page-content";
import AppointmentForm from "./AppointmentForm";

export function Breadcrumb({ title }: { title: string }) {
  return <div className="breadcrumb"><Link href="/">Home</Link><ChevronRight size={16} aria-hidden="true" /><span>{title}</span></div>;
}

export function ContentTabs({ tabs }: { tabs: { label: string; content: string }[] }) {
  const [active, setActive] = useState(0);
  const available = tabs.filter((tab) => tab.content);
  if (!available.length) return null;
  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist" aria-label="More about our care">
        {available.map((tab, index) => (
          <button key={`${tab.label}-${index}`} id={`page-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`page-panel-${index}`} onClick={() => setActive(index)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-panel" role="tabpanel" id={`page-panel-${active}`} aria-labelledby={`page-tab-${active}`}>
        {available[active].content}
      </div>
    </div>
  );
}

export function EditorialSection({ section, index }: { section: ContentSection; index: number }) {
  return (
    <section className="editorial-section">
      {section.heading && <h2>{section.heading}</h2>}
      {section.paragraphs.map((paragraph, i) => <p key={`p-${i}`}>{paragraph}</p>)}
      {section.items.length > 0 && <ul className="editorial-list">{section.items.map((item, i) => <li key={`li-${i}`}><Check size={20} aria-hidden="true" />{item}</li>)}</ul>}
      {section.subsections.map((subsection, i) => (
        <div className="editorial-subsection" key={`sub-${i}`}>
          <h3>{subsection.heading}</h3>
          {subsection.paragraphs.map((paragraph, j) => <p key={`p-${j}`}>{paragraph}</p>)}
          {subsection.items.length > 0 && <ul className="editorial-list">{subsection.items.map((item, j) => <li key={`li-${j}`}><Check size={20} aria-hidden="true" />{item}</li>)}</ul>}
        </div>
      ))}
      {section.images.length > 0 && <ImageGrid images={section.images} label={`Section ${index + 1} images`} />}
    </section>
  );
}

export function ImageGrid({ images, label }: { images: ContentImage[]; label: string }) {
  return (
    <div className="media-grid" aria-label={label}>
      {images.map((image, index) => image.src ? (
        <figure className="media-card" key={`${image.src}-${index}`}>
          <div className="media-frame">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw" />
          </div>
          {image.alt && <figcaption>{image.alt}</figcaption>}
        </figure>
      ) : (
        <div className="media-placeholder" key={`missing-${index}`} role="img" aria-label={`Image unavailable: ${image.source}`}>Image unavailable</div>
      ))}
    </div>
  );
}

export function LightboxGallery({ images, certificate = false }: { images: ContentImage[]; certificate?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const available = images.filter((image): image is ContentImage & { src: string } => Boolean(image.src));
  const close = () => setActive(null);
  return (
    <>
      <div className={`gallery-grid${certificate ? " gallery-certificates" : ""}`}>
        {available.map((image, index) => (
          <button className="gallery-tile" key={`${image.src}-${index}`} onClick={() => setActive(index)} aria-label={`Open image ${index + 1}: ${image.alt || "Gallery image"}`}>
            <span className="gallery-frame"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw" /></span>
            {image.alt && <span className="gallery-caption">{image.alt}</span>}
          </button>
        ))}
        {images.some((image) => !image.src) && <p className="missing-asset-note">Some images from the source site are no longer available.</p>}
      </div>
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Close image viewer"><X size={24} /></button>
          <button className="lightbox-prev" onClick={(event) => { event.stopPropagation(); setActive((active + available.length - 1) % available.length); }} aria-label="Previous image"><ChevronLeft size={28} /></button>
          <div className={`lightbox-image${certificate ? " contain" : ""}`} onClick={(event) => event.stopPropagation()}>
            <Image src={available[active].src} alt={available[active].alt} fill sizes="90vw" />
            {available[active].alt && <p>{available[active].alt}</p>}
          </div>
          <button className="lightbox-next" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % available.length); }} aria-label="Next image"><ChevronRight size={28} /></button>
        </div>
      )}
    </>
  );
}

export function TreatmentLayout({ title, sections, images, tabs }: { title: string; sections: ContentSection[]; images: ContentImage[]; tabs: { label: string; content: string }[] }) {
  const titleSection = sections.find((section) => section.heading.toLowerCase() === title.toLowerCase());
  const intro = titleSection?.paragraphs[0] ?? sections.flatMap((section) => section.paragraphs)[0] ?? "";
  const expertise = sections.find((section) => section.heading.toLowerCase().includes("expertise"));
  const recovery = sections.find((section) => /recovery|rehabilitation|physiotherapy/i.test(section.heading));
  const why = sections.find((section) => section.heading.toLowerCase().startsWith("why choose"));
  const consumed = new Set([titleSection, expertise, recovery, why].filter(Boolean));
  const featureImage = images.find((image) => image.src) ?? {
    src: "/images/12620-WhatsApp-Image-2025-08-21-at-12.38.00-PM.jpeg",
    alt: "Dr Girish Bhalerao",
    source: "",
  };

  return (
    <>
      <section className="inner-hero treatment-hero">
        <p className="eyebrow">Mumbai Ortho Total</p>
        <h1>{title}</h1>
        <Breadcrumb title={title} />
      </section>
      <section className="treatment-intro section">
        <div className="treatment-copy"><p className="eyebrow">{title}</p><p className="treatment-lede">{intro}</p></div>
        <div className="treatment-feature">
          {featureImage ? <div className="feature-frame"><Image src={featureImage.src!} alt={featureImage.alt || "Orthopedic care at Mumbai Ortho Total"} fill sizes="(max-width: 768px) 100vw, 50vw" /></div> : <div className="feature-placeholder">Image from the original page is unavailable</div>}
        </div>
      </section>
      {expertise && (
        <section className="section expertise-section">
          <div className="section-heading"><p className="eyebrow">Our Expertise</p><h2>{expertise.heading}</h2></div>
          <div className="expertise-grid">
            {expertise.subsections.map((item, index) => <article className="expertise-card" key={item.heading}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.heading}</h3>{item.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}{item.items.map((text, i) => <p key={i}>{text}</p>)}</article>)}
            {expertise.paragraphs.map((paragraph, index) => <p key={`ep-${index}`}>{paragraph}</p>)}
          </div>
        </section>
      )}
      {recovery && (
        <section className="recovery-band section">
          <div><p className="eyebrow">{recovery.heading}</p><h2>{recovery.heading}</h2></div>
          <div>{recovery.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{recovery.items.map((item, index) => <p key={`r-${index}`}>{item}</p>)}</div>
          <div className="recovery-image">{featureImage && <Image src={featureImage.src!} alt={featureImage.alt || "Orthopedic care at Mumbai Ortho Total"} fill sizes="(max-width: 768px) 90vw, 30vw" />}</div>
        </section>
      )}
      {why && (
        <section className="section why-section">
          <div className="section-heading"><p className="eyebrow">Mumbai Ortho Total</p><h2>{why.heading}</h2></div>
          <ul className="why-list">{why.items.map((item, index) => <li key={index}><Check size={22} aria-hidden="true" />{item}</li>)}</ul>
          {why.paragraphs.map((paragraph, index) => <p className="why-copy" key={`why-${index}`}>{paragraph}</p>)}
          <ContentTabs tabs={tabs} />
          {why.subsections.filter((subsection) => subsection.heading !== "Quick Contact").map((subsection, index) => <div className="why-detail" key={index}><h3>{subsection.heading}</h3>{subsection.heading !== "Treatments" && subsection.paragraphs.filter((paragraph) => !/^(Name|Phone Number|Service \/ Treatment|Location|Timing|Message)/.test(paragraph)).map((paragraph, i) => <p key={i}>{paragraph}</p>)}{subsection.items.map((item, i) => <p key={i}>{item}</p>)}</div>)}
        </section>
      )}
      {sections.filter((section) => !consumed.has(section) && section.heading).map((section, index) => <EditorialSection key={`${section.heading}-${index}`} section={section} index={index} />)}
      <section className="appointment-section section">
        <div><p className="eyebrow">Book Appointment</p><h2>Book Your <em>Appointment</em></h2><p>Need assistance? Call us on <a href="tel:+918390172375">+91 8390172375</a> or email <a href="mailto:girish.bhalerao.mot@gmail.com">girish.bhalerao.mot@gmail.com</a>.</p></div>
        <AppointmentForm />
      </section>
      <QuickContact />
    </>
  );
}

export function QuickContact() {
  return (
    <section className="quick-contact section">
      <p className="eyebrow">Quick Contact</p>
      <div><h2>Reach our <em>team.</em></h2><a href="tel:+918390172375"><Phone size={20} />+91 8390172375</a><a href="mailto:girish.bhalerao.mot@gmail.com"><Mail size={20} />girish.bhalerao.mot@gmail.com</a></div>
      <p><Clock3 size={20} /> Seven clinic locations across Mumbai</p>
      <p><MapPin size={20} /> <Link href="/contact/">Clinic Locations</Link></p>
    </section>
  );
}
