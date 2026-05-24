import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './components/Login/LoginScreen';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <LoginScreen />
  );
}

function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Detalhes</Text>
        <Text style={styles.description}>
          Esta tela existe para validar a navegação stack desde o bootstrap.
        </Text>
        <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          contentStyle: styles.screen,
        }}>
        <Stack.Screen name="Home" component={LoginScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f1e8',
  },
  screen: {
    backgroundColor: '#f5f1e8',
  },
  header: {
    backgroundColor: '#f5f1e8',
  },
  headerTitle: {
    color: '#264034',
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  eyebrow: {
    color: '#627b6d',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#264034',
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    color: '#44584e',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#264034',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#f9f6ef',
    fontSize: 15,
    fontWeight: '600',
  },
});
