import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default function MoneyFlowScreen() {
  const [loading, setLoading] = useState(false);
  const [flows, setFlows] = useState<any[]>([]);

  useEffect(() => {
    const fetchFlows = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/analysis/money-flow`);
        setFlows(response.data);
      } catch (error) {}
      setLoading(false);
    };
    fetchFlows();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Title style={{ color: '#fff', marginBottom: 20 }}>Para Akışı Haritası</Title>
      {loading && <ActivityIndicator animating={true} color="#fff" />}
      {flows.map((f, i) => (
        <Card key={i} style={styles.card}>
          <Card.Content>
            <Title style={{ color: '#fff' }}>{f.sector}</Title>
            <Text style={{ color: f.performance_1w > 0 ? '#4caf50' : '#ff5252' }}>
              Haftalık: %{f.performance_1w}
            </Text>
            <Text style={{ color: '#aaa' }}>Durum: {f.flow_strength}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  card: { backgroundColor: '#1e1e1e', marginTop: 20 }
});
