<div align="center">

# Hey, I'm Abhinav 👋

**Full-Stack & AI Systems Architect** — I build production systems at the hard end of the stack: zero-knowledge identity proofs, graph-based clinical risk models, and PKI-secured real-time telemetry.

Full-time at Kottackal Business Solutions · Trivandrum, Kerala, India

[![Portfolio](https://img.shields.io/badge/Portfolio-abhinavmathewkurian.com-C98A3E?style=for-the-badge)](https://abhinavmathewkurian.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abhinav-mathew-kurian-553042245)
[![Instagram](https://img.shields.io/badge/Instagram-itsabhinav.in-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/itsabhinav.in)
[![Email](https://img.shields.io/badge/Email-abhinavmathewkurian%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abhinavmathewkurian@gmail.com)

</div>

---

### What I work with

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white)

</div>

### Things I've shipped

- **[LearnSpace](https://howlfoxacademy.com)** — a private course platform for coaching institutes, with a streaming AI course assistant and 340+ tests
- **[Sell Kerala](https://sellkerala.com)** — a real estate marketplace covering all 14 districts of Kerala, with AI-powered natural-language search
- **ZKIP-CLINICAL** — a clinical decision support system combining zero-knowledge proofs, a Neo4j graph, and an AI risk-retrieval layer
- **TradeTrip** — an autonomous trade-finance platform automating Letter-of-Credit workflows with a LangGraph agent

See the [full case studies →](https://abhinavmathewkurian.com/projects)

---

## About this repository

This is the source code for my personal portfolio — [**abhinavmathewkurian.com**](https://abhinavmathewkurian.com). It shares my GitHub username, so this README also doubles as my [profile README](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme).

### Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** MongoDB (Mongoose)
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion)
- **Forms / validation:** React Hook Form + Zod
- **Email:** Resend
- **Admin auth:** Signed JWT cookie (jose) + bcrypt
- **Deployment:** Vercel

### Structure

```
app/            Next.js App Router pages + API routes
  admin/        Password-protected dashboard (projects, enquiries, settings)
  api/          Route handlers (contact form, admin CRUD)
components/     UI, organized by feature (home, projects, admin, effects, ui)
lib/            Data layer, Mongoose models, validation schemas
scripts/        Database seed script
```

### Running locally

```bash
npm install
cp .env.example .env.local   # fill in MongoDB URI, admin password hash, etc.
npm run seed                 # populate the database with real content
npm run dev
```

---

<div align="center">
<sub>Built with Next.js, MongoDB, and Vercel.</sub>
</div>
