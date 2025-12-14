# 📚 Library Management System

Sistem Manajemen Perpustakaan menggunakan Laravel & React.js

**Nama:** Yosua Christian Adi Pratama  
**NIM:** G.211.23.0016
**Mata Kuliah:** Rekayasa Web  

## 🎯 Fitur

- ✅ Authentication (Register, Login, Logout)
- ✅ CRUD Books (Create, Read, Update, Delete)
- ✅ CRUD Borrowings (Pinjam & Return Buku)
- ✅ Dashboard Statistics
- ✅ Search & Filter Books
- ✅ My Borrowings (Personal History)

## 🛠️ Tech Stack

**Backend:** Laravel 10, MySQL, Laravel Sanctum  
**Frontend:** React.js, React Router, Axios  

## 📊 Database (3 Tabel)

1. **users** - Data pengguna
2. **books** - Data buku perpustakaan
3. **borrowings** - Data peminjaman buku

## 📦 Instalasi

### Backend
```bash
git clone https://github.com/yosuaadipratama03-boop/library-management-system.git
cd library-management-system
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

### Frontend
```bash
git checkout frontend
npm install
npm start
```

## 🚀 API Endpoints

### Authentication
- POST `/api/register` - Register
- POST `/api/login` - Login
- POST `/api/logout` - Logout

### Books
- GET `/api/books` - Get all books
- POST `/api/books` - Create book
- PUT `/api/books/{id}` - Update book
- DELETE `/api/books/{id}` - Delete book

### Borrowings
- GET `/api/borrowings` - Get all borrowings
- POST `/api/borrowings` - Borrow book
- POST `/api/borrowings/{id}/return` - Return book

### Dashboard
- GET `/api/dashboard/stats` - Get statistics

## 🎥 Video Demo

🎬 **Link Video YouTube:** [https://youtu.be/di1oWY2ju_w]

## 👨‍💻 Developer

**Yosua Christian Adi Pratama**  
GitHub: [@yosuaadipratama03-boop](https://github.com/yosuaadipratama03-boop)  
Email: yosuaadipratama03@gmail.com

---

⭐ Jangan lupa star repo ini jika membantu!
