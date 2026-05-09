import * as React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../services/ThemeContext";

export default function InicioScreen(navigation) {
  const { colors } = useTheme();
  return (
    <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }]}>
      <Text
        onPress={() => alert("Principal")}
        style={[{ fontSize: 26, fontWeight: "bold", color: colors.text }]}
      >
        Vista Principal
      </Text>
    </View>
  );
}
