# 📋 Setup Checklist - Medical Q&A Application

## ✅ Completed Steps

- [x] Project structure created
- [x] All source files generated
- [x] Configuration templates created
- [x] README documentation complete

## ⏳ Next Steps

### 1. Install Node.js
Node.js is required but not detected on your system.

**Download from:** https://nodejs.org/
- Download the LTS (Long Term Support) version
- Run the installer and follow the wizard
- Restart your terminal/VS Code

**Verify installation:**
```powershell
node --version
npm --version
```

### 2. Install Dependencies
Once Node.js is installed, run:

```powershell
cd "c:\Users\tomma\OneDrive\Desktop\VS vaccini AI"
npm install
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Open `.env` and fill in your credentials:

**OpenAI Configuration:**
- Go to https://platform.openai.com/api-keys
- Create a new API key
- Paste into `OPENAI_API_KEY`

**Gmail Configuration:**
- Go to https://myaccount.google.com/security
- Enable 2-Step Verification
- Go to https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer"
- Copy the generated password to `EMAIL_PASSWORD`
- Set `EMAIL_USER` to your Gmail address

### 4. Run the Application

**Development mode (auto-reload on file changes):**
```powershell
npm run dev
```

**Production mode:**
```powershell
npm start
```

The server will start on `http://localhost:3000`

### 5. Test the API

Use the REST client with `test.http` file:
- Install "REST Client" extension in VS Code (if not already installed)
- Open `test.http`
- Click "Send Request" above each endpoint

Or use cURL:
```powershell
curl -X POST http://localhost:3000/api/qa/ask `
  -H "Content-Type: application/json" `
  -d @body.json
```

## 📝 Files Created

```
VS vaccini AI/
├── .github/
│   └── copilot-instructions.md
├── src/
│   ├── server.js                 (Main app)
│   ├── routes/
│   │   └── qaRoutes.js          (API endpoints)
│   ├── services/
│   │   ├── openaiService.js     (OpenAI integration)
│   │   └── emailService.js      (Email reporting)
│   └── utils/
│       └── logger.js             (Logging utility)
├── .env.example                  (Configuration template)
├── .gitignore
├── package.json                  (Dependencies)
├── README.md                     (Full documentation)
└── test.http                     (API test file)
```

## 🚀 Quick Start Command

After installing Node.js and npm:
```powershell
cd "c:\Users\tomma\OneDrive\Desktop\VS vaccini AI"
npm install
Copy-Item .env.example .env
# Edit .env with your credentials
npm run dev
```

## 📧 Email Configuration Tips

- Use Gmail for best results
- **Never** use your real Gmail password in `.env`
- Always use an **App Password** (16 characters)
- If using different email service, update `EMAIL_SERVICE` in `.env`

## 🔑 Security Notes

- Never commit `.env` file to git (it's in `.gitignore`)
- Rotate API keys regularly
- Keep email passwords secure
- Use environment variables for sensitive data

## ❓ Troubleshooting

**npm: command not found**
- Ensure Node.js is installed
- Restart terminal after installing Node.js
- Check PATH environment variable

**Email not sending**
- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Ensure port is not blocked by firewall

**OpenAI API errors**
- Verify API key is valid
- Check API key has available credits
- Ensure rate limits aren't exceeded

For more details, see README.md in the project root.
