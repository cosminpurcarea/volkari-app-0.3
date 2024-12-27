import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"
import { corsHeaders } from '../_shared/cors.ts'

const SMTP_HOSTNAME = Deno.env.get('SMTP_HOSTNAME') || ''
const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587')
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || ''
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || ''

interface EmailData {
  to: string
  name: string
  stats: {
    totalSessions: number
    recentAverage: number
    trend: string
  }
  encouragement: string
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, name, stats, encouragement } = await req.json() as EmailData

    // Create SMTP client
    const client = new SmtpClient()

    // Connect to SMTP server
    await client.connectTLS({
      hostname: SMTP_HOSTNAME,
      port: SMTP_PORT,
      username: SMTP_USERNAME,
      password: SMTP_PASSWORD,
    })

    // Prepare email content
    const subject = "Your DEART Progress Report"
    const content = `
      Hello ${name},

      Here's your latest progress report from DEART:

      Total Training Sessions: ${stats.totalSessions}
      Recent Average Score: ${stats.recentAverage}%
      Performance Trend: ${stats.trend}

      ${encouragement}

      Keep up the great work!

      Best regards,
      The DEART Team
    `

    // Send email
    await client.send({
      from: SMTP_USERNAME,
      to: to,
      subject: subject,
      content: content,
    })

    await client.close()

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})