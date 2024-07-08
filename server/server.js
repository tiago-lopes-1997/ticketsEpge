const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, '../dbTest/users.txt');

// Login API
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: ${username}`); // Add logging here

    fs.readFile(usersFilePath, { encoding: 'utf-8'}, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        const users = data.split('\n').map(line => line.split('#'));
        const user = users.find(u => u[0] === username && u[1] === password);

        if (user) {
            const userType = user[2].trim();
            console.log(`User authenticated: ${username}, Type: ${userType}`); // Add logging here
            return res.json({ userType });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
