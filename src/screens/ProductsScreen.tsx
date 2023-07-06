import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductContext } from '../context/product/ProductContext';
import { Producto } from '../context/product/types';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductNavigatorScreens, ProductsStackParam } from '../navigator/ProductsNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { RefreshControl } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<ProductsStackParam, ProductNavigatorScreens.PRODUCTSSCREEN> { }

const ProductsScreen = ({ navigation } : Props) => {
  const { products, loadProducts } = useContext(ProductContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderItem = (item: Producto) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.containerItem}
      onPress={() => navigation.navigate(ProductNavigatorScreens.PRODUCTSCREEN, { id: item._id, name: item.nombre})}>
        <Text style={styles.productName}>{item.nombre}</Text>
    </TouchableOpacity>
  );
  const renderHeaderRight = () => (
    <TouchableOpacity
          activeOpacity={0.8}
          style={{
            marginRight: 20,
            backgroundColor: 'orange',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}
          onPress={() => navigation.navigate(ProductNavigatorScreens.PRODUCTSCREEN, {})}
    >
      <Icon name="add-outline" size={25} color="#FFF" />
          <Text style={{color: '#FFFF', fontSize: 15, fontWeight: 'bold', marginLeft: 5}}>Agregar </Text>
        </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, []);

  const pullToRefresh = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };


  //TODO PULL TO REFRESH

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 20,
    }}>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap:15,
          marginTop: 20,

        }}
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => renderItem(item)}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={ pullToRefresh }
          />
        }
       />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF',
    alignSelf: 'center',

  },
  containerItem: {
    padding: 10,
    backgroundColor: '#0A95FF',
    borderRadius: 5,
    marginHorizontal: 15,
    width:150,
  },
});
