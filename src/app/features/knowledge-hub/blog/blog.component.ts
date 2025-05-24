import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { SEOService } from '../../../core/services/seo.service';
import { BlogApiService, BlogPost, BlogCategory } from '../../../core/services/blog-api.service';
import { HttpClientService } from '../../../core/services/http-client.service';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  companyName = '';
  selectedCategory = 'all';
  loading = false;
  error: string | null = null;

  categories: BlogCategory[] = [];
  blogPosts: BlogPost[] = [];

  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalPosts = 0;
  postsPerPage = 10;

  constructor(
    private configService: ConfigService,
    private seoService: SEOService,
    private blogApiService: BlogApiService,
    private httpClientService: HttpClientService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;

    // Set SEO data for blog page
    this.seoService.updateSEO({
      title: 'Expert Financial Insights & Blog - Professional CA Articles',
      description: 'Read expert insights on tax planning, audit practices, business advisory, and GST compliance from our chartered accountants.',
      keywords: ['financial blog', 'tax insights', 'CA articles', 'business advice', 'accounting tips'],
      url: window.location.href
    });

    // Load initial data
    this.loadBlogCategories();
    this.loadBlogPosts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBlogCategories() {
    this.blogApiService.getBlogCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.categories = [
              { id: 'all', name: 'All Articles', count: 0 },
              ...response.data
            ];
          }
        },
        error: (error) => {
          console.error('Error loading blog categories:', error);
        }
      });
  }

  loadBlogPosts() {
    this.loading = true;
    this.error = null;

    const filters = {
      page: this.currentPage,
      limit: this.postsPerPage,
      category: this.selectedCategory !== 'all' ? this.selectedCategory : undefined
    };

    this.blogApiService.getBlogs(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.blogPosts = response.data.blogs;
            this.totalPosts = response.data.pagination.total;
            this.totalPages = response.data.pagination.totalPages;
            this.currentPage = response.data.pagination.page;
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to load blog posts. Please try again later.';
          console.error('Error loading blog posts:', error);
        }
      });
  }

  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.currentPage = 1; // Reset to first page
    this.loadBlogPosts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadBlogPosts();
  }

  get filteredPosts() {
    return this.blogPosts;
  }

  get featuredPosts() {
    return this.blogPosts.filter(post => post.isFeatured);
  }

  getAuthorName(post: BlogPost): string {
    return `${post.author.firstName} ${post.author.lastName}`;
  }

  getAuthorInitials(post: BlogPost): string {
    return `${post.author.firstName[0]}${post.author.lastName[0]}`;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getCategoryDisplayName(category: string): string {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
