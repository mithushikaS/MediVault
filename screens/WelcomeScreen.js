import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#4A80F0', marginBottom: 8 }}>MediVault</Text>
          <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>Your Personal Health Record Locker</Text>
        </View>
        
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=Health%20Records%20Management&aspect=1:1&seed=123' }} 
            style={{ width: width * 0.7, height: width * 0.7, borderRadius: 20 }}
            resizeMode="contain"
          />
        </View>
        
        <View style={{ marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16, backgroundColor: '#E6F2FF' }}>
              <Ionicons name="shield-checkmark" size={24} color="#4A80F0" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>Secure Storage</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                Your health records are encrypted and securely stored
              </Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16, backgroundColor: '#FFF0E6' }}>
              <Ionicons name="people" size={24} color="#FF8C42" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>Role-Based Access</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                Control who can view your medical information
              </Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16, backgroundColor: '#E6FFF0' }}>
              <Ionicons name="alert-circle" size={24} color="#2ECC71" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>Emergency Access</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                Quick access to critical information in emergencies
              </Text>
            </View>
          </View>
        </View>
        
        <View style={{ marginBottom: 24 }}>
          <TouchableOpacity 
            style={{ flexDirection: 'row', backgroundColor: '#4A80F0', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('Login', { userType: 'patient' });
            }}
          >
            <Ionicons name="person" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Continue as Patient</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ flexDirection: 'row', backgroundColor: '#FF8C42', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('Login', { userType: 'doctor' });
            }}
          >
            <Ionicons name="medkit" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Continue as Healthcare Provider</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ flexDirection: 'row', backgroundColor: '#2ECC71', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('Login', { userType: 'admin' });
            }}
          >
            <Ionicons name="settings" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Continue as Admin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}