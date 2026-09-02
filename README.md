👔 Uomo

Full-Stack Fashion E-Commerce Platform

Uomo is a modern fashion e-commerce platform designed to deliver a premium online shopping experience for men's fashion. The project combines a Next.js storefront, customer account area, shopping flow, and an admin dashboard, with a dedicated backend workspace prepared for future API and business-logic implementation.

Project Status: Frontend application and dashboard are implemented. The backend workspace is currently a structural foundation and does not yet contain production business logic or API endpoints.

✨ Overview

Uomo is built with a scalable monorepo structure and focuses on a clean, premium, responsive shopping experience.

Core Areas

🛍️ Product browsing and product details

🛒 Cart and checkout flow

📦 Order tracking and order received pages

❤️ Wishlist

👤 Customer account dashboard

🔐 Authentication pages

🧑‍💼 Admin dashboard

📊 Product, order, customer, user, staff, and category management UI

📰 Blog, journal, lookbook, and collection pages

📍 Store locator

📞 Contact, FAQ, About, and legal pages

📱 Responsive UI for mobile, tablet, and desktop

🧱 Project Architecture

Uomo follows an npm workspaces monorepo architecture:

uomo/
├── frontend/                  # Next.js application
│   ├── src/
│   │   ├── app/               # App Router pages & routes
│   │   ├── components/        # Reusable UI components
│   │   ├── features/          # Feature/domain modules
│   │   ├── helpers/           # Helper utilities & data
│   │   ├── constants/         # Shared constants
│   │   ├── data/              # Frontend data
│   │   ├── lib/               # Libraries & integrations
│   │   ├── providers/         # React providers
│   │   └── store/             # Zustand stores
│   ├── public/                # Static assets
│   └── package.json
│
├── backend/                   # Backend workspace foundation
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   └── package.json
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

🛠️ Tech Stack

Frontend

Next.js 16.1.6

React 19.2.3

Tailwind CSS 4

JavaScript / JSX

Zustand — client-side state management

TanStack React Query — server-state management

Axios — HTTP client

Framer Motion — animations

Swiper — sliders and carousels

Recharts — dashboard charts

Leaflet + React Leaflet — map/store-locator experience

Lucide React / React Icons — icons

Firebase — client-side authentication configuration

Backend

The backend workspace is prepared with a scalable structure for:

Controllers

Routes

Services

Models

Database

Middleware

Validators

Configuration

Utilities

Backend business logic and production API endpoints are not implemented in the current version.

📄 Main Routes

Public

/
├── /about
├── /collection
├── /journal
├── /lookbook
├── /contact
├── /faq
├── /store-locator
├── /coming-soon
├── /shop
├── /shop/[id]
├── /shop-single
├── /cart
├── /cart/shopping-and-checkout
├── /cart/order-received
└── /cart/order-tracking

Authentication

/login-register
/logout

Customer Dashboard

/dashboard
├── /dashboard/order
├── /dashboard/downloads
├── /dashboard/address
├── /dashboard/wishlist
└── /dashboard/account-details

Admin

/admin
├── /admin/dashboard
├── /admin/products
├── /admin/orders
├── /admin/customers
├── /admin/users
├── /admin/staff
└── /admin/categories

Content

/elements/blog
/elements/blog/[id]
/elements/blog-posts
/elements/terms

🛒 E-Commerce Experience

The storefront is structured around a complete shopping journey:

Browse
  ↓
Shop / Category
  ↓
Product Details
  ↓
Add to Cart
  ↓
Cart
  ↓
Checkout
  ↓
Order Received
  ↓
Order Tracking

Customer-side state includes dedicated stores for areas such as:

Authentication

Cart

Products

Blog

🧑‍💼 Admin Dashboard

The admin area provides UI for managing major commerce entities:

Dashboard overview

Products

Orders

Customers

Users

Staff

Categories

The dashboard also includes data visualization support through Recharts.

🎨 UI & UX

Uomo is designed with a premium fashion-commerce direction:

Clean editorial-style layouts

Responsive design

Reusable components

Interactive navigation

Product-focused layouts

Smooth animations and transitions

Mobile-friendly shopping experience

Dedicated customer and admin interfaces

🔐 Security & Performance

The Next.js configuration includes several production-oriented improvements:

Image optimization with AVIF/WebP

Remote image configuration

Static asset caching

X-Frame-Options

X-Content-Type-Options

Referrer-Policy

Permissions-Policy

HSTS configuration

Disabled poweredByHeader

Compression enabled

Security headers and production hardening should still be reviewed before deploying the application to a real production environment.

⚙️ Getting Started

1. Clone the repository

git clone <your-repository-url>
cd uomo

2. Install dependencies

npm install

Because this is an npm-workspaces monorepo, the root installation handles the workspace dependencies.

3. Configure environment variables

Frontend environment variables are defined in:

frontend/.env.example

Create:

frontend/.env.local

and provide the required Firebase configuration.

Example:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

Never commit real credentials or secrets.

🚀 Development

Start the frontend development server:

npm run dev

Or explicitly:

npm run dev:frontend

The application will normally be available at:

http://localhost:3000

📦 Available Scripts

Command

Description

npm run dev

Start frontend development server

npm run dev:frontend

Start frontend workspace

npm run build

Build the frontend

npm run start

Start production frontend

npm run lint

Run ESLint

npm run install:all

Install workspace dependencies

🧪 Validation

Run linting:

npm run lint

Run a production build:

npm run build

If dependency installation has not completed successfully in the current environment, build verification should be performed after running npm install.

🔮 Future Backend Roadmap

The backend workspace is intentionally prepared for future full-stack implementation.

Planned areas include:

User authentication & authorization

Product APIs

Category APIs

Cart management

Wishlist management

Order management

Checkout

Customer management

Admin authorization / RBAC

Database integration

Validation

Error handling

API security

Payment integration

Email notifications

A typical future architecture can follow:

Client
  ↓
Next.js Frontend
  ↓
HTTP / REST API
  ↓
Express Backend
  ↓
Services
  ↓
Models
  ↓
MongoDB

📁 Environment Files

.env.example
frontend/.env.example
backend/.env.example

Environment-specific secrets should remain outside version control.

📌 Project Status

Area

Status

Next.js storefront

✅ Implemented

Responsive UI

✅ Implemented

Product pages

✅ Implemented

Cart flow

✅ Implemented

Checkout UI

✅ Implemented

Customer dashboard

✅ Implemented

Admin dashboard UI

✅ Implemented

Authentication UI

✅ Implemented

Backend architecture

🟡 Foundation

Backend API/business logic

⏳ Planned

Database integration

⏳ Planned

Production payment system

⏳ Planned

👨‍💻 Author

Uomo — A modern fashion e-commerce project built with a focus on scalable architecture, premium UI/UX, and a complete commerce experience.

📄 License

This project is currently intended for development, learning, portfolio, and project demonstration purposes.