import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation }: any) {
  const { t } = useTranslation();

  const modules = [
    { id: 'Anomaly', title: t('naturalness_score'), icon: 'chart-bell-curve' },
    { id: 'Dividend', title: t('dividend_simulator'), icon: 'trending-up' },
    { id: 'Trading', title: t('trading_signals'), icon: 'swap-horizontal' },
    { id: 'MoneyFlow', title: t('money_flow'), icon: 'cash-multiple' },
    { id: 'Risk', title: t('financial_risk'), icon: 'alert-decagram' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Button mode="contained" buttonColor="#FFD700" textColor="#000" style={{ margin: 20 }} onPress={() => alert('Premium Planlar Yakında!')}>
        PREMIUM'A GEÇ
      </Button>
      <View style={styles.header}>
        <Title style={styles.title}>FinPro Professional</Title>
        <Paragraph style={styles.subtitle}>{t('welcome')}</Paragraph>
      </View>

      <View style={styles.grid}>
        {modules.map((m) => (
          <Card key={m.id} style={styles.card} onPress={() => navigation.navigate(m.id)}>
            <Card.Content>
              <Title style={styles.cardTitle}>{m.title}</Title>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 20, paddingTop: 40 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#aaa' },
  grid: { padding: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', marginBottom: 15, backgroundColor: '#1e1e1e' },
  cardTitle: { color: '#fff', fontSize: 14 },
});
