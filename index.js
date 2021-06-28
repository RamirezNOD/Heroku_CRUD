'use strict'
//Ramírez González Leonardo Ramsés

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const hbs = require('express-handlebars')
//Router our app
const router = require('./routes/routes')

const app = express()

//methodOverride
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//motor de vistas
app.engine('.hbs', hbs({
    defaultLayout : 'index',
    extname : '.hbs'
}))
app.set('view engine', '.hbs')

//Recursos publicos
app.use('/static',express.static('public'))

app.use('/', router)

//Conexion a la base de datos
mongoose.connect(config.db, config.urlParser, (err, res) => {
    if(err){
        return console.log(`Error al conectar en la BD ${err}`)
    }

    console.log('Conexion a la BD exitosa')

    app.listen(config.port, () => {
        console.log(`Ejecutando en http://localhost: ${config.port}`)
    })
})