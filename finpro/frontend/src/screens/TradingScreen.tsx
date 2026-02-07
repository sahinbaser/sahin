import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import PriceChart from '../components/PriceChart';

const API_URL = 'http://localhost:8000';

export default function TradingScreen() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  const getSignals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/analysis/trading-signals/${ticker}`);
      setResult(response.data);

      const priceResponse = await axios.get(`${API_URL}/api/stock/${ticker}`);
      const prices = priceResponse.data.map((d: any) => d.Close);
      const dates = priceResponse.data.map((d: any) => d.Date);
      setChartData({ prices, dates });
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

      {chartData && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ color: '#fff' }}>Trend Analizi</Title>
            <PriceChart data={chartData.prices} labels={chartData.dates} />
          </Card.Content>
        </Card>
      )}

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
