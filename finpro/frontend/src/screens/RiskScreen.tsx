import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default function RiskScreen() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const getRisk = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/analysis/risk/${ticker}`);
      setResult(response.data);
    } catch (error) {
      alert('Hata: Bilanço verisi bulunamadı');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={{ color: '#fff' }}>İflas Riski Analizi</Title>
      <TextInput label="Hisse Kodu" value={ticker} onChangeText={setTicker} style={styles.input} mode="outlined" />
      <Button mode="contained" onPress={getRisk} style={styles.button}>Risk Testi Yap</Button>

      {loading && <ActivityIndicator animating={true} color="#fff" />}

      {result && result.z_score_analysis && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ color: '#fff' }}>Z-Score: {result.z_score_analysis.z_score}</Title>
            <Text style={{ color: result.z_score_analysis.status === 'Safe Zone' ? '#4caf50' : '#ff5252' }}>
              Durum: {result.z_score_analysis.status}
            </Text>
            <Title style={{ color: '#fff', marginTop: 15 }}>Stres Testi</Title>
            <Text style={{ color: '#aaa' }}>Senaryo: {result.stress_test.scenario}</Text>
            <Text style={{ color: '#aaa' }}>Dayanıklılık: %{result.stress_test.resilience_score}</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  input: { marginBottom: 15, marginTop: 15 },
  button: { marginBottom: 20 },
  card: { backgroundColor: '#1e1e1e', marginTop: 20 }
});
