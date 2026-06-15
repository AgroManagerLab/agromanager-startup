import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors, FONT } from '../global/themes';

interface FieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  focused?: boolean;
  hint?: string;
  suffix?: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'text' | 'number';
  big?: boolean;
  secureTextEntry?: boolean;
  editable?: boolean;
}

export function Field({
  label, value, onChangeText, placeholder, focused,
  hint, suffix, icon, type = 'text', big = false,
  secureTextEntry, editable = true,
}: FieldProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{
        fontFamily: FONT.uiBold, fontSize: 14, color: colors.ink2,
        marginBottom: 6, letterSpacing: -0.1,
      }}>{label}</Text>
      <View style={{
        flexDirection: 'row', alignItems: 'center', gap: 10,
        backgroundColor: colors.surface, borderRadius: colors.radii.md,
        borderWidth: 1.5, borderColor: focused ? colors.primary : colors.border,
        paddingHorizontal: big ? 18 : 16,
        height: big ? 72 : 56,
      }}>
        {icon}
        <TextInput
          style={{
            flex: 1,
            fontSize: big ? 28 : 17,
            fontFamily: type === 'number' ? FONT.monoBold : FONT.uiSemi,
            color: value ? colors.ink : colors.ink3,
            letterSpacing: big ? -0.6 : -0.2,
            height: '100%',
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.ink3}
          keyboardType={type === 'number' ? 'decimal-pad' : 'default'}
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
        {suffix ? (
          typeof suffix === 'string' ? (
            <Text style={{ fontSize: big ? 22 : 14, fontFamily: FONT.uiBold, color: colors.ink2 }}>{suffix}</Text>
          ) : suffix
        ) : null}
      </View>
      {hint ? (
        <Text style={{ fontSize: 13, color: colors.ink3, marginTop: 6 }}>{hint}</Text>
      ) : null}
    </View>
  );
}
