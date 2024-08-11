const { request } = require('express');
const ProductModel = require('../models/productModel');

// Get Products - /api/v1/products
exports.getProducts = async (req, res, next) => {
    try {
        const query = req.query.keyword ? { 
            name: { 
                $regex: req.query.keyword, 
                $options: 'i' 
            } 
        } : {};
        
        const products = await ProductModel.find(query);
        
        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to retrieve products'
        });
    }
}
//Get Single Product 
exports.getSingleProduct = async (req, res, next) => {
    console.log(req.params.id, 'ID')
    try{
        const product = await ProductModel.findById(req.params.id);
        res.json({
        success: true,
        product
    })
    }catch(error){
        res.status(404).json({
            success: false,
            message: 'Unable to get product or Id not found'
        })
    }
    
}