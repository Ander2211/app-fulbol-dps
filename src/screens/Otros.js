import * as React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../services/ThemeContext';

export default function OtroScreen(navigation){
    const { colors } = useTheme();
    return (
        <View style={[{flex:1,alignItems:'center',justifyContent:'center', backgroundColor: colors.background}]}>
            <Text onPress={() => navigation.navigate('Inicio')}
                style={[{fontSize:26,fontWeight:'bold', color: colors.text}]}>
                    Otro
            </Text>
        </View>
    )
}