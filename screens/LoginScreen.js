import React, { useState, useEffect } from 'react';
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
import Logo from '../assets/logo.png';


export default function LoginScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType = 'patient' } = route.params || {};
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Set title based on user type
  const [title, setTitle] = useState('Welcome Back');
  const [subtitle, setSubtitle] = useState('Sign in to access your health records');
  
  useEffect(() => {
    // Update title and subtitle based on user type
    if (userType === 'doctor') {
      setTitle('Healthcare Provider Login');
      setSubtitle('Sign in to access patient records');
    } else if (userType === 'admin') {
      setTitle('Admin Login');
      setSubtitle('Sign in to manage the system');
    } else {
      setTitle('Welcome Back');
      setSubtitle('Sign in to access your health records');
    }
  }, [userType]);
  
  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // In a real app, you would authenticate with a backend here
    // For demo purposes, we'll just navigate to the home screen with the user type
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
            <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.tagline}>Your Personal Health Record Locker</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            
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
            
            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('ForgotPassword', { userType });
              }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.loginButton,
                userType === 'doctor' ? styles.doctorButton : 
                userType === 'admin' ? styles.adminButton : 
                styles.loginButton
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            {userType === 'patient' && (
              <>
                <View style={styles.orContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.divider} />
                </View>
                
                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-google" size={20} color="#DB4437" />
                    <Text style={styles.socialButtonText}>Google</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-apple" size={20} color="#000" />
                    <Text style={styles.socialButtonText}>Apple</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          
          {userType === 'patient' && (
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('Register', { userType });
                }}
              >
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7F9', // Soft teal-tinted background
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
    backgroundColor: '#DFF3F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1E5E7',
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: '#F9FDFD',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#2D3748',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#17C3B2',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#17C3B2', // Patient default
    borderRadius: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorButton: {
    backgroundColor: '#005D8F',
  },
  adminButton: {
    backgroundColor: '#2ECC71',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCE3E6',
  },
  orText: {
    color: '#9CA3AF',
    fontSize: 13,
    marginHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1E5E7',
    borderRadius: 14,
    padding: 12,
    width: '48%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  socialButtonText: {
    marginLeft: 8,
    color: '#2D3748',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  signupText: {
    color: '#6B7280',
    fontSize: 14,
  },
  signupLink: {
    color: '#17C3B2',
    fontWeight: '600',
    fontSize: 14,
  },
  logoImage: {
    width: 200,
    height: 160,
  },
});


