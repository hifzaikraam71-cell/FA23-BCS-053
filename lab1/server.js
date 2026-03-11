const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongo = require('./db/mongo');
const mysqlDB = require('./db/mysql');
const sqlite = require('./db/sqlite');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// CRUD APIs
app.post('/addUser/:db', async (req,res)=>{
    const db = req.params.db;
    const {name,email} = req.body;
    try{
        if(db==='MongoDB') await mongo.addUser({name,email});
        else if(db==='MySQL') await mysqlDB.addUser({name,email});
        else if(db==='SQLite') await sqlite.addUser({name,email});
        else return res.json({message:'Database not found'});
        res.json({message:`${db} user added!`});
    }catch(err){ res.status(500).json({message:err.message}); }
});

app.get('/users/:db', async (req,res)=>{
    const db = req.params.db;
    try{
        let users;
        if(db==='MongoDB') users = await mongo.getUsers();
        else if(db==='MySQL') users = await mysqlDB.getUsers();
        else if(db==='SQLite') users = await sqlite.getUsers();
        else return res.json([]);
        res.json(users);
    }catch(err){ res.status(500).json({message:err.message}); }
});

app.put('/updateUser/:id', async (req,res)=>{
    const id = req.params.id;
    const {name,email} = req.body;
    try{
        await mongo.updateUser(id,{name,email});
        await mysqlDB.updateUser(id,{name,email});
        await sqlite.updateUser(id,{name,email});
        res.send("User updated successfully");
    }catch(err){ res.status(500).send(err.message); }
});

app.delete('/deleteUser/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        await mongo.deleteUser(id);
        await mysqlDB.deleteUser(id);
        await sqlite.deleteUser(id);
        res.send("User deleted successfully");
    }catch(err){ res.status(500).send(err.message); }
});

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));