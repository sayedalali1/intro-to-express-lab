const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/greeting/:name', (req, res) =>{
    res.send(`Hello there, ${req.params.name}`)
})

app.get('/roll/:number', (req, res) =>{
    const number = req.params.number;
    if(isNaN(number)){
        res.send('"You must specify a number."')
    }else{
        const newNumber = Math.floor(Math.random()*number)
        res.send(`Roll, ${newNumber}`)
    }
        
})

app.get('/collectibles/:index', (req, res) =>{
    res.send(`<h1> So, you want the ${collectibles[req.params.index].name} ? For ${collectibles[req.params.index].price} it can be yours! </h1>`)
})

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const min = parseFloat(req.query.minPrice);
    const max = parseFloat(req.query.maxPrice);
    const typeOf = req.query.type;


    const filteredShoes = shoes.filter(shoe => {
        if(typeOf && typeOf !== shoe.type){
            return false;
        }
        if(!isNaN(min) && shoe.price < min){
            return false;
        }
        if(!isNaN(max) && shoe.price > max){
            return false;
        }
        return true;
    });
    const shoesPrint = filteredShoes.map(shoe => `<p>Name: ${shoe.name}, Price: ${shoe.price}, Type: ${shoe.type}</p>`).join('');
    
    res.send(`<p> Filtered Shoes ${shoesPrint}`); 
});

app.listen(3000, ()=>{
    console.log('Listenin on port 3000')
})
