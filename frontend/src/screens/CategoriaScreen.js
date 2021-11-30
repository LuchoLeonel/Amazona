import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriaProducts } from '../actions/productActions';


function CategoriaScreen (props) {

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const categoria = props.location.search.split('=')[1];

  useEffect(() => {
    dispatch(categoriaProducts(categoria));

    return () => {
      //
    };
  }, [])

    return loading? <div>Loading...</div> :
    error? <div>{error}</div> :
    <ul className="products">
    { products ? (
      products.map(product =>
        <li key={product._id}>
          <div className="product">
          <Link to={'/products/' + product._id}><img className="product-image" src={product.image} alt="product" /></Link>
              <div className="product-name">
              <Link to={'/products/' + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
          </div>
      </li>)
        ) : (
            <div>No se encontraron productos.</div>
        )
    }
  </ul>
}
export default CategoriaScreen;