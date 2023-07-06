import React, { createContext, useState, useEffect } from 'react';
import { ProductResponse, Producto, ProductsResponse } from './types';
import apiCafe from '../../api/cafeApi';
import { Alert } from 'react-native';

type ContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName : string) => Promise<Producto>;
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
    const response = await apiCafe.get<ProductsResponse>('/productos?limite=50');
    setProducts([...response.data.productos]);
  };
  const addProduct = async (categoryId: string, productName: string) :Promise<Producto> => {

    const resp = await apiCafe.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, resp.data]);
    return resp.data;
  };
  const updateProduct = async (categoryId: string, productName: string, productId: string) => {

    try {
      const resp = await apiCafe.put<Producto>(`/productos/${productId}`, {
        nombre: productName,
        categoria: categoryId,
      });
      setProducts(products.map(product => product._id === productId ? resp.data : product));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id: string) => {

    try {
      const resp = await apiCafe.delete<Producto>(`/productos/${id}`);
      Alert.alert(resp.data.nombre, 'El producto ha sido eliminado correctamente');
    } catch (error) {
      console.log(error);
    }
    loadProducts();

  };
  const loadProductById = async (id: string): Promise<Producto> => {

    const resp = await apiCafe.get<ProductResponse>(`/productos/${id}`);
    const product = resp.data;

    return product;
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
