import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { ProductNavigatorScreens, ProductsStackParam } from '../navigator/ProductsNavigator';
import CustomButton from '../components/CustomButton';
import { Picker } from '@react-native-picker/picker';


interface Props extends StackScreenProps<ProductsStackParam, ProductNavigatorScreens.PRODUCTSCREEN> { }

const ProductScreen = ({ route, navigation }: Props) => {
  const { params: { id, name } } = route;
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: name ?? 'Agregar Nuevo Producto',
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          placeholder="Ingrese el nombre del producto"
          keyboardType="default"
          style={styles.inputText}
        />
        {/** PICKER: UN SELECTOR */}
        <Text style={styles.label}>Seleccionar categoria</Text>

        <Picker
          mode="dropdown"
          itemStyle={{ backgroundColor: '#007700' }}
          selectionColor={'#007700'}
          numberOfLines={4}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>

        <Button onPress={() => { console.log('add clicked'); }} title="Agregar" color={'orange'} />

        <View
          style={styles.containerBottomButtons}
        >
          <CustomButton onPress={() => { console.log('clicked'); }} title="Cámara" iconName="camera-outline" sizeIcon={20} styles={{ backgroundColor: 'green' }} />
          <CustomButton onPress={() => { }} title="Galeria" iconName="images-outline" sizeIcon={20} styles={{ backgroundColor: 'green' }} />
        </View>

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
