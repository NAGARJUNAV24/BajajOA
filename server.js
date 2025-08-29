const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // --- User Info  ---
        const userName = "vallabhaneni_nagarjuna";
        const birthDate = "24052005";
        const userEmail = "vallabhaneni.n2022@vitstudent.ac.in";
        const rollNo = "22BCB0191";

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ success: false, error: "Input must be an array of values." });
        }

        // Arrays to store categorized items
        const evens = [];
        const odds = [];
        const letters = [];
        const specialChars = [];
        let totalSum = 0;
        let lettersConcat = "";

        // Process each item in the array
        data.forEach(item => {
            if (!isNaN(parseFloat(item)) && isFinite(item)) {
                const number = parseInt(item, 10);
                totalSum += number;
                number % 2 === 0 ? evens.push(String(number)) : odds.push(String(number));
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                letters.push(item.toUpperCase());
                lettersConcat += item;
            } else {
                specialChars.push(item);
            }
        });

        // Reverse letters and apply alternating capitalization
        const reversedLetters = lettersConcat.split('').reverse().join('');
        let altCapsString = "";
        for (let i = 0; i < reversedLetters.length; i++) {
            altCapsString += i % 2 === 0 ? reversedLetters[i].toUpperCase() : reversedLetters[i].toLowerCase();
        }

        // Construct final response
        const result = {
            success: true,
            user_id: `${userName}_${birthDate}`,
            email: userEmail,
            roll_number: rollNo,
            odd_numbers: odds,
            even_numbers: evens,
            alphabets: letters,
            special_characters: specialChars,
            sum: String(totalSum),
            concat_string: altCapsString,
        };

        // Send response
        res.status(200).json(result);

    } catch (err) {
        console.error("Processing error:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
