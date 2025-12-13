# 📚 Library Management System

Sistem Manajemen Perpustakaan menggunakan Laravel & React.js

Nama: Yosua Christian Adi Pratama  
NIM: G.211.23.0016  
Mata Kuliah: Rekayasa Web  

## 🎯 Fitur

- ✅ **Authentication** - Register, Login, Logout dengan Laravel Sanctum
- ✅ **CRUD Books** - Create, Read, Update, Delete buku perpustakaan
- ✅ **CRUD Borrowings** - Kelola peminjaman buku
- ✅ **Return Book System** - Sistem pengembalian buku
- ✅ **Dashboard Statistics** - Statistik real-time perpustakaan
- ✅ **Search & Filter** - Pencarian buku dan filter peminjaman
- ✅ **My Borrowings** - Halaman peminjaman personal user

## 🛠️ Tech Stack

### Backend
- Laravel 10
- MySQL Database
- Laravel Sanctum (Authentication)
- RESTful API

### Frontend
- React.js 18
- React Router DOM (Navigation)
- Axios (HTTP Client)
- CSS3 (Styling)

## 📊 Database Schema

### 3 Tabel Utama:

1. **users** - Data pengguna (id, name, email, password)
2. **books** - Data buku (id, title, author, isbn, stock, available, dll)
3. **borrowings** - Data peminjaman (id, user_id, book_id, borrow_date, due_date, status)

## 📦 Cara Instalasi

### Prasyarat
- PHP 8.1+
- Composer
- Node.js & NPM
- MySQL

### Backend Setup (Laravel)
```bash
# Clone repository
git clone https://github.com/yosuaadipratama03-boop/library-management-system.git
cd library-management-system

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database di .env
DB_DATABASE=library_db
DB_USERNAME=root
DB_PASSWORD=

# Jalankan migrations
php artisan migrate

# (Optional) Seed data sample
php artisan db:seed

# Jalankan server
php artisan serve
```

Server akan jalan di: `http://localhost:8000`

### Frontend Setup (React)
```bash
# Pindah ke branch frontend
git checkout frontend

# Install dependencies
npm install

# Jalankan development server
npm start
```

Aplikasi akan buka otomatis di: `http://localhost:3000`

## 🚀 API Endpoints

### Authentication
- `POST /api/register` - Register user baru
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user (protected)
- `GET /api/me` - Get user info (protected)

### Books
- `GET /api/books` - Get semua buku
- `POST /api/books` - Tambah buku baru (protected)
- `GET /api/books/{id}` - Get detail buku
- `PUT /api/books/{id}` - Update buku (protected)
- `DELETE /api/books/{id}` - Hapus buku (protected)

### Borrowings
- `GET /api/borrowings` - Get semua peminjaman (protected)
- `POST /api/borrowings` - Pinjam buku (protected)
- `GET /api/borrowings/{id}` - Get detail peminjaman (protected)
- `PUT /api/borrowings/{id}` - Update peminjaman (protected)
- `DELETE /api/borrowings/{id}` - Hapus peminjaman (protected)
- `POST /api/borrowings/{id}/return` - Return buku (protected)

### Dashboard
- `GET /api/dashboard/stats` - Get statistik dashboard (protected)

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Books Management
![Books](https://via.placeholder.com/800x400?text=Books+Screenshot)

### Borrowings
![Borrowings](https://via.placeholder.com/800x400?text=Borrowings+Screenshot)

## 🎥 Video Demo

🎬 **Link Video Presentasi:** [Akan ditambahkan]

Video mencakup:
- Demo authentication (register & login)
- CRUD Books (tambah, edit, hapus buku)
- CRUD Borrowings (pinjam & return buku)
- Dashboard statistics
- Search & filter functionality

## 🔧 Troubleshooting

### Error: CORS Policy
**Solusi:** Pastikan `config/cors.php` sudah include `http://localhost:3000` di `allowed_origins`

### Error: 401 Unauthorized
**Solusi:** Token tidak valid, logout dan login ulang

### Error: Connection Refused
**Solusi:** Pastikan Laravel server (`php artisan serve`) sedang running

## 📝 Catatan Pengembangan

Project ini dibuat sebagai **Proyek Akhir Mata Kuliah Rekayasa Web** dengan fokus pada:
- Implementasi RESTful API dengan Laravel
- Integrasi Frontend-Backend menggunakan React & Laravel
- Authentication dengan Laravel Sanctum
- CRUD Operations pada 3 tabel database
- State Management dengan React Context API
- Routing dengan React Router

## 📄 License

Project ini dibuat untuk keperluan edukasi.

## 👨‍💻 Developer

**Yosua Christian Adi Pratama**
- GitHub: [@yosuaadipratama03-boop](https://github.com/yosuaadipratama03-boop)
- Email: yosuaadipratama03@gmail.com

---

⭐ Jangan lupa beri star jika project ini membantu!
