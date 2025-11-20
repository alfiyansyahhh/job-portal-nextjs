# Job Portal [🚀 Live Demo](https://job-portal-nextjs-seven.vercel.app)

![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-16-blue)
![React](https://img.shields.io/badge/React-19-blue)
![NextAuth](https://img.shields.io/badge/NextAuth-Enabled-brightgreen)
![Vercel](https://img.shields.io/website-up-down-green-red/https/job-portal-nextjs-seven.vercel.app/)
![Open Issues](https://img.shields.io/github/issues/alfiyansyahhh/job-portal-nextjs)
![Open PRs](https://img.shields.io/github/issues-pr/alfiyansyahhh/job-portal-nextjs)
![Status](https://img.shields.io/badge/status-development-orange)


## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack Used](#tech-stack-used)
- [Credentials](#credentials-for-demotesting)
- [Roadmap / Milestone](#roadmap--milestone)
- [How to Run Locally](#how-to-run-locally)

---
## Project Overview
Job Portal – Hiring Management Web App adalah aplikasi web interaktif yang dirancang untuk mempermudah proses rekrutmen dan pelamaran pekerjaan. Aplikasi ini mendukung dua peran utama: **Admin (Recruiter)** dan **Applicant (Job Seeker)**, dengan pengalaman pengguna modern, responsif, dan sistematis.

> Admin dapat membuat, mengelola, dan memantau lowongan pekerjaan, serta meninjau daftar pelamar dengan tabel yang dapat disesuaikan (sortable, filterable, dan reorderable).  
> Pelamar dapat melihat lowongan aktif, mengisi formulir aplikasi dinamis sesuai konfigurasi lowongan, dan mengunggah foto profil menggunakan fitur webcam berbasis gesture.  




## Features
- [x] Autentikasi menggunakan **NextAuth.js**  
- [x] Manajemen state global dengan **Zustand**  
- [x] Validasi form menggunakan **Zod** + **React Hook Form**  
- [x] Komponen UI modern dengan **ShadCN UI**  
- [x] Responsif di semua perangkat  
- [ ] Fitur tambahan sesuai roadmap  

---

## Tech Stack Used
- **Frontend Framework:** Next.js  
- **Authentication:** NextAuth.js  
- **UI Components:** ShadCN UI  
- **State Management:** Zustand  
- **Form Handling:** React Hook Form  
- **Validation:** Zod  
- **Styling:** TailwindCSS 
- **Deployment:** Vercel  

---



## Credentials (for demo/testing)
| Role      | Email               | Password    |
|----------|-------------------|------------|
| Admin    |  admin@example.com  | admin123|
| Candidate| applicant@example.com | applicant123|

---

## Roadmap / Milestone
<details>
<summary>Klik untuk melihat roadmap</summary>

- [x] Setup Next.js project  
- [x] Implement authentication with NextAuth  
- [x] Setup Zustand state management  
- [x] Create forms with React Hook Form + Zod validation  
- [x] Integrate ShadCN UI components  
- [x] Deploy to Vercel  
- [x] Add advanced features / enhancements  

</details>

---

## How to Run Locally
<details>
<summary>Klik untuk melihat panduan lengkap</summary>

```bash
# Clone repository, masuk ke folder, dan install dependencies
git clone https://github.com/alfiyansyahhh/job-portal-nextjs.git && cd job-portal-nextjs
npm install
# atau jika pakai yarn
# yarn install

# Jalankan server development
npm run dev
# atau
# yarn dev

# Buka aplikasi di browser
# http://localhost:3000
