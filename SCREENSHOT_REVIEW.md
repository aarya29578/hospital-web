# Screenshot Review

Full-page browser screenshots were captured and reviewed at **360, 768, 1280, and 1440 px** for each route below (17 routes × 4 widths). Each page was scrolled to its footer so lazy-loaded media and lower-page sections were included. The About Dr. Girish Bhalerao and Contact pages were recaptured after their final layout updates.

| Page | Route | 360 | 768 | 1280 | 1440 |
|---|---|:---:|:---:|:---:|:---:|
| Home | `/` | ✓ | ✓ | ✓ | ✓ |
| About MOT | `/about-mot/` | ✓ | ✓ | ✓ | ✓ |
| About Dr. Girish Bhalerao | `/about-dr-girish-bhalerao/` | ✓ | ✓ | ✓ | ✓ |
| Joint Replacement | `/best-joint-replacement-surgeon-in-mumbai/` | ✓ | ✓ | ✓ | ✓ |
| Sports Medicine | `/sports-medicine/` | ✓ | ✓ | ✓ | ✓ |
| Spine Treatment | `/best-spine-surgeon-in-mumbai/` | ✓ | ✓ | ✓ | ✓ |
| Trauma & Fractures | `/trauma-surgery-specialist-in-mumbai/` | ✓ | ✓ | ✓ | ✓ |
| Paediatric Orthopaedics | `/pediatric-orthopedic-surgeon-in-mumbai/` | ✓ | ✓ | ✓ | ✓ |
| Orthopaedic Oncology | `/orthopedic-oncologist/` | ✓ | ✓ | ✓ | ✓ |
| Regenerative & Conservative Medicine | `/regenerative-conservative-medicine/` | ✓ | ✓ | ✓ | ✓ |
| Musculoskeletal Diagnosis | `/musculoskeletal-diagnosis/` | ✓ | ✓ | ✓ | ✓ |
| Gallery | `/gallery/` | ✓ | ✓ | ✓ | ✓ |
| News | `/news/` | ✓ | ✓ | ✓ | ✓ |
| Contact | `/contact/` | ✓ | ✓ | ✓ | ✓ |
| Book Appointment | `/book-appointment/` | ✓ | ✓ | ✓ | ✓ |
| Privacy Policy | `/privacy-policy-2/` | ✓ | ✓ | ✓ | ✓ |
| Terms of Service | `/terms-of-service/` | ✓ | ✓ | ✓ | ✓ |

## Checks performed

- Reviewed full-page layout, text wrapping, section spacing, image bounds/aspect ratios, icon sizing, cards, navigation, footer, and fixed booking/WhatsApp actions at each width.
- Checked for horizontal page overflow and headings wider than their available content area; none were found in the reviewed route/width combinations.
- Confirmed treatment pages use controlled feature images, numbered expertise cards, recovery sections, fixed-size Lucide icons, and responsive appointment forms.
- Confirmed About MOT retains its three numbered mission/vision/core-value cards; the doctor page uses the available real portrait, presents five distinct fellowship entries, groups specialties, and includes the award gallery.
- Confirmed Contact renders seven center cards with a map embed and a visible “Open in Maps” link per center. Appointment form validation and the Parel center timing (`Every day, 9:30 AM to 4 PM`) were exercised in-browser.
- Confirmed the appointment form rejects an empty submission, displays its local demo-success status for valid input, and renders its error state when the stub operation fails. The backend remains a documented stub; no appointment request is sent.
- Rechecked the doctor portrait and award images after scrolling them into view. Treatment imagery that is not available in the source media library remains documented in `ISSUES.md`.

## Remaining limitations

- Google Maps content is externally hosted and may not finish loading in restricted or interrupted browser sessions. Each center retains a direct Google Maps link as a fallback.
- Four Contact FAQ questions have no verified source answers and remain unanswered.
- Some source treatment imagery and the original About Dr portrait URL are unavailable; see `ISSUES.md`.
- The source About Dr page contains the misspelling `Giirish`, retained and documented for owner review. The visible John Doe placeholder remains excluded.
- The source “The Tree” homepage slider was not available to reproduce; see `ISSUES.md`.
