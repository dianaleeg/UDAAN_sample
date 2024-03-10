// frontend.js
const form = document.getElementById('inputForm');
const textInput = document.getElementById('textInput');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userInput = textInput.value; // Capture the user's input from the textarea

  try {
    const response = await fetch('http://localhost:3000/generate-text', { // Update the URL to point to localhost
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    console.log(data.generatedText);
    document.getElementById('generated-text').innerText = data.generatedText; // Display generated text on the webpage
  } catch (error) {
    console.error('Error:', error);
  }
});
