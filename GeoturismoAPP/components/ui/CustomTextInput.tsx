import { InputModeOptions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type: InputModeOptions;
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
      inputMode={type}
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
