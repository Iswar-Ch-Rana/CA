import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { SEOService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  companyName = '';
  establishedYear = 0;
  currentSection = 'story'; // Default section

  teamMembers = [
    {
      name: 'CA Rajesh Kumar',
      position: 'Managing Partner',
      experience: '15+ Years',
      specialization: 'Corporate Tax & Audit',
      image: 'assets/images/team/rajesh.jpg',
      qualifications: ['CA', 'CPA', 'MBA Finance']
    },
    {
      name: 'CA Priya Sharma',
      position: 'Senior Partner',
      experience: '12+ Years',
      specialization: 'GST & Compliance',
      image: 'assets/images/team/priya.jpg',
      qualifications: ['CA', 'CS', 'LLB']
    },
    {
      name: 'CA Amit Patel',
      position: 'Tax Consultant',
      experience: '8+ Years',
      specialization: 'International Taxation',
      image: 'assets/images/team/amit.jpg',
      qualifications: ['CA', 'CFA', 'DISA']
    }
  ];

  achievements = [
    { icon: '🏆', title: 'Excellence Award 2023', description: 'Best CA Firm in Mumbai' },
    { icon: '📜', title: 'ISO 9001:2015 Certified', description: 'Quality Management System' },
    { icon: '🎯', title: '500+ Happy Clients', description: 'Across various industries' },
    { icon: '⭐', title: '98% Client Retention', description: 'Long-term partnerships' }
  ];

  certifications = [
    {
      title: 'Institute of Chartered Accountants of India (ICAI)',
      description: 'All our partners are qualified Chartered Accountants from ICAI',
      icon: '🎓',
      year: '2010'
    },
    {
      title: 'ISO 9001:2015 Quality Management',
      description: 'Certified for maintaining highest quality standards in our services',
      icon: '📜',
      year: '2020'
    },
    {
      title: 'GST Practitioner Certificate',
      description: 'Authorized GST practitioners for comprehensive GST services',
      icon: '💼',
      year: '2017'
    },
    {
      title: 'DISA (Diploma in Information Systems Audit)',
      description: 'Specialized certification for IT audit and systems review',
      icon: '🔍',
      year: '2019'
    }
  ];

  constructor(
    private configService: ConfigService,
    private seoService: SEOService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;
    this.establishedYear = config.business.establishedYear;

    // Check route data for section
    this.route.data.subscribe(data => {
      if (data['section']) {
        this.currentSection = data['section'];
        this.scrollToSection(this.currentSection);
      }
    });

    // Set SEO data for about page
    this.seoService.updateSEO({
      title: 'About Us - Professional CA Services',
      description: 'Learn about our experienced team of Chartered Accountants and our commitment to providing exceptional financial services since 2010.',
      keywords: ['about us', 'chartered accountant team', 'CA firm history', 'professional experience'],
      url: window.location.href
    });
  }

  scrollToSection(section: string) {
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
