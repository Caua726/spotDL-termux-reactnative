import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View, Text, TextInput, Switch, Pressable, StyleSheet, Appearance } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { setConfig, getConfig } from './configfile';

const Configuracoes = () => {
  const [ipSSH, setIpSSH] = useState(''); 
  const [senha, setSenha] = useState('');
  const [whoami, setWhoami] = useState('');
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

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

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
  };

  const salvarConfiguracoes = async () => {
    try {
      setConfig({
          ipSSH,
          senha,
          whoami,
          theme: colorScheme == 'dark' ? "dark" : "light"
      });
      Alert.alert("Sucesso", "Configurações salvas com sucesso!");
  } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar as configurações");
  }

  };
  const styles = StyleSheet.create({
    container: {
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
      color: 'grey',
      borderColor: '#ccc',
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
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
  });

  useFocusEffect(
    useCallback(() => {
      carregarConfig();
    }, [])
  );
  return (
    <View style={[
      styles.container, 
      { backgroundColor: colorScheme === 'dark' ? "#373e40" : '#FFF' }
    ]}>
      {/* Título */}
      <Text style={{ color: colorScheme === 'dark' ? "#FFF" : "#000", fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Configurações
      </Text>

      {/* Campo para IP do SSH */}
      <Text style={styles.label}>IP do SSH</Text>
      <TextInput
        style={styles.input}
        onChangeText={setIpSSH}
        value={ipSSH}
        placeholder="Digite o IP do SSH"
        placeholderTextColor={colorScheme === 'dark' ? "#FFF" : "#000"}
      />

      {/* Campo para Senha */}
      <Text style={styles.label}>senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        placeholder="Digite a senha"
        placeholderTextColor={colorScheme === 'dark' ? "#FFF" : "#000"}
        secureTextEntry
      />

      {/* Campo para Whoami */}
      <Text style={styles.label}>whoami?</Text>
      <TextInput
        style={styles.input}
        onChangeText={setWhoami}
        value={whoami}
        placeholder="Digite o whoami"
        placeholderTextColor={colorScheme === 'dark' ? "#FFF" : "#000"}
      />

      {/* Alternância de tema */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Claro</Text>
        <Switch
          onValueChange={toggleColorScheme}
          value={colorScheme === 'dark'}
        />
        <Text style={styles.label}>Escuro</Text>
      </View>

      {/* Botão de salvar */}
      <Pressable
        style={({ pressed }) => [
          styles.button,  
          pressed && { backgroundColor: '#305252' }
        ]}
        onPress={salvarConfiguracoes}
      >
        <Text style={styles.text}>Salvar Configurações</Text>
      </Pressable>
    </View>
  );
}



export default Configuracoes;
