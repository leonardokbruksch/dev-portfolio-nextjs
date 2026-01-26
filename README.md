# Leonardo Bruksch - Developer Portfolio

A modern, single-page developer portfolio and CV website built with Next.js, featuring an AI-powered "Ask Me Anything" chatbot that can answer questions about my background, skills, and experience.

**Live site:** [leonardobruksch.dev](https://leonardobruksch.dev)

## Features

- **Interactive Hero Section** — Animated greeting with typewriter effect and a rotating 3D retro computer model (Three.js)
- **Expertise Showcase** — Backend, Frontend, and Mobile development skills with animated typewriter highlighting capabilities
- **Professional Experience** — Accordion-style timeline of work history with detailed role descriptions and tech tags
- **AI Chat (Ask Me Anything)** — GPT-4o-mini powered chatbot with full context of my CV and background
  - Text input for questions
  - Voice input via microphone (speech-to-text using OpenAI's transcription API)
- **Live Surf Forecast** — Real-time wave, wind, and tide data for favorite surf spots (Open-Meteo API)
- **Dark/Light Theme** — System-aware theme switching with manual toggle
- **Animated Background** — Interactive gradient animation that follows cursor movement
- **Responsive Design** — Mobile-first, works seamlessly across all screen sizes

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** — React framework with App Router and Turbopack
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** — Radix-based UI components
- **[Framer Motion](https://www.framer.com/motion/)** — Animations
- **[Three.js](https://threejs.org/)** + **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** — 3D graphics
- **[Lucide React](https://lucide.dev/)** — Icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Theme management

### Backend (API Routes)
- **Next.js API Routes** — Serverless functions
- **[OpenAI API](https://platform.openai.com/)** — GPT-4o-mini for chat responses, GPT-4o-transcribe for voice-to-text

### External APIs
- **[Open-Meteo Marine API](https://open-meteo.com/)** — Wave and tide data
- **[Open-Meteo Weather API](https://open-meteo.com/)** — Wind conditions

### Deployment
- **[Vercel](https://vercel.com/)** — Hosting and deployment

## Project Structure

```
├── app/
│   ├── api/
│   │   └── ama/
│   │       ├── route.ts          # Chat completion endpoint
│   │       └── transcribe/
│   │           └── route.ts      # Audio transcription endpoint
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Main single-page application
├── components/
│   ├── theme-provider.tsx        # Dark/light theme context
│   └── ui/
│       ├── ai/                   # AI chat components
│       ├── sections/             # Page sections (Hero, Experience, etc.)
│       ├── background-gradient-animation.tsx
│       ├── retro-computer.tsx    # 3D model component
│       └── ...                   # Other UI components
├── lib/
│   ├── ama/
│   │   └── profile.ts            # CV context for AI chatbot
│   └── utils.ts                  # Utility functions
├── public/
│   ├── Leonardo-Bruksch-CV.pdf   # Downloadable CV
│   └── models/
│       └── retro_pc.glb          # 3D computer model
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dev-portfolio-nextjs.git
   cd dev-portfolio-nextjs
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file with your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for chat and transcription | Yes |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Customization

### Updating CV Context

Edit `lib/ama/profile.ts` to update the AI chatbot's knowledge about your background, skills, and experience.

### Adding Experience

Modify the `EXPERIENCES` array in `components/ui/sections/experience.tsx` to add or update work history entries.

### Changing Surf Spots

Update the `spots` array in `components/ui/sections/surf.tsx` to display different locations.

## Deployment

The site is deployed on Vercel. To deploy your own:

1. Push to a GitHub repository
2. Import the project in [Vercel](https://vercel.com/new)
3. Add the `OPENAI_API_KEY` environment variable in Vercel's project settings
4. Deploy

## License

This project is for personal portfolio use. Feel free to use it as inspiration for your own portfolio.

## Contact

- **Email:** leonardo.bruksch@gmail.com
- **LinkedIn:** [linkedin.com/in/leonardo-bruksch](https://www.linkedin.com/in/leonardo-bruksch/)
- **Website:** [leonardobruksch.dev](https://leonardobruksch.dev)
