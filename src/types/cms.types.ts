export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface CMSPageFilters {
  status?: string;
  search?: string;
}

