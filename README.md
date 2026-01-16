# Facility Manager System

A modern, responsive web platform for corporate facility management. This system allows employees to report issues (electrical, HVAC, plumbing, etc.) and administrators to manage the building infrastructure.

## 🚀 Features

- **Responsive Dashboard**: Overview of pending and open requests.
- **Dynamic Request System**: Cascading dropdowns for Building > Floor > Office selection.
- **Admin Configuration**: Create new buildings, floors, and offices dynamically.
- **Searchable History**: Track and filter maintenance logs.
- **Role-Based Access**: Distinguishes between regular users and administrators.

## 🔑 Demo Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin` | `demo123` |
| **Simple User** | `demo` | `demo123` |

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS, JavaScript (ES6 Modules)
- **Environment**: [Vite](https://vitejs.dev/)
- **Data/Auth**: Mock LocalStorage implementation (simulating Supabase architecture)

## 📁 Key Folders

- `/src`: Core logic (`auth.js`, `db.js`, `main.js`) and styling.
- `/public`: Assets like the corporate logo and background.
- Root: Modular HTML pages for each application screen.

## 🛠️ Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

