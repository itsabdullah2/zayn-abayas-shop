# Zayn Abayas Shop 🛍️

A modern, full-featured e-commerce platform for men's abayas, built with React, TypeScript, and Supabase. This application provides a seamless shopping experience with real-time inventory management, secure payments, and an intuitive admin dashboard.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Functionalities](#key-functionalities)
- [Deployment](#deployment)
- [Database Schema](#database-schema)
- [Design System](#design-system)

## ✨ Features

### Customer Features

- 🛒 **Product Browsing**: Browse products by categories (Classic, Best Sellers, New Arrivals)
- 🔍 **Smart Search**: Real-time search with fuzzy matching and autocomplete suggestions
- 🎨 **Product Variants**: Select colors (white/black) and sizes (S, M, L, XL)
- 🛍️ **Shopping Cart**: Full cart management with quantity adjustments
- 💳 **Secure Checkout**: Stripe integration for secure payments
- 🎟️ **Promo Codes**: Support for percentage, fixed, and free shipping discounts
- 📦 **Order Tracking**: View order history and status updates
- 🔄 **Returns Management**: Submit return requests with detailed feedback
- ⭐ **Product Reviews**: Rate and review purchased products
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Features

- 📊 **Dashboard Analytics**: Track revenue, orders, and top products
- 📈 **Sales Reports**: View analytics for different time periods (1 day, 7 days, 30 days, 1 year)
- 📦 **Order Management**: Update order status, view order details, export to PDF
- 🏷️ **Product Management**: Add, edit, delete products with variant support
- 📂 **Category Management**: Organize products by categories
- 🔔 **Notifications**: Real-time notifications for new orders and returns
- 👥 **User Management**: View customer profiles and order history

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **TanStack Query (React Query)** - Server state management
- **use-context-selector** - Optimized context API usage

### Backend & Database

- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Authentication (email/password)
  - Storage for product images

### Payment Processing

- **Stripe** - Payment gateway integration
- **@stripe/react-stripe-js** - React components for Stripe

### Additional Libraries

- **jsPDF** & **jspdf-autotable** - PDF generation for reports
- **Recharts** - Charts and analytics visualization
- **Sonner** - Toast notifications
- **React Icons** - Icon library

```
src/
├── assets/              # Static assets (images, data)
├── components/
│   ├── common/         # Reusable components (Navbar, Footer, Search, etc.)
│   ├── features/       # Feature-specific components
│   │   ├── auth/      # Authentication (Sign In/Up)
│   │   ├── cart/      # Shopping cart
│   │   ├── checkout/  # Checkout process
│   │   ├── dash/      # Admin dashboard
│   │   ├── home/      # Homepage
│   │   ├── orders/    # Order management
│   │   ├── product-details/
│   │   └── shop/      # Product listing
│   ├── layout/        # Layout components (Pagination, Loading, etc.)
│   └── ui/            # shadcn/ui components
├── constants/         # App constants (categories, links)
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── pages/             # Page components
├── supabase/          # Supabase client and queries
│   ├── auth/         # Authentication functions
│   ├── db/           # Database queries
│   └── types/        # Supabase type definitions
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🔑 Key Functionalities

### Authentication

- Email/password authentication via Supabase
- Role-based access control (Customer/Admin)
- Protected routes for admin dashboard
- Persistent sessions

### Product Management

Products support:

- Multiple variants (color + size combinations)
- Stock tracking per variant
- Category organization
- Best seller and featured flags
- Image upload and optimization
- Real-time inventory updates

### Shopping Cart

- Persistent cart (stored in Supabase)
- Real-time quantity updates
- Automatic price calculations
- Variant selection validation
- Stock availability checks

### Checkout Process

1. Cart review with item validation
2. Shipping information form
3. Promo code application (percentage/fixed/free shipping)
4. Stripe payment processing
5. Order confirmation and email notification
6. Automatic inventory reduction

### Order Management

- Order status workflow: `paid` → `processing` → `shipped` → `delivered`
- Cancellation support for pending orders
- Return request handling with detailed feedback
- Order history tracking
- Real-time status updates
- PDF export functionality

### Admin Dashboard

- Revenue analytics with customizable time periods
- Top-selling products display
- Order management table with filtering and status updates
- Product CRUD operations with variant management
- Export orders to PDF reports
- Real-time notifications for new orders and returns
- User activity tracking

## 🚀 Deployment

Checkout the live demo: https://zayn-abayas.vercel.app/

## 📝 Database Schema

### Main Tables

- **users** - User profiles and roles (customer/admin)
- **products** - Product information (name, description, price, images)
- **categories** - Product categories (Classic, Best Sellers, New Arrivals)
- **variants** - Product variants (color/size combinations with stock)
- **colors** - Available colors (white, black)
- **sizes** - Available sizes (S, M, L, XL)
- **cart** - Shopping cart items linked to users
- **orders** - Order records with status tracking
- **order_items** - Individual items within orders
- **reviews** - Product reviews and ratings
- **notifications** - Admin notifications for orders and returns
- **return_feedback** - Return requests with customer feedback

### Key Relationships

- Products → Variants (one-to-many)
- Variants → Colors, Sizes (many-to-one)
- Orders → Order Items → Products (one-to-many → many-to-one)
- Users → Orders, Cart, Reviews (one-to-many)

## 🎨 Design System

The application uses a custom Arabic-first design system with RTL support:

- **Primary Colors**: Charcoal Black (#1c1c1c), Desert Sand (#c2b280)
- **Accent Colors**: Oud Brown (#4b3621), Gold (#d4af37)
- **Typography**: Noto Kufi Arabic (Arabic), Roboto (English)
- **Direction**: RTL (Right-to-Left) for Arabic content
- **Spacing**: Tailwind CSS utility classes
- **Components**: Custom components built with shadcn/ui

**Abdullah Osman**

- GitHub: [@itsabdullah2](https://github.com/itsabdullah2)

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Payments by [Stripe](https://stripe.com/)

---

**Note**: This is a portfolio project demonstrating full-stack e-commerce development capabilities.
