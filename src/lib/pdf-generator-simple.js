import React from 'react'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

// Simple styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
  },
})

// Simple PDF component
const SimplePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Invoice {invoice.invoice_number}</Text>
      <Text style={styles.content}>Client: {invoice.client_name}</Text>
      <Text style={styles.content}>Email: {invoice.client_email}</Text>
      <Text style={styles.content}>Amount: ${invoice.total_amount}</Text>
      <Text style={styles.content}>Status: {invoice.status}</Text>
    </Page>
  </Document>
)

// Simple PDF generation function
export const generateSimplePDF = async (invoice) => {
  try {
    console.log('Generating simple PDF for invoice:', invoice.invoice_number)
    
    const doc = <SimplePDF invoice={invoice} />
    console.log('Document created')
    
    const pdfDoc = pdf(doc)
    console.log('PDF document created')
    
    const pdfBuffer = await pdfDoc.toBuffer()
    console.log('PDF buffer created, length:', pdfBuffer.length)
    
    return pdfBuffer
  } catch (error) {
    console.error('Error generating simple PDF:', error)
    throw new Error('Failed to generate simple PDF: ' + error.message)
  }
}
