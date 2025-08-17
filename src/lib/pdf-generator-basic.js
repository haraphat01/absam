// Basic PDF generator that creates a simple text-based PDF
// This is a fallback when react-pdf has issues

export const generateBasicPDF = async (invoice) => {
  try {
    console.log('Generating basic PDF for invoice:', invoice.invoice_number)
    
    // Create a simple text-based PDF content
    const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
100 700 Td
(Invoice ${invoice.invoice_number}) Tj
/F1 12 Tf
0 -30 Td
(Client: ${invoice.client_name}) Tj
0 -20 Td
(Email: ${invoice.client_email}) Tj
0 -20 Td
(Amount: $${invoice.total_amount}) Tj
0 -20 Td
(Status: ${invoice.status}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000256 00000 n 
0000000476 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
580
%%EOF
`
    
    // Convert to buffer
    const pdfBuffer = Buffer.from(pdfContent, 'utf8')
    console.log('Basic PDF buffer created, length:', pdfBuffer.length)
    
    return pdfBuffer
  } catch (error) {
    console.error('Error generating basic PDF:', error)
    throw new Error('Failed to generate basic PDF: ' + error.message)
  }
}
