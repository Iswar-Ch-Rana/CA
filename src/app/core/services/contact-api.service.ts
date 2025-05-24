import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService, ApiResponse } from './http-client.service';

export interface ContactInquiry {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp';
  urgency?: 'low' | 'medium' | 'high';
  status?: 'new' | 'in_progress' | 'resolved' | 'closed';
  source?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  preferredContactMethod?: 'email' | 'phone' | 'whatsapp';
  urgency?: 'low' | 'medium' | 'high';
}

export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {

  constructor(private httpClient: HttpClientService) {}

  /**
   * Submit contact form inquiry
   */
  submitContactForm(contactData: ContactFormData): Observable<ApiResponse<ContactInquiry>> {
    return this.httpClient.post<ContactInquiry>('/contact/inquiry', contactData);
  }

  /**
   * Subscribe to newsletter
   */
  subscribeToNewsletter(subscriptionData: NewsletterSubscription): Observable<ApiResponse<any>> {
    return this.httpClient.post<any>('/contact/newsletter/subscribe', subscriptionData);
  }

  /**
   * Request a callback
   */
  requestCallback(callbackData: {
    name: string;
    phone: string;
    preferredTime?: string;
    message?: string;
  }): Observable<ApiResponse<any>> {
    return this.httpClient.post<any>('/contact/callback', callbackData);
  }

  /**
   * Submit service inquiry
   */
  submitServiceInquiry(inquiryData: {
    serviceId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    urgency?: 'low' | 'medium' | 'high';
  }): Observable<ApiResponse<any>> {
    return this.httpClient.post<any>('/contact/service-inquiry', inquiryData);
  }

  /**
   * Get contact information
   */
  getContactInfo(): Observable<ApiResponse<any>> {
    return this.httpClient.get<any>('/contact/info');
  }

  // Admin methods (require authentication)

  /**
   * Get all contact inquiries (Admin only)
   */
  getAllInquiries(filters: {
    page?: number;
    limit?: number;
    status?: string;
    serviceInterest?: string;
    urgency?: string;
    dateFrom?: string;
    dateTo?: string;
  } = {}): Observable<ApiResponse<{
    inquiries: ContactInquiry[];
    pagination: any;
  }>> {
    return this.httpClient.get<{
      inquiries: ContactInquiry[];
      pagination: any;
    }>('/contact/inquiries', filters);
  }

  /**
   * Update inquiry status (Admin only)
   */
  updateInquiryStatus(id: string, status: string, notes?: string): Observable<ApiResponse<ContactInquiry>> {
    return this.httpClient.put<ContactInquiry>(`/contact/inquiries/${id}`, { status, notes });
  }

  /**
   * Get inquiry by ID (Admin only)
   */
  getInquiryById(id: string): Observable<ApiResponse<ContactInquiry>> {
    return this.httpClient.get<ContactInquiry>(`/contact/inquiries/${id}`);
  }

  /**
   * Delete inquiry (Admin only)
   */
  deleteInquiry(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<null>(`/contact/inquiries/${id}`);
  }
}
