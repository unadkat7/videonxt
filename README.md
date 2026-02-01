# 🎥 Video Upload Platform (Next.js Learning Project)

A modern **video uploading and viewing platform** built using **Next.js**, **TypeScript**, **NextAuth**, and **ImageKit**.  
This project was created **purely for learning purposes** to understand how real-world applications are structured using **Next.js App Router** and modern tools.

---

## 🚀 Project Purpose

This project is **not just another CRUD app**.  
It is built to deeply understand:

- How **Next.js App Router** works
- How **Client & Server Components** interact
- How authentication works using **NextAuth**
- How to handle **secure media uploads** using **ImageKit**
- How **TypeScript** improves reliability and developer experience

---

## 🧠 What I Learned From This Project

- Proper **project structure** in Next.js (App Router)
- Server-side rendering vs client-side rendering
- Protecting routes using authentication
- Uploading large media files efficiently
- Writing scalable, type-safe code

---

## 🛠 Tech Stack

| Technology | Purpose |
|---------|--------|
| **Next.js (App Router)** | Frontend + Backend framework |
| **TypeScript** | Type safety and better DX |
| **NextAuth.js** | Authentication & session handling |
| **ImageKit** | Video storage, optimization & delivery |
| **React** | UI components |
| **Tailwind CSS** | Styling |
| **MongoDB / Database** | Storing user & video data |

---

## 📁 Project Features

### 🔐 Authentication (NextAuth)
- User login & registration
- Secure session handling
- Protected routes
- Middleware-based auth checks

### 🎬 Video Upload (ImageKit)
- Upload videos securely
- Optimized delivery via CDN
- Faster loading & streaming
- No heavy load on own server

### 🏠 Home Page
- Fetches videos from `/api/videos`
- Displays uploaded videos
- Server-side data fetching

### 🧩 API Routes
- `/api/auth` → Authentication
- `/api/videos` → Fetch & manage videos

---

## 🧱 Architecture Overview
app/
├── api/
│ ├── auth/
│ └── videos/
├── login/
├── register/
├── upload/
├── page.tsx
├── layout.tsx




### Architecture Highlights
- **Middleware** handles authentication globally
- **Server Components** handle data fetching
- **Client Components** handle forms & interactions
- Clean separation of concerns

---

## 🔄 Client vs Server Components (Key Learning)

### Server Components
- Fetch data securely
- Improve performance
- Keep secrets on the server

### Client Components
- Handle forms & user input
- Manage state
- Use browser APIs

`"use client"` is used **only when required**

---

## 🔐 Middleware (Route Protection)

This project uses **Next.js Middleware** combined with **NextAuth** for centralized route protection.

### Why Middleware?
- Runs **before rendering any page**
- Prevents unauthorized access
- Avoids repeating auth logic in every page

### Public Routes
- `/`
- `/login`
- `/register`
- `/api/auth/*`

### Protected Routes
- Video upload pages
- Auth-required user pages

Unauthenticated users are redirected to the **login page**.

---

## 📦 ImageKit Integration

ImageKit is used for handling video uploads and delivery.

### Why ImageKit?
- Handles **large video files**
- Built-in optimization
- CDN-based fast delivery
- Secure uploads via tokens

This keeps the application **fast, scalable, and production-ready**.

---

## 🧪 Why TypeScript?

TypeScript helped in:
- Preventing runtime errors
- Defining clear data contracts
- Improving maintainability
- Better editor support & autocomplete

Once integrated properly, it significantly improves code quality.

---

## 🎯 Key Learnings

Through this project, I learned:
- How real-world Next.js applications are structured
- How frontend and backend coexist in Next.js
- How authentication & middleware work together
- How to manage media uploads efficiently

---

## 📌 Future Enhancements

- Video likes & comments
- User profiles
- Categories & tags
- Infinite scrolling
- Improved UI animations

---

## 🏁 Conclusion

This project was built **to learn Next.js and TypeScript properly**, not just to complete a feature list.

It focuses on **core concepts used in production applications**, making it a strong foundation for future projects.

---

⭐ If you find this project helpful, feel free to star the repository!

