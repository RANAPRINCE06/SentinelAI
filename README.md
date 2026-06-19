<div align="center">

# 🛡️ SentinelAI

### Social Intelligence, Redefined.

Transform social noise into actionable executive intelligence.<br/>
Monitor trends, analyze sentiment, and predict market movements with military-grade AI architecture.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

</div>

---

## ✨ Features

### 🎯 Core Capabilities
- **Sentiment Analysis Engine** — Real-time NLP-powered text sentiment analysis with confidence scoring
- **Bulk Processing** — Analyze hundreds of texts simultaneously with aggregated insights
- **Emotion Detection** — Deep emotion classification beyond basic positive/negative/neutral
- **Topic Detection** — Automatic topic extraction and clustering from text data
- **Threat Detection** — Identify reputation risks before they escalate to mainstream platforms

### 📊 Dashboard & Analytics
- **Executive Dashboard** — At-a-glance KPIs, sentiment trends, and anomaly alerts
- **Real-Time Hub** — Live data feed with zero-latency processing
- **Performance Analytics** — Historical performance vectors and trend forecasting
- **Custom Reports** — Generate and export PDF reports with comprehensive data

### 🔐 Authentication & Security
- **Firebase Authentication** — Email/password and Google OAuth sign-in
- **Role-Based Access Control** — Admin and standard user roles with Firestore persistence
- **Secure API Layer** — JWT-protected backend endpoints

### 🎨 User Experience
- **Dark Mode UI** — Premium glassmorphism design with indigo/purple accent palette
- **Responsive Design** — Fully adaptive layout for desktop, tablet, and mobile
- **Smooth Animations** — Motion-powered transitions and micro-interactions
- **Global Anomaly Toasts** — Real-time notification system for critical alerts

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite 6 |
| **Styling** | Tailwind CSS 4, Motion (Framer Motion) |
| **Routing** | React Router DOM 7 |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Auth** | Firebase Authentication |
| **Database** | Firestore (user data), PostgreSQL (analytics) |
| **Backend** | FastAPI, SQLAlchemy, Celery |
| **AI Engine** | Google Gemini AI API |
| **Task Queue** | Celery + Redis |
| **Containerization** | Docker Compose |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Python 3.11+** (for backend)
- **Docker & Docker Compose** (optional, for full stack)

### Frontend Setup

```bash
# 1. Clone the repository
git clone https://github.com/RANAPRINCE06/SentinelAI.git
cd SentinelAI

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:3000**

### Full Stack Setup (Docker)

```bash
# 1. Set your Gemini API key
export GEMINI_API_KEY="your_api_key_here"

# 2. Launch all services
docker-compose up --build
```

This starts:
- **Frontend** → `http://localhost:3000`
- **Backend API** → `http://localhost:8000`
- **PostgreSQL** → `localhost:5432`
- **Redis** → `localhost:6379`

---

## 📁 Project Structure

```
SentinelAI/
├── src/                        # Frontend source
│   ├── components/
│   │   ├── layout/             # DashboardLayout, Sidebar, Header
│   │   └── GlobalAnomalyToasts.tsx
│   ├── hooks/
│   │   └── useDashboardData.ts # Dashboard data hook
│   ├── lib/
│   │   ├── firebase.ts         # Firebase configuration
│   │   └── utils.ts            # Utility functions
│   ├── pages/
│   │   ├── LandingPage.tsx     # Public landing page
│   │   ├── AuthPage.tsx        # Login / Sign-up
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── AnalysisEngine.tsx  # Sentiment analysis tool
│   │   ├── RealTimeHub.tsx     # Live data monitoring
│   │   ├── TopicDetection.tsx  # Topic clustering
│   │   ├── PerformanceAnalytics.tsx
│   │   ├── Reports.tsx         # Report generation
│   │   └── Settings.tsx        # User settings
│   ├── App.tsx                 # Root component & routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── backend/
│   └── app/
│       ├── ai/engine.py        # NLP analysis engine (Gemini)
│       ├── api/                # FastAPI route handlers
│       ├── core/               # Config, security, Celery
│       ├── database/           # SQLAlchemy session
│       ├── models/             # Domain models
│       ├── schemas/            # Pydantic DTOs
│       └── tasks/              # Celery async tasks
├── docker-compose.yml          # Multi-service orchestration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Frontend dependencies
└── .env.example                # Environment variable template
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove dist and build artifacts |

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | ✅ |
| `APP_URL` | Deployment URL (auto-injected in AI Studio) | ❌ |
| `DATABASE_URL` | PostgreSQL connection string (Docker) | ❌ |
| `REDIS_URL` | Redis connection string (Docker) | ❌ |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the Apache-2.0 License.

---

<div align="center">
  <strong>Built with ❤️ by <a href="https://github.com/RANAPRINCE06">RANAPRINCE06</a></strong>
</div>
