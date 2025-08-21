# Mini LinkedIn (MERN, JS + JSX)

Features:
- Register/Login with JWT
- Profile (name, email, bio)
- Public text-only posts feed with author & timestamp
- Profile page shows user's details & posts

## Quick Start

### 1) Backend
```bash
cd backend
cp .env.example .env   # paste your MongoDB URI & JWT_SECRET
npm install
npm run dev            # or npm start
```
API runs on `http://localhost:5000`.

### 2) Frontend
```bash
cd ../frontend
cp .env.example .env   # ensure VITE_API_URL=http://localhost:5000
npm install
npm run dev            # open URL shown (default http://localhost:3000)
```

That's it 🎉

## Notes
- Pure JavaScript & JSX (no TypeScript).
- Simple CSS, easy to restyle.
- Edit `VITE_API_URL` if backend runs elsewhere.
