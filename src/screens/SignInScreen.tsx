import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import WhiteLogo from '../components/WhiteLogo';
import { AuthStackParamList, AuthStackScreens } from '../navigator/types';
import { loginTheme } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hook/useForm';
import { AuthContext } from '../context/auth/AuthContext';


interface Props extends StackScreenProps<AuthStackParamList, AuthStackScreens.SIGNIN> {

}
const initialForm = {
  email: '',
  password: '',
  name : '',
};

const SignInScreen = ({ navigation }: Props) => {

  const { email, name, password, onChange } = useForm(initialForm);
  const { signIn, errorMessage, clearErrorMessage } = useContext(AuthContext);

  const onRegister = () => {
    signIn({ correo: email, password, nombre : name });
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (errorMessage.length === 0) {return;}
    Alert.alert('No se ha podido realizar la creacion de la cuenta', errorMessage, [{ text: 'Ok', onPress: clearErrorMessage }]);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [errorMessage]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856D6' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={loginTheme.formContainer}
        >

          <WhiteLogo/>
          <Text
            style={ loginTheme.title}
          >Regístrate
          </Text>
          <Text style={ loginTheme.label}>Nombre de usuario :</Text>
          <TextInput
            placeholder="Aquí va tu nombre de usuario"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid={'white'}
            style={[loginTheme.inputField, (Platform.OS === 'ios') && loginTheme.inputFieldIOS]}
            selectionColor={'blue'}
            onChange={() => { }}
            value={name}
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'name')}
            onSubmitEditing={onRegister}
          />
          <Text style={ loginTheme.label}>Email :</Text>
          <TextInput
            placeholder="Aquí va el correo"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid={'white'}
            style={[loginTheme.inputField, (Platform.OS === 'ios') && loginTheme.inputFieldIOS]}
            selectionColor={'blue'}
            onChange={() => { }}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'email')}
            onSubmitEditing={onRegister}
          />
          <Text style={ loginTheme.label}>Password : </Text>
          <TextInput
            secureTextEntry
            keyboardType="default"
            placeholder="Aquí va la contraseña"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid={'white'}
            style={[loginTheme.inputField, (Platform.OS === 'ios') && loginTheme.inputFieldIOS]}
            selectionColor={'blue'}
            onChange={() => { }}
            value = {password}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'password')}
            onSubmitEditing={onRegister}

          />
          <View
            style={loginTheme.buttonContainer}
          >
          <TouchableOpacity
            activeOpacity={0.8}
              style={loginTheme.button}
              onPress={onRegister}
          >
              <Text style={ loginTheme.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
          { /**Crear NUEVA CUENTA */}
          <View style={loginTheme.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>navigation.replace(AuthStackScreens.LOGIN, {})}
            >
              <Text style={loginTheme.buttonText}>Login ➡</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignInScreen;
