-- Create email_logs table for tracking sent emails
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    contact_inquiry_id UUID REFERENCES contact_inquiries(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    email_type VARCHAR(50) DEFAULT 'invoice' CHECK (email_type IN ('invoice', 'reminder', 'overdue', 'contact_response', 'welcome', 'quote_followup', 'general')),
    subject TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'failed', 'bounced')),
    resend_email_id VARCHAR(255), -- Store Resend's email ID for tracking
    error_message TEXT,
    sent_by UUID REFERENCES users(id),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_logs_invoice_id ON email_logs(invoice_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);

-- Create RLS policies for email_logs
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all email logs (admin access)
CREATE POLICY "Users can view email logs" ON email_logs
    FOR SELECT USING (true);

-- Policy: Users can insert email logs
CREATE POLICY "Users can insert email logs" ON email_logs
    FOR INSERT WITH CHECK (true);

-- Policy: Users can update email logs
CREATE POLICY "Users can update email logs" ON email_logs
    FOR UPDATE USING (true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_logs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_email_logs_updated_at
    BEFORE UPDATE ON email_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_email_logs_updated_at();

-- Add email_sent_count to invoices table for quick reference
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS email_sent_count INTEGER DEFAULT 0;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS last_email_sent_at TIMESTAMP WITH TIME ZONE;

-- Function to update invoice email stats
CREATE OR REPLACE FUNCTION update_invoice_email_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE invoices 
        SET 
            email_sent_count = COALESCE(email_sent_count, 0) + 1,
            last_email_sent_at = NEW.sent_at
        WHERE id = NEW.invoice_id;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update invoice email stats when email is logged
CREATE TRIGGER update_invoice_email_stats_trigger
    AFTER INSERT ON email_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_invoice_email_stats();