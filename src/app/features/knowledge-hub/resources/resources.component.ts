import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { SEOService } from '../../../core/services/seo.service';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'excel' | 'guide' | 'checklist' | 'template';
  category: string;
  downloadUrl: string;
  size: string;
  downloads: number;
  featured: boolean;
  icon: string;
}

@Component({
  selector: 'app-resources',
  imports: [CommonModule, RouterModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent implements OnInit {
  companyName = '';
  selectedCategory = 'all';

  categories = [
    { id: 'all', name: 'All Resources', count: 28 },
    { id: 'tax', name: 'Tax Guides', count: 8 },
    { id: 'gst', name: 'GST Resources', count: 6 },
    { id: 'audit', name: 'Audit Checklists', count: 5 },
    { id: 'business', name: 'Business Templates', count: 9 }
  ];

  resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Tax Planning Guide 2024',
      description: 'Comprehensive guide covering all aspects of tax planning for individuals and businesses',
      type: 'pdf',
      category: 'tax',
      downloadUrl: '/assets/downloads/tax-planning-guide-2024.pdf',
      size: '2.5 MB',
      downloads: 1250,
      featured: true,
      icon: '📊'
    },
    {
      id: '2',
      title: 'GST Compliance Checklist',
      description: 'Essential checklist to ensure your business stays compliant with GST regulations',
      type: 'checklist',
      category: 'gst',
      downloadUrl: '/assets/downloads/gst-compliance-checklist.pdf',
      size: '850 KB',
      downloads: 890,
      featured: true,
      icon: '📋'
    },
    {
      id: '3',
      title: 'Financial Statement Template',
      description: 'Professional template for preparing financial statements',
      type: 'excel',
      category: 'business',
      downloadUrl: '/assets/downloads/financial-statement-template.xlsx',
      size: '1.2 MB',
      downloads: 675,
      featured: false,
      icon: '📈'
    },
    {
      id: '4',
      title: 'Internal Audit Checklist',
      description: 'Comprehensive checklist for conducting internal audits',
      type: 'checklist',
      category: 'audit',
      downloadUrl: '/assets/downloads/internal-audit-checklist.pdf',
      size: '1.1 MB',
      downloads: 520,
      featured: false,
      icon: '🔍'
    }
  ];

  constructor(
    private configService: ConfigService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;

    // Set SEO data for resources page
    this.seoService.updateSEO({
      title: 'Free Financial Resources & Downloads - Templates & Guides',
      description: 'Download free financial resources, tax guides, compliance checklists, and business templates from our expert chartered accountants.',
      keywords: ['financial resources', 'tax guides', 'business templates', 'compliance checklists', 'free downloads'],
      url: window.location.href
    });
  }

  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  get filteredResources() {
    if (this.selectedCategory === 'all') {
      return this.resources;
    }
    return this.resources.filter(resource => resource.category === this.selectedCategory);
  }

  get featuredResources() {
    return this.resources.filter(resource => resource.featured);
  }

  getTypeIcon(type: string): string {
    const icons = {
      'pdf': '📄',
      'excel': '📊',
      'guide': '📚',
      'checklist': '✅',
      'template': '📋'
    };
    return icons[type as keyof typeof icons] || '📄';
  }

  downloadResource(resource: Resource) {
    // In a real application, this would track downloads and handle the download
    console.log('Downloading:', resource.title);
    // Increment download count
    resource.downloads++;
  }
}
