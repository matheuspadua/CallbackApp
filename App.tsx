import React, {useEffect, useRef} from 'react';
import {Linking, Alert, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({route}) => {
  const params = route.params ? route.params : {};

  return (
    <View style={styles.container}>
      <Text>Parâmetros Recebidos:</Text>
      <Text>{JSON.stringify(params)}</Text>
    </View>
  );
};

const App = () => {
  const navigation = useRef(null); // Usando ref para acessar a navegação

  useEffect(() => {
    const handleDeepLink = event => {
      const url = event.url;
      const parsedUrl = new URL(url); // Usando URL para parsing da URL
      const params = Object.fromEntries(parsedUrl.searchParams.entries()); // Convertendo os parâmetros de URL em objeto

      // Alerta com os parâmetros recebidos
      Alert.alert('URL Recebida:', JSON.stringify(params));

      // Navegar para a tela Home com os parâmetros
      navigation.current?.navigate('Home', params);
    };

    Linking.addEventListener('url', handleDeepLink);

    // Verificando se o aplicativo foi aberto diretamente por um link
    Linking.getInitialURL().then(url => {
      if (url) {
        const parsedUrl = new URL(url); // Usando URL para parsing da URL
        const params = Object.fromEntries(parsedUrl.searchParams.entries()); // Convertendo os parâmetros de URL em objeto
        handleDeepLink({url});
      }
    });

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Sofisa'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
