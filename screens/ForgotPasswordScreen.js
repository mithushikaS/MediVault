import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType = 'patient' } = route.params || {};
  
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  
  // Set title based on user type
  const getTitle = () => {
    if (userType === 'doctor') {
      return 'Healthcare Provider Password Reset';
    } else if (userType === 'admin') {
      return 'Admin Password Reset';
    } else {
      return 'Password Reset';
    }
  };
  
  const handleResetPassword = () => {
    // Basic validation
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send a reset password email here
    // For demo purposes, we'll just show a success message
    setResetSent(true);
    toast.success('Password reset instructions sent to your email');
  };
  
  const handleBackToLogin = () => {
    // @ts-ignore
    navigation.navigate('Login', { userType });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.headerContainer}>
            <Text style={styles.logoText}>MediVault</Text>
            <Text style={styles.tagline}>Your Personal Health Record Locker</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>{getTitle()}</Text>
            
            {!resetSent ? (
              <>
                <Text style={styles.subtitle}>
                  Enter your email address and we'll send you instructions to reset your password
                </Text>
                
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A0A0A0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.resetButton,
                    userType === 'doctor' ? styles.doctorButton : 
                    userType === 'admin' ? styles.adminButton : 
                    styles.resetButton
                  ]}
                  onPress={handleResetPassword}
                >
                  <Text style={styles.resetButtonText}>Send Reset Instructions</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.successContainer}>
                <Ionicons name="checkmark-circle" size={80} color="#4CAF50" style={styles.successIcon} />
                <Text style={styles.successTitle}>Email Sent!</Text>
                <Text style={styles.successMessage}>
                  We've sent password reset instructions to your email address. Please check your inbox.
                </Text>
                <TouchableOpacity 
                  style={[
                    styles.backToLoginButton,
                    userType === 'doctor' ? styles.doctorButton : 
                    userType === 'admin' ? styles.adminButton : 
                    styles.backToLoginButton
                  ]}
                  onPress={handleBackToLogin}
                >
                  <Text style={styles.backToLoginText}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.helpContainer}
            onPress={() => toast.info('Contact support for assistance')}
          >
            <Ionicons name="help-circle-outline" size={20} color="#4A80F0" />
            <Text style={styles.helpText}>Need help?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A80F0',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorButton: {
    backgroundColor: '#FF8C42',
  },
  adminButton: {
    backgroundColor: '#2ECC71',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  backToLoginButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backToLoginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  helpText: {
    color: '#4A80F0',
    marginLeft: 8,
    fontWeight: '500',
  },
});