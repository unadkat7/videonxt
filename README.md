# 🎥 Video Upload Platform

A video uploading and viewing platform built using **Next.js (App Router)** and **TypeScript**.  
This project was created to learn how real-world Next.js applications are structured.

---

## 🎯 Purpose

- Understand Next.js App Router
- Learn client vs server components
- Implement authentication using NextAuth
- Protect routes using middleware
- Upload and deliver videos using ImageKit
- Use TypeScript in a practical project

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- NextAuth.js
- ImageKit
- React
- Tailwind CSS
- MongoDB

---

## ✨ Features

- User authentication (login & register)
- Protected routes with middleware
- Secure video uploads
- Server-side video fetching
- Clean separation of client and server components

---

## 🧱 Project Structure

middleware.ts
app/
├── api/
│ ├── auth/
│ └── videos/
├── login/
├── register/
├── upload/
├── page.tsx
├── layout.tsx




---

## 🔐 Middleware

Middleware is used to:
- Allow public routes (`/`, `/login`, `/register`)
- Protect private routes like video upload
- Redirect unauthenticated users to login

---

## 📦 ImageKit

ImageKit is used for:
- Secure video uploads
- CDN-based delivery
- Faster performance and lower server load

---

## 🧠 What I Learned

- How Next.js handles full-stack apps
- How authentication works with middleware
- How to manage media uploads efficiently
- Why TypeScript improves reliability

---

This project helped me understand how Next.js works beyond basic tutorials.
