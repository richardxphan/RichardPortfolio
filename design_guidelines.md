# Design Guidelines: Richard Phan Portfolio

## Design Approach
**Reference-Based:** Drawing inspiration from Linear's clean typography and Vercel's developer portfolio aesthetic, combined with Stripe's restrained sophistication. This creates a modern, technical portfolio that stands out while maintaining professional credibility.

## Core Design Principles
1. **Technical Confidence:** Bold typography and generous whitespace convey expertise
2. **Interactive Storytelling:** Subtle animations reveal experience and projects progressively
3. **Data-Driven Impact:** Metrics and achievements take center stage
4. **Modern Minimalism:** Clean layouts with strategic accent elements

## Typography
- **Display Font:** Inter or Space Grotesk (700-800 weight for headlines)
- **Body Font:** Inter (400 regular, 500 medium, 600 semibold)
- **Hierarchy:**
  - Hero name: 4xl to 6xl (72px desktop)
  - Section headers: 3xl to 4xl (48px desktop)
  - Card titles: xl to 2xl (24-32px)
  - Body text: base to lg (16-18px)
  - Captions/metadata: sm (14px)

## Layout System
**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Card spacing: p-6 to p-8
- Element gaps: gap-6 to gap-12
- Container: max-w-6xl for main content, max-w-7xl for wide sections

## Component Library

**Navigation**
- Sticky header with blur backdrop effect
- Logo/name left, navigation links center, CTA (Resume PDF) right
- Smooth scroll navigation to sections
- Mobile: Hamburger menu with slide-in panel

**Hero Section**
- Full viewport height (min-h-screen)
- Split layout: Left 60% content, Right 40% visual element
- Animated role rotation: "Software Engineer • AI Researcher • Builder"
- Key metrics in subtle pill badges (AWS Intern, 3.76 GPA, AI @ UGA Founder)
- Primary CTA: "View Projects", Secondary: "Contact Me"
- Background: Gradient mesh or abstract geometric pattern (low opacity)
- **Image:** Abstract tech/neural network visualization as background element (20% opacity), positioned right side

**Experience Timeline**
- Vertical timeline with connection lines
- Card-based entries with company logos (use placeholder divs with company initials)
- Expandable details on hover/click showing bullet points
- Tech stack badges for each role
- Date ranges prominently displayed
- Alternating left-right layout (desktop), stacked (mobile)

**Project Showcase**
- Large feature cards (2-column grid desktop, single column mobile)
- Each card: Project title, brief description, impact metrics in bold
- Tech stack as badge pills
- "Learn More" link with arrow icon
- Subtle hover lift effect (translate-y + shadow)

**Skills Section**
- Three-column grid (Languages | Tools/Frameworks | Coursework)
- Each skill as a badge with icon from chosen library
- Group by proficiency: Expert, Proficient, Familiar
- No progress bars - clean badge display

**Leadership Grid**
- Three cards: AI @ UGA, Anthropic Growth, Content Creator
- Each card: Icon, title, key metric, brief description
- Metrics highlighted in larger, bolder text
- Grid layout: 3 columns desktop, 1 column mobile

**Contact Section**
- Centered content with social proof ("Let's build something together")
- Large interactive contact cards (Email, LinkedIn, GitHub)
- Each card: Icon, label, hover state with background shift
- Footer: Simple copyright with year

## Visual Elements
- **Cards:** Subtle border (1px), rounded corners (lg to xl), subtle shadow on hover
- **Badges:** Rounded-full for pills, sm for tech stack tags
- **Icons:** Heroicons (outline style) at 20-24px
- **Dividers:** Thin horizontal lines (1px) between major sections
- **Gradients:** Use sparingly for accents (CTA buttons, hero background)

## Animations
- Page load: Fade-up animation for hero content (stagger children)
- Scroll reveal: Fade-in for section headers and cards
- Hover states: Subtle scale (1.02) and shadow increase on cards
- Timeline: Progress line draws on scroll
- NO distracting continuous animations

## Images
**Hero Background:** Abstract geometric pattern or neural network visualization (can use SVG pattern or subtle gradient mesh) - 20% opacity, positioned right side overlapping content area

**Company Logos:** Placeholder colored circles with company initials (AWS, McKenney's, Verinext) - 48px diameter

**Profile Photo:** Optional circular image in hero section (256px diameter) - if not available, use gradient avatar with initials "RP"

## Responsive Behavior
- Hero: Stack vertically on mobile, full-width content
- Timeline: Vertical stack on mobile with left-aligned cards
- Skills: 3 columns → 1 column progressive collapse
- Projects: 2 columns → 1 column
- Leadership: 3 cards → 1 column stack
- Text sizes: Scale down 20-30% on mobile

## Unique Creative Elements
1. **Animated Metric Counter:** Numbers count up on scroll-into-view for key achievements
2. **Glassmorphism Cards:** Experience and project cards use subtle blur backdrop
3. **Interactive Timeline Connector:** Animated line that progresses as user scrolls
4. **Gradient Text Accents:** Role titles and section headers use subtle gradient text treatment
5. **Micro-interactions:** Button hover states with smooth color transitions

This design creates a sophisticated, modern portfolio that balances technical credibility with creative flair, perfectly positioning Richard as an innovative technologist.