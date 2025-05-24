import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { SEOService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-calculators',
  imports: [CommonModule, RouterModule],
  templateUrl: './calculators.component.html',
  styleUrl: './calculators.component.scss'
})
export class CalculatorsComponent implements OnInit {
  companyName = '';

  calculators = [
    {
      id: 'tax-calculator',
      title: 'Income Tax Calculator',
      description: 'Calculate your income tax liability for the current financial year',
      icon: '🧮',
      category: 'Tax',
      popular: true
    },
    {
      id: 'gst-calculator',
      title: 'GST Calculator',
      description: 'Calculate GST amount for your transactions',
      icon: '📊',
      category: 'GST',
      popular: true
    },
    {
      id: 'emi-calculator',
      title: 'EMI Calculator',
      description: 'Calculate your loan EMI amount',
      icon: '💰',
      category: 'Finance',
      popular: false
    },
    {
      id: 'sip-calculator',
      title: 'SIP Calculator',
      description: 'Calculate returns on your SIP investments',
      icon: '📈',
      category: 'Investment',
      popular: false
    }
  ];

  constructor(
    private configService: ConfigService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;

    // Set SEO data for calculators page
    this.seoService.updateSEO({
      title: 'Financial Calculators - Tax, GST, EMI & Investment Tools',
      description: 'Use our free financial calculators for tax planning, GST calculations, EMI planning, and investment analysis.',
      keywords: ['financial calculators', 'tax calculator', 'GST calculator', 'EMI calculator', 'investment calculator'],
      url: window.location.href
    });
  }
}
