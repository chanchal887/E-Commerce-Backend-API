const productModel = require("../models/product.model")

/**
 * - Product-create 
 * - POST /api/product/create
 */
async function productCreate(req,res){
    try{
    const {productName,description,category,price,rating}=req.body
    if(!productName||!description||!category ||!price || price<=0 || rating<0 ||rating>5){
     return res.status(400).json({
        message:"please fill inputs properly"
     })
    }
    const product =await productModel.create({
         productName,
         description,
         category,
         price,
         rating,
         producer:req.user.id
    })
    
res.status(201).json({
    message:"product create successfully",
    product
})
    } catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }
}

/**
 * - Product
 * - get /api/product/
 */

async function product(req,res){
    try{
    const products = await productModel.find()
    if(products.length===0){
        return res.status(404).json({
            message:"no product found"
        })
    }

    res.status(200).json({
        message:"product fetched successfully",
        products
    })
 }catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }
}

/**
 * - Product-delete
 * - DELETE /api/product/delete:id
 */
async function productDelete(req,res){
    try{
    const userId= req.user.id
    const productId =req.params.id

    const product = await productModel.findOneAndDelete({
        _id:productId,
        producer:userId
    })

    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }
    res.status(200).json({
        message:"product delete successfully",
        product
    })
 }catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }
}

/**
 * - Product-Update
 * - PATCH /api/product/update:id
 */
async function productUpdate(req,res){
    try{
 const productId= req.params.id
 const userId = req.user.id
 const {productname,description,category,price,rating} =req.body
 const  productUpdate={}

 if(productname){
    productUpdate.productname =productname
 }
 if(description){
    productUpdate.description = description
 }

 if(category){
    productUpdate.category = category
 }
 if(price){
    productUpdate.price = price
 }
 if(rating){
    productUpdate.rating = rating
 }


 const updateproduct = await productModel.findOneAndUpdate({
    _id:productId,
    producer:userId
 },
 productUpdate,
 {new:true}
)
if(!updateproduct){
    return res.status(404).json({
        message:"product not found"
    })
}

res.status(200).json({
    message:"product update successfully",
    updateproduct:{
        id:updateproduct._id,
        producerId:updateproduct.producer,
        category:updateproduct.category,
        productname:updateproduct.productname,
        brand:updateproduct.brand,
        price:updateproduct.price,
        rating:updateproduct.rating,
        description:updateproduct.description
    }
})
     }catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }
}



module.exports={productCreate,product,productDelete,productUpdate}

