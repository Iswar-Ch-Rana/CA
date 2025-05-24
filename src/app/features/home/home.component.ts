import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  companyName = '';
  tagline = '';
  services: string[] = [];

  heroStats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '1000+', label: 'Tax Returns Filed' },
    { number: '98%', label: 'Client Satisfaction' }
  ];

  coreServices = [
    {
      icon: '📊',
      title: 'Tax Planning & Preparation',
      description: 'Comprehensive tax planning strategies to minimize your tax liability and maximize savings.',
      features: ['Individual Tax Returns', 'Business Tax Planning', 'Tax Optimization', 'IRS Representation']
    },
    {
      icon: '🔍',
      title: 'Audit & Assurance',
      description: 'Professional audit services to ensure compliance and build stakeholder confidence.',
      features: ['Financial Audits', 'Internal Audits', 'Compliance Reviews', 'Risk Assessment']
    },
    {
      icon: '💼',
      title: 'Business Advisory',
      description: 'Strategic business consulting to help your company grow and succeed.',
      features: ['Business Planning', 'Financial Analysis', 'Growth Strategies', 'Performance Metrics']
    },
    {
      icon: '📋',
      title: 'GST & Compliance',
      description: 'Complete GST registration, filing, and compliance management services.',
      features: ['GST Registration', 'Monthly Returns', 'Input Tax Credit', 'GST Audit']
    }
  ];

  testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Tech Solutions Pvt Ltd',
      text: 'Excellence CA has been instrumental in our company\'s financial success. Their expertise in tax planning saved us significant money.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      company: 'Retail Business Owner',
      text: 'Professional, reliable, and always available when needed. They handle all our accounting needs with precision.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      company: 'Manufacturing Industry',
      text: 'Their business advisory services helped us streamline operations and improve profitability significantly.',
      rating: 5
    }
  ];

  constructor(
    private configService: ConfigService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;
    this.tagline = config.branding.tagline;
    this.services = config.business.services;

    // Set SEO data for home page
    this.seoService.updateSEO({
      title: 'Professional Chartered Accountant Services',
      description: 'Leading CA firm providing expert tax planning, audit, business advisory, and compliance services. Get professional financial solutions for your business.',
      keywords: ['chartered accountant', 'CA services', 'tax planning', 'audit services', 'business advisory', 'GST services'],
      url: window.location.href
    });

    // Add structured data for organization
    this.seoService.generateStructuredData('LocalBusiness', {
      url: window.location.origin,
      logo: `${window.location.origin}/assets/images/logo.png`
    });
  }
}
