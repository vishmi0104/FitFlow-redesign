import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { Colors, Spacing } from '../constants/theme';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Success!', 'Please check your inbox for email verification.');
    setLoading(false);
  }

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FitFlow</Text>
      <Text style={styles.subtitle}>Sign in or create an account to continue</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email address"
        placeholderTextColor={Colors.light.textSecondary}
        autoCapitalize={'none'}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={Colors.light.textSecondary}
        secureTextEntry={true}
        autoCapitalize={'none'}
      />

      <TouchableOpacity style={styles.button} onPress={signInWithEmail} disabled={loading}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={signUpWithEmail} disabled={loading}>
        <Text style={styles.secondaryButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: Spacing.four, 
    backgroundColor: Colors.light.background 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: Colors.light.text, 
    marginBottom: Spacing.one, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 15, 
    color: Colors.light.textSecondary, 
    marginBottom: Spacing.five, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: Colors.light.backgroundElement, 
    padding: Spacing.three, 
    borderRadius: 10, 
    marginBottom: Spacing.three, 
    color: Colors.light.text,
    borderWidth: 1, 
    borderColor: Colors.light.backgroundSelected 
  },
  button: { 
    backgroundColor: '#6366F1', 
    padding: Spacing.three, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: Spacing.two 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  secondaryButton: { 
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderColor: '#6366F1' 
  },
  secondaryButtonText: { 
    color: '#6366F1', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});