export type ContentCategory =
  | "repo"
  | "verdict"
  | "workflow"
  | "stack"
  | "article";

export type Difficulty = "pemula" | "menengah" | "lanjut";

export interface VerdictCriteria {
  kemudahanPenggunaan: number;
  biaya: number;
  manfaatPraktis: number;
  stabilitas: number;
  cocokUntukPemula: number;
}

export interface VerdictConclusion {
  cocokUntuk: string[];
  tidakCocokUntuk: string[];
  alternatif: string[];
  rekomendasiAkhir: string;
}

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface BaseContent {
  slug: string;
  title: string;
  description: string;
  category: ContentCategory;
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  relatedContent: string[];
  featured: boolean;
  difficulty: Difficulty;
}

export interface RepoContent extends BaseContent {
  category: "repo";
  githubUrl: string;
  stars: number;
  language: string;
  license: string;
  lastCommit: string;
}

export interface VerdictContent extends BaseContent {
  category: "verdict";
  verdictScore: number;
  criteria: VerdictCriteria;
  conclusion: VerdictConclusion;
  pricing: string;
}

export interface WorkflowContent extends BaseContent {
  category: "workflow";
  steps: string[];
  tools: string[];
  estimatedTime: string;
  useCase: string;
}

export interface StackContent extends BaseContent {
  category: "stack";
  tools: { name: string; role: string; cost: string }[];
  totalMonthlyCost: string;
  bestFor: string;
}

export interface ArticleContent extends BaseContent {
  category: "article";
  readTime: string;
  excerpt: string;
}

export type ContentItem =
  | RepoContent
  | VerdictContent
  | WorkflowContent
  | StackContent
  | ArticleContent;

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: ContentCategory;
  href: string;
}
