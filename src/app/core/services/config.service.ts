import { Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = APP_CONFIG;

  constructor() { }

  getConfig(): AppConfig {
    return this.config;
  }

  getBranding() {
    return this.config.branding;
  }

  getContact() {
    return this.config.contact;
  }

  getBusiness() {
    return this.config.business;
  }

  getFeatures() {
    return this.config.features;
  }

  getSEO() {
    return this.config.seo;
  }

  getAnalytics() {
    return this.config.analytics;
  }

  isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.config.features[feature];
  }

  getCompanyName(): string {
    return this.config.branding.companyName;
  }

  getTagline(): string {
    return this.config.branding.tagline;
  }

  getPhone(): string {
    return this.config.contact.phone;
  }

  getEmail(): string {
    return this.config.contact.email;
  }

  getAddress(): string {
    const { address, city, state, zipCode } = this.config.contact;
    return `${address}, ${city}, ${state} ${zipCode}`;
  }

  getServices(): string[] {
    return this.config.business.services;
  }

  getSpecializations(): string[] {
    return this.config.business.specializations;
  }

  getSocialMediaLinks() {
    return this.config.contact.socialMedia;
  }
}
