import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { supabase } from './src/services/supabase';
import MainContainer from './src/navigation/MainContainer';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { dark, colors } = useTheme();

  useEffect(() => {
    // 1. Obtener la sesión inicial guardada por Supabase
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log('Error al verificar sesión inicial:', err);
      } finally {
        setIsInitialized(true);
      }
    };

    checkSession();

    // 2. Escuchar cambios de autenticación en Supabase (inicio de sesión, cierre de sesión, renovación de token)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Error al cerrar sesión:', e);
    } finally {
      setIsLoggedIn(false);
    }
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isInitialized) {
    return null;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const navigationTheme = {
    ...(dark ? DarkTheme : DefaultTheme),
    colors: {
      ...(dark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
      <NavigationContainer theme={navigationTheme}>
        <MainContainer onLogout={handleLogout} />
        <StatusBar style={colors.statusBar} />
      </NavigationContainer>
  );
}

export default function App() {
  return (
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
  );
}