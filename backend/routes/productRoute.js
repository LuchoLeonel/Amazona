import express from 'express';
import { ids } from 'webpack';
import Product from '../models/productModel';
import { getToken, isAuth, isAdmin } from '../util';


const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  let product = await Product.findById({_id: productId});

  if (product) {
      res.send(product);
  } else {
  res.status(404).send({ msg: "Product Not Found." })
  }
});

router.get("/categoria/:tipo", async (req, res) => {
  
  let productType = req.params.tipo;
  productType = productType.charAt(0).toUpperCase() + productType.slice(1)
  let product = await Product.find({category: productType});
  if (product) {
    res.send(product);
  } else {
  res.status(404).send({ msg: "Product Not Found." })
  }

});

// Con isAuth and isAdmin comentado para que puedan cambiar y borrar los datos a gusto
router.post("/", /*isAuth, isAdmin,*/ async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: 0,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({message: 'New Product Created', data: newProduct});
    }
    return res.status(500).send({message: 'Error in Creating Product.'})
})

router.put('/:id', /*isAuth, isAdmin,*/ async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

router.delete('/:id', /*isAuth, isAdmin,*/ async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
});

export default router;