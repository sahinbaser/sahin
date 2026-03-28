import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { supabase, mockAuth } from '../supabase';
import PriceChart from '../components/PriceChart';

const API_URL = 'http://localhost:8000'; // Update with actual IP for mobile

export default function AnomalyScreen() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  const addToPortfolio = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      let userId = data.user?.id;
      if (!userId) {
        const mockUser = await mockAuth.getUser();
        userId = mockUser?.id;
      }

      if (!userId) {
        alert('Lütfen önce giriş yapın');
        return;
      }

      await axios.post(`${API_URL}/api/portfolio`, {
        user_id: userId,
        ticker: ticker,
        notes: `Doğallık Skoru: ${result.score}`
      });
      alert('Portföye eklendi!');
    } catch (error) {
      alert('Hata oluştu');
    }
  };

  const analyze = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/analysis/anomaly/${ticker}`);
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
      <TextInput
        label="Hisse Kodu (Örn: THYAO.IS, AAPL)"
        value={ticker}
        onChangeText={setTicker}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={analyze} style={styles.button}>Analiz Et</Button>

      {loading && <ActivityIndicator animating={true} color="#fff" style={{ marginTop: 20 }} />}

      {chartData && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ color: '#fff' }}>Fiyat Grafiği</Title>
            <PriceChart data={chartData.prices} labels={chartData.dates} />
          </Card.Content>
        </Card>
      )}

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
            <Button mode="outlined" onPress={addToPortfolio} style={{ marginTop: 15 }} textColor="#FFD700">
              Portföye Ekle
            </Button>
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
