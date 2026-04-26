const nodemailer = require('nodemailer');

// Create transporter for email sending
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendQAReport(patientEmail, patientName, question, aiResponse) {
  try {
    console.log('📧 Attempting to send email to:', patientEmail);
    console.log('📧 Using Gmail account:', process.env.EMAIL_USER);

    // HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 5px; }
          .section { margin: 20px 0; padding: 15px; border-left: 4px solid #3498db; background-color: #ecf0f1; }
          .question { background-color: #e8f4f8; }
          .answer { background-color: #e8f5e9; }
          .label { font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #999; }
          .disclaimer { background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Medical Q&A Report</h1>
          </div>

          <p>Caro/a ${patientName},</p>
          <p>Qui di seguito troverai il resoconto della tua domanda e la risposta fornita dall'assistente medico IA.</p>

          <div class="section question">
            <div class="label">📝 Tua Domanda:</div>
            <p>${escapeHtml(question)}</p>
          </div>

          <div class="section answer">
            <div class="label">🤖 Risposta IA:</div>
            <p>${escapeHtml(aiResponse).replace(/\n/g, '<br>')}</p>
          </div>

          <div class="disclaimer">
            <strong>⚠️ Disclaimer:</strong><br>
            Le informazioni fornite sono esclusivamente a scopo educativo e informativo.
            Non costituiscono parere medico professionale.
            Per questioni mediche specifiche, consultare sempre un professionista sanitario qualificato.
          </div>

          <div class="footer">
            <p>Questo report è stato generato automaticamente dal sistema Medical Q&A.</p>
            <p>Data: ${new Date().toLocaleString('it-IT')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: patientEmail,
      cc: process.env.EMAIL_RECIPIENT,
      subject: `Report Q&A Medico - ${new Date().toLocaleDateString('it-IT')}`,
      html: htmlContent,
      text: `Domanda: ${question}\n\nRisposta: ${aiResponse}\n\nDisclaimer: Queste informazioni sono solo educative. Consultare un professionista medico.`
    };

    console.log('📧 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      cc: mailOptions.cc,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    console.error('❌ Error details:', error.message);
    throw new Error('Failed to send email report');
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

module.exports = {
  sendQAReport
};
