/**
 * Seeds MongoDB with real resume content so the site has something true
 * to show immediately (no lorem ipsum). Safe to re-run — it replaces by
 * a stable key instead of blindly inserting duplicates.
 *
 * Usage: npm run seed   (reads MONGODB_URI from .env.local)
 */
import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/lib/models/Project";
import { SkillModel } from "@/lib/models/Skill";
import { ExperienceModel } from "@/lib/models/Experience";

const projects = [
  {
    title: "LearnSpace — Edtech Platform",
    slug: "learnspace-edtech",
    summary:
      "A private, invite-only course platform for coaching institutes, with multi-role dashboards, live sessions, and a per-course AI assistant.",
    description:
      "A full-stack private online course platform built for coaching institutes and independent educators, with invite-only access, multi-role dashboards, and a built-in AI course assistant. Live at howlfoxacademy.com.\n\n• Built four distinct portals (Admin, Teacher, Student, and a public storefront), each with role-specific dashboards and access control.\n• Built a per-course AI assistant grounded on uploaded PDFs and video transcripts, streamed token-by-token over SSE with a model fallback chain and strict guardrails against off-topic and restricted content.\n• Implemented a YouTube-based course player with auto-saved progress, per-video comments, and chapter navigation.\n• Built an admin enquiry inbox with real-time unread counts over SSE, plus full student, teacher, course, batch, attendance, and event management.\n• Covered the codebase with 340+ Jest tests across 29 suites and 50 Playwright end-to-end tests; access enforced at both the routing-middleware and API level.",
    techStack: ["Next.js 16", "TypeScript", "MongoDB Atlas", "Auth.js v5", "Cloudinary", "OpenRouter AI", "Tiptap", "Playwright"],
    keySkills: ["Role-based access control", "Server-Sent Events (SSE)", "AI-grounded chat with guardrails", "Automated testing (Jest + Playwright)", "Payment & subscription tracking"],
    category: "freelance" as const,
    role: "Full-Stack Developer",
    period: "2026",
    liveUrl: "https://howlfoxacademy.com",
    githubUrl: "https://github.com/Abhinav-Mathew-Kurian/learnspace-v01",
    featured: true,
    order: 1,
    status: "live" as const,
  },
  {
    title: "Sell Kerala — Real Estate Platform",
    slug: "sell-kerala",
    summary:
      "A real estate marketplace covering all 14 districts of Kerala, with AI-powered natural-language search.",
    description:
      "Kerala's premier real estate marketplace: buy, sell, rent, and lease property across all 14 districts, with AI-powered natural-language search and hand-illustrated district artwork. Live at sellkerala.com.\n\n• Built an AI search that parses plain-language queries like \"2 BHK flat in Kochi under 50 lakhs near hospital\" into structured filters via OpenAI.\n• Built listing pages combining an image gallery, an interactive Leaflet map, nearby-places lookup via the Overpass API, and a WhatsApp/call enquiry bar.\n• Built an admin panel for the full listing lifecycle (draft, published, sold, archived), plus AI-assisted description generation and a leads inbox.\n• Implemented SEO as a first-class feature: JSON-LD structured data, dynamic per-filter metadata, and an auto-generated sitemap covering every district, type, and listing.",
    techStack: ["Next.js 16", "TypeScript", "MongoDB", "NextAuth v5", "Cloudinary", "Leaflet", "OpenAI", "Framer Motion"],
    keySkills: ["AI-powered search", "Geospatial mapping (Leaflet)", "SEO architecture (JSON-LD, dynamic metadata)", "Admin content lifecycle management"],
    category: "freelance" as const,
    role: "Full-Stack Developer",
    period: "2026",
    liveUrl: "https://sellkerala.com",
    featured: true,
    order: 2,
    status: "live" as const,
  },
  {
    title: "ZKIP-CLINICAL — Clinical Decision Support Platform",
    slug: "zkip-clinical",
    summary:
      "A clinical decision support platform combining on-chain credentialing, a graph database of drug-disease-allergen relationships, and an AI risk-retrieval layer.",
    description:
      "A clinical decision support platform built for Kottackal Business Solutions, combining on-chain patient credentialing, a graph database of clinical relationships, and an AI risk-retrieval layer.\n\n• Combined on-chain patient credentialing with a Neo4j graph of drug-disease-allergen relationships and an AI risk-retrieval layer seeded from RxNorm, MED-RT, PharmGKB, SNOMED CT, and ICD-10-CM across 300,000+ records.\n• Engineered a custom vector-based clinical memory service that retrieves patient risk profiles using semantic similarity search across pharmacological, therapeutic, and demographic signals.\n• Integrated Corti AI for clinical NLP: automated PDF-to-diagnosis coding, real-time drug contraindication detection, and guardrail enforcement.\n• Implemented zero-knowledge proof circuits for privacy-preserving identity and prescription verification, and ERC-721 smart contracts for tamper-proof on-chain credentialing.\n• Demonstrated interpretable AI behaviour: removing a single patient allergy record causally shifted the system's risk classification, proving traceable, auditable AI decisions.",
    techStack: ["Neo4j", "Zero-Knowledge Proofs", "ERC-721", "Vector Search", "Corti AI", "Node.js"],
    keySkills: ["Graph databases (Neo4j)", "Zero-knowledge proofs", "Vector / semantic search", "Clinical NLP integration", "On-chain credentialing (ERC-721)"],
    category: "full-time" as const,
    role: "Full-Stack Developer",
    period: "2025",
    featured: false,
    order: 3,
    status: "live" as const,
  },
  {
    title: "TradeTrip — Autonomous Trade Finance Platform",
    slug: "tradetrip",
    summary:
      "A trade-finance platform automating the full Letter of Credit lifecycle with an AI agent and on-chain verification.",
    description:
      "A multi-party trade finance platform built for Kottackal Business Solutions, automating the full Letter of Credit lifecycle end to end.\n\n• Built a multi-party trade finance platform covering the full Letter of Credit lifecycle across eight actor types and a marketplace.\n• Automated the entire 7-phase workflow (LC issuance, document compliance, freight coordination, port clearance, and settlement) using a LangGraph ReAct agent with Groq and OpenRouter LLMs, with zero manual intervention end to end.\n• Used smart contracts on Ethereum (Sepolia) for on-chain verification at each pipeline phase.\n• Used IPFS for tamper-proof trade document storage with a full audit trail.",
    techStack: ["LangGraph", "ReAct Agents", "Ethereum", "Solidity", "IPFS", "OpenRouter"],
    keySkills: ["Autonomous AI agents (LangGraph ReAct)", "Smart contract verification", "Decentralized storage (IPFS)", "Multi-party workflow automation"],
    category: "full-time" as const,
    role: "Full-Stack Developer",
    period: "2025",
    featured: false,
    order: 4,
    status: "live" as const,
  },
  {
    title: "GreenPoint — EV Fleet Management Platform",
    slug: "greenpoint",
    summary:
      "An EV fleet management platform with live MQTT telemetry, real-time route planning, and a full AWS production deployment.",
    description:
      "An EV fleet management platform built for Kottackal Business Solutions, with live telemetry and a full production deployment.\n\n• Built Driver and Fleet Manager portals using the MERN stack.\n• Integrated OpenRouteService for real-time route planning and dynamic rerouting to charging stations.\n• Implemented live vehicle telemetry via MQTT and geospatial proximity queries using MongoDB 2D Sphere indexing.\n• Configured a full AWS production environment: EC2, Nginx reverse proxy, PM2 process management, SSL/TLS, and security-group firewall rules.",
    techStack: ["MongoDB", "MQTT", "AWS EC2", "Nginx", "Express.js", "React.js"],
    keySkills: ["Real-time telemetry (MQTT)", "Geospatial queries (MongoDB 2dsphere)", "AWS production deployment", "Route optimization"],
    category: "full-time" as const,
    role: "Full-Stack Developer",
    period: "2025",
    featured: false,
    order: 5,
    status: "live" as const,
  },
  {
    title: "Secure MQTT Server",
    slug: "secure-mqtt-server",
    summary:
      "A microservice-based MQTT communication system ensuring confidentiality and reliability through PKI encryption and automated key rotation.",
    description:
      "A microservice-based MQTT communication system ensuring confidentiality and reliability through PKI encryption and automated key rotation.\n\n• Built a PKI-based MQTT system with RSA encryption and automated key rotation every 2 minutes.\n• Designed a microservice architecture with Node.js, Mosquitto, and Redis (BullMQ) for high reliability.\n• Implemented a dual-key fallback mechanism to prevent message loss during key rotation.\n• Integrated IPFS (Pinata) for decentralized key storage, ensuring tamper-proof certificate access.",
    techStack: ["Node.js", "Mosquitto", "Redis", "BullMQ", "RSA / PKI", "IPFS"],
    keySkills: ["PKI / RSA encryption", "Automated key rotation", "Microservice architecture", "Decentralized storage (IPFS)"],
    category: "personal" as const,
    role: "Full-Stack Developer",
    featured: true,
    order: 6,
    status: "live" as const,
  },
];

const skills = [
  // Frontend Development
  { name: "React.js", category: "Frontend Development", order: 1 },
  { name: "Next.js", category: "Frontend Development", order: 2 },
  { name: "Tailwind CSS", category: "Frontend Development", order: 3 },
  { name: "Material UI", category: "Frontend Development", order: 4 },
  { name: "React-Leaflet", category: "Frontend Development", order: 5 },
  { name: "Recharts", category: "Frontend Development", order: 6 },
  // Backend Development
  { name: "Node.js", category: "Backend Development", order: 1 },
  { name: "Express.js", category: "Backend Development", order: 2 },
  { name: "REST APIs", category: "Backend Development", order: 3 },
  { name: "Redis", category: "Backend Development", order: 4 },
  { name: "BullMQ", category: "Backend Development", order: 5 },
  { name: "Socket.IO", category: "Backend Development", order: 6 },
  // Real-Time Systems
  { name: "MQTT", category: "Real-Time Systems", order: 1 },
  { name: "Socket.IO", category: "Real-Time Systems", order: 2 },
  { name: "OCPP 1.6", category: "Real-Time Systems", order: 3 },
  { name: "AWS IoT Core", category: "Real-Time Systems", order: 4 },
  // Security & Cryptography
  { name: "JWT", category: "Security & Cryptography", order: 1 },
  { name: "PKI", category: "Security & Cryptography", order: 2 },
  { name: "RSA Encryption", category: "Security & Cryptography", order: 3 },
  { name: "Key Rotation", category: "Security & Cryptography", order: 4 },
  { name: "Zero-Knowledge Proofs", category: "Security & Cryptography", order: 5 },
  { name: "Bcrypt", category: "Security & Cryptography", order: 6 },
  // Databases
  { name: "MongoDB Atlas", category: "Databases", order: 1 },
  { name: "Neo4j", category: "Databases", order: 2 },
  { name: "Vector Search", category: "Databases", order: 3 },
  { name: "Geospatial Queries", category: "Databases", order: 4 },
  { name: "PostgreSQL", category: "Databases", order: 5 },
  // Cloud & DevOps
  { name: "AWS EC2", category: "Cloud & DevOps", order: 1 },
  { name: "AWS S3", category: "Cloud & DevOps", order: 2 },
  { name: "AWS IAM", category: "Cloud & DevOps", order: 3 },
  { name: "Nginx", category: "Cloud & DevOps", order: 4 },
  { name: "PM2", category: "Cloud & DevOps", order: 5 },
  { name: "SSL/TLS", category: "Cloud & DevOps", order: 6 },
  { name: "Vercel", category: "Cloud & DevOps", order: 7 },
  // AI & Agents
  { name: "LangGraph", category: "AI & Agents", order: 1 },
  { name: "ReAct Agents", category: "AI & Agents", order: 2 },
  { name: "OpenRouter", category: "AI & Agents", order: 3 },
  { name: "Vector Embeddings", category: "AI & Agents", order: 4 },
  { name: "Corti AI", category: "AI & Agents", order: 5 },
  // Blockchain
  { name: "Solidity", category: "Blockchain", order: 1 },
  { name: "Ethers.js", category: "Blockchain", order: 2 },
  { name: "ERC-721", category: "Blockchain", order: 3 },
  { name: "ZK Proofs", category: "Blockchain", order: 4 },
  { name: "IPFS", category: "Blockchain", order: 5 },
  { name: "Hardhat", category: "Blockchain", order: 6 },
] as const;

const experience = [
  {
    title: "Associate Consultant — Full-Stack Developer",
    company: "Kottackal Business Solutions",
    startDate: new Date("2025-03-01"),
    current: true,
    summary:
      "Designed and built three production systems: ZKIP-CLINICAL, a clinical decision support platform combining on-chain credentialing, a Neo4j graph of drug-disease-allergen relationships, and an AI risk-retrieval layer seeded across 300,000+ clinical records; TradeTrip, a trade-finance platform automating the full Letter of Credit lifecycle with a LangGraph ReAct agent and on-chain verification; and GreenPoint, an EV fleet management platform with live MQTT telemetry and a full AWS production deployment.",
    description:
      "ZKIP-CLINICAL — Clinical Decision Support Platform\n• Designed and built a full-stack clinical decision support system combining on-chain patient credentialing, a graph database of drug-disease-allergen relationships, and an AI risk retrieval layer seeded from RxNorm, MED-RT, PharmGKB, SNOMED CT, and ICD-10-CM across 300,000+ records.\n• Engineered a custom vector-based clinical memory service that retrieves patient risk profiles using semantic similarity search across pharmacological, therapeutic, and demographic signals.\n• Integrated Corti AI for clinical NLP: automated PDF-to-diagnosis coding, real-time drug contraindication detection, and guardrail enforcement.\n• Implemented zero-knowledge proof circuits for privacy-preserving identity and prescription verification, and ERC-721 smart contracts for tamper-proof on-chain credentialing.\n• Demonstrated interpretable AI behaviour: removing a single patient allergy record causally shifted the system's risk classification, proving traceable, auditable AI decisions.\n\nTradeTrip — Autonomous Trade Finance Platform\n• Built a multi-party trade finance platform covering the full Letter of Credit lifecycle across eight actor types and a marketplace.\n• Automated the entire 7-phase workflow (LC issuance, document compliance, freight coordination, port clearance, and settlement) using a LangGraph ReAct agent with Groq and OpenRouter LLMs, with zero manual intervention end to end.\n• Used smart contracts on Ethereum (Sepolia) for on-chain verification at each pipeline phase, and IPFS for tamper-proof trade document storage with a full audit trail.\n\nGreenPoint — EV Fleet Management Platform\n• Built Driver and Fleet Manager portals using the MERN stack; integrated OpenRouteService for real-time route planning and dynamic rerouting to charging stations.\n• Implemented live vehicle telemetry via MQTT and geospatial proximity queries using MongoDB 2D Sphere indexing.\n• Configured a full AWS production environment: EC2, Nginx reverse proxy, PM2 process management, SSL/TLS, and security-group firewall rules.",
    order: 1,
  },
  {
    title: "Associate Consultant Trainee",
    company: "Kottackal Business Solutions",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2025-03-01"),
    current: false,
    summary:
      "Built the EV Driver Portal, including interactive maps, OCPP 1.6 charging simulation, Razorpay payment integration, and real-time dashboards using Socket.IO and Recharts.",
    description:
      "• Built the EV Driver Portal, including interactive maps, OCPP 1.6 charging simulation, Razorpay payment integration, and real-time dashboards using Socket.IO and Recharts.",
    order: 2,
  },
];

async function seed() {
  await connectToDatabase();

  for (const project of projects) {
    // findOneAndReplace (not updateOne + $set) so stale fields from a
    // previous seed run don't linger on re-seed.
    await ProjectModel.findOneAndReplace(
      { slug: project.slug },
      project,
      { upsert: true }
    );
  }
  console.log(`Seeded ${projects.length} projects.`);

  for (const skill of skills) {
    await SkillModel.updateOne(
      { name: skill.name, category: skill.category },
      { $set: skill },
      { upsert: true }
    );
  }
  console.log(`Seeded ${skills.length} skills.`);

  for (const item of experience) {
    await ExperienceModel.findOneAndReplace(
      { title: item.title, company: item.company },
      item,
      { upsert: true }
    );
  }
  console.log(`Seeded ${experience.length} experience entries.`);

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
