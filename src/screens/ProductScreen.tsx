import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import { ProductNavigatorScreens, ProductsStackParam } from '../navigator/ProductsNavigator';
import CustomButton from '../components/CustomButton';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hook/useCategories';
import { useForm } from '../hook/useForm';
import { ProductContext } from '../context/product/ProductContext';


interface Props extends StackScreenProps<ProductsStackParam, ProductNavigatorScreens.PRODUCTSCREEN> { }

const ProductScreen = ({ route, navigation }: Props) => {
  const { params: { id, name } } = route;
  const { loadProductById, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const { _id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm({
    _id: id ,
    categoriaId: '',
    nombre: name || '',
    img: '',
  });

  const saveOrUpdate = async () => {
    if (id === undefined) {
      const tempCategory = categoriaId.length === 0 ? categories[0]._id : categoriaId;
      const newProduct = await addProduct(tempCategory, nombre);
      onChange(newProduct._id, '_id');
    } else {
      updateProduct(categoriaId, nombre, id.toString() );
    }
  };

  const { categories, isLoading } = useCategories();
  const onDelete = () => {
    if (!_id) {return;}
    deleteProduct(_id);
    navigation.goBack();
  };
  const loadProduct = async () => {
    if (id === undefined) {return;}

    const producto = await loadProductById(id?.toString());
    setFormValue({
      _id: id,
      categoriaId: producto.categoria._id,
      img: producto.img ?? '',
      nombre: producto.nombre,
    });


  };

  useEffect(() => {
    loadProduct();
  }, [id]);


  useEffect(() => {
    navigation.setOptions({
      title: nombre ?? 'Agregar Nuevo Producto',
    });
  }, [nombre]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          placeholder="Ingrese el nombre del producto"
          keyboardType="default"
          style={styles.inputText}
          value={nombre}
          onChangeText={(value) => onChange(value, 'nombre')}
        />
        {/** PICKER: UN SELECTOR */}
        <Text style={styles.label}>Seleccionar categoria</Text>

        {
          !isLoading ? (

          <Picker
            mode="dropdown"
            itemStyle={{ backgroundColor: '#007700' }}
            selectionColor={'#007700'}
            numberOfLines={4}
            selectedValue={categoriaId}
            onValueChange={(value) =>
              onChange(value, 'categoriaId')
            }>
              {
                categories.map(category => (
                  <Picker.Item label={category.nombre} value={category._id} key={category._id} />
                ))
              }
          </Picker>
          )
            :
            (
              <ActivityIndicator size={50} color={'orange'} />
            )
        }

        <Button onPress={saveOrUpdate} title={id ? 'Actualizar' : 'Agregar'} color={'orange'} />

        {_id &&
          <>
            <CustomButton onPress={() => onDelete()} title="Borrar Producto" iconName="trash-outline" sizeIcon={20} styles={{ backgroundColor: 'tomato', marginTop:15 }} />
            <View
              style={styles.containerBottomButtons}
            >
              <CustomButton onPress={() => { console.log('clicked'); }} title="Cámara" iconName="camera-outline" sizeIcon={20} styles={{ backgroundColor: 'green' }} />
              <CustomButton onPress={() => { }} title="Galeria" iconName="images-outline" sizeIcon={20} styles={{ backgroundColor: 'green' }} />
            </View>

          </>}

        {
          img.length > 0 ? (
            <Image
            source={{uri : 'https://www.shutterstock.com/image-vector/placeholder-space-portal-hologram-science-260nw-2160186465.jpg'}}
            style={{width: '100%', height: 200, marginVertical:10, borderRadius: 20}}
            />
            )
            :
            (
              null
              )
            }

      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#212121',
  },
  inputText: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
  },
  containerBottomButtons: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 50,
    justifyContent: 'space-between',
  },
});
