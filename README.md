# 🍽️ Celastic - Restaurant Management System

A modern, comprehensive restaurant management system built with Vue 3 and TypeScript. Celastic provides a complete solution for restaurant owners to manage their operations, from order processing to inventory management and analytics.

## ✨ Features

### 🏠 **Dashboard & Analytics**
- Real-time dashboard with key performance metrics
- Revenue analytics with interactive charts
- Sales and order statistics
- Visual data representation using Chart.js

### 📋 **Order Management**
- Complete order lifecycle management
- Real-time order status tracking
- Payment status monitoring
- Order history and search functionality
- Export orders to Excel format
- Print receipts functionality

### 🍕 **Menu Management**
- Food item management with categories
- Image upload and management
- Pricing and inventory tracking
- Category organization

### 🏷️ **Category Management**
- Create and manage food categories
- Organize menu items efficiently
- Category-based filtering

### 🪑 **Table Management**
- Restaurant table organization
- Table status tracking
- Seating management

### 🔔 **Smart Notifications**
- Real-time pending order notifications
- Audio alerts for new orders
- Visual notification badges
- Auto-refresh functionality

### 📊 **Reporting & Export**
- Excel export functionality for orders
- Comprehensive data reporting
- Business intelligence insights

## 🛠️ Technology Stack

### **Frontend Framework**
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript development
- **Vue Router 4** - Client-side routing

### **UI Components & Styling**
- **Element Plus** - Vue 3 UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Interactive charts and graphs
- **Vue Chart.js** - Vue wrapper for Chart.js

### **Build Tools & Development**
- **Vite** - Next-generation frontend tooling
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatter
- **Auto-import** - Automatic component imports

### **Additional Libraries**
- **Axios** - HTTP client for API communication
- **jsPDF** - PDF generation for receipts
- **XLSX** - Excel file generation and export
- **QRCode.vue** - QR code generation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd celastic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_api_base_url_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
celastic/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── charts/         # Chart components
│   │   ├── home/           # Home page components
│   │   └── icons/          # Custom icon components
│   ├── composable/         # Vue 3 composables
│   ├── models/             # TypeScript interfaces
│   ├── router/             # Vue Router configuration
│   ├── views/              # Page components
│   └── assets/             # Static assets
├── public/                 # Public static files
└── dist/                   # Production build output
```

## 🎯 Key Features Explained

### **Real-time Notifications**
The system includes a sophisticated notification system that:
- Fetches pending order count every minute
- Plays audio alerts every 30 seconds when orders are pending
- Shows visual notification badges on the navbar
- Respects browser autoplay policies

### **Responsive Design**
Built with mobile-first approach using Tailwind CSS:
- Fully responsive across all device sizes
- Optimized for tablets and mobile devices
- Professional UI/UX design

### **Data Export**
Comprehensive export functionality:
- Excel export for order data
- Formatted data with proper headers
- Filtered data export based on current view

## 🏗️ Architecture

### **Component Architecture**
- Modular component design
- Reusable composables for business logic
- Type-safe development with TypeScript
- Clean separation of concerns

### **State Management**
- Vue 3 Composition API
- Reactive state management
- Centralized API communication
- Efficient data flow

### **API Integration**
- RESTful API communication
- JWT token authentication
- Error handling and loading states
- Automatic token injection

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Build for production
npm run lint         # Lint and fix code
npm run format       # Format code with Prettier
```

## 🔧 Configuration

### **Vite Configuration**
The project uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.ts`.

### **Tailwind CSS**
Custom styling is configured in `tailwind.config.js` with a custom color palette and responsive breakpoints.

### **TypeScript**
Strict TypeScript configuration ensures type safety throughout the application.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using Vue 3 and modern web technologies**
