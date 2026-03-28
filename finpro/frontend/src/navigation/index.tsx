import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import AnomalyScreen from '../screens/AnomalyScreen';
import DividendScreen from '../screens/DividendScreen';
import TradingScreen from '../screens/TradingScreen';
import MoneyFlowScreen from '../screens/MoneyFlowScreen';
import RiskScreen from '../screens/RiskScreen';
import PortfolioScreen from '../screens/PortfolioScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Ana Sayfa') iconName = 'home';
          else if (route.name === 'Portföy') iconName = 'wallet';
          else if (route.name === 'Piyasalar') iconName = 'chart-line';
          return <IconButton icon={iconName} iconColor={color} size={size} />;
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#121212', borderTopColor: '#333' },
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
      <Tab.Screen name="Piyasalar" component={MoneyFlowScreen} />
      <Tab.Screen name="Portföy" component={PortfolioScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Anomaly" component={AnomalyScreen} options={{ title: 'Doğallık Analizi' }} />
      <Stack.Screen name="Dividend" component={DividendScreen} options={{ title: 'Temettü Simülatörü' }} />
      <Stack.Screen name="Trading" component={TradingScreen} options={{ title: 'Al-Sat Sinyalleri' }} />
      <Stack.Screen name="Risk" component={RiskScreen} options={{ title: 'Risk Analizi' }} />
    </Stack.Navigator>
  );
}
