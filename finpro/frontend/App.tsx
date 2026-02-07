import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import './src/i18n';
import RootNavigation from './src/navigation';

export default function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={MD3DarkTheme as any}>
        <RootNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}
