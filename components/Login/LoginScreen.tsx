import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

export default function Login() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>
          Faça login para continuar usando o aplicativo.
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => navigation.navigate("Details" as never)}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f1e8",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    color: "#264034",
    fontSize: 32,
    fontWeight: "700",
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#264034",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: "#f9f6ef",
    fontSize: 15,
    fontWeight: "600",
  },
  description: {
    color: "#44584e",
    fontSize: 16,
    lineHeight: 24,
  },
});
