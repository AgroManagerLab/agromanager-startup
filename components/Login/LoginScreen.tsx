import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./LoginScreen.styles";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>
          Faca login para continuar usando o aplicativo.
        </Text>
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => 
                navigation.navigate("Details")}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
