import {
  NotFoundIcon,
  CodeIcon,
  FinanceIcon,
  StudyIcon,
  SocialIcon,
  GithubIcon,
  ExamIcon,
  ArtificialIntelligenceIcon,
  ResearchIcon,
  DesignIcon,
  OthersIcon,
  GlobeIcon,
  LockIcon,
  BookTextIcon,
  BrowserIcon,
  SettingsIcon,
  UserIcon,
  IdCardIcon,
} from "@repo/icons";

const categoryIconMap: Record<string, typeof NotFoundIcon> = {
  // Core originals
  Development: CodeIcon, Finance: FinanceIcon, Study: StudyIcon, Social: SocialIcon,
  GitHub: GithubIcon, Exams: ExamIcon, AI: ArtificialIntelligenceIcon,
  Research: ResearchIcon, Design: DesignIcon, Others: OthersIcon,

  // Dev – architecture & patterns
  DevOps: SettingsIcon, Security: LockIcon, Cloud: GlobeIcon, Mobile: BrowserIcon,
  Backend: CodeIcon, Frontend: DesignIcon, DatabaseCategory: CodeIcon, Networking: GlobeIcon,
  OpenSource: GithubIcon, Interview: StudyIcon, WebDevelopment: CodeIcon,
  SoftwareArchitecture: CodeIcon, SystemDesign: CodeIcon, DistributedSystems: CodeIcon,
  DesignPatterns: CodeIcon, FunctionalProgramming: CodeIcon, ObjectOrientedProgramming: CodeIcon,
  Algorithms: ResearchIcon, DataStructures: ResearchIcon, OperatingSystems: SettingsIcon,
  CompilerDesign: CodeIcon, ComputerGraphics: DesignIcon, ComputerNetworks: GlobeIcon,
  ComputerVision: ArtificialIntelligenceIcon, Testing: SettingsIcon, UnitTesting: SettingsIcon,
  IntegrationTesting: SettingsIcon, E2ETesting: SettingsIcon, TDD: SettingsIcon,
  BDD: SettingsIcon, CodeReview: GithubIcon, CodeQuality: SettingsIcon, Linting: SettingsIcon,
  Debugging: SettingsIcon, Containerization: SettingsIcon, Orchestration: SettingsIcon,
  Infrastructure: SettingsIcon, Authentication: LockIcon, Authorization: LockIcon,
  Encryption: LockIcon, REST: CodeIcon, GraphQL: CodeIcon, gRPC: CodeIcon, tRPC: CodeIcon,
  WebSockets: GlobeIcon, HTTP: GlobeIcon, Microservices: CodeIcon, Monolith: CodeIcon,
  Serverless: GlobeIcon, EdgeComputing: GlobeIcon, EventDriven: CodeIcon, CQRS: CodeIcon,
  DDD: CodeIcon, CleanArchitecture: CodeIcon, HexagonalArchitecture: CodeIcon,
  Performance: SettingsIcon, Optimization: SettingsIcon, Accessibility: UserIcon,
  SEO: GlobeIcon, PWA: BrowserIcon, WebAssembly: CodeIcon, APIDesign: CodeIcon,

  // Programming languages
  Python: CodeIcon, JavaScript: CodeIcon, TypeScript: CodeIcon, Rust: CodeIcon,
  Go: CodeIcon, Java: CodeIcon, C: CodeIcon, CPlusPlus: CodeIcon, CSharp: CodeIcon,
  Ruby: CodeIcon, PHP: CodeIcon, Swift: CodeIcon, Kotlin: CodeIcon, Scala: CodeIcon,
  Haskell: CodeIcon, Erlang: CodeIcon, Clojure: CodeIcon, Elixir: CodeIcon,
  R: ResearchIcon, MATLAB: ResearchIcon, Julia: ResearchIcon, Dart: CodeIcon,
  Lua: CodeIcon, Perl: CodeIcon, Bash: SettingsIcon, PowerShell: SettingsIcon,
  SQL: CodeIcon, Assembly: CodeIcon, Solidity: FinanceIcon, Zig: CodeIcon, Nim: CodeIcon,

  // Frameworks – frontend
  React: CodeIcon, Vue: CodeIcon, Angular: CodeIcon, Svelte: CodeIcon, NextJS: CodeIcon,
  NuxtJS: CodeIcon, Remix: CodeIcon, Gatsby: CodeIcon, Astro: CodeIcon, SvelteKit: CodeIcon,
  Qwik: CodeIcon, SolidJS: CodeIcon, HTMX: CodeIcon, Alpine: CodeIcon,

  // Frameworks – backend
  Express: CodeIcon, Fastify: CodeIcon, NestJS: CodeIcon, Django: CodeIcon,
  FastAPI: CodeIcon, Flask: CodeIcon, Rails: CodeIcon, Laravel: CodeIcon,
  Spring: CodeIcon, Phoenix: CodeIcon, Hono: CodeIcon, AdonisJS: CodeIcon,

  // Databases (use unique keys — "Database" as a general topic)
  Database: CodeIcon,
  PostgreSQL: CodeIcon, MySQL: CodeIcon, SQLite: CodeIcon, MongoDB: CodeIcon,
  Redis: CodeIcon, Cassandra: CodeIcon, DynamoDB: CodeIcon, Firestore: CodeIcon,
  Supabase: CodeIcon, Elasticsearch: CodeIcon, Neo4j: CodeIcon,
  Pinecone: ArtificialIntelligenceIcon, Weaviate: ArtificialIntelligenceIcon,
  Chroma: ArtificialIntelligenceIcon, Qdrant: ArtificialIntelligenceIcon,
  Prisma: CodeIcon, DrizzleORM: CodeIcon, TypeORM: CodeIcon,

  // Cloud providers
  AWS: GlobeIcon, GCP: GlobeIcon, Azure: GlobeIcon, Vercel: GlobeIcon,
  Netlify: GlobeIcon, Cloudflare: GlobeIcon, DigitalOcean: GlobeIcon,
  Hetzner: GlobeIcon, FlyIO: GlobeIcon, Railway: GlobeIcon,

  // DevOps tools
  Docker: SettingsIcon, Kubernetes: SettingsIcon, Terraform: SettingsIcon,
  Ansible: SettingsIcon, Helm: SettingsIcon, Prometheus: SettingsIcon,
  Grafana: SettingsIcon, Jenkins: SettingsIcon, GitHubActions: GithubIcon,
  GitLabCI: GithubIcon, ArgoCD: SettingsIcon, Monitoring: SettingsIcon,
  Logging: SettingsIcon, Observability: SettingsIcon, SRE: SettingsIcon,

  // AI / ML
  MachineLearning: ArtificialIntelligenceIcon, DeepLearning: ArtificialIntelligenceIcon,
  NLP: ArtificialIntelligenceIcon, GenerativeAI: ArtificialIntelligenceIcon,
  LLMs: ArtificialIntelligenceIcon, Transformers: ArtificialIntelligenceIcon,
  ReinforcementLearning: ArtificialIntelligenceIcon, DataScience: ResearchIcon,
  MLOps: SettingsIcon, NeuralNetworks: ArtificialIntelligenceIcon,
  GAN: ArtificialIntelligenceIcon, Diffusion: ArtificialIntelligenceIcon,
  Embeddings: ArtificialIntelligenceIcon, VectorSearch: ArtificialIntelligenceIcon,
  RAG: ArtificialIntelligenceIcon, AIAgents: ArtificialIntelligenceIcon,
  PromptEngineering: ArtificialIntelligenceIcon, OpenAI: ArtificialIntelligenceIcon,
  Anthropic: ArtificialIntelligenceIcon, HuggingFace: ArtificialIntelligenceIcon,
  LangChain: ArtificialIntelligenceIcon, LlamaIndex: ArtificialIntelligenceIcon,

  // Data engineering & analytics
  DataEngineering: CodeIcon, DataAnalysis: ResearchIcon, DataVisualization: DesignIcon,
  BusinessIntelligence: FinanceIcon, ETL: CodeIcon, DataWarehouse: CodeIcon,
  DataLake: CodeIcon, Spark: CodeIcon, Kafka: CodeIcon, Airflow: CodeIcon,
  Snowflake: CodeIcon, BigQuery: CodeIcon, Tableau: DesignIcon, PowerBI: DesignIcon,
  Pandas: CodeIcon, NumPy: CodeIcon, TensorFlow: ArtificialIntelligenceIcon,
  PyTorch: ArtificialIntelligenceIcon, ScikitLearn: ArtificialIntelligenceIcon,

  // Security
  Cybersecurity: LockIcon, Pentesting: LockIcon, CTF: LockIcon, Cryptography: LockIcon,
  ZeroTrust: LockIcon, IAM: LockIcon, SAST: LockIcon, DAST: LockIcon,
  BugBounty: LockIcon, MalwareAnalysis: LockIcon, Forensics: LockIcon,
  NetworkSecurity: LockIcon, AppSecurity: LockIcon, CloudSecurity: LockIcon,
  OWASP: LockIcon, SecOps: LockIcon, ThreatModeling: LockIcon, OSINT: LockIcon,

  // Blockchain / Web3
  Blockchain: FinanceIcon, Web3: FinanceIcon, Crypto: FinanceIcon, DeFi: FinanceIcon,
  NFT: FinanceIcon, SmartContracts: CodeIcon, Ethereum: FinanceIcon, Solana: FinanceIcon,
  Bitcoin: FinanceIcon, ZKProofs: LockIcon, DAOs: FinanceIcon, Tokenomics: FinanceIcon,

  // Mobile / Desktop
  iOS: BrowserIcon, Android: BrowserIcon, Flutter: BrowserIcon,
  ReactNative: BrowserIcon, SwiftUI: BrowserIcon, JetpackCompose: BrowserIcon,
  Desktop: BrowserIcon, Electron: BrowserIcon, Tauri: BrowserIcon,

  // Design & creative
  UIDesign: DesignIcon, UXDesign: DesignIcon, GraphicDesign: DesignIcon,
  MotionDesign: DesignIcon, BrandDesign: DesignIcon, Typography: DesignIcon,
  ColorTheory: DesignIcon, Figma: DesignIcon, Webflow: DesignIcon, Framer: DesignIcon,
  Canva: DesignIcon, Midjourney: ArtificialIntelligenceIcon, Photography: DesignIcon,
  VideoEditing: DesignIcon, Animation: DesignIcon, Blender: DesignIcon,
  Illustrator: DesignIcon, Photoshop: DesignIcon,

  // Writing & content
  Writing: BookTextIcon, Blogging: BookTextIcon, TechnicalWriting: BookTextIcon, Copywriting: BookTextIcon,
  Journalism: BookTextIcon, Storytelling: BookTextIcon, Documentation: BookTextIcon,
  ContentCreation: BookTextIcon, Newsletter: BookTextIcon,

  // Education
  OnlineCourses: StudyIcon, Tutorials: StudyIcon, Bootcamp: StudyIcon,
  Certifications: ExamIcon, MOOC: StudyIcon, Leetcode: CodeIcon,
  CodingChallenges: CodeIcon, FlashCards: StudyIcon,

  // Science & math
  Mathematics: ResearchIcon, Calculus: ResearchIcon, LinearAlgebra: ResearchIcon,
  Probability: ResearchIcon, Statistics: ResearchIcon, DiscreteMath: ResearchIcon,
  Science: ResearchIcon, Physics: ResearchIcon, Chemistry: ResearchIcon,
  Biology: ResearchIcon, Neuroscience: ResearchIcon, Astronomy: ResearchIcon,
  QuantumPhysics: ResearchIcon, Biotech: ResearchIcon, SpaceExploration: GlobeIcon,

  // Humanities / social sciences
  Psychology: UserIcon, Sociology: UserIcon, Philosophy: BookTextIcon, History: BookTextIcon,
  Economics: FinanceIcon, Ethics: BookTextIcon, CognitiveScience: ResearchIcon,

  // Business & career
  Career: IdCardIcon, JobSearch: IdCardIcon, Freelancing: IdCardIcon,
  Entrepreneurship: IdCardIcon, Startup: IdCardIcon,
  ProductManagement: IdCardIcon, ProjectManagement: IdCardIcon,
  Agile: SettingsIcon, Scrum: SettingsIcon, Leadership: UserIcon, Management: UserIcon,

  // Marketing & finance
  Marketing: GlobeIcon, DigitalMarketing: GlobeIcon, ContentMarketing: BookTextIcon,
  GrowthHacking: SettingsIcon, Branding: DesignIcon,
  PersonalFinance: FinanceIcon, Budgeting: FinanceIcon, Investing: FinanceIcon,
  StockMarket: FinanceIcon, RealEstate: FinanceIcon, FinancialPlanning: FinanceIcon,
  Accounting: FinanceIcon, FinTech: FinanceIcon, VentureCapital: FinanceIcon,

  // Health, sports & entertainment
  Health: UserIcon, Fitness: UserIcon, Nutrition: UserIcon, MentalHealth: UserIcon,
  Meditation: UserIcon, Yoga: UserIcon, Running: UserIcon, Weightlifting: UserIcon,
  Gaming: OthersIcon, IndieGames: OthersIcon, GameDesign: DesignIcon,
  Unity: CodeIcon, UnrealEngine: CodeIcon, Godot: CodeIcon,
  Entertainment: OthersIcon, Movies: OthersIcon, TVShows: OthersIcon,
  Anime: OthersIcon, Manga: OthersIcon, Comics: OthersIcon, Podcasts: OthersIcon,
  Music: OthersIcon, Books: BookTextIcon, Fiction: BookTextIcon, NonFiction: BookTextIcon,
  SciFi: BookTextIcon, SelfHelp: BookTextIcon, Audiobooks: BookTextIcon,

  // Travel & lifestyle
  Travel: GlobeIcon, DigitalNomad: GlobeIcon, Food: UserIcon, Cooking: UserIcon,
  Productivity: SettingsIcon, Tools: SettingsIcon, Automation: SettingsIcon,
  NoCode: SettingsIcon, LowCode: SettingsIcon, Notion: BookTextIcon, Obsidian: BookTextIcon,

  // Community & social platforms
  Community: SocialIcon, Hackathons: CodeIcon, Meetups: SocialIcon,
  Twitter: SocialIcon, LinkedIn: SocialIcon, Reddit: SocialIcon,
  HackerNews: SocialIcon, ProductHunt: SocialIcon,
  Git: GithubIcon, GitLab: GithubIcon,

  // Misc
  Reference: BookTextIcon, Resources: BookTextIcon, Cheatsheets: BookTextIcon,
  News: GlobeIcon, CaseStudies: ResearchIcon, BestPractices: BookTextIcon,
  Tips: BookTextIcon, Bookmarks: OthersIcon,
};

export function MapCategoryWithIcon(category: string): typeof NotFoundIcon {
  return categoryIconMap[category] ?? OthersIcon;
}
