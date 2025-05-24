import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { SEOService } from '../../core/services/seo.service';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  process: string[];
  pricing?: {
    starting: string;
    description: string;
  };
  route: string;
}

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  companyName = '';

  services: Service[] = [
    {
      id: 'tax-planning',
      title: 'Tax Planning & Preparation',
      description: 'Comprehensive tax planning strategies to minimize your tax liability and maximize savings through expert analysis and strategic planning.',
      icon: '📊',
      features: [
        'Individual Tax Returns',
        'Business Tax Planning',
        'Tax Optimization Strategies',
        'IRS Representation',
        'Tax Compliance',
        'Quarterly Tax Planning'
      ],
      benefits: [
        'Minimize tax liability',
        'Maximize deductions',
        'Avoid penalties',
        'Strategic planning',
        'Expert guidance',
        'Year-round support'
      ],
      process: [
        'Initial consultation and document review',
        'Tax situation analysis',
        'Strategy development',
        'Implementation and filing',
        'Ongoing monitoring and adjustments'
      ],
      pricing: {
        starting: '₹5,000',
        description: 'Starting from ₹5,000 for individual returns'
      },
      route: '/services/tax-planning'
    },
    {
      id: 'audit',
      title: 'Audit & Assurance',
      description: 'Professional audit services to ensure compliance, build stakeholder confidence, and provide independent verification of financial statements.',
      icon: '🔍',
      features: [
        'Financial Statement Audits',
        'Internal Audits',
        'Compliance Reviews',
        'Risk Assessment',
        'Management Letter',
        'Audit Reports'
      ],
      benefits: [
        'Enhanced credibility',
        'Risk identification',
        'Compliance assurance',
        'Improved controls',
        'Stakeholder confidence',
        'Regulatory compliance'
      ],
      process: [
        'Audit planning and risk assessment',
        'Internal control evaluation',
        'Substantive testing',
        'Report preparation',
        'Management recommendations'
      ],
      pricing: {
        starting: '₹25,000',
        description: 'Starting from ₹25,000 for small businesses'
      },
      route: '/services/audit'
    },
    {
      id: 'advisory',
      title: 'Business Advisory',
      description: 'Strategic business consulting to help your company grow, improve efficiency, and achieve long-term success through expert guidance.',
      icon: '💼',
      features: [
        'Business Planning',
        'Financial Analysis',
        'Growth Strategies',
        'Performance Metrics',
        'Cash Flow Management',
        'Investment Advisory'
      ],
      benefits: [
        'Strategic direction',
        'Improved profitability',
        'Risk mitigation',
        'Growth acceleration',
        'Operational efficiency',
        'Market insights'
      ],
      process: [
        'Business assessment',
        'Strategy development',
        'Implementation planning',
        'Execution support',
        'Performance monitoring'
      ],
      pricing: {
        starting: '₹15,000',
        description: 'Starting from ₹15,000 per consultation'
      },
      route: '/services/advisory'
    },
    {
      id: 'gst',
      title: 'GST Services',
      description: 'Complete GST compliance and advisory services to ensure smooth operations and maximum benefits under the GST regime.',
      icon: '📋',
      features: [
        'GST Registration',
        'Return Filing',
        'Compliance Management',
        'Input Tax Credit',
        'GST Audit',
        'Refund Processing'
      ],
      benefits: [
        'Full compliance',
        'Timely filings',
        'Maximum ITC benefits',
        'Penalty avoidance',
        'Expert guidance',
        'Cost optimization'
      ],
      process: [
        'GST assessment',
        'Registration assistance',
        'Monthly compliance',
        'Return filing',
        'Ongoing support'
      ],
      pricing: {
        starting: '₹3,000',
        description: 'Starting from ₹3,000 per month'
      },
      route: '/services/gst'
    },
    {
      id: 'registration',
      title: 'Company Registration',
      description: 'Complete company incorporation services including documentation, compliance, and post-registration support for all business structures.',
      icon: '🏢',
      features: [
        'Private Limited Company',
        'LLP Registration',
        'Partnership Firm',
        'Sole Proprietorship',
        'Section 8 Company',
        'Foreign Company'
      ],
      benefits: [
        'Legal entity status',
        'Limited liability',
        'Tax benefits',
        'Credibility enhancement',
        'Easy funding access',
        'Perpetual existence'
      ],
      process: [
        'Structure consultation',
        'Name reservation',
        'Documentation',
        'Government filing',
        'Certificate issuance'
      ],
      pricing: {
        starting: '₹8,000',
        description: 'Starting from ₹8,000 + government fees'
      },
      route: '/services/registration'
    }
  ];

  constructor(
    private configService: ConfigService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;

    // Set SEO data for services page
    this.seoService.updateSEO({
      title: 'Professional CA Services - Tax, Audit, Business Advisory',
      description: 'Comprehensive chartered accountant services including tax planning, audit & assurance, business advisory, GST services, and company registration.',
      keywords: ['CA services', 'tax planning', 'audit services', 'business advisory', 'GST services', 'company registration'],
      url: window.location.href
    });
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find(service => service.id === id);
  }
}
