const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = 5000;


app.use(bodyParser.json());

//api test
app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

const usersFilePath = '../dbTest/users.txt';

//Login API
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    //const filePath = path.join(__dirname, 'dbTest/users.txt');

    fs.readFile(usersFilePath, { encoding: 'utf-8'}, (err, data) => {
        if(err){
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        const users = data.split('\n').map(line => line.split('#'));
        const user = users.find(u => u[0] === username && u[1] === password);

        if(user){
            const userType = user[2];
            return res.json({ userType });
        }else{
            res.status(401).json({ sucess: false, message: 'Invalid Credencitials'});
        }
    });
});

app.listen(port, () => {console.log("Server is running on http://localhost:${port}")})
 