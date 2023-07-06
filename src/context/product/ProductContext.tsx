import React, { createContext, useState, useEffect } from 'react';
import { ProductResponse, Producto } from './types';
import apiCafe from '../../api/cafeApi';

type ContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName : string) => Promise<void>;
  updateProduct : (categoryId: string, productName : string, productId : string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; //TODO TIPAR ESTA MIERDA
}


export const ProductContext = createContext<ContextProps>({} as ContextProps);

export const ProductProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async () => {
    const response = await apiCafe.get<ProductResponse>('/productos?limite=50');
    setProducts([...products, ...response.data.productos]);
    console.log(response.data.productos);
  };
  const addProduct = async (categoryId: string, productName: string) => {

  };
  const updateProduct = async (categoryId: string, productName: string, productId: string) => {

  };
  const deleteProduct = async (id: string) => {

  };
  const loadProductById = async (id: string): Promise<Producto> => {

    return {} as Producto;
   };
  const uploadImage = async (data: any, id: string) => {

  };

  return (
    <ProductContext.Provider value={{
      products,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      loadProductById,
      uploadImage,
    }}>
      {children}
    </ProductContext.Provider>
      );
};
