/**
 * Fallback content for the public site, used until MongoDB is configured
 * and seeded (`npm run seed`). Sourced from the real resume — not
 * generic placeholder copy — so the site never shows fake/lorem content,
 * even before the database is wired up.
 */

export type PlaceholderProject = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  keySkills?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: "full-time" | "personal";
  role?: string;
  period?: string;
  featured?: boolean;
};

export const PLACEHOLDER_PROJECTS: PlaceholderProject[] = [
  {
    slug: "learnspace-edtech",
    title: "LearnSpace — Edtech Platform",
    summary:
      "A private, invite-only course platform for coaching institutes, with multi-role dashboards, live sessions, and a per-course AI assistant.",
    description:
      "A full-stack private online course platform built for coaching institutes and independent educators, with invite-only access, multi-role dashboards, and a built-in AI course assistant. Live at howlfoxacademy.com.\n\n• Built four distinct portals (Admin, Teacher, Student, and a public storefront), each with role-specific dashboards and access control.\n• Built a per-course AI assistant grounded on uploaded PDFs and video transcripts, streamed token-by-token over SSE with a model fallback chain and strict guardrails against off-topic and restricted content.\n• Implemented a YouTube-based course player with auto-saved progress, per-video comments, and chapter navigation.\n• Built an admin enquiry inbox with real-time unread counts over SSE, plus full student, teacher, course, batch, attendance, and event management.\n• Covered the codebase with 340+ Jest tests across 29 suites and 50 Playwright end-to-end tests; access enforced at both the routing-middleware and API level.",
    techStack: ["Next.js 16", "TypeScript", "MongoDB Atlas", "Auth.js v5", "Cloudinary", "OpenRouter AI", "Tiptap", "Playwright"],
    keySkills: ["Role-based access control", "Server-Sent Events (SSE)", "AI-grounded chat with guardrails", "Automated testing (Jest + Playwright)", "Payment & subscription tracking"],
    liveUrl: "https://howlfoxacademy.com",
    githubUrl: "https://github.com/Abhinav-Mathew-Kurian/learnspace-v01",
    category: "personal",
    period: "2026",
  },
  {
    slug: "sell-kerala",
    title: "Sell Kerala — Real Estate Platform",
    summary:
      "A real estate marketplace covering all 14 districts of Kerala, with AI-powered natural-language search.",
    description:
      "Kerala's premier real estate marketplace: buy, sell, rent, and lease property across all 14 districts, with AI-powered natural-language search and hand-illustrated district artwork. Live at sellkerala.com.\n\n• Built an AI search that parses plain-language queries like \"2 BHK flat in Kochi under 50 lakhs near hospital\" into structured filters via OpenAI.\n• Built listing pages combining an image gallery, an interactive Leaflet map, nearby-places lookup via the Overpass API, and a WhatsApp/call enquiry bar.\n• Built an admin panel for the full listing lifecycle (draft, published, sold, archived), plus AI-assisted description generation and a leads inbox.\n• Implemented SEO as a first-class feature: JSON-LD structured data, dynamic per-filter metadata, and an auto-generated sitemap covering every district, type, and listing.",
    techStack: ["Next.js 16", "TypeScript", "MongoDB", "NextAuth v5", "Cloudinary", "Leaflet", "OpenAI", "Framer Motion"],
    keySkills: ["AI-powered search", "Geospatial mapping (Leaflet)", "SEO architecture (JSON-LD, dynamic metadata)", "Admin content lifecycle management"],
    liveUrl: "https://sellkerala.com",
    category: "personal",
    period: "2026",
  },
  {
    slug: "zkip-clinical",
    title: "ZKIP-CLINICAL — Clinical Decision Support Platform",
    summary:
      "A clinical decision support platform combining on-chain credentialing, a graph database of drug-disease-allergen relationships, and an AI risk-retrieval layer.",
    description:
      "A clinical decision support platform built for Kottackal Business Solutions, combining on-chain patient credentialing, a graph database of clinical relationships, and an AI risk-retrieval layer.\n\n• Combined on-chain patient credentialing with a Neo4j graph of drug-disease-allergen relationships and an AI risk-retrieval layer seeded from RxNorm, MED-RT, PharmGKB, SNOMED CT, and ICD-10-CM across 300,000+ records.\n• Engineered a custom vector-based clinical memory service that retrieves patient risk profiles using semantic similarity search across pharmacological, therapeutic, and demographic signals.\n• Integrated Corti AI for clinical NLP: automated PDF-to-diagnosis coding, real-time drug contraindication detection, and guardrail enforcement.\n• Implemented zero-knowledge proof circuits for privacy-preserving identity and prescription verification, and ERC-721 smart contracts for tamper-proof on-chain credentialing.\n• Demonstrated interpretable AI behaviour: removing a single patient allergy record causally shifted the system's risk classification, proving traceable, auditable AI decisions.",
    techStack: ["Neo4j", "Zero-Knowledge Proofs", "ERC-721", "Vector Search", "Corti AI", "Node.js"],
    keySkills: ["Graph databases (Neo4j)", "Zero-knowledge proofs", "Vector / semantic search", "Clinical NLP integration", "On-chain credentialing (ERC-721)"],
    category: "full-time",
    period: "2025",
    featured: false,
  },
  {
    slug: "tradetrip",
    title: "TradeTrip — Autonomous Trade Finance Platform",
    summary:
      "A trade-finance platform automating the full Letter of Credit lifecycle with an AI agent and on-chain verification.",
    description:
      "A multi-party trade finance platform built for Kottackal Business Solutions, automating the full Letter of Credit lifecycle end to end.\n\n• Built a multi-party trade finance platform covering the full Letter of Credit lifecycle across eight actor types and a marketplace.\n• Automated the entire 7-phase workflow (LC issuance, document compliance, freight coordination, port clearance, and settlement) using a LangGraph ReAct agent with Groq and OpenRouter LLMs, with zero manual intervention end to end.\n• Used smart contracts on Ethereum (Sepolia) for on-chain verification at each pipeline phase.\n• Used IPFS for tamper-proof trade document storage with a full audit trail.",
    techStack: ["LangGraph", "ReAct Agents", "Ethereum", "Solidity", "IPFS", "OpenRouter"],
    keySkills: ["Autonomous AI agents (LangGraph ReAct)", "Smart contract verification", "Decentralized storage (IPFS)", "Multi-party workflow automation"],
    category: "full-time",
    period: "2025",
    featured: false,
  },
  {
    slug: "greenpoint",
    title: "GreenPoint — EV Fleet Management Platform",
    summary:
      "An EV fleet management platform with live MQTT telemetry, real-time route planning, and a full AWS production deployment.",
    description:
      "An EV fleet management platform built for Kottackal Business Solutions, with live telemetry and a full production deployment.\n\n• Built Driver and Fleet Manager portals using the MERN stack.\n• Integrated OpenRouteService for real-time route planning and dynamic rerouting to charging stations.\n• Implemented live vehicle telemetry via MQTT and geospatial proximity queries using MongoDB 2D Sphere indexing.\n• Configured a full AWS production environment: EC2, Nginx reverse proxy, PM2 process management, SSL/TLS, and security-group firewall rules.",
    techStack: ["MongoDB", "MQTT", "AWS EC2", "Nginx", "Express.js", "React.js"],
    keySkills: ["Real-time telemetry (MQTT)", "Geospatial queries (MongoDB 2dsphere)", "AWS production deployment", "Route optimization"],
    category: "full-time",
    period: "2025",
    featured: false,
  },
  {
    slug: "secure-mqtt-server",
    title: "Secure MQTT Server",
    summary:
      "A microservice-based MQTT communication system ensuring confidentiality and reliability through PKI encryption and automated key rotation every 2 minutes.",
    description:
      "A microservice-based MQTT communication system ensuring confidentiality and reliability through PKI encryption and automated key rotation.\n\n• Built a PKI-based MQTT system with RSA encryption and automated key rotation every 2 minutes.\n• Designed a microservice architecture with Node.js, Mosquitto, and Redis (BullMQ) for high reliability.\n• Implemented a dual-key fallback mechanism to prevent message loss during key rotation.\n• Integrated IPFS (Pinata) for decentralized key storage, ensuring tamper-proof certificate access.",
    techStack: ["Node.js", "Mosquitto", "Redis", "BullMQ", "RSA / PKI", "IPFS"],
    keySkills: ["PKI / RSA encryption", "Automated key rotation", "Microservice architecture", "Decentralized storage (IPFS)"],
  },
];

export const PLACEHOLDER_SKILLS: Record<string, string[]> = {
  "Frontend Development": [
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Material UI",
    "React-Leaflet",
    "Recharts",
  ],
  "Backend Development": [
    "Node.js",
    "Express.js",
    "REST APIs",
    "Redis",
    "BullMQ",
    "Socket.IO",
  ],
  "Real-Time Systems": ["MQTT", "Socket.IO", "OCPP 1.6", "AWS IoT Core"],
  "Security & Cryptography": [
    "JWT",
    "PKI",
    "RSA Encryption",
    "Key Rotation",
    "Zero-Knowledge Proofs",
    "Bcrypt",
  ],
  Databases: [
    "MongoDB Atlas",
    "Neo4j",
    "Vector Search",
    "Geospatial Queries",
    "PostgreSQL",
  ],
  "Cloud & DevOps": [
    "AWS EC2",
    "AWS S3",
    "AWS IAM",
    "Nginx",
    "PM2",
    "SSL/TLS",
    "Vercel",
  ],
  "AI & Agents": [
    "LangGraph",
    "ReAct Agents",
    "OpenRouter",
    "Vector Embeddings",
    "Corti AI",
  ],
  Blockchain: ["Solidity", "Ethers.js", "ERC-721", "ZK Proofs", "IPFS", "Hardhat"],
};

export type PlaceholderExperience = {
  title: string;
  org: string;
  period: string;
  current?: boolean;
  /** Short version, shown on the homepage timeline. */
  summary: string;
  /** Full bullet-point detail, shown on the About page's CV section. */
  description: string;
};

export const PLACEHOLDER_EXPERIENCE: PlaceholderExperience[] = [
  {
    title: "Associate Consultant — Full-Stack Developer",
    org: "Kottackal Business Solutions",
    period: "Mar 2025 – Present",
    current: true,
    summary:
      "Designed and built three production systems: ZKIP-CLINICAL, a clinical decision support platform combining on-chain credentialing, a Neo4j graph of drug-disease-allergen relationships, and an AI risk-retrieval layer seeded across 300,000+ clinical records; TradeTrip, a trade-finance platform automating the full Letter of Credit lifecycle with a LangGraph ReAct agent and on-chain verification; and GreenPoint, an EV fleet management platform with live MQTT telemetry and a full AWS production deployment.",
    description:
      "ZKIP-CLINICAL — Clinical Decision Support Platform\n• Designed and built a full-stack clinical decision support system combining on-chain patient credentialing, a graph database of drug-disease-allergen relationships, and an AI risk retrieval layer seeded from RxNorm, MED-RT, PharmGKB, SNOMED CT, and ICD-10-CM across 300,000+ records.\n• Engineered a custom vector-based clinical memory service that retrieves patient risk profiles using semantic similarity search across pharmacological, therapeutic, and demographic signals.\n• Integrated Corti AI for clinical NLP: automated PDF-to-diagnosis coding, real-time drug contraindication detection, and guardrail enforcement.\n• Implemented zero-knowledge proof circuits for privacy-preserving identity and prescription verification, and ERC-721 smart contracts for tamper-proof on-chain credentialing.\n• Demonstrated interpretable AI behaviour: removing a single patient allergy record causally shifted the system's risk classification, proving traceable, auditable AI decisions.\n\nTradeTrip — Autonomous Trade Finance Platform\n• Built a multi-party trade finance platform covering the full Letter of Credit lifecycle across eight actor types and a marketplace.\n• Automated the entire 7-phase workflow (LC issuance, document compliance, freight coordination, port clearance, and settlement) using a LangGraph ReAct agent with Groq and OpenRouter LLMs, with zero manual intervention end to end.\n• Used smart contracts on Ethereum (Sepolia) for on-chain verification at each pipeline phase, and IPFS for tamper-proof trade document storage with a full audit trail.\n\nGreenPoint — EV Fleet Management Platform\n• Built Driver and Fleet Manager portals using the MERN stack; integrated OpenRouteService for real-time route planning and dynamic rerouting to charging stations.\n• Implemented live vehicle telemetry via MQTT and geospatial proximity queries using MongoDB 2D Sphere indexing.\n• Configured a full AWS production environment: EC2, Nginx reverse proxy, PM2 process management, SSL/TLS, and security-group firewall rules.",
  },
  {
    title: "Associate Consultant Trainee",
    org: "Kottackal Business Solutions",
    period: "Sep 2024 – Mar 2025",
    summary:
      "Built the EV Driver Portal, including interactive maps, OCPP 1.6 charging simulation, Razorpay payment integration, and real-time dashboards using Socket.IO and Recharts.",
    description:
      "• Built the EV Driver Portal, including interactive maps, OCPP 1.6 charging simulation, Razorpay payment integration, and real-time dashboards using Socket.IO and Recharts.",
  },
];
