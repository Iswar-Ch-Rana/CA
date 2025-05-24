import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ConfigService } from '../../core/services/config.service';
import { SEOService } from '../../core/services/seo.service';
import { ContactApiService, ContactFormData } from '../../core/services/contact-api.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  companyName = '';
  phone = '';
  email = '';
  address = '';

  contactMethods = [
    {
      icon: 'phone',
      title: 'Phone',
      value: '+91-9876543210',
      description: 'Mon-Fri 9AM-6PM',
      action: 'tel:+919876543210',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'email',
      title: 'Email',
      value: 'info@excellenceca.com',
      description: 'We reply within 24 hours',
      action: 'mailto:info@excellenceca.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'office',
      title: 'Office',
      value: 'Mumbai, Maharashtra',
      description: 'Visit us for consultation',
      action: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp',
      value: '+91-9876543210',
      description: 'Quick support',
      action: 'https://wa.me/919876543210',
      color: 'from-green-400 to-green-500'
    }
  ];

  getIconSvg(iconType: string): string {
    const icons = {
      phone: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
      </svg>`,
      email: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
      </svg>`,
      office: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
      </svg>`,
      whatsapp: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>`
    };
    return icons[iconType as keyof typeof icons] || icons.phone;
  }

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private seoService: SEOService,
    private contactApiService: ContactApiService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      subject: ['', Validators.required],
      serviceInterest: [''],
      preferredContactMethod: ['email'],
      urgency: ['medium'],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    const config = this.configService.getConfig();
    this.companyName = config.branding.companyName;
    this.phone = config.contact.phone;
    this.email = config.contact.email;
    this.address = this.configService.getAddress();

    // Set SEO data for contact page
    this.seoService.updateSEO({
      title: 'Contact Us - Get Professional CA Services',
      description: 'Contact our expert chartered accountants for professional financial services. Call, email, or visit our office in Mumbai for consultation.',
      keywords: ['contact ca', 'chartered accountant contact', 'financial consultation', 'tax advice'],
      url: window.location.href
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;
      this.errorMessage = '';

      const formData: ContactFormData = this.contactForm.value;

      this.contactApiService.submitContactForm(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            if (response.success) {
              this.submitSuccess = true;
              this.contactForm.reset();
              this.contactForm.patchValue({
                preferredContactMethod: 'email',
                urgency: 'medium'
              });

              // Hide success message after 5 seconds
              setTimeout(() => {
                this.submitSuccess = false;
              }, 5000);
            }
          },
          error: (error) => {
            this.isSubmitting = false;
            this.submitError = true;
            this.errorMessage = error.message || 'Failed to submit contact form. Please try again.';
            console.error('Contact form submission error:', error);
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['pattern']) return 'Please enter a valid phone number';
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return '';
  }

  getContactLink(info: any): string {
    switch (info.title) {
      case 'Phone Number':
        return `tel:${this.phone}`;
      case 'Email Address':
        return `mailto:${this.email}`;
      case 'Office Address':
        return 'https://maps.google.com';
      default:
        return '#';
    }
  }

  getContactAction(title: string): string {
    switch (title) {
      case 'Phone Number':
        return 'Call Now';
      case 'Email Address':
        return 'Send Email';
      case 'Office Address':
        return 'View on Map';
      case 'Business Hours':
        return 'Get Directions';
      default:
        return 'Contact';
    }
  }
}
