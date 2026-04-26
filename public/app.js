const form = document.getElementById('qaForm');
const statusBox = document.getElementById('statusBox');
const answerCard = document.getElementById('answerCard');
const aiResponseEl = document.getElementById('aiResponse');
const submitButton = document.getElementById('submitButton');

const apiBase = window.location.origin + '/api/qa';

function setStatus(message, isError = false) {
  statusBox.textContent = message;
  statusBox.style.color = isError ? '#b91c1c' : '#1f2937';
}

function showAnswer(text) {
  aiResponseEl.textContent = text;
  answerCard.hidden = false;
}

function clearAnswer() {
  aiResponseEl.textContent = '';
  answerCard.hidden = true;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearAnswer();

  const data = {
    question: form.question.value.trim(),
    patientName: form.patientName.value.trim(),
    patientEmail: form.patientEmail.value.trim()
  };

  if (!data.question || !data.patientName || !data.patientEmail) {
    setStatus('Compila tutti i campi prima di inviare.', true);
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Invio in corso…';
  setStatus('Sto inviando la tua domanda, attendi...');

  try {
    const response = await fetch(`${apiBase}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!result.success) {
      setStatus(result.error || 'Errore durante l’invio della richiesta.', true);
      return;
    }

    setStatus('Domanda inviata con successo. Controlla la tua email per il report.');
    showAnswer(result.data.aiResponse || 'Risposta ricevuta, apri la tua email.');
  } catch (error) {
    console.error(error);
    setStatus('Errore di rete o del server. Riprova più tardi.', true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Invia domanda';
  }
});
