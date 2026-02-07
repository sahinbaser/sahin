import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default function DividendScreen() {
  const [initial, setInitial] = useState('10000');
  const [monthly, setMonthly] = useState('1000');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const simulate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/analysis/dividend-simulator`, {
        initial_capital: parseFloat(initial),
        monthly_contribution: parseFloat(monthly),
        annual_dividend_yield: 0.05,
        dividend_growth_rate: 0.07,
        stock_price_growth_rate: 0.08,
        monthly_expenses: 3000,
        inflation_rate: 0.03
      });
      setResult(response.data);
    } catch (error) {
      alert('Hata oluştu');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={{ color: '#fff', marginBottom: 20 }}>Finansal Özgürlük Planlayıcı</Title>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        {['USD', 'EUR', 'TRY'].map(curr => (
          <Button
            key={curr}
            mode={currency === curr ? 'contained' : 'outlined'}
            onPress={() => setCurrency(curr)}
            style={{ flex: 1, marginHorizontal: 2 }}
            buttonColor={currency === curr ? '#FFD700' : undefined}
            textColor={currency === curr ? '#000' : '#fff'}
          >
            {curr}
          </Button>
        ))}
      </View>
      <TextInput label={`Başlangıç Sermayesi (${currency})`} value={initial} onChangeText={setInitial} style={styles.input} mode="outlined" keyboardType="numeric" />
      <TextInput label={`Aylık Katkı (${currency})`} value={monthly} onChangeText={setMonthly} style={styles.input} mode="outlined" keyboardType="numeric" />
      <Button mode="contained" onPress={simulate} style={styles.button}>Simüle Et</Button>

      {loading && <ActivityIndicator animating={true} color="#fff" />}

      {result && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ color: '#fff' }}>Özgürlük Yılı: {result.independence_year || 'Belirlenemedi'}</Title>
            <Text style={{ color: '#aaa' }}>Final Portföy: {result.final_portfolio_value} {currency}</Text>
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
  card: { backgroundColor: '#1e1e1e' },
});
