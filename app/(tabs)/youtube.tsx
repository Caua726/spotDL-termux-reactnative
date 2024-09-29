import { Text, Pressable, View, Alert, Linking, StyleSheet, TextInput, Appearance } from "react-native";
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "expo-router";
import { setConfig, getConfig } from './configfile';

// Variáveis globais para o esquema de cores

// Componente para abrir links
type OpenURLButtonProps = {
  url: string;
  children: string;
};
const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não sei como abrir esta URL: ${url}`);
    }
  }, [url]);

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      backgroundColor: colorScheme === 'dark' ? '#488286' : '#B7D5D4',
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? 'white' : 'grey',
    },
  });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { backgroundColor: '#305252' }
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};
export default function Index() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    const [currentColorScheme, setCurrentColorScheme] = useState(colorScheme);
    const [downloadPath, setDownloadPath] = useState("/storage/emulated/0/Download");
    const [playlistLink, setPlaylistLink] = useState('');
    const [downloadStatus, setDownloadStatus] = useState('Aguardando...');
    
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
    const handleDownloadPress = () => {
    // Aqui você pode adicionar a lógica de download
    setDownloadStatus('Iniciando download...');
    };
    useFocusEffect(
        useCallback(() => {
          carregarConfig();
        }, [])
      );
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colorScheme === 'dark' ? "#373e40" : '#FFF',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
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
      backgroundColor: colorScheme === 'dark' ? '#488286' : "#B7D5D4",
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? 'white' : 'grey',
    },
    label: {
      fontSize: 18,
      color: colorScheme === 'dark' ? 'white' : 'black',
      marginBottom: 8,
    },
    status: {
      marginTop: 20,
      fontSize: 16,
      color: colorScheme === 'dark' ? 'lightgreen' : 'green',
    },
  });

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={{ color: colorScheme === 'dark' ? "#FFF" : "#000", fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Baixar Música
      </Text>

      {/* Campo para link da playlist */}
      <Text style={styles.label}>Insira o link da playlist:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPlaylistLink}
        value={playlistLink}
        placeholder="Link da Playlist"
        placeholderTextColor={colorScheme === 'dark' ? "#FFF" : "#000"}
      />

      {/* Exibir caminho de download */}
      <Text style={styles.label}>Caminho de Download:</Text>
      <Text style={{ marginBottom: 10, color: colorScheme === 'dark' ? 'white' : 'black' }}>{downloadPath}</Text>

      {/* Botão para escolher outro caminho */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: '#305252' }
        ]}
        onPress={() => {
          // Lógica para escolher caminho (opcional)
          console.log('Escolher novo caminho de download');
        }}
      >
        <Text style={styles.text}>Escolher Outro Caminho</Text>
      </Pressable>

      {/* Botão de baixar */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: '#305252' }
        ]}
        onPress={handleDownloadPress}
      >
        <Text style={styles.text}>Baixar</Text>
      </Pressable>

      {/* Status do download */}
      <Text style={styles.status}>Status do Download: {downloadStatus}</Text>
    </View>
  );
}
