# Database Models & Schema Design

## Database Selection Rationale

### Primary Database: PostgreSQL
**Why PostgreSQL?**
- **ACID Compliance**: Critical for financial data integrity
- **Advanced Data Types**: JSON/JSONB support for flexible schemas
- **Strong Consistency**: Essential for accounting and financial records
- **Mature Ecosystem**: Extensive tooling and community support
- **Scalability**: Handles large datasets efficiently
- **Security**: Row-level security and advanced authentication

### Caching Layer: Redis
**Why Redis?**
- **High Performance**: In-memory data structure store
- **Session Management**: Perfect for user sessions and JWT blacklisting
- **Rate Limiting**: Built-in support for rate limiting
- **Pub/Sub**: Real-time notifications and messaging
- **Data Expiration**: Automatic cleanup of temporary data

## Detailed Database Schema

### Core Tables

#### 1. Users Table (Authentication & User Management)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role user_role_enum DEFAULT 'client',
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  profile_image_url TEXT,
  last_login_at TIMESTAMP,
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  email_verification_token VARCHAR(255),
  email_verification_expires TIMESTAMP,
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_secret VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT users_phone_check CHECK (phone ~* '^\+?[1-9]\d{1,14}$')
);

-- Enums
CREATE TYPE user_role_enum AS ENUM ('admin', 'ca', 'client', 'staff', 'manager');

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_verified ON users(is_verified);
```

#### 2. Client Profiles Table
```sql
CREATE TABLE client_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  business_type business_type_enum,
  industry VARCHAR(100),
  pan_number VARCHAR(10) UNIQUE,
  gst_number VARCHAR(15) UNIQUE,
  cin_number VARCHAR(21) UNIQUE,
  tan_number VARCHAR(10),

  -- Address Information (JSONB for flexibility)
  registered_address JSONB,
  communication_address JSONB,

  -- Business Information
  annual_turnover DECIMAL(15,2),
  employee_count INTEGER,
  incorporation_date DATE,
  financial_year_end DATE DEFAULT '03-31',

  -- CA Assignment
  assigned_ca_id UUID REFERENCES users(id),
  client_status client_status_enum DEFAULT 'active',

  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 1,
  kyc_status kyc_status_enum DEFAULT 'pending',

  -- Preferences
  communication_preferences JSONB DEFAULT '{"email": true, "sms": true, "whatsapp": false}',
  service_preferences JSONB,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  CONSTRAINT pan_format_check CHECK (pan_number ~* '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
  CONSTRAINT gst_format_check CHECK (gst_number ~* '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
);

-- Enums
CREATE TYPE business_type_enum AS ENUM (
  'proprietorship', 'partnership', 'llp', 'private_limited',
  'public_limited', 'opc', 'ngo', 'trust', 'society'
);

CREATE TYPE client_status_enum AS ENUM ('active', 'inactive', 'suspended', 'terminated');
CREATE TYPE kyc_status_enum AS ENUM ('pending', 'in_progress', 'completed', 'rejected');

-- Indexes
CREATE INDEX idx_client_profiles_user_id ON client_profiles(user_id);
CREATE INDEX idx_client_profiles_assigned_ca ON client_profiles(assigned_ca_id);
CREATE INDEX idx_client_profiles_status ON client_profiles(client_status);
CREATE INDEX idx_client_profiles_pan ON client_profiles(pan_number);
CREATE INDEX idx_client_profiles_gst ON client_profiles(gst_number);
```

#### 3. CA Profiles Table
```sql
CREATE TABLE ca_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  membership_number VARCHAR(20) UNIQUE NOT NULL,
  membership_type ca_membership_enum DEFAULT 'associate',
  specializations TEXT[],
  experience_years INTEGER,
  qualification_year INTEGER,

  -- Professional Details
  practice_certificate_number VARCHAR(50),
  practice_certificate_valid_until DATE,
  professional_address JSONB,

  -- Capacity & Availability
  max_clients INTEGER DEFAULT 50,
  current_client_count INTEGER DEFAULT 0,
  is_accepting_clients BOOLEAN DEFAULT true,
  hourly_rate DECIMAL(8,2),

  -- Performance Metrics
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  completed_services INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE ca_membership_enum AS ENUM ('associate', 'fellow');

-- Indexes
CREATE INDEX idx_ca_profiles_user_id ON ca_profiles(user_id);
CREATE INDEX idx_ca_profiles_membership ON ca_profiles(membership_number);
CREATE INDEX idx_ca_profiles_accepting ON ca_profiles(is_accepting_clients);
```

#### 4. Services Table (Enhanced)
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  detailed_description TEXT,
  category service_category_enum NOT NULL,
  subcategory VARCHAR(100),

  -- Pricing Information
  base_price DECIMAL(10,2),
  price_type pricing_type_enum DEFAULT 'fixed',
  price_range_min DECIMAL(10,2),
  price_range_max DECIMAL(10,2),

  -- Service Details
  duration_days INTEGER,
  complexity_level complexity_enum DEFAULT 'medium',
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,

  -- Requirements & Deliverables (JSONB for flexibility)
  requirements JSONB,
  deliverables JSONB,
  process_steps JSONB,

  -- SEO & Content
  seo_title VARCHAR(255),
  seo_description TEXT,
  featured_image_url TEXT,
  gallery_images JSONB,

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),

  -- Full-text search
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || COALESCE(detailed_description, ''))
  ) STORED
);

-- Enums for services
CREATE TYPE service_category_enum AS ENUM (
  'tax_planning', 'tax_filing', 'audit_assurance', 'business_advisory',
  'gst_services', 'company_registration', 'compliance', 'bookkeeping',
  'financial_planning', 'international_tax', 'transfer_pricing', 'litigation'
);

CREATE TYPE pricing_type_enum AS ENUM ('fixed', 'hourly', 'range', 'custom');
CREATE TYPE complexity_enum AS ENUM ('simple', 'medium', 'complex', 'expert');

-- Indexes for services
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_featured ON services(is_featured);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_search ON services USING GIN(search_vector);
```

#### 5. Service Requests Table (Enhanced)
```sql
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number VARCHAR(20) UNIQUE NOT NULL, -- Auto-generated: SR-2024-001

  -- Relationships
  client_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  assigned_ca_id UUID REFERENCES users(id),

  -- Request Details
  status request_status_enum DEFAULT 'pending',
  priority priority_enum DEFAULT 'medium',
  urgency urgency_enum DEFAULT 'normal',

  -- Descriptions & Requirements
  title VARCHAR(255) NOT NULL,
  description TEXT,
  client_requirements JSONB,
  internal_notes TEXT,

  -- Timeline
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estimated_start_date DATE,
  estimated_completion_date DATE,
  actual_start_date DATE,
  actual_completion_date DATE,

  -- Financial
  quoted_amount DECIMAL(10,2),
  final_amount DECIMAL(10,2),
  payment_status payment_status_enum DEFAULT 'pending',

  -- Progress Tracking
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  current_stage VARCHAR(100),

  -- Communication
  last_client_communication TIMESTAMP,
  last_ca_communication TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enums for service requests
CREATE TYPE request_status_enum AS ENUM (
  'pending', 'assigned', 'in_progress', 'review', 'completed',
  'cancelled', 'on_hold', 'revision_required'
);

CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high', 'urgent', 'critical');
CREATE TYPE urgency_enum AS ENUM ('normal', 'urgent', 'asap');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'partial', 'paid', 'overdue', 'waived');

-- Indexes for service requests
CREATE INDEX idx_service_requests_client ON service_requests(client_id);
CREATE INDEX idx_service_requests_ca ON service_requests(assigned_ca_id);
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_priority ON service_requests(priority);
CREATE INDEX idx_service_requests_number ON service_requests(request_number);
```

#### 6. Documents Table (Enhanced)
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  service_request_id UUID REFERENCES service_requests(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  client_id UUID REFERENCES client_profiles(id),

  -- File Information
  original_filename VARCHAR(255) NOT NULL,
  stored_filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  mime_type VARCHAR(100),

  -- Document Classification
  document_category document_category_enum NOT NULL,
  document_type VARCHAR(100),
  document_subtype VARCHAR(100),

  -- Security & Access
  is_confidential BOOLEAN DEFAULT true,
  access_level access_level_enum DEFAULT 'private',
  encryption_key VARCHAR(255), -- For encrypted documents

  -- Document Status
  status document_status_enum DEFAULT 'uploaded',
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP,

  -- Metadata
  description TEXT,
  tags JSONB,
  version INTEGER DEFAULT 1,
  parent_document_id UUID REFERENCES documents(id), -- For versioning

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP -- For temporary documents
);

-- Enums for documents
CREATE TYPE document_category_enum AS ENUM (
  'requirement', 'deliverable', 'supporting', 'communication',
  'legal', 'financial', 'identity', 'compliance'
);

CREATE TYPE access_level_enum AS ENUM ('public', 'client', 'ca_only', 'admin_only', 'private');
CREATE TYPE document_status_enum AS ENUM ('uploaded', 'processing', 'verified', 'rejected', 'archived');

-- Indexes for documents
CREATE INDEX idx_documents_service_request ON documents(service_request_id);
CREATE INDEX idx_documents_client ON documents(client_id);
CREATE INDEX idx_documents_category ON documents(document_category);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);
```
```
