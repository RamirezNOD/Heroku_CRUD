/*jshint esversion: 6 */
//Ramírez González Leonardo Ramsés

const Product = require('../models/product');

module.exports = (req, res) => {
    let datoBorrar = req.params.productId;

    Product.findById(datoBorrar, (err, product) => {
        if(err) return res.status(500).send({
            message: `Error al borrar el producto ${err}`
        });

        product.remove(err => {
            if(err) return res.status(500).send({
                message: `Error al borrar el producto ${err}`
            });
    
            //res.status(200).send({
            //    message: 'El producto ha sido eliminado'
            //});
            res.redirect('/api/product');
        });
    });
};