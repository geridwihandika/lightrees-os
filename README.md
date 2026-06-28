# Lightrees OS — Full-Stack Property Management Platform

## 🚀 Setup Guide

### 1. Requirements
- Node.js >= 18
- NPM / Yarn

### 2. Installation
First, install all dependencies:
```bash
npm install
```

### 3. Environment Variables
Rename or duplicate `.env.local` to `.env` and fill in the values:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

### 4. Database Setup
Initialize the Prisma client and push the schema to the database:
```bash
npx prisma generate
npx prisma db push
```

*(Optional)* Seed the database with initial data:
```bash
npx prisma db seed
```

### 5. Running Locally
Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.
