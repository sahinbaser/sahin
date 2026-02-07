import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Text, Card } from 'react-native-paper';
import { supabase, mockAuth } from '../supabase';

export default function AuthScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    // If keys are missing, use mock
    if (process.env.EXPO_PUBLIC_SUPABASE_URL === undefined) {
      await mockAuth.signIn(email);
      navigation.replace('Main');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for confirmation!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigation.replace('Main');
      }
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}</Title>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={handleAuth} loading={loading} style={styles.button}>
            {isSignUp ? 'Kaydol' : 'Giriş'}
          </Button>
          <Button onPress={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}
          </Button>
        </Card.Content>
      </Card>
      <Text style={styles.footer}>Profesyonel Finansal Analiz Platformu</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#121212', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#1e1e1e', padding: 10 },
  title: { color: '#fff', textAlign: 'center', marginBottom: 20, fontSize: 24 },
  input: { marginBottom: 15 },
  button: { marginTop: 10, marginBottom: 10 },
  footer: { color: '#555', textAlign: 'center', marginTop: 20 }
});
