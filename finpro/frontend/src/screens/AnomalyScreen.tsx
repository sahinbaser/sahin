import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Update with actual IP for mobile

export default function AnomalyScreen() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/analysis/anomaly/${ticker}`);
      setResult(response.data);
    } catch (error) {
      alert('Hata: Hisse bulunamadı');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Hisse Kodu (Örn: THYAO.IS, AAPL)"
        value={ticker}
        onChangeText={setTicker}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={analyze} style={styles.button}>Analiz Et</Button>

      {loading && <ActivityIndicator animating={true} color="#fff" style={{ marginTop: 20 }} />}

      {result && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ color: '#fff' }}>Doğallık Skoru: {result.score}/100</Title>
            <Text style={{ color: '#aaa', marginTop: 10 }}>Durum: {result.strength}</Text>
            <Text style={{ color: '#aaa' }}>Tür: {result.anomaly_type}</Text>
            <View style={{ marginTop: 15 }}>
              {result.reasons.map((r: string, i: number) => (
                <Text key={i} style={{ color: '#ff5252' }}>• {r}</Text>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  input: { marginBottom: 15 },
  button: { marginBottom: 20 },
  card: { backgroundColor: '#1e1e1e', marginTop: 20 },
});
