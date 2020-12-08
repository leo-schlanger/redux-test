import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';

interface ICatalogItem {
  product: IProduct;
}

const CatalogItem: React.FC<ICatalogItem> = ({product}) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>(state =>{
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch]);

  return (
    <article>
      <strong>{product.title}</strong>{"  -  "}
      <span>{product.price}</span>{"    "}

      <button 
        type="button" 
        onClick={() => handleAddProductToCart(product)}
      >
        Comprar
      </button>

      { 
        hasFailedStockCheck && <span style={{color:"red"}}>Fora de estoque</span>
      }
    </article>
  );
}

export default CatalogItem;