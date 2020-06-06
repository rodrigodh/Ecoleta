import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet, 
  Text,
  KeyboardAvoidingView,
} from 'react-native'; 
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [ufs, setUfs] = useState([{ label: 'Carregando', value: 'Carregando'}]);
  const [cities, setCities] = useState([{ label: 'Selecione um estado primeiro', value: 'Selecione um estado primeiro'}]);
  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
      const ufInitials = response.data.map(uf => {
        return { label: uf.sigla, value: uf.sigla }
      });
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (cities === [{ label: 'Selecione um estado primeiro', value: 'Selecione um estado primeiro'}]) {
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(response => {
      const citys = response.data.map(city => {
        return { label: city.nome, value: city.nome }
      });
      setCities(citys);
    });
  }, [uf])

  return (
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368}}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
          <View style={styles.main}>
            <Image source={require('../../assets/logo.png')} />
            <View>
              <Text style={styles.title}>Seu marketplace de coleta de residuos.</Text>
              <Text style={styles.description}>
                Ajudamos pessoas a encontrarem pontos de colete de forma eficiente.
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.input}>
              <RNPickerSelect
                onValueChange={(selectedUf) => {setUf(selectedUf)}}
                items={ufs}
                placeholder={{
                  label: 'Selecione o estado',
                }}
              />
            </View>
            <View style={styles.input}>
              <RNPickerSelect
                onValueChange={(value) => {setCity(value)}}
                items={cities}
                placeholder={{
                  label: 'Selecione a cidade',
                }}
              />
            </View>

            <RectButton style={styles.button} onPress={() => {handleNavigateToPoints()}}>
              <View style={styles.buttonIcon}>
                <Icon name="arrow-right" size={24} color="#FFF" />
              </View>
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </RectButton>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingBottom: 64,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    justifyContent: 'center'
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;