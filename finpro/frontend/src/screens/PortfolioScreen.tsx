import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Title, Text, Card, Button, ActivityIndicator, IconButton } from 'react-native-paper';
import axios from 'axios';
import { supabase, mockAuth } from '../supabase';

const API_URL = 'http://localhost:8000';

export default function PortfolioScreen() {
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        fetchPortfolio(data.user.id);
      } else {
        const mockUser = await mockAuth.getUser();
        if (mockUser) {
          setUser(mockUser);
          fetchPortfolio(mockUser.id);
        }
      }
    };
    checkUser();
  }, []);

  const fetchPortfolio = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/portfolio/${userId}`);
      setPortfolio(response.data);
    } catch (error) {}
    setLoading(false);
  };

  const removeTicker = async (portfolioId: number) => {
    try {
      await axios.delete(`${API_URL}/api/portfolio/${user.id}/${portfolioId}`);
      setPortfolio(portfolio.filter(item => item.id !== portfolioId));
    } catch (error) {
      alert('Hata: Silinemedi');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.header}>Portföyüm</Title>
      {loading && <ActivityIndicator animating color="#fff" />}

      <FlatList
        data={portfolio}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.ticker}
              subtitle={item.notes}
              titleStyle={{ color: '#fff' }}
              subtitleStyle={{ color: '#aaa' }}
              right={(props) => (
                <IconButton {...props} icon="delete" iconColor="#ff5252" onPress={() => removeTicker(item.id)} />
              )}
            />
          </Card>
        )}
        ListEmptyComponent={<Text style={{ color: '#555', textAlign: 'center', marginTop: 20 }}>Hisse bulunamadı.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  header: { color: '#fff', marginBottom: 20 },
  card: { backgroundColor: '#1e1e1e', marginBottom: 10 },
});
