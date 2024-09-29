import { Text, Pressable, View, Alert, Linking, StyleSheet, TextInput, Appearance } from "react-native";
import React, {useCallback, useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { setConfig, getConfig } from './configfile';


export default function Index() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  type OpenURLButtonProps = {
    url: string;
    children: string;
  };
  const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    const styles = StyleSheet.create({
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colorScheme === 'dark' ? '#488286' : '#B7D5D4',
        marginBottom: 10,
        borderColor: '#FFF',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: colorScheme === 'dark' ? 'white' : 'grey',
      },
    });

    return (
      <Pressable 
      style={({ pressed }) => [
        styles.button, 
        pressed && { backgroundColor: '#305252' } // cor clara ao clicar
      ]}
      onPress={handlePress}
      >
        <Text style={styles.text}>Link Da Playlist Curtidas</Text>
      </Pressable>
    );
  };
  const onPress = () => {
    console.log('Botão pressionado!');
  };
  let downloadPath = "/storage/emulated/0/Download";
  const [text, setChangeText] = React.useState('');
  const onChangeText = (value: string) => {setChangeText(value);}
  const styles = StyleSheet.create({
    input: {
      width: "80%",
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      color: colorScheme === 'dark' ? 'white' : 'grey',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colorScheme === 'dark' ? '#488286': "#B7D5D4",
      marginBottom: 10
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: colorScheme === 'dark' ? 'white' : 'grey',
    },
  });
const [ipSSH, setIpSSH] = useState('');
const [senha, setSenha] = useState('');
const [whoami, setWhoami] = useState('');

const carregarConfig = async () => {
  try {
    const configData = getConfig();
    setIpSSH(configData.ipSSH);
    setSenha(configData.senha);
    setWhoami(configData.whoami);
    setColorScheme(configData.theme);
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Não foi possível carregar as configurações");
  }
};
useFocusEffect(
  useCallback(() => {
    carregarConfig();
  }, [])
);
  return (
    <View
    style={{
      backgroundColor: colorScheme === 'dark' ? "#373e40" : '#FFF',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }} >
      <Text style={{ color: colorScheme === 'dark' ? "#FFF": "#000", textAlign: 'center', marginBottom: 20, fontSize: 28, fontWeight: 'bold' }}>Baixador de musica 100% atualizado, não tem como, é ruim de aturar</Text>
      <OpenURLButton url="https://nonnullish.github.io/share-liked-songs/#/authorize">Para Baixar Musicas Curtidas</OpenURLButton>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        underlineColorAndroid={colorScheme === 'dark' ? "#FFF" : "#000"}
        placeholderTextColor={colorScheme === 'dark' ? "#FFF" : "#000"}
        placeholder="Link da Playlist"
      />
      <Text style={{color: colorScheme === 'dark' ? 'white' : 'black',marginBottom: 10}}>Caminho de Download:{downloadPath}</Text>
      <Pressable 
      style={({ pressed }) => [
        styles.button, 
        pressed && { backgroundColor: '#305252' } // cor clara ao clicar
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>Escolher Outro Caminho</Text>
    </Pressable>
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        pressed && { backgroundColor: '#305252' } // cor clara ao clicar
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>Baixar</Text>
    </Pressable>

      <Text style={{color: colorScheme === 'dark' ? 'white' : 'black'}}>Status do Download:</Text>      
    </View>
  );
}
