-- Function to generate invoice numbers in format INV-YYYYMM-XXXX
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    current_month TEXT;
    sequence_number INTEGER;
    invoice_number TEXT;
BEGIN
    -- Get current year and month in YYYYMM format
    current_month := TO_CHAR(NOW(), 'YYYYMM');
    
    -- Get the next sequence number for this month
    SELECT COALESCE(MAX(
        CAST(
            SUBSTRING(invoice_number FROM 'INV-' || current_month || '-(\d+)') 
            AS INTEGER
        )
    ), 0) + 1
    INTO sequence_number
    FROM public.invoices
    WHERE invoice_number LIKE 'INV-' || current_month || '-%';
    
    -- Format the invoice number with zero-padded sequence
    invoice_number := 'INV-' || current_month || '-' || LPAD(sequence_number::TEXT, 4, '0');
    
    RETURN invoice_number;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically set invoice number on insert
CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
        NEW.invoice_number := generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate invoice numbers
CREATE TRIGGER trigger_set_invoice_number
    BEFORE INSERT ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION set_invoice_number();