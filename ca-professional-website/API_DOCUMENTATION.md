# CA Professional Website - API Documentation

## Overview
This document outlines all the required API endpoints for the CA Professional Website project. The APIs are designed to support a comprehensive chartered accountant firm website with modern features and functionality.

## Base Configuration
- **Base URL**: `https://api.excellenceca.com/v1`
- **Authentication**: JWT Bearer Token
- **Content-Type**: `application/json`
- **Rate Limiting**: 1000 requests per hour per IP
- **API Version**: v1

## Authentication Endpoints

### 1. User Authentication
```
POST /auth/login
POST /auth/register
POST /auth/refresh
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-email
```

#### POST /auth/login
**Purpose**: Authenticate user and return access token
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "client"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token",
      "expiresIn": 3600
    }
  }
}
```
**Edge Cases**:
- Invalid credentials (401)
- Account locked after 5 failed attempts (423)
- Email not verified (403)
- Rate limiting exceeded (429)

#### POST /auth/register
**Purpose**: Register new user account
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePassword123",
  "phone": "+91-9876543210",
  "businessType": "individual|business",
  "companyName": "Optional Company Name"
}
```
**Edge Cases**:
- Email already exists (409)
- Weak password (400)
- Invalid phone format (400)
- Missing required fields (422)

## Contact & Communication Endpoints

### 2. Contact Management
```
POST /contact/inquiry
GET /contact/inquiries
PUT /contact/inquiries/:id
DELETE /contact/inquiries/:id
POST /contact/callback-request
GET /contact/business-hours
```

#### POST /contact/inquiry
**Purpose**: Submit contact form inquiry
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "subject": "Tax Planning Consultation",
  "message": "I need help with tax planning for my business",
  "serviceType": "tax-planning",
  "preferredContactMethod": "email|phone|whatsapp",
  "urgency": "low|medium|high",
  "budget": "10000-50000",
  "source": "website|referral|social-media"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "inquiryId": "uuid",
    "ticketNumber": "TKT-2024-001",
    "estimatedResponse": "2024-01-15T10:00:00Z",
    "assignedTo": "CA Rajesh Kumar"
  }
}
```
**Edge Cases**:
- Invalid email format (400)
- Spam detection triggers (429)
- Service temporarily unavailable (503)
- File upload size exceeded (413)

### 3. Appointment Scheduling
```
GET /appointments/availability
POST /appointments/book
GET /appointments/user/:userId
PUT /appointments/:id/reschedule
DELETE /appointments/:id/cancel
POST /appointments/:id/confirm
```

#### GET /appointments/availability
**Purpose**: Get available appointment slots
**Query Parameters**:
- `date`: YYYY-MM-DD
- `serviceType`: tax-planning|audit|advisory|gst
- `duration`: 30|60|90 (minutes)
- `consultantId`: optional specific consultant

**Response**:
```json
{
  "success": true,
  "data": {
    "date": "2024-01-15",
    "availableSlots": [
      {
        "time": "10:00",
        "duration": 60,
        "consultantId": "uuid",
        "consultantName": "CA Rajesh Kumar",
        "type": "in-person|video|phone"
      }
    ]
  }
}
```

#### POST /appointments/book
**Purpose**: Book an appointment
**Request Body**:
```json
{
  "date": "2024-01-15",
  "time": "10:00",
  "duration": 60,
  "serviceType": "tax-planning",
  "consultantId": "uuid",
  "type": "video",
  "clientDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210"
  },
  "requirements": "Need help with business tax planning"
}
```
**Edge Cases**:
- Slot no longer available (409)
- Invalid date/time (400)
- Consultant unavailable (404)
- Double booking prevention (409)

## Service Management Endpoints

### 4. Services & Pricing
```
GET /services
GET /services/:slug
GET /services/categories
GET /services/pricing
POST /services/quote-request
GET /services/calculators/:type
```

#### GET /services
**Purpose**: Get list of all services
**Query Parameters**:
- `category`: tax|audit|advisory|gst|registration
- `featured`: true|false
- `limit`: number
- `offset`: number

**Response**:
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "uuid",
        "title": "Tax Planning & Preparation",
        "slug": "tax-planning",
        "description": "Comprehensive tax planning strategies",
        "category": "tax",
        "featured": true,
        "pricing": {
          "starting": "₹5,000",
          "description": "Starting from",
          "type": "fixed|hourly|custom"
        },
        "features": ["Individual Tax Returns", "Business Tax Planning"],
        "duration": "2-3 weeks",
        "deliverables": ["Tax Return Filing", "Tax Optimization Report"]
      }
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "limit": 10,
      "hasNext": true
    }
  }
}
```

#### POST /services/quote-request
**Purpose**: Request custom quote for services
**Request Body**:
```json
{
  "serviceIds": ["uuid1", "uuid2"],
  "businessType": "individual|partnership|company|llp",
  "annualTurnover": "0-10L|10L-1Cr|1Cr-10Cr|10Cr+",
  "requirements": "Detailed requirements",
  "timeline": "urgent|1-month|3-months|flexible",
  "contactDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "company": "ABC Pvt Ltd"
  }
}
```

## Content Management Endpoints

### 5. Knowledge Hub & Blog
```
GET /blog/posts
GET /blog/posts/:slug
GET /blog/categories
GET /blog/tags
POST /blog/posts/:id/like
POST /blog/posts/:id/comment
GET /resources/downloads
GET /resources/calculators
```

#### GET /blog/posts
**Purpose**: Get blog posts with filtering
**Query Parameters**:
- `category`: tax-updates|business-tips|compliance
- `tag`: gst|income-tax|audit
- `featured`: true|false
- `limit`: number
- `offset`: number
- `search`: search term

**Response**:
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "New GST Updates for 2024",
        "slug": "gst-updates-2024",
        "excerpt": "Important GST changes every business should know",
        "content": "Full article content...",
        "author": {
          "name": "CA Rajesh Kumar",
          "avatar": "url",
          "bio": "Senior Tax Consultant"
        },
        "publishedAt": "2024-01-15T10:00:00Z",
        "readTime": 5,
        "category": "tax-updates",
        "tags": ["gst", "compliance"],
        "featured": true,
        "likes": 25,
        "comments": 8
      }
    ]
  }
}
```

### 6. File Management
```
POST /files/upload
GET /files/:id
DELETE /files/:id
POST /files/documents/verify
GET /files/templates
```

#### POST /files/upload
**Purpose**: Upload documents/files
**Request**: Multipart form data
**Fields**:
- `file`: File (max 10MB)
- `type`: document|image|template
- `category`: tax-document|audit-report|certificate
- `description`: Optional description

**Response**:
```json
{
  "success": true,
  "data": {
    "fileId": "uuid",
    "filename": "tax-return-2024.pdf",
    "url": "https://cdn.excellenceca.com/files/uuid",
    "size": 1024000,
    "type": "application/pdf",
    "uploadedAt": "2024-01-15T10:00:00Z"
  }
}
```
**Edge Cases**:
- File size exceeded (413)
- Invalid file type (415)
- Virus detected (422)
- Storage quota exceeded (507)

## User Management Endpoints

### 7. User Profile & Preferences
```
GET /users/profile
PUT /users/profile
GET /users/dashboard
GET /users/notifications
PUT /users/notifications/settings
POST /users/change-password
```

#### GET /users/dashboard
**Purpose**: Get user dashboard data
**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "memberSince": "2023-01-15"
    },
    "stats": {
      "activeServices": 3,
      "completedProjects": 12,
      "upcomingAppointments": 1,
      "pendingDocuments": 2
    },
    "recentActivity": [
      {
        "type": "appointment",
        "description": "Tax consultation scheduled",
        "date": "2024-01-15T10:00:00Z"
      }
    ],
    "quickActions": [
      {
        "title": "Book Appointment",
        "url": "/appointments/book",
        "icon": "calendar"
      }
    ]
  }
}
```

## Analytics & Reporting Endpoints

### 8. Analytics (Admin Only)
```
GET /analytics/overview
GET /analytics/inquiries
GET /analytics/appointments
GET /analytics/services
GET /analytics/revenue
```

## Notification Endpoints

### 9. Notifications
```
GET /notifications
POST /notifications/send
PUT /notifications/:id/read
DELETE /notifications/:id
POST /notifications/subscribe
```

## Integration Endpoints

### 10. Third-party Integrations
```
POST /integrations/payment/initiate
POST /integrations/payment/verify
GET /integrations/calendar/sync
POST /integrations/email/send
POST /integrations/sms/send
POST /integrations/whatsapp/send
```

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    },
    "timestamp": "2024-01-15T10:00:00Z",
    "requestId": "uuid"
  }
}
```

### Common Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `413` - Payload Too Large
- `415` - Unsupported Media Type
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error
- `503` - Service Unavailable

## Security Considerations

### Rate Limiting
- General API: 1000 requests/hour
- Authentication: 10 requests/minute
- File Upload: 50 requests/hour
- Contact Forms: 5 requests/hour

### Data Validation
- All inputs sanitized and validated
- SQL injection prevention
- XSS protection
- CSRF tokens for state-changing operations

### Privacy & Compliance
- GDPR compliant data handling
- Data encryption at rest and in transit
- Audit logs for sensitive operations
- Right to data deletion

## Webhook Endpoints

### 11. Webhooks
```
POST /webhooks/payment-success
POST /webhooks/appointment-reminder
POST /webhooks/document-processed
```

This API documentation provides a comprehensive foundation for the CA Professional Website. Each endpoint includes proper error handling, validation, and security measures appropriate for a professional financial services platform.
