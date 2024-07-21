const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const sqlHelper = require('./sqlHelper');

app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, '../dbTest/users.txt');

//#region Login API
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
            //Save username to the db
            //call function saveUsername(username);
            sqlHelper.saveUsername(username);
            return res.json({ userType });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
    });
});
//#endregion

//#region Sites API's
// Fetch all sites API
app.get('/api/sites', async (req, res) => {
    try {
        const sites = await sqlHelper.getAllSites();
        res.json(sites);
    } catch (error) {
        console.error('Error fetching sites:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add a new site API
app.post('/api/sites', async (req, res) => {
    const newSite = req.body;
    try {
        const addedSite = await sqlHelper.addSite(newSite);
        res.json(addedSite);
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).send('Internal Server Error');
    }
});
//#endregion

//Get all users and roles by admin
app.get('/api/users', async (req, res) => {
    try {
        const users = await sqlHelper.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');    
    }
});

//Change user Role in DB
app.post("/api/logout", (req, res) => {
    console.log('Logout request received'); // Add logging here
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
