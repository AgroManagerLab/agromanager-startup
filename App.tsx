import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { styles as detailsStyles } from "./components/DetailsScreen.styles";
import LoginScreen from "./components/Login/LoginScreen";
import { theme } from "./styles/theme";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function DetailsScreen({ navigation }: { navigation: { goBack: () => void } }) {
  return (
    <SafeAreaView style={detailsStyles.safeArea}>
      <View style={detailsStyles.container}>
        <Text style={detailsStyles.title}>Detalhes</Text>
        <Text style={detailsStyles.description}>
          Esta tela existe para validar a navegacao stack desde o bootstrap.
        </Text>
        <TouchableOpacity
          style={detailsStyles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={detailsStyles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: theme.colors.bg,
            },
            headerTitleStyle: {
              color: theme.colors.ink,
              fontSize: 18,
              fontWeight: "600",
            },
            contentStyle: {
              backgroundColor: theme.colors.bg,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={LoginScreen}
            options={{ title: "Inicio" }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Detalhes" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
