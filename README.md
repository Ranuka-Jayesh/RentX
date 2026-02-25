<div align="center">

<h1><strong>Rent<span style="color:#f97316">X</span></strong></h1>

### Premium vehicle rentals — browse, search & book

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

</div>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🗺️ **Interactive map** | Browse vehicles on a Leaflet map with filters |
| 🔍 **Search & filters** | Find cars, SUVs, bikes by type, price, and location |
| 🚗 **Vehicle details** | Rich detail pages with specs, gallery, and quick view |
| 🔐 **Auth flows** | Minimal sign-in & sign-up with password strength and show/hide |
| 🌙 **Dark mode** | System-aware theme with smooth transitions |
| 📱 **Responsive** | Layouts tuned for mobile, tablet, and desktop |
| ⚡ **Fast** | Vite + React 18 for quick dev and optimized builds |

---

## 📸 Screenshots

<p align="center">
  <img src="screenshots/s1.png" width="400" alt="Screenshot 1" />
  <img src="screenshots/s2.png" width="400" alt="Screenshot 2" />
</p>
<p align="center">
  <img src="screenshots/s3.png" width="400" alt="Screenshot 3" />
  <img src="screenshots/s4.png" width="400" alt="Screenshot 4" />
</p>
<p align="center">
  <img src="screenshots/s5.png" width="400" alt="Screenshot 5" />
  <img src="screenshots/s6.png" width="400" alt="Screenshot 6" />
</p>
<p align="center">
  <img src="screenshots/s7.png" width="400" alt="Screenshot 7" />
  <img src="screenshots/s8.png" width="400" alt="Screenshot 8" />
</p>
<p align="center">
  <img src="screenshots/s9.png" width="400" alt="Screenshot 9" />
  <img src="screenshots/s10.png" width="400" alt="Screenshot 10" />
</p>

---

## 🛠 Tech stack

### Languages & core

| Badge | Tech |
|-------|------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | **React 18** — UI library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | **TypeScript** — type-safe JavaScript |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | **HTML5** |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | **CSS3** — Tailwind + custom |

### Build & tooling

| Badge | Tech |
|-------|------|
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | **Vite** — build tool & dev server |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | **ESLint** — linting |
| ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) | **Vitest** — unit tests |

### UI & styling

| Badge | Tech |
|-------|------|
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | **Tailwind CSS** — utility-first CSS |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radixui&logoColor=white) | **Radix UI** — accessible primitives (shadcn) |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-BB4B96?style=flat-square&logo=framer&logoColor=white) | **Framer Motion** — animations |
| ![Lucide](https://img.shields.io/badge/Lucide_React-7C3AED?style=flat-square) | **Lucide React** — icons |

### Data & backend

| Badge | Tech |
|-------|------|
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) | **Supabase** — auth, database & realtime |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=tanstackquery&logoColor=white) | **TanStack Query** — server state & caching |

### Libraries

| Badge | Tech |
|-------|------|
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white) | **React Router** — routing |
| ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white) | **Leaflet** + **React Leaflet** — maps |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white) | **Zod** — schema validation |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) | **React Hook Form** — forms |
| ![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat-square&logo=recharts&logoColor=white) | **Recharts** — charts |
| ![date-fns](https://img.shields.io/badge/date--fns-EE6B4F?style=flat-square&logo=date-fns&logoColor=white) | **date-fns** — dates |

---

## 📁 Project structure

```
RentX/
├── public/
├── screenshots/   # s1.png … s10.png (for README)
├── src/
│   ├── components/     # Reusable UI (Layout, Navbar, Footer, VehicleCard, etc.)
│   ├── components/ui/  # shadcn/ui primitives
│   ├── data/           # Static data (vehicles, map locations)
│   ├── hooks/          # useTheme, useToast, useMobile
│   ├── lib/            # utils
│   ├── pages/          # Route pages (Index, Search, Map, Login, Signup, 404, etc.)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting started

### Prerequisites

- **Node.js** 18+  
- **npm** or **yarn** or **pnpm**

### Install & run

```bash
# Clone the repo (if needed)
git clone <your-repo-url>
cd RentX

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview   # Preview production build locally
```

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |

---

## 🔗 Supabase (backend)

RentX is built to work with **Supabase** for:

- **Authentication** — sign up, sign in, sessions  
- **Database** — vehicles, bookings, user profiles  
- **Realtime** — live updates (e.g. availability)  
- **Storage** — vehicle images and documents  

Add your Supabase project URL and anon key in environment variables when you connect the backend.

---

## 📄 License

Private — All rights reserved.

---

<div align="center">

**Rent<span style="color:#f97316">X</span>** — *Premium vehicle rentals*

</div>
