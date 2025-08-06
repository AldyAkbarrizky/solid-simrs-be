# Backend Sistem Informasi Manajemen Rumah Sakit (SIMRS)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Language](https://img.shields.io/badge/language-TypeScript-blue)
![Framework](https://img.shields.io/badge/framework-Express.js-green)
![Deployment](https://img.shields.io/badge/deployment-Vercel-black)

---

## 📝 Deskripsi

Repository ini berisi kode sumber untuk sisi backend dari aplikasi **Sistem Informasi Manajemen Rumah Sakit (SIMRS)**. Backend ini dibangun sebagai REST API monolitik yang siap untuk di-deploy sebagai *Serverless Functions* di Vercel.

Tugas utama backend ini adalah untuk mengelola seluruh logika bisnis dan interaksi dengan database, termasuk autentikasi pengguna, manajemen data pasien, data penjamin (asuransi), dan modul-modul lainnya di masa depan. Backend ini dirancang untuk melayani aplikasi frontend yang dibangun menggunakan Next.js.

## ✨ Fitur Utama

-   **Autentikasi & Otorisasi:** Sistem login aman menggunakan JWT (JSON Web Token) dengan hak akses berbasis peran (Role-Based Access Control).
-   **Manajemen Pasien:** Operasi CRUD (Create, Read, Update, Delete) penuh untuk data demografi pasien.
-   **Generate No. Rekam Medis:** Pembuatan No. MR unik secara otomatis untuk setiap pasien baru.
-   **Manajemen Asuransi:** Operasi CRUD penuh untuk data penjamin/asuransi yang terhubung dengan pasien.
-   **Pencarian Cerdas:** Endpoint pencarian yang efisien untuk menemukan pasien berdasarkan berbagai kriteria.
-   **Paginasi:** Dukungan paginasi untuk mengambil data dalam jumlah besar.
-   **Siap Deploy:** Dikonfigurasi untuk deployment yang mudah dan cepat di platform Vercel.

## 🛠️ Tumpukan Teknologi (Tech Stack)

-   **Framework:** [Express.js](https://expressjs.com/)
-   **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [MySQL](https://www.mysql.com/)
-   **ORM:** [Sequelize](https://sequelize.org/)
-   **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Memulai (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

-   [Node.js](https://nodejs.org/en/) (v18 atau lebih baru)
-   [NPM](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)
-   Server Database MySQL yang sedang berjalan

### Instalasi

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/username-anda/nama-repo-backend.git](https://github.com/username-anda/nama-repo-backend.git)
    cd nama-repo-backend
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables:**
    Buat file `.env` di root folder proyek dengan menyalin dari `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Kemudian, sesuaikan isi file `.env` dengan kredensial database lokal Anda.

4.  **Jalankan Server Development:**
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:8000` (atau port yang Anda tentukan di `.env`).

## ⚙️ Variabel Lingkungan (Environment Variables)

Untuk menjalankan aplikasi ini, Anda perlu menambahkan variabel berikut di dalam file `.env` Anda:

```
# Konfigurasi Server
NODE_ENV=development
PORT=8000

# Kredensial Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_database_anda
DB_NAME=simrs_db
DB_DIALECT=mysql

# Kredensial JWT
JWT_SECRET=rahasia_jwt_anda_yang_sangat_panjang_dan_aman
JWT_EXPIRES_IN=8h
```

## 🌐 API Endpoints

Berikut adalah daftar endpoint API utama yang tersedia:

| Method | Endpoint                               | Deskripsi                                        | Dilindungi | Hak Akses Dibutuhkan       |
| :----- | :------------------------------------- | :----------------------------------------------- | :--------- | :------------------------- |
| `POST` | `/auth/login`                          | Login pengguna dan mendapatkan token JWT.        | Tidak      | -                          |
| `GET`  | `/patients`                            | Mendapatkan daftar semua pasien (dengan paginasi). | Ya         | Semua Role                 |
| `POST` | `/patients`                            | Membuat data pasien baru.                        | Ya         | `Admin`, `Registration`    |
| `GET`  | `/patients/:id`                        | Mendapatkan detail satu pasien.                  | Ya         | Semua Role                 |
| `PUT`  | `/patients/:id`                        | Memperbarui data satu pasien.                    | Ya         | `Admin`, `Registration`    |
| `DELETE`| `/patients/:id`                        | Menghapus data satu pasien.                      | Ya         | `Admin`                    |
| `GET`  | `/guarantors/by-patient/:patientId`    | Mendapatkan semua asuransi milik satu pasien.    | Ya         | Semua Role                 |
| `POST` | `/guarantors`                          | Menambah data asuransi baru.                     | Ya         | `Admin`, `Registration`    |
| `PUT`  | `/guarantors/:guarantorId`             | Memperbarui data satu asuransi.                  | Ya         | `Admin`, `Registration`    |
| `DELETE`| `/guarantors/:guarantorId`             | Menghapus data satu asuransi.                    | Ya         | `Admin`, `Registration`    |

## 📦 Deployment

Proyek ini telah dikonfigurasi untuk deployment mudah ke **Vercel**.

Struktur proyek mencakup folder `api` dan file `vercel.json` yang memungkinkan Vercel untuk membangun dan men-deploy aplikasi Express ini sebagai *Serverless Function*. Cukup hubungkan repository ini ke akun Vercel Anda dan atur *environment variables* di dashboard Vercel sesuai dengan kredensial production Anda.

---
*Dibuat untuk Proyek SIMRS.*
