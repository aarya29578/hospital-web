# DESIGN_SYSTEM.md

## Direction

Premium orthopaedic clinic. Editorial, calm, precise, and human. The visual language borrows structure and proportion from premium private-clinic editorial design, not branding or imagery from reference products.

## Color tokens

```css
:root {
  --color-ink: #111217;
  --color-ink-raised: #171922;
  --color-paper: #ffffff;
  --color-paper-warm: #f5f5f1;
  --color-cloud: #eceee8;
  --color-muted: #686a73;
  --color-line: #dcded6;
  --color-accent: #3148c8;
  --color-accent-hover: #263ba8;
  --color-accent-active: #1d2f88;
  --color-accent-subtle: #eef0ff;
  --color-focus: #9fb0ff;
  --color-success: #176b45;
  --color-error: #a62b32;
  --color-warning: #9a6510;
  --color-disabled: #aeb0b7;
  --shadow-soft: 0 16px 48px rgba(17, 18, 23, 0.08);
  --shadow-floating: 0 20px 60px rgba(17, 18, 23, 0.16);
}
```

WCAG AA text contrast is mandatory. Default, hover, active, focus-visible, disabled, loading, and error states are defined once and reused.

## Typography

- Display/body grotesque: **Bricolage Grotesque**.
- Editorial accent: **Instrument Serif italic**.
- Do not use Inter, Roboto, Arial, or default system sans.
- Display 72/76 desktop; 48/52 tablet; 40/44 mobile.
- H1 64/68; H2 48/52; H3 28/34; H4 20/26.
- Body 18/28; small 14/21; label 12/16 uppercase with 0.08em tracking.
- Headings use -0.04em letter spacing; body uses -0.01em.

## Spacing and grid

- 8px base scale: 8, 16, 24, 32, 48, 64, 96, 128.
- 12-column desktop grid; 8-column tablet; 4-column mobile.
- Container widths: 1440px max at 1440; 96px gutters desktop; 24px tablet; 16px mobile.
- Radius: 4px controls, 12px cards, 24px feature panels, 999px pills.
- Borders: 1px solid `--color-line`.
- No gradients. Use subtle paper texture and fine vertical lines rather than color gradients.

## Components

One shared implementation for:

- Primary, secondary, and ghost buttons with animated arrows.
- Sticky shrinking header with desktop dropdown nav and mobile menu.
- Section headers combining grotesque and italic-serif accent words.
- Numbered cards using serif numerals and 01/02/03 labels.
- Tag/pill labels.
- Treatment cards.
- Accordion and tabs.
- Form fields, validation, success, error, and loading states.
- Center/location cards with maps and weekday timings.
- Doctor profile block.
- Awards gallery.
- Footer.
- Persistent appointment CTA and floating WhatsApp button.

## Motion

- One easing curve: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Fast: 160ms; standard: 280ms; slow: 520ms.
- Scroll reveals, button arrow slides, restrained card hover lifts, and smooth route/page transitions.
- `prefers-reduced-motion: reduce` disables transforms and reveals.
