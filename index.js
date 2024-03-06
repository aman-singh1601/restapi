const express = require('express');
const fs = require('fs');
require('dotenv').config();
const users = require('./MOCK_DATA.json');

const PORT = process.env.PORT;


const app = express();

app.use(express.urlencoded({extended: false}));
app.get('/api/users', (req, res) => {

    return res.status(200).json(users);
})
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    return res.status(200).json(user);
})

app.post('/api/users', (req, res) => {
    const body = req.query;

    users.push({...body, id: users.length + 1});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
        return res.status(200).json({id: users.length})
    });
})

app.patch('/api/users/:id', (req, res) => {
    const body = req.query;
    const id = Number(req.params.id);

    const newuser = {...body, id: id};

    users.forEach((user, index) => {
        if(user.id === id) {
            users[index] = newuser;
        }
    });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
        if(error) throw error;
        return res.status(200).json({message:"User updated successfully", id: id});
    });
    
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    users.forEach((user, index) => {
        if(user.id === id) {
            users.splice(index, 1);
        }
    });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
        if(error) throw error;
        return res.status(200).json({message:"User deleted successfully", id: id});
    });
});

app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
})