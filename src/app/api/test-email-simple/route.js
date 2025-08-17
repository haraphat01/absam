import { NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'

export async function POST(request) {
  try {
    const body = await request.json()
    const { testEmail } = body

    if (!testEmail) {
      return NextResponse.json(
        { success: false, error: 'Test email address is required' },
        { status: 400 }
      )
    }

    console.log('Testing email with FROM_EMAIL:', FROM_EMAIL)

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: testEmail,
      subject: 'Test Email from Absad MultiSynergy',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify that the email service is working correctly.</p>
        <p><strong>From:</strong> ${FROM_EMAIL}</p>
        <p><strong>To:</strong> ${testEmail}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `
    })

    console.log('Resend result:', result)

    if (result.error) {
      return NextResponse.json({
        success: false,
        error: 'Failed to send email',
        details: result.error
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        emailId: result.data?.id,
        from: FROM_EMAIL,
        to: testEmail
      },
      message: 'Test email sent successfully'
    })

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({
      success: false,
      error: 'Test email failed',
      details: error.message
    }, { status: 500 })
  }
}
