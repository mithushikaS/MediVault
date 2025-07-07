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
    backgroundColor: '#ECEFF1',
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
  logoText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#4A80F0',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  formContainer: {
    backgroundColor: 'white',
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
    color: '#2D3748',
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
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
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
    color: '#4A80F0',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorButton: {
    backgroundColor: '#FF8C42',
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
    backgroundColor: '#E2E8F0',
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
    borderColor: '#E2E8F0',
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
    color: '#4A80F0',
    fontWeight: '600',
    fontSize: 14,
  },
  logoImage: {
  width: 200,
  height: 160,
},

});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   keyboardAvoidView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 24,
//     justifyContent: 'center',
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F0F0F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logoText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#4A80F0',
//     marginBottom: 8,
//   },
//   tagline: {
//     fontSize: 14,
//     color: '#666',
//   },
//   formContainer: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 15,
//     elevation: 2,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 24,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 12,
//     marginBottom: 16,
//     paddingHorizontal: 12,
//     backgroundColor: '#FAFAFA',
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     color: '#333',
//   },
//   eyeIcon: {
//     padding: 8,
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 24,
//   },
//   forgotPasswordText: {
//     color: '#4A80F0',
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: '#4A80F0',
//     borderRadius: 12,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   doctorButton: {
//     backgroundColor: '#FF8C42',
//   },
//   adminButton: {
//     backgroundColor: '#2ECC71',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   orText: {
//     color: '#A0A0A0',
//     marginHorizontal: 16,
//   },
//   socialButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   socialButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 12,
//     padding: 12,
//     width: '48%',
//   },
//   socialButtonText: {
//     marginLeft: 8,
//     color: '#333',
//     fontWeight: '500',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   signupText: {
//     color: '#666',
//   },
//   signupLink: {
//     color: '#4A80F0',
//     fontWeight: '600',
//   },
// });