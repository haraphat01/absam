# Requirements Document

## Introduction

This document outlines the requirements for developing a comprehensive website for Absad MultiSynergy Limited, an import/export company specializing in charcoal and firewood. The system will include a public-facing website showcasing company information and services, plus a complete admin dashboard for managing testimonials, invoices, container tracking, and company settings. The solution will be built using Next.js 14 with Supabase for backend services and Resend for email functionality.

## Requirements

### Requirement 1: Public Website Foundation

**User Story:** As a potential customer, I want to view professional company information and services, so that I can understand Absad MultiSynergy's offerings and contact them for business inquiries.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the system SHALL display a hero section with company tagline and call-to-action buttons
2. WHEN a user navigates to the About Us page THEN the system SHALL display company mission, investment opportunities, and warehouse information
3. WHEN a user visits the Products page THEN the system SHALL display detailed information about charcoal and firewood with images
4. WHEN a user accesses any page THEN the system SHALL display contact information including phone and address
5. WHEN a user views the site on mobile devices THEN the system SHALL provide a fully responsive design

### Requirement 2: Video Testimonials System

**User Story:** As a potential customer, I want to view video testimonials from other clients, so that I can build trust in the company's services.

#### Acceptance Criteria

1. WHEN a user visits the testimonials page THEN the system SHALL fetch and display video testimonials from Supabase storage
2. WHEN testimonials are loaded THEN the system SHALL display them in an organized, visually appealing format
3. IF no testimonials exist THEN the system SHALL display an appropriate message

### Requirement 3: Container Tracking System

**User Story:** As a customer, I want to track my container shipments online, so that I can monitor the status and location of my goods.

#### Acceptance Criteria

1. WHEN a user enters a container ID THEN the system SHALL query the third-party tracking API and display current status, location, and last update
2. WHEN a container ID is not found THEN the system SHALL display an appropriate error message
3. WHEN container information is displayed THEN the system SHALL show status, current location, and timestamp of last update
4. WHEN a user searches for a container THEN the system SHALL validate the input format before querying
5. WHEN the third-party API is unavailable THEN the system SHALL display an appropriate service unavailable message

### Requirement 4: Contact Form System

**User Story:** As a potential customer, I want to submit inquiries through a contact form, so that I can communicate with the company about their services.

#### Acceptance Criteria

1. WHEN a user submits the contact form THEN the system SHALL send an email via Resend API
2. WHEN a contact form is submitted THEN the system SHALL store the inquiry in Supabase database
3. WHEN form validation fails THEN the system SHALL display appropriate error messages
4. WHEN form submission is successful THEN the system SHALL display a confirmation message

### Requirement 5: Admin Authentication and Authorization

**User Story:** As an admin user, I want to securely log into the admin dashboard, so that I can manage company data and operations.

#### Acceptance Criteria

1. WHEN an admin attempts to log in THEN the system SHALL authenticate using Supabase Auth
2. WHEN authentication is successful THEN the system SHALL establish a secure session
3. WHEN accessing admin routes THEN the system SHALL verify user role (ADMIN or STAFF)
4. WHEN unauthorized access is attempted THEN the system SHALL redirect to login page
5. WHEN password is entered THEN the system SHALL use secure hashing for storage

### Requirement 6: Admin Dashboard Overview

**User Story:** As an admin user, I want to view key metrics on the dashboard, so that I can monitor business operations at a glance.

#### Acceptance Criteria

1. WHEN an admin accesses the dashboard THEN the system SHALL display monthly invoice count (total, paid, unpaid)
2. WHEN the dashboard loads THEN the system SHALL show testimonials uploaded this month
3. WHEN the dashboard is viewed THEN the system SHALL display contact inquiries count for the current month
4. WHEN metrics are calculated THEN the system SHALL use current month data

### Requirement 7: Testimonials Management

**User Story:** As an admin user, I want to upload and manage video testimonials, so that I can showcase customer feedback on the public website.

#### Acceptance Criteria

1. WHEN an admin uploads a video THEN the system SHALL store it in Supabase storage
2. WHEN a video is uploaded THEN the system SHALL record the uploader and timestamp
3. WHEN an admin deletes a testimonial THEN the system SHALL remove it from storage and database
4. WHEN testimonials are listed THEN the system SHALL display upload date and uploader information
5. WHEN video upload fails THEN the system SHALL display appropriate error messages

### Requirement 8: Invoice Management System

**User Story:** As an admin user, I want to create, manage, and send invoices with automatic banking details, so that I can efficiently handle billing for customers.

#### Acceptance Criteria

1. WHEN an admin creates an invoice THEN the system SHALL auto-generate invoice number in format INV-YYYYMM-XXXX
2. WHEN invoice details are entered THEN the system SHALL capture client name, email, and itemized list with quantities and prices
3. WHEN an invoice is created THEN the system SHALL automatically include banking details from company settings
4. WHEN invoice status is set THEN the system SHALL track PAID or UNPAID status
5. WHEN an invoice is saved THEN the system SHALL store it in Supabase database
6. WHEN an admin updates invoice status THEN the system SHALL record the change with timestamp

### Requirement 9: PDF Invoice Generation and Distribution

**User Story:** As an admin user, I want to generate and send professional PDF invoices, so that I can provide customers with proper documentation and payment instructions.

#### Acceptance Criteria

1. WHEN an invoice PDF is generated THEN the system SHALL include company logo and details
2. WHEN PDF is created THEN the system SHALL include all invoice items with quantities and prices
3. WHEN PDF is generated THEN the system SHALL include banking details in the footer
4. WHEN an admin sends an invoice THEN the system SHALL use Resend API to email PDF attachment
5. WHEN invoice email is sent THEN the system SHALL include banking details in email body
6. WHEN PDF is generated THEN the system SHALL provide option to download locally
7. WHEN invoice is processed THEN the system SHALL store PDF URL in database

### Requirement 10: Container Tracking Management

**User Story:** As an admin user, I want to manage container tracking information, so that customers can monitor their shipments online.

#### Acceptance Criteria

1. WHEN an admin adds container tracking THEN the system SHALL capture container ID, status, location, and timestamp
2. WHEN container status is updated THEN the system SHALL record the change with current timestamp
3. WHEN an admin deletes tracking info THEN the system SHALL remove it from the database
4. WHEN tracking data is entered THEN the system SHALL validate container ID format
5. WHEN status is updated THEN the system SHALL support predefined statuses (In Transit, Delivered, etc.)

### Requirement 11: User Management System

**User Story:** As an admin user, I want to manage other admin accounts, so that I can control access to the admin dashboard.

#### Acceptance Criteria

1. WHEN an admin creates a new account THEN the system SHALL capture email and assign role (ADMIN or STAFF)
2. WHEN user roles are assigned THEN the system SHALL enforce different permission levels
3. WHEN an admin deactivates an account THEN the system SHALL prevent login access
4. WHEN user accounts are listed THEN the system SHALL display role and status information
5. WHEN account creation fails THEN the system SHALL display appropriate error messages

### Requirement 12: Company Settings Management

**User Story:** As an admin user, I want to update company banking and payment details, so that invoices automatically include current payment information without code changes.

#### Acceptance Criteria

1. WHEN banking details are updated THEN the system SHALL store bank name, account name, account number, SWIFT/BIC code, and currency
2. WHEN settings are saved THEN the system SHALL validate required fields
3. WHEN invoices are generated THEN the system SHALL automatically fetch current banking details
4. WHEN settings are updated THEN the system SHALL record timestamp of changes
5. WHEN invalid banking information is entered THEN the system SHALL display validation errors

### Requirement 13: System Performance and Security

**User Story:** As a user, I want the website to load quickly and securely, so that I can efficiently access information and services.

#### Acceptance Criteria

1. WHEN any page is loaded THEN the system SHALL complete loading within 2 seconds
2. WHEN data is transmitted THEN the system SHALL use HTTPS encryption
3. WHEN files are uploaded THEN the system SHALL implement secure file upload validation
4. WHEN the system handles traffic THEN it SHALL support 10,000+ monthly visitors
5. WHEN authentication occurs THEN the system SHALL use secure session management

### Requirement 14: Email Communication System

**User Story:** As the system, I want to send professional emails for invoices and contact responses, so that communication appears professional and consistent.

#### Acceptance Criteria

1. WHEN emails are sent THEN the system SHALL use invoices@absadmultisynergy.com or verified domain
2. WHEN invoice emails are sent THEN the system SHALL include PDF attachment and payment details in body
3. WHEN contact form responses are sent THEN the system SHALL use Resend API
4. WHEN email sending fails THEN the system SHALL log errors and provide user feedback
5. WHEN emails are sent THEN the system SHALL maintain delivery tracking