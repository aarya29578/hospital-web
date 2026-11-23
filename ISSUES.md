# ISSUES.md

## Required decisions

1. **About Dr. Girish placeholder/TODO**
   - The known source placeholder `Dr. John Doe — Specialist in Joint Replacement & Arthroscopy` is excluded from the visible page and retained here as a TODO.
   - The source typo `Giirish` is preserved in the visible About Dr. Girish page pending owner approval.

2. **Brand name inconsistency**
   - The live site uses both `Mumbai Ortho Total` and `Mumbai Ortho Clinics`.
   - Preserve both occurrences in the inventory and mark final naming decisions as TODO.

3. **Experience duration inconsistency**
   - About content says `over 15 years`.
   - A homepage image says `16 years of experience`.
   - Do not reconcile silently; preserve and mark TODO.

4. **Duplicate routes**
   - `/new/` URLs duplicate canonical pages and the footer points to them.
   - `/news-old/` is a duplicate/legacy page.
   - Canonical URLs and redirects require owner confirmation.

5. **Paediatric content duplication**
   - The Paediatric Orthopaedics page repeats a joint-replacement paragraph about the doctor.
   - Preserve it verbatim with a TODO rather than editing silently.

6. **Appointment email discrepancy**
   - The appointment page shows `info@mumbaiorthototal.in`, while the mandated clinic email is `girish.bhalerao.mot@gmail.com`.
   - Keep this discrepancy visible for review; do not silently replace it.

7. **Source image URLs no longer resolve**
   - The treatment-page content references image URLs that are not present in the downloaded media library. The treatment layouts use the real Dr. Girish Bhalerao portrait already used elsewhere on the site as a controlled fallback; they do not render the broken legacy markup.
   - The About Dr. Girish page's original `Doctor portrait` URL is unresolved. Its available Dr. Girish headshot from the downloaded page media is used instead.

8. **Contact FAQ answers missing from source data**
   - The live Contact page exposes five FAQ questions, but only the first answer is available: `We treat joint pain, fractures, arthritis, spine issues, and sports injuries.`
   - The other four questions are present without answers in the rebuilt accordion. The WordPress content export instead contains unrelated demo/contact placeholders, which were excluded. No missing answers were invented.

9. **Homepage “The Tree” slider**
   - No slider or “The Tree” content was available in the inspected homepage content or source export. It has not been recreated pending a source asset/copy or clarification.

10. **About Dr. Girish source duplication**
    - The structured source includes the clinic overview paragraph alongside its mission, vision, and core values. The paragraph is presented with the doctor's profile and the three values are grouped in their own numbered section so the overview is not repeated on the page.
