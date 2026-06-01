export const CATEGORIES = [
  // Original core
  "Development", "Finance", "Study", "Social", "GitHub", "Exams", "AI", "Research", "Design", "Others",
  // Dev – architecture & patterns
  "DevOps", "Security", "Cloud", "Mobile", "Backend", "Frontend", "Database", "Networking",
  "OpenSource", "Interview", "WebDevelopment", "SoftwareArchitecture", "SystemDesign",
  "DistributedSystems", "DesignPatterns", "FunctionalProgramming", "ObjectOrientedProgramming",
  "Algorithms", "DataStructures", "OperatingSystems", "CompilerDesign", "ComputerGraphics",
  "ComputerNetworks", "ComputerVision", "Testing", "UnitTesting", "IntegrationTesting",
  "E2ETesting", "TDD", "BDD", "CodeReview", "CodeQuality", "Linting", "Debugging",
  "Containerization", "Orchestration", "Infrastructure", "Authentication", "Authorization",
  "Encryption", "REST", "GraphQL", "gRPC", "tRPC", "WebSockets", "HTTP", "Microservices",
  "Monolith", "Serverless", "EdgeComputing", "EventDriven", "CQRS", "DDD", "CleanArchitecture",
  "HexagonalArchitecture", "Performance", "Optimization", "Accessibility", "SEO", "PWA",
  "WebAssembly", "APIDesign",
  // Programming languages
  "Python", "JavaScript", "TypeScript", "Rust", "Go", "Java", "C", "CPlusPlus", "CSharp",
  "Ruby", "PHP", "Swift", "Kotlin", "Scala", "Haskell", "Erlang", "Clojure", "Elixir",
  "R", "MATLAB", "Julia", "Dart", "Lua", "Perl", "Bash", "PowerShell", "SQL", "Assembly",
  "Solidity", "Zig", "Nim",
  // Frameworks – frontend
  "React", "Vue", "Angular", "Svelte", "NextJS", "NuxtJS", "Remix", "Gatsby", "Astro",
  "SvelteKit", "Qwik", "SolidJS", "HTMX", "Alpine",
  // Frameworks – backend
  "Express", "Fastify", "NestJS", "Django", "FastAPI", "Flask", "Rails", "Laravel",
  "Spring", "Phoenix", "Hono", "AdonisJS",
  // Databases
  "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Cassandra", "DynamoDB", "Firestore",
  "Supabase", "Elasticsearch", "Neo4j", "Pinecone", "Weaviate", "Chroma", "Qdrant",
  "Prisma", "DrizzleORM", "TypeORM",
  // Cloud providers
  "AWS", "GCP", "Azure", "Vercel", "Netlify", "Cloudflare", "DigitalOcean", "Hetzner",
  "FlyIO", "Railway",
  // DevOps tools
  "Docker", "Kubernetes", "Terraform", "Ansible", "Helm", "Prometheus", "Grafana",
  "Jenkins", "GitHubActions", "GitLabCI", "ArgoCD", "Monitoring", "Logging", "Observability", "SRE",
  // AI / ML
  "MachineLearning", "DeepLearning", "NLP", "GenerativeAI", "LLMs", "Transformers",
  "ReinforcementLearning", "DataScience", "MLOps", "NeuralNetworks", "GAN", "Diffusion",
  "Embeddings", "VectorSearch", "RAG", "AIAgents", "PromptEngineering", "OpenAI",
  "Anthropic", "HuggingFace", "LangChain", "LlamaIndex",
  // Data engineering & analytics
  "DataEngineering", "DataAnalysis", "DataVisualization", "BusinessIntelligence", "ETL",
  "DataWarehouse", "DataLake", "Spark", "Kafka", "Airflow", "Snowflake", "BigQuery",
  "Tableau", "PowerBI", "Pandas", "NumPy", "TensorFlow", "PyTorch", "ScikitLearn",
  // Cybersecurity
  "Cybersecurity", "Pentesting", "CTF", "Cryptography", "ZeroTrust", "IAM", "SAST",
  "DAST", "BugBounty", "MalwareAnalysis", "Forensics", "NetworkSecurity", "AppSecurity",
  "CloudSecurity", "OWASP", "SecOps", "ThreatModeling", "OSINT",
  // Blockchain / Web3
  "Blockchain", "Web3", "Crypto", "DeFi", "NFT", "SmartContracts", "Ethereum", "Solana",
  "Bitcoin", "ZKProofs", "DAOs", "Tokenomics",
  // Mobile / Desktop
  "iOS", "Android", "Flutter", "ReactNative", "SwiftUI", "JetpackCompose", "Desktop",
  "Electron", "Tauri",
  // Design & creative
  "UIDesign", "UXDesign", "GraphicDesign", "MotionDesign", "BrandDesign", "Typography",
  "ColorTheory", "Figma", "Webflow", "Framer", "Canva", "Midjourney", "Photography",
  "VideoEditing", "Animation", "Blender", "Illustrator", "Photoshop",
  // Writing & content
  "Writing", "Blogging", "TechnicalWriting", "Copywriting", "Journalism", "Storytelling",
  "Documentation", "ContentCreation", "Newsletter",
  // Education
  "OnlineCourses", "Tutorials", "Bootcamp", "Certifications", "MOOC", "Leetcode",
  "CodingChallenges", "FlashCards",
  // Science & math
  "Mathematics", "Calculus", "LinearAlgebra", "Probability", "Statistics", "DiscreteMath",
  "Science", "Physics", "Chemistry", "Biology", "Neuroscience", "Astronomy",
  "QuantumPhysics", "Biotech", "SpaceExploration",
  // Humanities / social sciences
  "Psychology", "Sociology", "Philosophy", "History", "Economics", "Ethics", "CognitiveScience",
  // Business & career
  "Career", "JobSearch", "Freelancing", "Entrepreneurship", "Startup", "ProductManagement",
  "ProjectManagement", "Agile", "Scrum", "Leadership", "Management",
  // Marketing & finance
  "Marketing", "DigitalMarketing", "ContentMarketing", "GrowthHacking", "Branding",
  "PersonalFinance", "Budgeting", "Investing", "StockMarket", "RealEstate",
  "FinancialPlanning", "Accounting", "FinTech", "VentureCapital",
  // Health, sports & entertainment
  "Health", "Fitness", "Nutrition", "MentalHealth", "Meditation", "Yoga", "Running",
  "Weightlifting", "Gaming", "IndieGames", "GameDesign", "Unity", "UnrealEngine", "Godot",
  "Entertainment", "Movies", "TVShows", "Anime", "Manga", "Comics", "Podcasts",
  "Music", "Books", "Fiction", "NonFiction", "SciFi", "SelfHelp", "Audiobooks",
  // Travel & lifestyle
  "Travel", "DigitalNomad", "Food", "Cooking", "Productivity", "Tools", "Automation",
  "NoCode", "LowCode", "Notion", "Obsidian",
  // Community & social platforms
  "Community", "Hackathons", "Meetups", "Twitter", "LinkedIn", "Reddit",
  "HackerNews", "ProductHunt", "Git", "GitLab",
  // Misc
  "Reference", "Resources", "Cheatsheets", "News", "CaseStudies", "BestPractices",
  "Tips", "Bookmarks",
] as const;

export type CategoryType = (typeof CATEGORIES)[number];
