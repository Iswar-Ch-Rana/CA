import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  companyName = '';
  phone = '';
  email = '';

  navigationItems = [
    { label: 'Home', route: '/', hasDropdown: false },
    {
      label: 'About',
      route: '/about',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Our Story', route: '/about' },
        { label: 'Our Team', route: '/about/team' },
        { label: 'Certifications', route: '/about/certifications' }
      ]
    },
    {
      label: 'Services',
      route: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Tax Planning', route: '/services/tax-planning' },
        { label: 'Audit & Assurance', route: '/services/audit' },
        { label: 'Business Advisory', route: '/services/advisory' },
        { label: 'GST Services', route: '/services/gst' },
        { label: 'Company Registration', route: '/services/registration' },
        { label: 'All Services', route: '/services' }
      ]
    },
    {
      label: 'Knowledge Hub',
      route: '/knowledge',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Blog', route: '/knowledge/blog' },
        { label: 'Resources', route: '/knowledge/resources' },
        { label: 'Calculators', route: '/knowledge/calculators' },
        { label: 'Webinars', route: '/knowledge/webinars' }
      ]
    },
    { label: 'Contact', route: '/contact', hasDropdown: false }
  ];

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;
    this.phone = config.contact.phone;
    this.email = config.contact.email;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
