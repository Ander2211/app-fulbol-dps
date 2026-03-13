import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screen Components
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/Perfil';
import OtrosScreen from '../screens/Otros';

// Screen Names
const homeName = "Inicio";
const profileName = "Perfil";
const settingsName = "Otros";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === profileName) {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (rn === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#f4511e',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                tabBarStyle: { padding: 10, height: 70 },
                headerStyle: { backgroundColor: '#f4511e' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            })}
        >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={profileName} component={PerfilScreen} />
            <Tab.Screen name={settingsName} component={OtrosScreen} />
        </Tab.Navigator>
    );
}

export default MainContainer;