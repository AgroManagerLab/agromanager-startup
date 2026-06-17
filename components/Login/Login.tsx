import React, { type ReactNode, useState } from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  type GestureResponderEvent,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  Producer: undefined;
};

type PhoneProps = {
  children: ReactNode;
  bg?: string;
};

type FieldProps = {
  label: string;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  suffix?: ReactNode;
  icon?: ReactNode;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'email' | 'password' | 'current-password';
  keyboardType?: 'default' | 'email-address';
  secureTextEntry?: boolean;
  textContentType?: 'emailAddress' | 'password';
};

type BigButtonProps = {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

type CowMarkProps = {
  size?: number;
};

type LoginScreenProps = {
  variant?: 'default' | 'error';
};

const MR = {
  bg: '#f8f5ee',
  surface: '#ffffff',
  border: '#ded8cc',
  ink: '#273339',
  ink2: '#5d6768',
  ink3: '#89908f',
  primary: '#2d7757',
  primaryDark: '#235941',
  primarySoft: '#e8f4ed',
  accent: '#dca53a',
  accentSoft: '#f5e2b7',
  danger: '#ba342d',
  dangerBg: '#fae8e5',
  radius: {
    md: 16,
  },
};

function Phone({ children, bg = MR.bg }: PhoneProps) {
  return (
    <SafeAreaView style={[styles.phone, { backgroundColor: bg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  suffix,
  icon,
  autoCapitalize = 'sentences',
  autoComplete,
  keyboardType = 'default',
  secureTextEntry,
  textContentType,
}: FieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.field}>
        {icon}
        <TextInput
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={MR.ink3}
          secureTextEntry={secureTextEntry}
          style={styles.fieldInput}
          textContentType={textContentType}
          value={value}
        />
        {suffix}
      </View>
    </View>
  );
}

function BigButton({ children, onPress }: BigButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.86}
      style={styles.bigButton}
      onPress={onPress}
    >
      <Text style={styles.bigButtonText}>{children}</Text>
    </TouchableOpacity>
  );
}

function MailIcon() {
  return (
    <View style={styles.iconBox}>
      <View style={styles.mailBody} />
      <View style={styles.mailFoldLeft} />
      <View style={styles.mailFoldRight} />
    </View>
  );
}

function LockIcon() {
  return (
    <View style={styles.iconBox}>
      <View style={styles.lockShackle} />
      <View style={styles.lockBody} />
    </View>
  );
}

function AlertIcon() {
  return (
    <View style={styles.alertIcon}>
      <Text style={styles.alertText}>!</Text>
    </View>
  );
}

function CowMark({ size = 156 }: CowMarkProps) {
  const scale = size / 156;

  return (
    <View style={[styles.cowWrap, { width: size, height: size, borderRadius: size / 2 }]}>
      <View style={[styles.hornLeft, { transform: [{ rotate: '-24deg' }, { scale }] }]} />
      <View style={[styles.hornRight, { transform: [{ rotate: '24deg' }, { scale }] }]} />
      <View style={[styles.earLeft, { transform: [{ rotate: '-25deg' }, { scale }] }]}>
        <View style={styles.earInner} />
      </View>
      <View style={[styles.earRight, { transform: [{ rotate: '25deg' }, { scale }] }]}>
        <View style={styles.earInner} />
      </View>
      <View style={[styles.cowHead, { transform: [{ scale }] }]}>
        <View style={styles.spotLeft} />
        <View style={styles.spotRight} />
        <View style={styles.eyeLeft}>
          <View style={styles.eyeSpark} />
        </View>
        <View style={styles.eyeRight}>
          <View style={styles.eyeSpark} />
        </View>
        <View style={styles.snout}>
          <View style={styles.nostrilLeft} />
          <View style={styles.nostrilRight} />
          <View style={styles.mouth} />
        </View>
      </View>
    </View>
  );
}

export default function LoginScreen({ variant = 'default' }: LoginScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const showError = variant === 'error';
  const [email, setEmail] = useState('ricardo@coopvaleleite.coop.br');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Phone bg={MR.bg}>
      <View style={styles.container}>
        <View style={styles.brandBlock}>
          <CowMark size={156} />
          <View style={styles.brandTextBlock}>
            <Text style={styles.brandText}>
              Milk<Text style={styles.brandAccent}>Route</Text>
            </Text>
            <Text style={styles.brandSubtitle}>Coleta de leite cooperada</Text>
          </View>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Entre com a sua conta da cooperativa</Text>
        </View>

        <Field
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com.br"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          icon={<MailIcon />}
        />
        <Field
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Sua senha"
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={!showPassword}
          textContentType="password"
          icon={<LockIcon />}
          suffix={
            <TouchableOpacity
              accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              accessibilityRole="button"
              activeOpacity={0.7}
              onPress={() => setShowPassword((visible) => !visible)}
            >
              <Text style={styles.showPassword}>{showPassword ? 'OCULTAR' : 'MOSTRAR'}</Text>
            </TouchableOpacity>
          }
        />

        {showError && (
          <View style={styles.errorBox}>
            <AlertIcon />
            <View style={styles.errorContent}>
              <Text style={styles.errorTitle}>E-mail ou senha incorretos</Text>
              <Text style={styles.errorDescription}>Verifique seus dados e tente novamente.</Text>
            </View>
          </View>
        )}

        <View style={styles.forgotWrap}>
          <Text style={styles.forgot}>Esqueci a senha</Text>
        </View>

        <BigButton onPress={() => navigation.navigate('Producer')}>Entrar</BigButton>

        <Text style={styles.footer}>
          Ainda não é cooperado? <Text style={styles.footerStrong}>Fale com sua cooperativa</Text>
        </Text>
      </View>
    </Phone>
  );
}

const styles = StyleSheet.create({
  phone: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 54,
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  brandBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  brandTextBlock: {
    alignItems: 'center',
  },
  brandText: {
    color: MR.ink,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
  },
  brandAccent: {
    color: MR.primary,
  },
  brandSubtitle: {
    color: MR.ink2,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  welcome: {
    marginBottom: 18,
  },
  title: {
    color: MR.ink,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26,
  },
  subtitle: {
    color: MR.ink2,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: MR.ink2,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  field: {
    minHeight: 58,
    alignItems: 'center',
    backgroundColor: MR.surface,
    borderColor: MR.border,
    borderRadius: MR.radius.md,
    borderWidth: 1.5,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
  },
  fieldInput: {
    color: MR.ink,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    minWidth: 0,
    paddingVertical: 0,
  },
  showPassword: {
    color: MR.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  bigButton: {
    alignItems: 'center',
    backgroundColor: MR.primary,
    borderRadius: MR.radius.md,
    height: 60,
    justifyContent: 'center',
  },
  bigButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginBottom: 22,
    marginTop: 2,
  },
  forgot: {
    color: MR.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    color: MR.ink3,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 22,
    textAlign: 'center',
  },
  footerStrong: {
    color: MR.ink2,
    fontWeight: '700',
  },
  errorBox: {
    alignItems: 'flex-start',
    backgroundColor: MR.dangerBg,
    borderColor: '#e7b9b2',
    borderRadius: MR.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorContent: {
    flex: 1,
  },
  errorTitle: {
    color: MR.danger,
    fontSize: 14,
    fontWeight: '700',
  },
  errorDescription: {
    color: MR.danger,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
    opacity: 0.85,
  },
  alertIcon: {
    alignItems: 'center',
    borderColor: MR.danger,
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    marginTop: 1,
    width: 20,
  },
  alertText: {
    color: MR.danger,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 15,
  },
  iconBox: {
    height: 22,
    position: 'relative',
    width: 22,
  },
  mailBody: {
    borderColor: MR.ink3,
    borderRadius: 3,
    borderWidth: 1.8,
    height: 14,
    left: 2,
    position: 'absolute',
    top: 4,
    width: 18,
  },
  mailFoldLeft: {
    backgroundColor: MR.ink3,
    height: 1.8,
    left: 4,
    position: 'absolute',
    top: 8,
    transform: [{ rotate: '32deg' }],
    width: 8,
  },
  mailFoldRight: {
    backgroundColor: MR.ink3,
    height: 1.8,
    position: 'absolute',
    right: 4,
    top: 8,
    transform: [{ rotate: '-32deg' }],
    width: 8,
  },
  lockShackle: {
    borderColor: MR.ink3,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.8,
    height: 10,
    left: 6,
    position: 'absolute',
    top: 1,
    width: 10,
  },
  lockBody: {
    borderColor: MR.ink3,
    borderRadius: 3,
    borderWidth: 1.8,
    height: 12,
    left: 3,
    position: 'absolute',
    top: 9,
    width: 16,
  },
  cowWrap: {
    alignItems: 'center',
    backgroundColor: MR.primarySoft,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cowHead: {
    backgroundColor: '#ffffff',
    borderColor: MR.primaryDark,
    borderRadius: 36,
    borderWidth: 3,
    height: 94,
    position: 'relative',
    width: 96,
  },
  earLeft: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: MR.primaryDark,
    borderRadius: 18,
    borderWidth: 2.5,
    height: 22,
    justifyContent: 'center',
    left: 28,
    position: 'absolute',
    top: 54,
    width: 36,
  },
  earRight: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: MR.primaryDark,
    borderRadius: 18,
    borderWidth: 2.5,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: 28,
    top: 54,
    width: 36,
  },
  earInner: {
    backgroundColor: MR.accentSoft,
    borderRadius: 10,
    height: 10,
    width: 18,
  },
  hornLeft: {
    backgroundColor: MR.accent,
    borderRadius: 4,
    height: 22,
    left: 55,
    position: 'absolute',
    top: 28,
    width: 6,
  },
  hornRight: {
    backgroundColor: MR.accent,
    borderRadius: 4,
    height: 22,
    position: 'absolute',
    right: 55,
    top: 28,
    width: 6,
  },
  spotLeft: {
    backgroundColor: MR.primary,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 10,
    height: 24,
    left: 15,
    position: 'absolute',
    top: 15,
    width: 20,
  },
  spotRight: {
    backgroundColor: MR.primary,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 16,
    height: 22,
    position: 'absolute',
    right: 12,
    top: 52,
    width: 22,
  },
  eyeLeft: {
    backgroundColor: MR.ink,
    borderRadius: 6,
    height: 12,
    left: 27,
    position: 'absolute',
    top: 42,
    width: 10,
  },
  eyeRight: {
    backgroundColor: MR.ink,
    borderRadius: 6,
    height: 12,
    position: 'absolute',
    right: 27,
    top: 42,
    width: 10,
  },
  eyeSpark: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    height: 3,
    left: 2,
    position: 'absolute',
    top: 2,
    width: 3,
  },
  snout: {
    backgroundColor: '#f2e7cc',
    borderColor: MR.primaryDark,
    borderRadius: 22,
    borderWidth: 2.5,
    bottom: 7,
    height: 34,
    left: 22,
    position: 'absolute',
    width: 48,
  },
  nostrilLeft: {
    backgroundColor: MR.primaryDark,
    borderRadius: 3,
    height: 7,
    left: 13,
    position: 'absolute',
    top: 11,
    width: 5,
  },
  nostrilRight: {
    backgroundColor: MR.primaryDark,
    borderRadius: 3,
    height: 7,
    position: 'absolute',
    right: 13,
    top: 11,
    width: 5,
  },
  mouth: {
    borderBottomColor: MR.primaryDark,
    borderBottomWidth: 2,
    borderRadius: 12,
    bottom: 6,
    height: 8,
    left: 14,
    position: 'absolute',
    width: 20,
  },
});
