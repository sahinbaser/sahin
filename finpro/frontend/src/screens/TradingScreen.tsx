import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default function TradingScreen() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const getSignals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/analysis/trading-signals/${ticker}`);
      setResult(response.data);
    } catch (error) {
      alert('Hata: Hisse bulunamadı');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={{ color: '#fff' }}>Al-Sat Sinyalleri</Title>
      <TextInput label="Hisse Kodu" value={ticker} onChangeText={setTicker} style={styles.input} mode="outlined" />
      <Button mode="contained" onPress={getSignals} style={styles.button}>Sinyal Üret</Button>

      {loading && <ActivityIndicator animating={true} color="#fff" />}

      {result && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={{ color: '#fff' }}>Fiyat: {result.current_price}</Text>
            <Text style={{ color: '#ff5252' }}>Stop Loss: {result.suggested_stop_loss}</Text>
            <Text style={{ color: '#4caf50' }}>Take Profit: {result.suggested_take_profit}</Text>
            <Text style={{ color: '#aaa' }}>Risk/Ödül: {result.risk_reward_ratio}</Text>
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
