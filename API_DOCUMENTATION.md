# CA Professional Website - Complete API Documentation

## Overview
This document outlines the complete API requirements, database models, and technical specifications for the CA Professional Website backend system. This is a comprehensive guide for building a modern, scalable, and secure CA firm management platform.

## Project Architecture

### Technology Stack (Updated 2024)

#### Backend Framework
- **Node.js with Express.js + TypeScript** (Primary Choice)
  - Fast development with type safety
  - Large ecosystem and community support
  - Excellent integration with Angular frontend
  - Strong async/await support for database operations
  - Middleware ecosystem for authentication, validation, etc.

#### Database Architecture
- **PostgreSQL 15+** (Primary Database)
  - ACID compliance critical for financial data
  - Advanced JSON/JSONB support for flexible schemas
  - Row-level security for multi-tenant data
  - Full-text search capabilities
  - Excellent performance with proper indexing
  - Strong backup and recovery options

- **Redis 7+** (Caching & Session Management)
  - High-performance session storage
  - API response caching with TTL
  - Rate limiting and throttling
  - Real-time pub/sub for notifications
  - Queue management for background jobs

#### Cloud Services & Integrations
- **File Storage**: AWS S3 or Cloudinary for documents/images
- **Email Service**: SendGrid or AWS SES for transactional emails
- **SMS Service**: Twilio for notifications and 2FA
- **Authentication**: JWT with refresh tokens + optional OAuth2
- **Payment Gateway**: Razorpay/Stripe for invoice payments
- **Search Engine**: Elasticsearch for advanced search (optional)
- **Monitoring**: New Relic/DataDog for performance monitoring

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role ENUM('admin', 'ca', 'client', 'staff') DEFAULT 'client',
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Clients Table
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  business_type VARCHAR(100),
  pan_number VARCHAR(10),
  gst_number VARCHAR(15),
  address JSONB,
  annual_turnover DECIMAL(15,2),
  client_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  assigned_ca_id UUID REFERENCES users(id),
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Services Table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('tax', 'audit', 'advisory', 'gst', 'registration', 'compliance'),
  base_price DECIMAL(10,2),
  duration_days INTEGER,
  is_active BOOLEAN DEFAULT true,
  requirements JSONB,
  deliverables JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Service Requests Table
```sql
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  assigned_ca_id UUID REFERENCES users(id),
  status ENUM('pending', 'in_progress', 'completed', 'cancelled', 'on_hold') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  description TEXT,
  requirements JSONB,
  estimated_completion DATE,
  actual_completion DATE,
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Documents Table
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_request_id UUID REFERENCES service_requests(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  document_category ENUM('requirement', 'deliverable', 'supporting'),
  is_confidential BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Appointments Table
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  ca_id UUID REFERENCES users(id),
  appointment_type ENUM('consultation', 'meeting', 'document_review', 'follow_up'),
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled') DEFAULT 'scheduled',
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Communications Table
```sql
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  service_request_id UUID REFERENCES service_requests(id),
  message_type ENUM('email', 'sms', 'notification', 'chat'),
  subject VARCHAR(255),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8. Invoices Table
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  service_request_id UUID REFERENCES service_requests(id),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
  due_date DATE,
  paid_at TIMESTAMP,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9. Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  category VARCHAR(100),
  tags JSONB,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at TIMESTAMP,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 10. Contact Inquiries Table
```sql
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  inquiry_type ENUM('general', 'service', 'support', 'partnership'),
  status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91-9876543210",
  "role": "client"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "client",
      "isVerified": false
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "client"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

#### POST /api/auth/refresh
Refresh JWT token using refresh token.

#### POST /api/auth/logout
Logout user and invalidate tokens.

#### POST /api/auth/forgot-password
Send password reset email.

#### POST /api/auth/reset-password
Reset password using reset token.

#### POST /api/auth/verify-email
Verify email address using verification token.

### User Management Endpoints

#### GET /api/users/profile
Get current user profile.

#### PUT /api/users/profile
Update user profile.

#### POST /api/users/change-password
Change user password.

#### GET /api/users/clients
Get list of clients (CA/Admin only).

#### GET /api/users/cas
Get list of CAs (Admin only).

### Service Endpoints

#### GET /api/services
Get list of all available services.

**Query Parameters:**
- `category`: Filter by service category
- `active`: Filter by active status
- `page`: Page number for pagination
- `limit`: Number of items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": "uuid",
        "name": "Tax Planning & Advisory",
        "description": "Comprehensive tax planning services",
        "category": "tax",
        "basePrice": 15000,
        "durationDays": 30,
        "requirements": ["PAN Card", "Previous ITR", "Investment Details"],
        "deliverables": ["Tax Planning Report", "Investment Recommendations"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### GET /api/services/:id
Get specific service details.

#### POST /api/services (Admin/CA only)
Create new service.

#### PUT /api/services/:id (Admin/CA only)
Update service details.

#### DELETE /api/services/:id (Admin only)
Delete service.

### Service Request Endpoints

#### POST /api/service-requests
Create new service request.

**Request Body:**
```json
{
  "serviceId": "uuid",
  "description": "Need help with tax planning for FY 2024-25",
  "requirements": {
    "urgency": "medium",
    "preferredCA": "uuid",
    "additionalNotes": "First time filing"
  }
}
```

#### GET /api/service-requests
Get service requests (filtered by user role).

**Query Parameters:**
- `status`: Filter by status
- `clientId`: Filter by client (CA/Admin only)
- `caId`: Filter by assigned CA
- `page`: Page number
- `limit`: Items per page

#### GET /api/service-requests/:id
Get specific service request details.

#### PUT /api/service-requests/:id
Update service request.

#### PUT /api/service-requests/:id/status
Update service request status.

#### PUT /api/service-requests/:id/assign
Assign service request to CA (Admin only).

### Document Management Endpoints

#### POST /api/documents/upload
Upload document for service request.

**Request:** Multipart form data
- `file`: Document file
- `serviceRequestId`: UUID
- `category`: Document category
- `isConfidential`: Boolean

#### GET /api/documents
Get documents (filtered by access permissions).

#### GET /api/documents/:id/download
Download specific document.

#### DELETE /api/documents/:id
Delete document.

### Appointment Endpoints

#### POST /api/appointments
Schedule new appointment.

#### GET /api/appointments
Get appointments (filtered by user role).

#### PUT /api/appointments/:id
Update appointment details.

#### PUT /api/appointments/:id/status
Update appointment status.

#### DELETE /api/appointments/:id
Cancel appointment.

### Communication Endpoints

#### POST /api/communications/send
Send message/notification.

#### GET /api/communications
Get communications for user.

#### PUT /api/communications/:id/read
Mark communication as read.

### Invoice Endpoints

#### POST /api/invoices
Create new invoice (CA/Admin only).

#### GET /api/invoices
Get invoices (filtered by user role).

#### GET /api/invoices/:id
Get specific invoice details.

#### PUT /api/invoices/:id
Update invoice.

#### POST /api/invoices/:id/payment
Record payment for invoice.

#### GET /api/invoices/:id/pdf
Generate and download invoice PDF.

### Blog Endpoints

#### GET /api/blog/posts
Get published blog posts.

#### GET /api/blog/posts/:slug
Get specific blog post by slug.

#### POST /api/blog/posts (Admin/CA only)
Create new blog post.

#### PUT /api/blog/posts/:id (Admin/CA only)
Update blog post.

#### DELETE /api/blog/posts/:id (Admin only)
Delete blog post.

### Contact & Inquiry Endpoints

#### POST /api/contact/inquiry
Submit contact inquiry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "company": "ABC Corp",
  "subject": "Tax Planning Inquiry",
  "message": "I need help with tax planning for my business",
  "inquiryType": "service"
}
```

#### GET /api/contact/inquiries (Admin/CA only)
Get contact inquiries.

#### PUT /api/contact/inquiries/:id (Admin/CA only)
Update inquiry status.

### Analytics & Reports Endpoints

#### GET /api/analytics/dashboard
Get dashboard analytics (role-based).

#### GET /api/reports/clients
Get client reports (CA/Admin only).

#### GET /api/reports/services
Get service performance reports.

#### GET /api/reports/revenue
Get revenue reports (Admin only).

## Error Handling

All API endpoints follow consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Email is required",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Input validation failed
- `AUTHENTICATION_ERROR`: Invalid credentials
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error

## Security Considerations

1. **Authentication**: JWT tokens with refresh token rotation
2. **Authorization**: Role-based access control (RBAC)
3. **Data Encryption**: Encrypt sensitive data at rest
4. **API Rate Limiting**: Prevent abuse
5. **Input Validation**: Validate all inputs
6. **File Upload Security**: Scan uploaded files
7. **HTTPS Only**: All communications over HTTPS
8. **CORS Configuration**: Proper CORS setup
9. **SQL Injection Prevention**: Use parameterized queries
10. **XSS Prevention**: Sanitize outputs

## Performance Optimization

1. **Database Indexing**: Index frequently queried columns
2. **Caching**: Redis for session and API response caching
3. **Pagination**: Implement pagination for large datasets
4. **Connection Pooling**: Database connection pooling
5. **CDN**: Use CDN for static assets
6. **Compression**: Enable gzip compression
7. **Monitoring**: Implement logging and monitoring

## Deployment Recommendations

### Development Environment
- Docker containers for easy setup
- Environment variables for configuration
- Database migrations for schema management

### Production Environment
- **Cloud Provider**: AWS, Google Cloud, or Azure
- **Container Orchestration**: Kubernetes or Docker Swarm
- **Load Balancer**: Application load balancer
- **Database**: Managed PostgreSQL service
- **File Storage**: Cloud storage service
- **Monitoring**: Application performance monitoring
- **Backup**: Automated database backups
- **SSL Certificate**: Automated SSL certificate management

This API documentation provides a comprehensive foundation for building a robust CA professional website backend system.
