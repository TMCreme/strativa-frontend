# Next.js + Tailwind CSS 3.4

A modern web application built with Next.js 15 and Tailwind CSS 3.4, featuring the latest design utilities and performance optimizations.

## Features

- ⚡ **Next.js 15** with App Router and Turbopack
- 🎨 **Tailwind CSS 3.4** with latest features including color-mix utilities
- 🔧 **TypeScript** for type safety
- 🌙 **Dark Mode** support
- 📱 **Responsive Design** with modern UI components
- ⚡ **Fast Development** with hot reload

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd strativa
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tailwind CSS 3.4 Features

This project showcases several Tailwind CSS 3.4 features:

- **Color Mix Utilities**: Using `color-mix()` function for dynamic color blending
- **Modern Gradients**: Beautiful gradient backgrounds and text
- **Enhanced Hover Effects**: Smooth transitions and transforms
- **Dark Mode Support**: Automatic dark/light theme switching
- **Responsive Design**: Mobile-first responsive utilities

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles with Tailwind directives
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page with Tailwind demo
├── components/          # Reusable components (create as needed)
└── lib/                 # Utility functions (create as needed)
```

## Customization

### Tailwind Configuration

The Tailwind configuration is in `tailwind.config.js`. You can customize:

- Color palette
- Typography
- Spacing
- Breakpoints
- Custom utilities

### Adding Components

Create new components in the `src/components/` directory and import them in your pages.

## Deployment

This project can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS 3.4 Release Notes](https://tailwindcss.com/blog/tailwindcss-v3-4)

## License

MIT
# strativa-frontend
