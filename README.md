# CV2Portfolio AI

> Transform your CV into a stunning portfolio website in seconds, powered by Gemini AI.

**Created by Michel Affedjou** — Responsable de Projet Innovant at Ehuzu Learning Lab

## Features

- **PDF Upload** — Drag & drop your CV (PDF format)
- **AI-Powered Analysis** — Google Gemini Flash extracts and structures your CV data
- **Premium Portfolio** — Generates a modern, dark-mode portfolio with animations
- **Shareable Link** — Each portfolio gets a unique shareable URL
- **Responsive Design** — Looks great on all devices
- **Loading Animations** — Engaging WOW-effect loading experience

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Google Gemini AI** (Flash model)
- **pdf-parse** (PDF text extraction)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/apikey) API key (free tier available)

### Installation

```bash
# Clone the repo
git clone https://github.com/michelaffedjou2-collab/test.git
cd test

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## Deployment on Render

1. Push your code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repository
4. Set the build command: `npm install && npm run build`
5. Set the start command: `npm start`
6. Add the `GEMINI_API_KEY` environment variable
7. Deploy!

A `render.yaml` is included for Render Blueprint deployments.

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/extract` | POST | Extracts text from uploaded PDF |
| `/api/generate` | POST | Generates portfolio JSON via Gemini AI |
| `/api/portfolio/[id]` | GET | Retrieves a saved portfolio |

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── extract/route.ts    # PDF text extraction
│   │   ├── generate/route.ts   # Gemini AI generation
│   │   └── portfolio/[id]/route.ts  # Portfolio retrieval
│   ├── portfolio/[id]/page.tsx # Shareable portfolio page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/
│   ├── FileUpload.tsx          # Drag & drop upload
│   ├── LoadingAnimation.tsx    # WOW loading effect
│   ├── ParticleBackground.tsx  # Animated particles
│   └── PortfolioPreview.tsx    # Portfolio display
├── lib/
│   ├── gemini.ts               # Gemini API integration
│   └── storage.ts              # In-memory portfolio storage
└── types/
    └── portfolio.ts            # TypeScript interfaces
```

## License

MIT
