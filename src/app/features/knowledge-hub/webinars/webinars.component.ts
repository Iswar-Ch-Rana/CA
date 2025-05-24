import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { SEOService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-webinars',
  imports: [CommonModule, RouterModule],
  templateUrl: './webinars.component.html',
  styleUrl: './webinars.component.scss'
})
export class WebinarsComponent implements OnInit {
  companyName = '';

  webinars = [
    {
      id: '1',
      title: 'Digital Transformation in Accounting',
      description: 'Learn how technology is reshaping the accounting industry',
      speaker: 'CA Priya Sharma',
      date: '2024-03-25',
      duration: '60 minutes',
      status: 'upcoming' as const,
      thumbnail: '🎥'
    },
    {
      id: '2',
      title: 'GST Updates and Compliance 2024',
      description: 'Latest GST changes and their impact on businesses',
      speaker: 'CA Rajesh Kumar',
      date: '2024-03-15',
      duration: '45 minutes',
      status: 'recorded' as const,
      thumbnail: '📋'
    },
    {
      id: '3',
      title: 'Tax Planning Strategies for SMEs',
      description: 'Effective tax planning techniques for small and medium enterprises',
      speaker: 'CA Amit Patel',
      date: '2024-03-20',
      duration: '90 minutes',
      status: 'live' as const,
      thumbnail: '📊'
    }
  ];

  constructor(
    private configService: ConfigService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;

    // Set SEO data for webinars page
    this.seoService.updateSEO({
      title: 'Educational Webinars & Events - Expert Financial Training',
      description: 'Join our expert-led webinars on tax planning, GST compliance, and business advisory topics.',
      keywords: ['financial webinars', 'accounting training', 'tax seminars', 'business education', 'CA webinars'],
      url: window.location.href
    });
  }

  getStatusColor(status: string): string {
    const colors = {
      'upcoming': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'live': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
      'recorded': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    };
    return colors[status as keyof typeof colors] || colors.recorded;
  }
}
