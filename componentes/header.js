import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Pantalla Principal */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Directorio de Equipos' }}
      />

      {/* Pantalla de Detalles (Faltaba esta parte) */}
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{ title: 'Detalles del Equipo' }}
      />
    </Stack.Navigator>
  );
}