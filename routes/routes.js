/*jshint esversion: 6 */
//Ramírez González Leonardo Ramsés

//Importar modulos
const express = require('express');
const Product = require('../models/product');
const path = require('path');
const expressSession = require('express-session');

// Variable de autentificacion
const authMid = require('../middleware/authMiddleware');
const redirectIfAuth = require('../middleware/redirectIfAuth');

//Create a router object
const router = express.Router();

//Export our router
module.exports = router;

//Activacion de las sesiones (cookies)
router.use(expressSession({
    secret: 'ittgogalgos',
    resave: true,
    saveUninitialized : true
}));

//Variables globales
router.use((req, res, next) => {
    res.locals.loggedIn = req.session.userId || null;
    next();
});

//Pagina home
router.get('/', (req, res) => {
    res.render('home');
});

//Consulta todos los datos
router.get('/api/product', authMid, (req,res) => {
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });

        if (!products) return res.status(404).send({
            message: 'No existen productos'
        })

        //res.status(200).send({ products : [products]});
        res.render('showProducts', { products });
    }).lean();
});

//Modificar producto PUT
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productId', authMid, putProduct);

//Consulta por filtro
router.get('/api/product/:datoBusqueda', authMid, (req, res) => {
    let datoBusqueda = req.params.datoBusqueda;

    //Product.findOne({name : datoBusqueda}, (err, products) => {
    Product.findById(datoBusqueda, (err, products) => {    
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });

        if (!products) return res.status(404).send({
            message: 'El producto no existe'
        });

        //res.status(200).send({product:products});
        res.render('editar', {product : products});
    }).lean();
});

//Borrar un producto DELETE
const delProduct = require('../controllers/delProduct');
const { Console } = require('console');
router.delete('/api/product/:productId', authMid, delProduct);

//INSERTAR VALORES A LA BD
router.post('/api/product', authMid, (req, res) => {
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category.toLowerCase();
    product.description = req.body.description;

    product.save((err, productStored) => {
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });
        
        //res.sendStatus(200);
        res.redirect('/api/product');
    });
});

//INSERTAR DATOS
router.get('/insertProduct', authMid, (req,res) => {
    res.render('product');
});

//Pagina login
const loginController = require('../controllers/login');
router.get('/auth/login', redirectIfAuth, loginController);

const loginUserController = require('../controllers/loginUser');
router.post('/users/login', redirectIfAuth, loginUserController);

//GET para logout
const logoutController = require('../controllers/logout');
router.get('/auth/logout', logoutController);

//Pagina registro GET
const newUser = require('../controllers/newUser')
router.get('/users/register', redirectIfAuth, newUser);

//Pagina registro POST
const storeUser = require('../controllers/storeUser');
const { triggerAsyncId } = require('async_hooks');
router.post('/auth/register', redirectIfAuth, storeUser);

//Pagina 404 not found
router.use((req, res) => {
    res.status(404).send('Pagina no encontrada');
});