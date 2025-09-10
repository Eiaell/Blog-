# EmailJS Configuration Guide

## Overview
The newsletter subscription is now configured to use EmailJS for sending emails directly from the frontend without requiring a backend server.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month limit)
3. Verify your email address

### 2. Configure Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Easiest setup, just authorize with OAuth
   - **Outlook**: Works well for professional emails
   - **Custom SMTP**: For other providers
4. Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Templates
You need to create TWO templates:

#### Template 1: Admin Notification (existing)
1. Go to **Email Templates**
2. Use this template structure:

```
Subject: Nueva Suscripción al Newsletter

Hola {{to_name}},

Nueva persona suscrita a tu newsletter:
- Email: {{user_email}}
- Nombre: {{from_name}}

Mensaje: {{message}}

---
Enviado desde engelberthuber.com
```

Template variables: `to_name`, `user_email`, `from_name`, `message`
Copy the **Template ID** (e.g., `template_xyz789`)

#### Template 2: Welcome Email for Users (NEW)
1. Create a second template with this content:

```
Subject: ¡Bienvenido al Newsletter de Engelbert Huber! 🤖

Hola {{user_name}},

¡Gracias por suscribirte a mi newsletter sobre IA y análisis tecnológico-político!

Estás ahora en la lista para recibir:
✓ Insights semanales sobre IA generativa
✓ Análisis político-tecnológico exclusivo  
✓ Tendencias que están moldeando el futuro digital en Perú
✓ Herramientas y recursos de IA práctica

Tu primer newsletter llegará muy pronto con contenido exclusivo.

Mientras tanto, puedes:
- Visitar mi blog: https://tu-dominio.com
- Seguirme en Twitter: https://x.com/EngelHuQ
- Conectar en LinkedIn: https://www.linkedin.com/in/engelbert-huber-q-a95348298/

Si tienes alguna pregunta o sugerencia, puedes responder directamente a este email.

¡Bienvenido a bordo!

Saludos,
Engelbert Huber
Operador de IA & Estrategia Digital

---
IA generativa + data empresarial: reimaginando el futuro tecnológico en Perú

P.S: Si no deseas recibir más emails, puedes cancelar tu suscripción respondiendo con "UNSUSCRIBE".
```

Template variables: `user_name`, `user_email`
Copy the **Welcome Template ID** (e.g., `template_welcome_abc123`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `pk_test_abc123def456`)

### 5. Update Environment Variables
Edit `.env.local` file with your actual values:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID=template_welcome_abc123
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=pk_test_abc123def456
```

### 6. Test the Integration
1. Start your development server: `npm run dev`
2. Navigate to the newsletter section
3. Enter a test email address
4. Click "Suscribirme"
5. Check your email for the subscription notification

## Features Implemented

✅ **Dual email sending** via EmailJS
✅ **Admin notification** - You receive subscription alerts
✅ **User welcome email** - Users get automatic confirmation
✅ **Form validation** with error handling
✅ **Loading states** during submission
✅ **Success/error messages** with animations
✅ **Auto-reset** success message after 5 seconds
✅ **Input validation** with visual feedback
✅ **Disabled state** for empty emails

## Troubleshooting

### Common Issues:

1. **"Service not found" error**
   - Verify NEXT_PUBLIC_EMAILJS_SERVICE_ID is correct
   - Check that the email service is active in EmailJS dashboard

2. **"Template not found" error**
   - Verify NEXT_PUBLIC_EMAILJS_TEMPLATE_ID is correct
   - Ensure template is published in EmailJS

3. **"Invalid public key" error**
   - Verify NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is correct
   - Check that the key is copied exactly from dashboard

4. **Emails not being received**
   - Check spam folder
   - Verify email service is properly connected
   - Test with different email addresses

### Rate Limits:
- Free plan: 200 emails/month
- Upgrade to paid plans for higher limits

## Security Notes

- Public keys are safe to expose in frontend code
- EmailJS handles all sensitive email credentials
- No backend server required
- All communication is encrypted (HTTPS)

## Production Deployment

The current setup works automatically in production because:
- Environment variables are properly prefixed with `NEXT_PUBLIC_`
- EmailJS works from any domain (configure allowed domains in dashboard)
- No additional server configuration needed

## Support

For EmailJS-specific issues:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/docs/support/)