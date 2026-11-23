"use client";

import Link from "next/link";
import { Menu, MessageCircle, X, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Mumbai Ortho Total home">
        <span>MUMBAI</span><strong>ORTHO TOTAL</strong>
      </Link>
      <nav aria-label="Primary navigation" className={open ? "nav-open" : ""}>
        <Link onClick={() => setOpen(false)} href="/about-mot/">About</Link>
        <Link onClick={() => setOpen(false)} href="/best-joint-replacement-surgeon-in-mumbai/">Treatments</Link>
        <Link onClick={() => setOpen(false)} href="/gallery/">Media</Link>
        <Link onClick={() => setOpen(false)} href="/contact/">Contact</Link>
      </nav>
      <Link className="header-cta" href="/book-appointment/">Book Appointment <ArrowUpRight size={18} aria-hidden="true" /></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-about">
        <h2>About Mumbai Ortho Total</h2>
        <p>Mumbai Ortho Total is a premier orthopedic care center dedicated to providing comprehensive treatment for bone and joint conditions with state-of-the-art technology and expert medical professionals.</p>
        <h3>Main Branch</h3>
        <p><MapPin size={18} aria-hidden="true" /> Parel Center</p>
        <p><Phone size={18} aria-hidden="true" /> <a href="tel:+918390172375">+91 8390172375</a></p>
        <div className="footer-map">
          <iframe title="Parel Center map" loading="lazy" src="https://maps.google.com/maps?q=OPD%20217%20Gleneagles%20Hospital%20Parel%20Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed" />
        </div>
      </div>
      <div><h2>Quick Links</h2><Link href="/">Home</Link><Link href="/about-mot/">About MOT</Link><Link href="/best-joint-replacement-surgeon-in-mumbai/">Treatments</Link><Link href="/gallery/">Media</Link><Link href="/contact/">Contact</Link></div>
      <div><h2>Follow Us</h2><p>Stay connected with us on social media for updates and health tips.</p><a href="https://www.facebook.com/people/Dr-Girish-Bhaleraos-Mumbai-Ortho-Total-Clinics/61578288562611/" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={16} aria-hidden="true" /></a><a href="https://www.instagram.com/doctorbhaleraogirish/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/dr-girish-bhalerao-b8a31a1ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer">Linkedin <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      <div className="footer-bottom"><Link href="/privacy-policy-2/">Privacy Policy</Link><Link href="/terms-of-service/">Terms of Service</Link><p>© 2025 Mumbai Ortho Total. All Rights Reserved.</p></div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <>
      <a className="whatsapp" href="https://wa.me/918390172375" aria-label="Chat with Mumbai Ortho Total on WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={25} aria-hidden="true" /></a>
      <Link className="appointment-bar" href="/book-appointment/">Book Appointment <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </>
  );
}
