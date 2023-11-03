const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000; // Use a port of your choice

app.use(express.json());
const cors = require('cors');

app.use(cors());
// Endpoint to read questions.json
app.get('/quiz', (req, res) => {
    try {
        const questionsData = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
        res.json(questionsData);
    } catch (error) {
        res.status(500).json({ error: 'Error reading questions.json' });
    }
});

// Endpoint to add a new question to questions.json
app.post('/update_questions', (req, res) => {
    const newQuestion = req.body.question;
    const options = [req.body.opt1, req.body.opt2, req.body.opt3, req.body.opt4];
    const correctAnswer = req.body.correctAnswer;

    // Join the options array into a comma-separated string

    console.log(newQuestion,"\n",options,"\n",correctAnswer)
    try {
        const questionsData = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

        const formattedQuestion = {
            question: newQuestion,
            options: options,
            answer: correctAnswer
        };

        questionsData.questions.push(formattedQuestion);

        fs.writeFileSync('questions.json', JSON.stringify(questionsData, null, 2));

        res.json({ message: 'New question added' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding a new question' });
    }
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
