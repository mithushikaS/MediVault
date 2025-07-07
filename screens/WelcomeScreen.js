// import React from 'react';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   Image, 
//   Dimensions,
//   ScrollView
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// export default function WelcomeScreen() {
//   const navigation = useNavigation();
  
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
//       <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
//         <View style={{ alignItems: 'center', marginBottom: 32 }}>
//           <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#4A80F0', marginBottom: 8 }}>MediVault</Text>
//           <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>Your Personal Health Record Locker</Text>
//         </View>
        
//         <View style={{ alignItems: 'center', marginBottom: 32 }}>
//           <Image 
//             source={{ uri: 'https://api.a0.dev/assets/image?text=Health%20Records%20Management&aspect=1:1&seed=123' }} 
//             style={{ width: width * 0.7, height: width * 0.7, borderRadius: 20 }}
//             resizeMode="contain"
//           />
//         </View>
        
//         <View style={{ marginBottom: 32 }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
//             <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16, backgroundColor: '#E6F2FF' }}>
//               <Ionicons name="shield-checkmark" size={24} color="#4A80F0" />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>Secure Storage</Text>
//               <Text style={{ fontSize: 14, color: '#666' }}>
//                 Your health records are encrypted and securely stored
//               </Text>
//             </View>
//           </View>
          
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
//             <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16, backgroundColor: '#FFF0E6' }}>
//               <Ionicons name="people" size={24} color="#FF8C42" />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>Role-Based Access</Text>
//               <Text style={{ fontSize: 14, color: '#666' }}>
//                 Control who can view your medical information
//               </Text>
//             </View>
//           </View>
          
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
//             <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16, backgroundColor: '#E6FFF0' }}>
//               <Ionicons name="alert-circle" size={24} color="#2ECC71" />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>Emergency Access</Text>
//               <Text style={{ fontSize: 14, color: '#666' }}>
//                 Quick access to critical information in emergencies
//               </Text>
//             </View>
//           </View>
//         </View>
        
//         <View style={{ marginBottom: 24 }}>
//           <TouchableOpacity 
//             style={{ flexDirection: 'row', backgroundColor: '#4A80F0', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}
//             onPress={() => {
//               // @ts-ignore
//               navigation.navigate('Login', { userType: 'patient' });
//             }}
//           >
//             <Ionicons name="person" size={24} color="white" style={{ marginRight: 8 }} />
//             <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Continue as Patient</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={{ flexDirection: 'row', backgroundColor: '#FF8C42', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}
//             onPress={() => {
//               // @ts-ignore
//               navigation.navigate('Login', { userType: 'doctor' });
//             }}
//           >
//             <Ionicons name="medkit" size={24} color="white" style={{ marginRight: 8 }} />
//             <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Continue as Healthcare Provider</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={{ flexDirection: 'row', backgroundColor: '#2ECC71', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}
//             onPress={() => {
//               // @ts-ignore
//               navigation.navigate('Login', { userType: 'admin' });
//             }}
//           >
//             <Ionicons name="settings" size={24} color="white" style={{ marginRight: 8 }} />
//             <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Continue as Admin</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../assets/logo.png';


const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.subtitle}>Your Personal Health Record Locker</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=Health%20Records%20Management&aspect=1:1&seed=123' }} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.featureContainer}>
          <FeatureCard 
            icon="shield-checkmark" 
            iconBg="#E6F2FF"
            iconColor="#4A80F0"
            title="Secure Storage"
            description="Your health records are encrypted and securely stored"
          />
          <FeatureCard 
            icon="people" 
            iconBg="#FFF0E6"
            iconColor="#FF8C42"
            title="Role-Based Access"
            description="Control who can view your medical information"
          />
          <FeatureCard 
            icon="alert-circle" 
            iconBg="#E6FFF0"
            iconColor="#2ECC71"
            title="Emergency Access"
            description="Quick access to critical information in emergencies"
          />
        </View>

        <View style={styles.buttonContainer}>
          <RoleButton 
            title="Continue as Patient" 
            icon="person" 
            color="#4A80F0"
            onPress={() => navigation.navigate('Login', { userType: 'patient' })}
          />
          <RoleButton 
            title="Continue as Healthcare Provider" 
            icon="medkit" 
            color="#FF8C42"
            onPress={() => navigation.navigate('Login', { userType: 'doctor' })}
          />
          <RoleButton 
            title="Continue as Admin" 
            icon="settings" 
            color="#2ECC71"
            onPress={() => navigation.navigate('Login', { userType: 'admin' })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, iconBg, iconColor, title, description }) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

function RoleButton({ title, icon, color, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.roleButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="white" style={{ marginRight: 8 }} />
      <Text style={styles.roleButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A80F0',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 20,
  },
  featureContainer: {
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  roleButton: {
    flexDirection: 'row',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  roleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoImage: {
  width: 200,
  height: 160,
},
});
