import nodemailer from 'nodemailer'

// For development: log emails to console instead of sending
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'test@example.com',
    pass: process.env.SMTP_PASS || 'test',
  },
})

export async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { server, from },
}: {
  identifier: string
  url: string
  provider: {
    server: any
    from: string
  }
}) {
  // Validate UCI email
  if (!email.endsWith('@uci.edu')) {
    throw new Error('Only @uci.edu email addresses are allowed to register')
  }

  const { host } = new URL(url)

  // Custom email template for UCI
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #0064A4, #6BA4D9);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .logo {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .content {
            background: white;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          .button {
            display: inline-block;
            background: #FFD200;
            color: #1B3D6D;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 0.9em;
          }
          .mascot {
            font-size: 2em;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Zotpool</div>
          <div class="mascot">🐻‍❄️🚗</div>
          <p>UCI Carpooling Platform</p>
        </div>
        <div class="content">
          <h2>Welcome to the UCI Carpooling Community!</h2>
          <p>Hi there,</p>
          <p>
            You're one click away from joining the sustainable commuting revolution at UCI!
            Click the button below to sign in to your Zotpool account and start connecting
            with fellow Anteaters for eco-friendly rides.
          </p>
          <div style="text-align: center;">
            <a href="${url}" class="button">Sign in to Zotpool</a>
          </div>
          <p>
            <strong>Why Zotpool?</strong><br>
            🌍 Reduce your carbon footprint<br>
            💰 Save money on gas and parking<br>
            🤝 Meet fellow UCI community members<br>
            ⚡ AI-powered smart matching
          </p>
          <p>
            If you didn't request this email, you can safely ignore it. Only UCI community
            members with @uci.edu email addresses can access Zotpool.
          </p>
          <p>
            ZOT ZOT!<br>
            The Zotpool Team
          </p>
        </div>
        <div class="footer">
          <p>This email was sent to ${email}</p>
          <p>© 2025 Zotpool - UCI Carpooling Platform</p>
        </div>
      </body>
    </html>
  `

  const text = `
    Welcome to Zotpool - UCI Carpooling Platform!

    You're one click away from joining the sustainable commuting revolution at UCI!

    Sign in to your Zotpool account: ${url}

    Why Zotpool?
    - Reduce your carbon footprint
    - Save money on gas and parking
    - Meet fellow UCI community members
    - AI-powered smart matching

    If you didn't request this email, you can safely ignore it.

    ZOT ZOT!
    The Zotpool Team
  `

  // For development: log the signin URL to console
  if (process.env.NODE_ENV === 'development') {
    console.log('\n===========================================')
    console.log('🔐 MAGIC LINK FOR SIGNIN')
    console.log('===========================================')
    console.log('Email:', email)
    console.log('Signin URL:', url)
    console.log('===========================================\n')
  }

  try {
    await transporter.sendMail({
      to: email,
      from: `Zotpool <${from}>`,
      subject: `🐻‍❄️ Sign in to Zotpool - UCI Carpooling`,
      text,
      html,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    // In development, don't throw error - we logged the URL above
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Failed to send verification email')
    }
  }
}