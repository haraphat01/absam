import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer'

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    width: 120,
    height: 60,
    objectFit: 'contain',
  },
  companyInfo: {
    alignItems: 'flex-end',
    flex: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
    lineHeight: 1.4,
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  clientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  clientDetails: {
    flex: 1,
  },
  invoiceDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 3,
  },
  value: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  tableCell: {
    fontSize: 11,
    color: '#6B7280',
  },
  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 12,
    color: '#374151',
  },
  totalValue: {
    fontSize: 12,
    color: '#374151',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#1F2937',
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  bankingSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bankingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  bankingDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bankingItem: {
    width: '50%',
    marginBottom: 8,
  },
  bankingLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
  },
  bankingValue: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9CA3AF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 15,
  },
  statusBadge: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  statusPaid: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
})

// PDF Document Component
const InvoicePDF = ({ invoice, companySettings }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>Absad MultiSynergy Limited</Text>
            <Text style={styles.companyDetails}>
              Import & Export Company{'\n'}
              Specializing in Charcoal & Firewood{'\n'}
              CAC Certified Business
            </Text>
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoice_number}</Text>
            <View style={[
              styles.statusBadge, 
              invoice.status === 'PAID' ? styles.statusPaid : {}
            ]}>
              <Text>{invoice.status}</Text>
            </View>
          </View>
        </View>

        {/* Client and Invoice Information */}
        <View style={styles.clientInfo}>
          <View style={styles.clientDetails}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            <Text style={styles.label}>Client Name</Text>
            <Text style={styles.value}>{invoice.client_name}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{invoice.client_email}</Text>
          </View>
          <View style={styles.invoiceDetails}>
            <Text style={styles.label}>Invoice Date</Text>
            <Text style={styles.value}>{formatDate(invoice.created_at)}</Text>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>
              {formatDate(new Date(new Date(invoice.created_at).getTime() + 30 * 24 * 60 * 60 * 1000))}
            </Text>
          </View>
        </View>

        {/* Invoice Items Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Items</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Quantity</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Unit Price</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total</Text>
              </View>
            </View>

            {/* Table Rows */}
            {invoice.items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{formatCurrency(item.price)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{formatCurrency(item.total || item.quantity * item.price)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total Amount:</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(invoice.total_amount)}</Text>
          </View>
        </View>

        {/* Banking Details */}
        {companySettings && (
          <View style={styles.bankingSection}>
            <Text style={styles.bankingTitle}>Payment Information</Text>
            <View style={styles.bankingDetails}>
              <View style={styles.bankingItem}>
                <Text style={styles.bankingLabel}>Bank Name</Text>
                <Text style={styles.bankingValue}>{companySettings.bank_name}</Text>
              </View>
              <View style={styles.bankingItem}>
                <Text style={styles.bankingLabel}>Account Name</Text>
                <Text style={styles.bankingValue}>{companySettings.account_name}</Text>
              </View>
              <View style={styles.bankingItem}>
                <Text style={styles.bankingLabel}>Account Number</Text>
                <Text style={styles.bankingValue}>{companySettings.account_number}</Text>
              </View>
              {companySettings.swift_code && (
                <View style={styles.bankingItem}>
                  <Text style={styles.bankingLabel}>SWIFT Code</Text>
                  <Text style={styles.bankingValue}>{companySettings.swift_code}</Text>
                </View>
              )}
              <View style={styles.bankingItem}>
                <Text style={styles.bankingLabel}>Currency</Text>
                <Text style={styles.bankingValue}>{companySettings.currency}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your business! Please make payment within 30 days of invoice date.
          {'\n'}For any questions regarding this invoice, please contact us.
        </Text>
      </Page>
    </Document>
  )
}

// Function to generate PDF buffer
export const generateInvoicePDF = async (invoice, companySettings) => {
  try {
    const doc = <InvoicePDF invoice={invoice} companySettings={companySettings} />
    const pdfDoc = pdf(doc)
    const pdfBuffer = await pdfDoc.toBuffer()
    return pdfBuffer
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF: ' + error.message)
  }
}

// Function to generate PDF blob (for client-side download)
export const generateInvoicePDFBlob = async (invoice, companySettings) => {
  try {
    const doc = <InvoicePDF invoice={invoice} companySettings={companySettings} />
    const pdfBlob = await pdf(doc).toBlob()
    return pdfBlob
  } catch (error) {
    console.error('Error generating PDF blob:', error)
    throw new Error('Failed to generate PDF blob: ' + error.message)
  }
}

export default InvoicePDF