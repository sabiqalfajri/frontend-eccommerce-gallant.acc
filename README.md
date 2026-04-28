# Frontend - Web Application

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS v4
- React Router DOM
- Redux Toolkit
- TanStack React Query
- React Hook Form + Zod
- Clerk Authentication
- Recharts
- Framer Motion
- Radix UI
- Axios

---

## System Requirements

- Node.js v20+ LTS
- npm v10+
- Git (optional)

---

## Setup Project

### 1. Masuk ke folder frontend

```bash
cd frontend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Buat file `.env`:

```env
VITE_API_URL=http://192.168.1.10:5000
VITE_CLERK_PUBLISHABLE_KEY=
```

### ⚠️ Penting

- `192.168.1.10` = IP backend server/laptop
- harus diganti sesuai IP device yang menjalankan backend

---

### Cara mengetahui IP laptop

Windows:
```bash
ipconfig
```

Mac/Linux:
```bash
ifconfig
```

Cari:
```text
IPv4 Address
```

Contoh hasil:

```text
192.168.1.10
```

Gunakan IP tersebut pada file `.env`.

---

### Important Note

Jika project dijalankan di laptop / server berbeda, maka IP ini harus disesuaikan.

Jika tidak diganti, frontend tidak dapat terhubung ke backend.

---

### 4. Jalankan Development Server

```bash
npm run dev
```

atau

```bash
npx vite --host
```

Frontend akan berjalan di:

```
http://localhost:5173
```

dan bisa diakses via LAN:

```
http://192.168.x.x:5173
```

---

### 5. Production Build

Project ini sudah di deploy menggunakan vercel

Vercel akan secara otomatis menjalankan:

```bash
npm run build
```

saat proses deployment

### ⚠️ Penting
- Tidak perlu menjalankan build secara manual untuk development
- Build sudah dilakukan oleh vercel untuk production deployment

---