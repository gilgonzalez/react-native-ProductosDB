import { useEffect, useState } from 'react';
import { Categoria, CategoriesResponse } from '../context/product/types';
import apiCafe from '../api/cafeApi';


export const useCategories = () => {

  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const getCategories = async () => {
    const response = await apiCafe.get<CategoriesResponse>('/categorias');
    setCategories(response.data.categorias);
    setIsLoading(false);
    console.log({ categories });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    isLoading,
  };
};
