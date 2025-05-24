import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { SEOService } from '../../core/services/seo.service';

export interface KnowledgeSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  features: string[];
  color: string;
  count?: number;
}

@Component({
  selector: 'app-knowledge-hub',
  imports: [CommonModule, RouterModule],
  templateUrl: './knowledge-hub.component.html',
  styleUrl: './knowledge-hub.component.scss'
})
export class KnowledgeHubComponent implements OnInit {
  companyName = '';

  knowledgeSections: KnowledgeSection[] = [
    {
      id: 'blog',
      title: 'Blog & Insights',
      description: 'Expert insights, industry updates, and practical tips from our chartered accountants',
      icon: '📝',
      route: '/knowledge/blog',
      features: ['Tax Updates', 'Industry Insights', 'Expert Tips', 'Case Studies'],
      color: 'from-blue-500 to-blue-600',
      count: 45
    },
    {
      id: 'resources',
      title: 'Resources & Downloads',
      description: 'Comprehensive guides, checklists, and templates for your financial needs',
      icon: '📚',
      route: '/knowledge/resources',
      features: ['Tax Guides', 'Compliance Checklists', 'Templates', 'Forms'],
      color: 'from-green-500 to-green-600',
      count: 28
    },
    {
      id: 'calculators',
      title: 'Financial Calculators',
      description: 'Interactive tools to help you make informed financial decisions',
      icon: '🧮',
      route: '/knowledge/calculators',
      features: ['Tax Calculator', 'GST Calculator', 'EMI Calculator', 'Investment Tools'],
      color: 'from-purple-500 to-purple-600',
      count: 12
    },
    {
      id: 'webinars',
      title: 'Webinars & Events',
      description: 'Educational sessions and live events with industry experts',
      icon: '🎥',
      route: '/knowledge/webinars',
      features: ['Live Sessions', 'Recorded Content', 'Expert Speakers', 'Q&A Sessions'],
      color: 'from-orange-500 to-orange-600',
      count: 18
    }
  ];

  stats = [
    { number: '500+', label: 'Articles Published', icon: '📄' },
    { number: '50+', label: 'Resources Available', icon: '📁' },
    { number: '15+', label: 'Calculators', icon: '⚡' },
    { number: '100+', label: 'Webinar Hours', icon: '🎓' }
  ];

  constructor(
    private configService: ConfigService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;

    // Set SEO data for knowledge hub page
    this.seoService.updateSEO({
      title: 'Knowledge Hub - Expert Financial Insights & Resources',
      description: 'Access expert insights, financial calculators, downloadable resources, and educational webinars from our chartered accountants.',
      keywords: ['financial knowledge', 'tax insights', 'CA resources', 'financial calculators', 'accounting webinars', 'expert tips'],
      url: window.location.href
    });
  }
}
