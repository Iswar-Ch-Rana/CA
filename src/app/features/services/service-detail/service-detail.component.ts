import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { SEOService } from '../../../core/services/seo.service';
import { Service } from '../services.component';

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent implements OnInit {
  service: Service | null = null;
  companyName = '';
  loading = true;

  // All services data (same as in services.component.ts)
  private allServices: Service[] = [
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
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;

    // Get service ID from route URL
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 1) {
        const serviceId = urlSegments[1].path; // Get the service ID from URL
        this.loadService(serviceId);
      } else {
        this.router.navigate(['/services']);
      }
    });
  }

  private loadService(serviceId: string) {
    this.loading = true;

    // Find service by ID
    this.service = this.allServices.find(s => s.id === serviceId) || null;

    if (this.service) {
      // Set SEO data for service page
      this.seoService.updateSEO({
        title: `${this.service.title} - Professional CA Services`,
        description: this.service.description,
        keywords: [this.service.title.toLowerCase(), 'CA services', 'chartered accountant', 'professional services'],
        url: window.location.href
      });
    } else {
      // Service not found, redirect to services page
      this.router.navigate(['/services']);
    }

    this.loading = false;
  }

  getOtherServices(): Service[] {
    if (!this.service) return [];
    return this.allServices.filter(s => s.id !== this.service!.id).slice(0, 3);
  }
}
