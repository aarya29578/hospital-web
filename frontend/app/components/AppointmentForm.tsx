"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { centers } from "../../data/page-content";

const treatments = ["Joint Replacement","Sports Medicine","Spine Treatment","Trauma and Fractures","Paediatric Orthopedics","Orthopaedic Oncology","Regenerative and Conservative Medicine","Musculoskeletal Diagnosis","Others"];

export default function AppointmentForm({ contact = false }: { contact?: boolean }) {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [selectedLocation, setSelectedLocation] = useState("");
  const selectedCenter = centers.find((center) => center.name === selectedLocation);

  return (
    <form className="appointment-form" onSubmit={async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!event.currentTarget.checkValidity()) {
        event.currentTarget.reportValidity();
        setStatus("idle");
        return;
      }
      setStatus("loading");
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }}>
      <label>Name<input name="name" required placeholder="Enter your full name" /></label>
      {contact && <label>Email<input name="email" type="email" placeholder="Enter your email address" /></label>}
      <label>Phone Number<input name="phone" required type="tel" placeholder={contact ? "Enter your contact number" : "Enter your Number"} /></label>
      {contact && <label>Date of Appointment<input name="date" type="date" /></label>}
      <label>Service/Treatment<select name="treatment" required defaultValue=""><option value="" disabled>—Please choose an option—</option>{treatments.map((item)=><option key={item}>{item}</option>)}</select></label>
      <label>Location<select name="location" required value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}><option value="" disabled>—Please choose an option—</option>{centers.map((center)=><option key={center.name}>{center.name}</option>)}</select></label>
      {selectedCenter && <p className="center-timing"><Clock3 size={17} aria-hidden="true" />{selectedCenter.day}, {selectedCenter.timing}</p>}
      {contact && <label>Message<textarea name="message" placeholder="Describe your problem (optional)" /></label>}
      <button type="submit" className="button button-primary" disabled={status==="loading"}>{status==="loading" ? "Submitting…" : contact ? "Book Appointment" : "Book Now"} <ArrowUpRight size={18} aria-hidden="true" /></button>
      {status==="success" && <p className="form-success" role="status">Demo only: your information was validated locally, but no appointment request was sent.</p>}
      {status==="error" && <p className="form-error" role="alert">We could not submit your request. Please try again.</p>}
      <p className="form-api-note">API stub — connect a secure appointment backend before production use.</p>
    </form>
  );
}
