import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../services/ThemeContext";

// Import Navigation & Screens
import StackNavigator from "./StackNavigator";
import PerfilScreen from "../screens/Perfil";
import CalendarioScreen from "../screens/CalendarioScreen";
import ResultadosScreen from "../screens/ResultadosScreen";

// Screen Names
const homeName = "Inicio";
const resultsName = "Resultados";
const profileName = "Perfil";
const calendarName = "Calendario";

const Tab = createBottomTabNavigator();

function MainContainer({ onLogout }) {
  const { colors } = useTheme();
  
  const getScreenOptions = {
    tabBarActiveTintColor: "#f4511e",
    tabBarInactiveTintColor: "grey",
    tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
    tabBarStyle: { padding: 10, height: 70, backgroundColor: colors.surface, borderTopColor: colors.border },
    headerShown: false,
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    headerTitleStyle: { fontWeight: "bold", color: colors.text },
  };

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === resultsName) {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (rn === profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === calendarName) {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        ...getScreenOptions,
      })}
    >
      <Tab.Screen name={homeName} component={StackNavigator} />
      <Tab.Screen
        name={resultsName}
        component={ResultadosScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", color: colors.text },
        }}
      />
      <Tab.Screen
        name={profileName}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", color: colors.text },
        }}
      >
        {() => <PerfilScreen onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen
        name={calendarName}
        component={CalendarioScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "bold", color: colors.text },
        }}
      />
    </Tab.Navigator>
  );
}

export default MainContainer;
