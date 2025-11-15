import { KeyboardTypeOptions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type: KeyboardTypeOptions; // 🔹 substituído InputModeOptions
  multiline?: boolean;
}

export default function CustomTextInput({
  label,
  value,
  onChangeText,
  type,
  multiline = false,
}: CustomTextInputProps) {
  return (
    <TextInput
      placeholder={label || ''}
      value={value}
      keyboardType={type === 'default' ? 'visible-password' : type}
      onChangeText={onChangeText}
      textColor="#2B2D42"
      outlineColor="#2B2D42"
      activeUnderlineColor="#2B2D42"
      underlineColor="#2B2D42"
      mode="outlined"
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      style={multiline ? styles.multiline : styles.input}
      underlineStyle={{ backgroundColor: '#F2F2F2' }}

      // 🚫 Desativa sugestões, correções, capitalização e preenchimentos automáticos
      autoCorrect={false}
      spellCheck={false} // ✅ adicione esta linha
      autoComplete="off"
      autoCapitalize="none"
      importantForAutofill="no"
      disableFullscreenUI
      contextMenuHidden
    />
  );
}

const styles = StyleSheet.create({
  multiline: {
    backgroundColor: 'transparent',
    height: 100,
    width: '100%',
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
