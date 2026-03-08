# Jaswinder Singh — Portfolio

A modern, interactive developer portfolio built with React, TypeScript, and Tailwind CSS. Features a custom scroll trace animation, parallax effects, and an AI-powered chat assistant backed by Google Gemini.

**Live:** [jaswindersingh1903/portfolio](https://github.com/jaswindersingh1903/portfolio)

---

## Features

- **AI Chat Assistant** — Powered by Google Gemini, answers questions about experience, skills, and projects in real-time
- **Custom Scroll Trace** — Animated SVG path that follows the user's scroll position
- **Parallax Hero** — Multi-layer background with hardware-accelerated parallax on scroll
- **Scroll Spy Navigation** — Header nav highlights the active section using IntersectionObserver
- **Custom Cursor** — Section-aware cursor with label that adapts to the current section (desktop only)
- **Project Hover Effects** — Focus/blur effect that dims non-hovered cards
- **Responsive Design** — Mobile-first layout with a collapsible mobile menu

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS (CDN) |
| AI | Google Gemini (`@google/genai`) |
| Charts | Recharts |
| Icons | Lucide React |

## Sections

- **Hero** — Introduction, CTA buttons, parallax background
- **About** — Bio, bento grid cards, core tech strip
- **Skills** — Proficiency bars for 12 skills across Frontend, Backend, DevOps, and Tools
- **Projects** — Showcase of 4 shipped projects with live links and tech tags
- **Experience** — Timeline of 3 roles (Loom Analytics, Classic Informatics, Enact E Services)
- **Contact** — Email form + social links (LinkedIn, GitHub)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/apikey) (optional — only needed for the AI chat)

### Installation

```bash
git clone https://github.com/jaswindersingh1903/portfolio.git
cd portfolio
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_KEY=your_gemini_api_key_here
```

> The AI chat widget is hidden automatically if `VITE_API_KEY` is not set.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
portfolio/
├── components/
│   ├── Header.tsx          # Fixed nav with scroll spy
│   ├── Hero.tsx            # Parallax hero section
│   ├── About.tsx           # Bento grid about section
│   ├── Skills.tsx          # Animated skill bars
│   ├── Projects.tsx        # Project cards with hover effects
│   ├── Experience.tsx      # Timeline of work history
│   ├── Contact.tsx         # Contact form + social links
│   ├── Footer.tsx
│   ├── ChatWidget.tsx      # Gemini AI chat widget
│   ├── ScrollTrace.tsx     # Animated SVG scroll trace
│   └── CustomCursor.tsx    # Custom cursor (desktop)
├── services/
│   └── geminiService.ts    # Gemini API integration
├── constants.ts            # Profile data, skills, projects, experience
├── types.ts
└── App.tsx
```

## Contact

**Jaswinder Singh** — Full Stack Developer
Toronto, Canada
jaswindersingh1903@gmail.com
[LinkedIn](https://linkedin.com/in/devjaswindersingh) · [GitHub](https://github.com/jaswindersingh1903)
