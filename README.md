# Node.js Authentication Assignment

## Q1. Hashing
- Demonstrates password hashing and verification using bcrypt.
- Run: `node q1-hash.js`

## Q2. Hash + JWT
- Register and login system with bcrypt + JWT.
- Run: `node q2-hash-jwt.js`
- Endpoints:
  - POST `/register`
  - POST `/login`

## Q3. Real-life Scenario (Role-based Access)
- Adds role-based access (user vs admin).
- Run: `node q3-role-based.js`
- Endpoints:
  - POST `/register` (with role)
  - POST `/login`
  - GET `/dashboard` (any user)
  - GET `/admin` (admin only)

## Setup
```bash
npm init -y
npm install express bcryptjs jsonwebtoken
