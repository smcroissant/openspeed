# OpenSpeed

A fast, beautiful, and free internet speed test application built with React Router v7.

## Features

- 📊 Download speed test
- 📤 Upload speed test
- 🏓 Ping/latency measurement
- 📈 Jitter measurement
- 🌍 Multi-language support (EN, FR, ES, IT, DE, JA)
- 🖥️ Server selection with global locations
- 🎨 Beautiful, responsive UI with animations

## Tech Stack

- **Framework**: React Router v7 (Framework Mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Language**: TypeScript
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Project Structure

```
app/
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and i18n
├── routes/          # React Router route modules
│   ├── api/         # API resource routes
│   ├── $lang/       # Localized page routes
│   └── redirect.tsx # Root redirect handler
├── entry.client.tsx # Client entry point
├── entry.server.tsx # Server entry point
├── root.tsx         # Root layout
└── routes.ts        # Route configuration
```

## Environment Variables

- `SITE_URL` - The production URL (default: https://openspeed.app)
- `VERCEL` - Set to '1' when running on Vercel
- `VERCEL_ENV` - Environment type (production/preview/development)

## License

MIT
