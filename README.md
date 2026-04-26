# Medical Q&A Application

A Node.js application that allows patients to ask medical questions about vaccine side effects and other medical topics. The application uses OpenAI's API to generate evidence-based responses and sends detailed reports via email.

## Features

- 🤖 **AI-Powered Responses**: Uses OpenAI GPT-4 for accurate medical information
- 📧 **Automated Email Reports**: Sends detailed Q&A reports to patients
- � **Web App Interface**: Invia domande direttamente dal browser
- �🏥 **Medical Focus**: Specialized in vaccine information and adverse effects
- 🔒 **CORS Enabled**: Secure cross-origin requests
- ⚡ **Fast Processing**: Optimized response handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key
- Email account (Gmail recommended) with app password

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "VS vaccini AI"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   Copy .env.example to .env and fill in your credentials
   ```
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**

   Open `.env` and fill in:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASSWORD`: Gmail app password (not regular password)
   - `EMAIL_RECIPIENT`: Where to CC the reports
   - `PORT`: Server port (default: 3000)

## Getting API Keys and Passwords

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy it to `.env`

### Gmail App Password
1. Enable 2-Step Verification on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Generate and copy the app password to `.env`

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:3000` by default. 

Once avviato, apri il browser e visita:
- `http://localhost:3000` se usi la porta predefinita
- `http://localhost:PORT` se hai cambiato `PORT` in `.env`

La webapp include un modulo per inviare domande direttamente al backend e ricevere la risposta IA insieme all'email di report.

## Deploy su Render

1. Metti il progetto in un repository GitHub.
2. Crea un account su https://render.com e collega GitHub.
3. Crea un nuovo servizio Web:
   - Repository: il tuo repo
   - Branch: `main` (o il branch che usi)
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Aggiungi le variabili d'ambiente su Render (non metterle in Git):
   - `OPENAI_API_KEY`
   - `EMAIL_SERVICE` = `gmail`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `EMAIL_FROM`
   - `EMAIL_RECIPIENT`
   - `PORT` = `3000`
5. Avvia il deploy.

Render userà il file `render.yaml` se presente per configurare il servizio.

## API Endpoints

### POST /api/qa/ask
Submit a medical question

**Request:**
```json
{
  "question": "Quali sono gli effetti avversi comuni del vaccino anti-COVID?",
  "patientName": "Mario Rossi",
  "patientEmail": "mario@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "requestId": "uuid-string",
  "message": "Question processed and report sent",
  "data": {
    "question": "...",
    "aiResponse": "...",
    "patientName": "Mario Rossi",
    "patientEmail": "mario@example.com",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "processingTime": "1234ms"
  }
}
```

### GET /api/qa/status
Check if the Q&A service is running

**Response:**
```json
{
  "status": "Q&A service is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "Server is running"
}
```

## Project Structure

```
src/
├── server.js              # Main application file
├── routes/
│   └── qaRoutes.js       # Q&A API routes
├── services/
│   ├── openaiService.js  # OpenAI integration
│   └── emailService.js   # Email sending service
└── utils/
    └── logger.js         # Logging utilities (optional)

.github/
└── copilot-instructions.md

.env.example              # Example environment variables
.gitignore               # Git ignore rules
package.json             # Project dependencies
```

## Usage Example

### Using cURL
```bash
curl -X POST http://localhost:3000/api/qa/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Quali sono i possibili effetti collaterali del vaccino?",
    "patientName": "Giovanni Bianchi",
    "patientEmail": "giovanni@example.com"
  }'
```

### Using JavaScript/Fetch
```javascript
const askQuestion = async () => {
  const response = await fetch('http://localhost:3000/api/qa/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: 'Quali sono gli effetti avversi comuni del vaccino?',
      patientName: 'Mario Rossi',
      patientEmail: 'mario@example.com'
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

## Troubleshooting

### Email not sending
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Ensure "Less secure apps" is disabled (using app passwords)

### OpenAI API errors
- Verify API key is valid
- Check API key has sufficient credits
- Ensure rate limits aren't exceeded

### CORS errors
- Backend should have CORS enabled (it does by default)
- Check your frontend is using correct API endpoint

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| OPENAI_API_KEY | OpenAI API authentication key | sk-... |
| EMAIL_SERVICE | Email service provider | gmail |
| EMAIL_USER | Email account username | user@gmail.com |
| EMAIL_PASSWORD | Email app password | abcd efgh ijkl mnop |
| EMAIL_FROM | Sender email address | user@gmail.com |
| EMAIL_RECIPIENT | CC recipient for reports | admin@example.com |
| PORT | Server port | 3000 |
| NODE_ENV | Environment mode | development |
| MAX_TOKENS | OpenAI max response tokens | 1000 |
| TEMPERATURE | OpenAI response creativity | 0.7 |

## License

ISC

## Support

For issues or questions, please check the troubleshooting section or review the environment variables configuration.
