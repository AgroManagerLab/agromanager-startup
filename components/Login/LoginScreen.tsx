import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Home: undefined;
  Producer: undefined;
};

export default function Login() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 justify-center p-6 gap-4">
        <Text className="font-ui-bold text-5xl text-primaryDark">Login</Text>
        <Text className="font-ui text-xl text-ink2 leading-6">
          Faça login para continuar usando o aplicativo.
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          className="self-start items-center bg-primaryDark rounded-full px-5 py-3.5"
          onPress={() => navigation.navigate("Producer")}
        >
          <Text className="font-ui-semibold text-lg text-bg">Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
