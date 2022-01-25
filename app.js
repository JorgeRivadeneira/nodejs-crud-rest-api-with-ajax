const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const productos = [
    {
        id: 1,
        name: "Laptop Lenovo Legion 5"
    },
    {
        id: 2,
        name: "Macbook Pro M1"
    },    
];

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//settings
app.set('port', process.env.PORT || 3000);

//routes
app.get('/products', (req, res) => {
    res.json(productos);
});

app.post('/products', (req, res) => {
    const {name} = req.body;
    productos.push({
        id: productos.length + 1,
        name
    });
    res.json('Successfully created');
});

app.put('/products/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    productos.forEach((producto, i ) => {
        if(producto.id == id){
            producto.name = name;
        }
    });
    res.json('Successfully updated');
});

app.delete('/products/:id', (req, res) => {
    const {id} = req.params;

    productos.forEach((producto, i ) => {
        if(producto.id == id){
            productos.splice(i, 1);
        }
    });
    res.json('Successfully deleted');
})

//static files
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
