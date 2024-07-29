# Marketplace API

API untuk marketplace yang menghubungkan merchant dan customer, dengan fitur diskon dan bebas ongkir. API ini menggunakan Express.js, MySQL, dan Sequelize.

## Fitur

- Merchant dapat membuat dan mengelola produk.
- Customer dapat melihat daftar produk.
- Customer dapat membeli produk dengan bebas ongkir untuk transaksi di atas 15000 dan diskon 10% untuk transaksi di atas 50000.
- Autentikasi menggunakan JWT.
- Validasi token/JWT pada setiap permintaan.
- Merchant dapat melihat penjualan produk mereka.

## Persyaratan

- Node.js
- MySQL

## Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/username/backend-rifan-hidayatulloh.git
   cd backend-rifan-hidayatulloh
   ```

2. Instal dependencies:

   ```bash
   npm install
   ```

3. Konfigurasi database di `config/config.json`:

   ```json
   {
     "development": {
       "username": "root",
       "password": null,
       "database": "marketplace",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

4. Buat database di MySQL:

   ```sql
   CREATE DATABASE marketplace;
   ```

5. Jalankan migrasi untuk membuat tabel:

   ```bash
   npx sequelize db:migrate
   ```

6. Jalankan server:

   ```bash
   node app.js
   ```

   Server akan berjalan pada `http://localhost:3000`.

## Penggunaan

### Register

- Endpoint: `POST /api/register`
- Deskripsi: Mendaftarkan user baru (merchant atau customer).
- Request Body:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "merchant" // atau "customer"
  }
  ```

### Login

- Endpoint: `POST /api/login`
- Deskripsi: Login untuk mendapatkan token JWT.
- Request Body:

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Create Product

- Endpoint: `POST /api/products`
- Deskripsi: Membuat produk baru (hanya untuk merchant).
- Header: `Authorization: <token>`
- Request Body:

  ```json
  {
    "name": "Product Name",
    "price": 20000
  }
  ```

### List Products

- Endpoint: `GET /api/products`
- Deskripsi: Melihat daftar produk.

### Create Order

- Endpoint: `POST /api/orders`
- Deskripsi: Membuat pesanan baru (hanya untuk customer).
- Header: `Authorization: <token>`
- Request Body:

  ```json
  {
    "productId": 1,
    "quantity": 2
  }
  ```

### List Orders (Untuk Merchant)

- Endpoint: `GET /api/orders`
- Deskripsi: Melihat daftar pesanan untuk produk merchant (hanya untuk merchant).
- Header: `Authorization: <token>`

## Struktur Proyek
