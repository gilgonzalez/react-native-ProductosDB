import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';

const HomeScreen = () => {
  const { user, token, signOut  } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Button title="Logout"
        color={'#007700'}
        onPress={signOut}
      />
      <Text>{JSON.stringify(user, null, 3)}</Text>
      <Text>{ token }</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});
