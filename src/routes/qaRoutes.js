const express = require('express');
const { v4: uuidv4 } = require('uuid');
const openaiService = require('../services/openaiService');
const emailService = require('../services/emailService');

const router = express.Router();

// POST endpoint to submit a medical question
router.post('/ask', async (req, res) => {
  const requestId = uuidv4();
  const startTime = Date.now();

  try {
    const { question, patientName, patientEmail } = req.body;

    // Validate input
    if (!question || !patientName || !patientEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: question, patientName, patientEmail'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(patientEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    console.log(`[${requestId}] Processing question from ${patientName}`);

    // Generate response from OpenAI
    const aiResponse = await openaiService.generateResponse(question);

    // Send email with the Q&A report
    await emailService.sendQAReport(patientEmail, patientName, question, aiResponse);

    const processingTime = Date.now() - startTime;

    res.json({
      success: true,
      requestId,
      message: 'Question processed and report sent',
      data: {
        question,
        aiResponse,
        patientName,
        patientEmail,
        timestamp: new Date().toISOString(),
        processingTime: `${processingTime}ms`
      }
    });

    console.log(`[${requestId}] Completed in ${processingTime}ms`);
  } catch (error) {
    console.error(`[${requestId}] Error:`, error.message);
    
    res.status(500).json({
      success: false,
      requestId,
      error: error.message || 'An error occurred processing your question'
    });
  }
});

// GET endpoint to check service status
router.get('/status', (req, res) => {
  res.json({
    status: 'Q&A service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
