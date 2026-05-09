import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar el tema guardado al iniciar
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('THEME_MODE');
        if (savedTheme !== null) {
          setIsDarkMode(JSON.parse(savedTheme));
        }
      } catch (err) {
        console.log('Error loading theme', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadTheme();
  }, []);

  // Guardar el tema cuando cambia
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('THEME_MODE', JSON.stringify(newTheme));
    } catch (err) {
      console.log('Error saving theme', err);
    }
  };

  const theme = {
    isDarkMode,
    colors: isDarkMode ? {
      // Colores modo oscuro
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      border: '#404040',
      primary: '#f4511e',
      primaryDark: '#d63f14',
      success: '#4caf50',
      error: '#f44336',
      orange: '#ff9800',
    } : {
      // Colores modo claro
      background: '#f5f5f5',
      surface: '#ffffff',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0',
      primary: '#f4511e',
      primaryDark: '#d63f14',
      success: '#4caf50',
      error: '#f44336',
      orange: '#ff9800',
    },
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};
