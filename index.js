const express = require('express');
const save = require('./save');
const app = express();

app.use(express.json());

let people = JSON.parse(save.readData());

console.log(people);

app.get('/', (req, res) => {
    res.send('Looking good');
});

app.get('/people', (req, res) => {
    res.send(people);
});

app.get('/webgl7', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    res.sendStatus(200);
    res.end();
});

app.post('/person',(req, res) => {

    people.sort(function(a, b){return a - b});

    let personid = Math.floor(Math.random() * 100);
   
    for(let i = 0; i < people.length; i++){
        if(personid == people[i].id){
            personid += 1; 
            console.log('//////////same number//////////////');           
        }
    }

    const person = {
    id : personid,    
	name : req.body.name,
	age : req.body.age,
	isCrazy : req.body.isCrazy
    }

    console.log(JSON.stringify(person));
    people.push(person);
    res.status(200).send(person);
    save.saveAsJson(people);
});

app.delete('/person/:id', (req, res) => {
    people.sort((function(a, b){return a.id - b.id;}));

    const person = people.find(p => p.id === parseInt(req.params.id));
    people.splice(people.indexOf(person) ,1);
    
    save.saveAsJson(people);
    res.sendStatus(200);
}); 

app.listen(8080, () => console.log('Listening on port 8080'));
