import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MainContainer from './src/navigation/MainContainer';

export default function App() {
  return (
    <NavigationContainer>
      <MainContainer />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
