// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());
// Serve static files from the directory containing your HTML and JavaScript files
app.use(express.static(__dirname));

// Define a route handler for GET requests to the root URL
app.get('/', (req, res) => {
  // Serve the HTML file located in the 'public' directory
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route handler for POST requests to "/generate-text"
app.post('/generate-text', async (req, res) => {
  const userInput = req.body.userInput;
  const aiModelDescription = ""; // add description here

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": aiModelDescription + userInput
        }
      ],
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1,
    });

    if (response.choices[0].message.content) { // make sure response is generated
      const generatedText = response.choices[0].message.content;
      res.json({ generatedText });
    } else {
      res.status(500).json({ error: "Invalid response structure" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
