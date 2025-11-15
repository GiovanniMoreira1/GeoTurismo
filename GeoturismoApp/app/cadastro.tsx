import { AuthService } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import Logo from '@/assets/images/logo.svg';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCadastro() {
    if (!nome || !email || !senha || !confSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      await AuthService.register({ nome, email, senha });

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { text: 'OK', onPress: () => router.push('/login') },
      ]);
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      Alert.alert('Erro', 'Falha ao cadastrar usuário.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={style.safeArea}>
      <KeyboardAvoidingView
        style={style.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={style.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Logo />

          <Card style={style.formulario}>
            <Card.Title
              title="Cadastro"
              titleStyle={{
                textAlign: 'center',
                fontSize: 21,
                padding: 0,
                marginTop: 5,
              }}
            />
            <Card.Content style={style.cardContent}>
              <View style={style.boxFormulario}>
                <Text style={style.campos}>Nome:</Text>
                <TextInput
                  style={style.input}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              <View style={style.boxFormulario}>
                <Text style={style.campos}>Email:</Text>
                <TextInput
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  style={style.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={style.boxFormulario}>
                <Text style={style.campos}>Senha:</Text>
                <TextInput
                  textContentType="password"
                  secureTextEntry
                  style={style.input}
                  value={senha}
                  onChangeText={setSenha}
                />
              </View>

              <View style={style.boxFormulario}>
                <Text style={style.campos}>Confirmar Senha:</Text>
                <TextInput
                  textContentType="password"
                  secureTextEntry
                  style={style.input}
                  value={confSenha}
                  onChangeText={setConfSenha}
                />
              </View>

              <Button
                mode="contained"
                style={style.button}
                onPress={handleCadastro}
                loading={loading}
                disabled={loading}
                labelStyle={{ color: '#FFFFFF' }}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>

              <Text onPress={() => router.push('/login')} style={style.redirect}>
                Já possui login?{' '}
                <Text style={{ fontWeight: 'bold' }}>Entrar</Text>
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0077B6',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    gap: 25,
  },
  formulario: {
    width: '85%',
    justifyContent: 'space-between',
  },
  cardContent: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  campos: {
    fontSize: 17,
    color: '#2B2D42',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 3,
  },
  boxFormulario: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
  },
  input: {
    borderColor: '#2B2D42',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    width: '90%',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#2B2D42',
    fontSize: 17,
    borderRadius: 6,
    color: '#FFFFFF',
  },
  redirect: {
    width: '100%',
    textAlign: 'center',
    color: '#2B2D42',
    marginTop: 10,
    fontSize: 13,
  },
});
