# 📘 Next.js Video Upload Platform – Complete Detailed Notes

These notes are **project-based**, **interview-ready**, and explain **everything you used and why**.

---

## 1️⃣ Project Overview

This project is a **full‑stack video upload platform** built using **Next.js App Router**.

Key features:

- Authentication using **NextAuth (JWT-based)**
- Video & image uploads using **ImageKit**
- Data persistence using **MongoDB + Mongoose**
- Server Components for fast rendering
- Client Components for interaction

👉 Next.js acts as **frontend + backend**.

---

## 2️⃣ Folder Structure (App Router)

```
app/
 ├── layout.tsx
 ├── page.tsx                → Home page
 ├── upload/page.tsx         → Upload page
 ├── login/page.tsx
 ├── register/page.tsx
 ├── api/
 │   ├── video/route.ts
 │   └── auth/
 │       ├── [...nextauth]/route.ts
 │       └── imagekit-auth/route.ts
components/
 ├── Header.tsx
 ├── Providers.tsx
 ├── FileUpload.tsx
lib/
 ├── db.ts
 └── auth.ts
models/
 └── Video.ts
```

---

## 3️⃣ App Router Core Concepts

### page.tsx

- Represents a route
- Default is **Server Component**
- Can fetch data directly from DB

### layout.tsx

- Wraps all pages
- Used for header, providers, global styles

### api/\* (Route Handlers)

- Backend endpoints
- Replace Express routes
- Support GET, POST, PUT, DELETE

---

## 4️⃣ Server Components vs Client Components

### Server Components

Used for:

- Fetching data from DB
- SEO
- Fast rendering

Example:

```ts
const videos = await Video.find();
```

Rules:

- No useState
- No useEffect
- Runs on server

---

### Client Components

Marked with:

```ts
"use client";
```

Used for:

- Forms
- File uploads
- Buttons
- Logout

Examples:

- Upload page
- Header
- FileUpload

---

### Golden Rule ⭐

> Server Components → DB  
> Client Components → API

---

## 5️⃣ Database Layer (MongoDB + Mongoose)

### lib/db.ts

- Manages MongoDB connection
- Prevents multiple connections during hot reload
- Uses global caching

Why caching is needed:

- Next.js reloads files often in dev mode
- Without caching → DB connection overflow

---

### models/Video.ts

Defines how video data is stored.

Fields:

- title
- description
- videoUrl
- thumbnailUrl
- controls
- transformation
- timestamps

Important lesson:

```ts
type: String   ✅
Type: String   ❌ (breaks mongoose)
```

---

## 6️⃣ API Routes

### GET /api/video

- Fetch all videos
- Sorted by latest
- Used by client-side fetch & external consumers

### POST /api/video

- Protected by NextAuth
- Saves metadata after ImageKit upload

Auth check:

```ts
const session = await getServerSession(authOptions);
```

---

## 7️⃣ Authentication (NextAuth)

### Strategy Used

- JWT-based authentication
- No database adapter
- Sessions stored in cookies

---

### Client-side session

```ts
useSession();
```

### Server-side session

```ts
getServerSession(authOptions);
```

---

### Logout

```ts
signOut({ callbackUrl: "/login" });
```

Effects:

- JWT removed
- Cookie cleared
- User logged out

---

## 8️⃣ Providers Pattern

### Why Providers.tsx exists

Wraps:

- SessionProvider (NextAuth)
- ImageKitProvider

Used in:

```ts
app / layout.tsx;
```

Without Providers:

- useSession() will fail
- ImageKit config unavailable

---

## 9️⃣ ImageKit Integration

### Why ImageKit?

- No heavy backend storage
- Fast CDN
- Secure uploads

---

### Upload Flow (Important)

```
User
 ↓
Upload Page (Client)
 ↓
/api/auth/imagekit-auth
 ↓
ImageKit Upload
 ↓
MongoDB Save
```

---

### imagekit-auth API

Generates:

- token
- signature
- expire

Must run on server for security.

---

## 🔟 FileUpload Component

Responsibilities:

- Validate file
- Upload to ImageKit
- Track progress
- Return uploaded URL

Bug learned:

```ts
validateFile ❌
validateFile(file) ✅
```

---

## 1️⃣1️⃣ Home Page Logic

- Server Component
- Fetches videos directly from MongoDB
- Renders thumbnails with next/image
- Shows empty state if no videos

---

### next/image security

External domains must be allowed:

```js
images: {
  domains: ["ik.imagekit.io"];
}
```

---

## 1️⃣2️⃣ Header & Logout

Header:

- Shows Login / Upload / Logout
- Uses useSession()

Placed in layout.tsx so it appears on all pages.

---

## 1️⃣3️⃣ Common Errors & What They Teach

| Error                  | Lesson                |
| ---------------------- | --------------------- |
| JSON parse error       | Server fetched HTML   |
| ImageKit token missing | API contract mismatch |
| Schema invalid         | Case sensitivity      |
| Edge runtime crash     | Mongoose needs Node   |
| next/image error       | Domain allow-list     |

---

## 1️⃣4️⃣ How to Explain This Project in Interview

> “I built a full-stack video platform using Next.js App Router. Authentication is handled via NextAuth using JWT-based sessions. MongoDB stores metadata, while ImageKit handles secure media uploads. Server Components are used for SEO and performance, while Client Components handle interactions.”

---

## 1️⃣5️⃣ Tech Stack

- Next.js (App Router)
- React
- TypeScript
- NextAuth
- MongoDB
- Mongoose
- ImageKit
- Tailwind CSS
- JWT

---

## 1️⃣6️⃣ What You Can Add Next

- Video detail page `/video/[id]`
- Likes & views
- Pagination
- Role-based access
- Delete videos

---

## ✅ Final Note

This project covers **real-world Next.js**, not just tutorials.
If you can explain this, you understand modern full-stack React.
