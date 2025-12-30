export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  authorId: string;
  authorName?: string;
  featuredImage?: string;
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostFilters {
  status?: string;
  authorId?: string;
  search?: string;
}

