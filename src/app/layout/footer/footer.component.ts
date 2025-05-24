import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  companyName = '';
  phone = '';
  email = '';
  address = '';
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'Our Services', route: '/services' },
    { label: 'Knowledge Hub', route: '/knowledge' },
    { label: 'Contact Us', route: '/contact' },
    { label: 'Privacy Policy', route: '/privacy' },
    { label: 'Terms of Service', route: '/terms' }
  ];

  services = [
    { label: 'Tax Planning', route: '/services/tax-planning' },
    { label: 'Audit & Assurance', route: '/services/audit' },
    { label: 'Business Advisory', route: '/services/advisory' },
    { label: 'GST Services', route: '/services/gst' },
    { label: 'Company Registration', route: '/services/registration' },
    { label: 'Financial Planning', route: '/services/financial-planning' }
  ];

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;
    this.phone = config.contact.phone;
    this.email = config.contact.email;
    this.address = this.configService.getAddress();
  }
}
