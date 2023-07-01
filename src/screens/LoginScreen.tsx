import React from 'react';
import { Text, TextInput, Platform, View, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import { loginTheme } from '../theme/loginTheme';
import { useForm } from '../hook/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList, AuthStackScreens } from '../navigator/types';

const initialForm = {
  email: '',
  password: '',
};

interface Props extends StackScreenProps<AuthStackParamList, AuthStackScreens.LOGIN> {

}

const LoginScreen = ({ navigation } : Props) => {

  const { email, password, onChange } = useForm(initialForm);

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
  };

  return (
    <>
      {/**Background */}
      <Background />
      { /** Logo */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={loginTheme.formContainer}
        >

          <WhiteLogo/>
          <Text
            style={ loginTheme.title}
          >Login
          </Text>
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
            onSubmitEditing={onLogin}
          />
          <Text
            style={ loginTheme.title}
          >Password
          </Text>
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
            onSubmitEditing={onLogin}

          />
          <View
            style={loginTheme.buttonContainer}
          >
          <TouchableOpacity
            activeOpacity={0.8}
              style={loginTheme.button}
              onPress={onLogin}
          >
              <Text style={ loginTheme.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          { /**Crear NUEVA CUENTA */}
          <View style={loginTheme.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>navigation.replace(AuthStackScreens.SIGNIN, {})}
            >
              <Text style={loginTheme.buttonText}>Crear nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
