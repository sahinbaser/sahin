import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AnomalyScreen from '../screens/AnomalyScreen';
import DividendScreen from '../screens/DividendScreen';
import TradingScreen from '../screens/TradingScreen';
import MoneyFlowScreen from '../screens/MoneyFlowScreen';
import RiskScreen from '../screens/RiskScreen';

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FinPro' }} />
      <Stack.Screen name="Anomaly" component={AnomalyScreen} options={{ title: 'Doğallık Analizi' }} />
      <Stack.Screen name="Dividend" component={DividendScreen} options={{ title: 'Temettü Simülatörü' }} />
      <Stack.Screen name="Trading" component={TradingScreen} options={{ title: 'Al-Sat Sinyalleri' }} />
      <Stack.Screen name="MoneyFlow" component={MoneyFlowScreen} options={{ title: 'Para Akışı' }} />
      <Stack.Screen name="Risk" component={RiskScreen} options={{ title: 'Risk Analizi' }} />
    </Stack.Navigator>
  );
}
