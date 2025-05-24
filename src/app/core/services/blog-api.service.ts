import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService, ApiResponse } from './http-client.service';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  publishedAt?: string;
  scheduledAt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  readingTime: number;
  viewCount: number;
  isCommentEnabled: boolean;
  isFeatured: boolean;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
  url?: string;
  formattedPublishDate?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  featured?: boolean;
  search?: string;
}

export interface BlogListResponse {
  blogs: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  constructor(private httpClient: HttpClientService) {}

  /**
   * Get all published blog posts
   */
  getBlogs(filters: BlogFilters = {}): Observable<ApiResponse<BlogListResponse>> {
    return this.httpClient.get<BlogListResponse>('/blog', filters);
  }

  /**
   * Get blog post by slug
   */
  getBlogBySlug(slug: string): Observable<ApiResponse<BlogPost>> {
    return this.httpClient.get<BlogPost>(`/blog/${slug}`);
  }

  /**
   * Get blog categories
   */
  getBlogCategories(): Observable<ApiResponse<BlogCategory[]>> {
    return this.httpClient.get<BlogCategory[]>('/blog/categories');
  }

  /**
   * Get featured blog posts
   */
  getFeaturedBlogs(limit: number = 5): Observable<ApiResponse<BlogPost[]>> {
    return this.httpClient.get<BlogPost[]>('/blog/featured', { limit });
  }

  /**
   * Search blog posts
   */
  searchBlogs(query: string, filters: BlogFilters = {}): Observable<ApiResponse<BlogListResponse>> {
    return this.httpClient.get<BlogListResponse>('/blog', { ...filters, search: query });
  }

  /**
   * Get blogs by category
   */
  getBlogsByCategory(category: string, filters: BlogFilters = {}): Observable<ApiResponse<BlogListResponse>> {
    return this.httpClient.get<BlogListResponse>('/blog', { ...filters, category });
  }

  /**
   * Get blogs by tag
   */
  getBlogsByTag(tag: string, filters: BlogFilters = {}): Observable<ApiResponse<BlogListResponse>> {
    return this.httpClient.get<BlogListResponse>('/blog', { ...filters, tag });
  }

  /**
   * Get recent blog posts
   */
  getRecentBlogs(limit: number = 5): Observable<ApiResponse<BlogListResponse>> {
    return this.httpClient.get<BlogListResponse>('/blog', { limit, page: 1 });
  }

  // Admin methods (require authentication)

  /**
   * Create new blog post (Admin only)
   */
  createBlog(blogData: Partial<BlogPost>): Observable<ApiResponse<BlogPost>> {
    return this.httpClient.post<BlogPost>('/blog', blogData);
  }

  /**
   * Update blog post (Admin only)
   */
  updateBlog(id: string, blogData: Partial<BlogPost>): Observable<ApiResponse<BlogPost>> {
    return this.httpClient.put<BlogPost>(`/blog/${id}`, blogData);
  }

  /**
   * Delete blog post (Admin only)
   */
  deleteBlog(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<null>(`/blog/${id}`);
  }

  /**
   * Publish blog post (Admin only)
   */
  publishBlog(id: string, publishedAt?: string): Observable<ApiResponse<BlogPost>> {
    return this.httpClient.patch<BlogPost>(`/blog/${id}/publish`, { publishedAt });
  }

  /**
   * Get all blogs for admin (includes drafts, etc.)
   */
  getAllBlogsAdmin(filters: BlogFilters & { status?: string; author?: string } = {}): Observable<ApiResponse<BlogListResponse>> {
    return this.httpClient.get<BlogListResponse>('/blog/admin/all', filters);
  }
}
