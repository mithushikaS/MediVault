import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType = 'patient' } = route.params || {};
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // For healthcare providers
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  
  // Set title based on user type
  const [title, setTitle] = useState('Create Account');
  const [subtitle, setSubtitle] = useState('Sign up to secure your health records');
  
  useEffect(() => {
    // Update title and subtitle based on user type
    if (userType === 'doctor') {
      setTitle('Healthcare Provider Registration');
      setSubtitle('Sign up to access patient records');
    } else {
      setTitle('Create Account');
      setSubtitle('Sign up to secure your health records');
    }
  }, [userType]);
  
  const handleRegister = () => {
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    // Additional validation for healthcare providers
    if (userType === 'doctor' && (!licenseNumber || !specialization)) {
      toast.error('Please provide your license number and specialization');
      return;
    }
    
    // In a real app, you would register with a backend here
    // For demo purposes, we'll just navigate to the home screen
    // @ts-ignore
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { userType } }],
    });
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
            <Text style={styles.welcomeText}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#A0A0A0"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            
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
            
            {userType === 'doctor' && (
              <>
                <View style={styles.inputContainer}>
                  <Ionicons name="card-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="License Number"
                    placeholderTextColor="#A0A0A0"
                    value={licenseNumber}
                    onChangeText={setLicenseNumber}
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Ionicons name="medkit-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Specialization"
                    placeholderTextColor="#A0A0A0"
                    value={specialization}
                    onChangeText={setSpecialization}
                  />
                </View>
              </>
            )}
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#A0A0A0" 
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#A0A0A0"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#A0A0A0" 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.termsContainer}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View style={styles.checkbox}>
                {agreeToTerms && <Ionicons name="checkmark" size={16} color="#4A80F0" />}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.registerButton,
                userType === 'doctor' ? styles.doctorButton : styles.registerButton
              ]}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => {
                // @ts-ignore
                navigation.navigate('Login', { userType });
              }}
            >
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 32,
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
    marginBottom: 16,
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
  eyeIcon: {
    padding: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4A80F0',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  termsLink: {
    color: '#4A80F0',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorButton: {
    backgroundColor: '#FF8C42',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#4A80F0',
    fontWeight: '600',
  },
});