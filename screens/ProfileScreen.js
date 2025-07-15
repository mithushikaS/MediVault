import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType = 'patient' } = route.params || {};
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  
  // Mock user data based on role
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4567'
    }
  });
  
  // Set user data based on role
  useEffect(() => {
    if (userType === 'doctor') {
      setUser({
        name: 'Dr. Sarah Johnson',
        email: 'dr.johnson@medivault.com',
        specialization: 'Cardiology',
        licenseNumber: 'MD12345678',
        hospital: 'Central Medical Center',
        yearsOfExperience: 12,
        emergencyContact: {
          name: 'Robert Johnson',
          relationship: 'Spouse',
          phone: '+1 (555) 987-6543'
        }
      });
    } else if (userType === 'admin') {
      setUser({
        name: 'Admin User',
        email: 'admin@medivault.com',
        role: 'System Administrator',
        department: 'IT Security',
        accessLevel: 'Full Access',
        employeeId: 'ADM-2023-001',
        emergencyContact: {
          name: 'Emergency Contact',
          relationship: 'Colleague',
          phone: '+1 (555) 555-5555'
        }
      });
    }
  }, [userType]);
  
  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    // For demo purposes, we'll just navigate to the login screen
    // @ts-ignore
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(`Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const toggleBiometric = () => {
    setBiometricEnabled(!biometricEnabled);
    toast.success(`Biometric authentication ${!biometricEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    toast.success(`Dark mode ${!darkModeEnabled ? 'enabled' : 'disabled'}`);
  };
  
  const toggleDataSharing = () => {
    setDataSharing(!dataSharing);
    toast.success(`Data sharing ${!dataSharing ? 'enabled' : 'disabled'}`);
  };
  
  // Get primary color based on user type
  const getPrimaryColor = () => {
    if (userType === 'doctor') return '#005D8F';
    if (userType === 'admin') return '#2ECC71';
    return '#17C3B2';
  };
  
  // Render medical information section for patients
  const renderPatientMedicalInfo = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Blood Type</Text>
            <Text style={styles.infoValue}>{user.bloodType}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Allergies</Text>
            <View style={styles.allergiesContainer}>
              {user.allergies.map((allergy, index) => (
                <View key={index} style={[styles.allergyTag, { backgroundColor: `${getPrimaryColor()}20` }]}>
                  <Text style={[styles.allergyText, { color: getPrimaryColor() }]}>{allergy}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  // Render professional information for doctors
  const renderDoctorProfessionalInfo = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Specialization</Text>
            <Text style={styles.infoValue}>{user.specialization}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>License Number</Text>
            <Text style={styles.infoValue}>{user.licenseNumber}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hospital</Text>
            <Text style={styles.infoValue}>{user.hospital}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experience</Text>
            <Text style={styles.infoValue}>{user.yearsOfExperience} years</Text>
          </View>
        </View>
      </View>
    );
  };
  
  // Render admin information
  const renderAdminInfo = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Administrative Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user.role}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>{user.department}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Access Level</Text>
            <Text style={styles.infoValue}>{user.accessLevel}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Employee ID</Text>
            <Text style={styles.infoValue}>{user.employeeId}</Text>
          </View>
        </View>
      </View>
    );
  };
  
  // Render role-specific settings
  const renderRoleSpecificSettings = () => {
    if (userType === 'doctor') {
      return (
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="shield-outline" size={24} color={getPrimaryColor()} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Patient Data Access</Text>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={toggleDataSharing}
            trackColor={{ false: '#E0E0E0', true: `${getPrimaryColor()}80` }}
            thumbColor={dataSharing ? getPrimaryColor() : '#F5F5F5'}
          />
        </View>
      );
    } else if (userType === 'admin') {
      return (
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="key-outline" size={24} color={getPrimaryColor()} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Advanced Security</Text>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={toggleDataSharing}
            trackColor={{ false: '#E0E0E0', true: `${getPrimaryColor()}80` }}
            thumbColor={dataSharing ? getPrimaryColor() : '#F5F5F5'}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="share-social-outline" size={24} color={getPrimaryColor()} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Data Sharing</Text>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={toggleDataSharing}
            trackColor={{ false: '#E0E0E0', true: `${getPrimaryColor()}80` }}
            thumbColor={dataSharing ? getPrimaryColor() : '#F5F5F5'}
          />
        </View>
      );
    }
  };
  
  // Render role-specific menu items
  const renderRoleSpecificMenuItems = () => {
    if (userType === 'doctor') {
      return (
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => toast.info('Patient Access Settings')}
        >
          <Ionicons name="people-outline" size={24} color={getPrimaryColor()} style={styles.menuIcon} />
          <Text style={styles.menuLabel}>Patient Access Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
        </TouchableOpacity>
      );
    } else if (userType === 'admin') {
      return (
        <>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => toast.info('System Configuration')}
          >
            <Ionicons name="settings-outline" size={24} color={getPrimaryColor()} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>System Configuration</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => toast.info('User Management')}
          >
            <Ionicons name="people-outline" size={24} color={getPrimaryColor()} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>User Management</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => toast.info('Health Data Permissions')}
        >
          <Ionicons name="lock-closed-outline" size={24} color={getPrimaryColor()} style={styles.menuIcon} />
          <Text style={styles.menuLabel}>Health Data Permissions</Text>
          <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
        </TouchableOpacity>
      );
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {userType === 'doctor' ? 'Doctor Profile' : 
           userType === 'admin' ? 'Admin Profile' : 'Profile'}
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color={getPrimaryColor()} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: getPrimaryColor() }]}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          {userType === 'doctor' && (
            <View style={[styles.badgeContainer, { backgroundColor: `${getPrimaryColor()}20` }]}>
              <Ionicons name="medical" size={16} color={getPrimaryColor()} />
              <Text style={[styles.badgeText, { color: getPrimaryColor() }]}>Healthcare Provider</Text>
            </View>
          )}
          {userType === 'admin' && (
            <View style={[styles.badgeContainer, { backgroundColor: `${getPrimaryColor()}20` }]}>
              <Ionicons name="shield-checkmark" size={16} color={getPrimaryColor()} />
              <Text style={[styles.badgeText, { color: getPrimaryColor() }]}>Administrator</Text>
            </View>
          )}
        </View>
        
        {/* Role-specific information sections */}
        {userType === 'patient' && renderPatientMedicalInfo()}
        {userType === 'doctor' && renderDoctorProfessionalInfo()}
        {userType === 'admin' && renderAdminInfo()}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{user.emergencyContact.name}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Relationship</Text>
              <Text style={styles.infoValue}>{user.emergencyContact.relationship}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.emergencyContact.phone}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={24} color={getPrimaryColor()} style={styles.settingIcon} />
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#E0E0E0', true: `${getPrimaryColor()}80` }}
                thumbColor={notificationsEnabled ? getPrimaryColor() : '#F5F5F5'}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="finger-print" size={24} color={getPrimaryColor()} style={styles.settingIcon} />
                <Text style={styles.settingLabel}>Biometric Authentication</Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={toggleBiometric}
                trackColor={{ false: '#E0E0E0', true: `${getPrimaryColor()}80` }}
                thumbColor={biometricEnabled ? getPrimaryColor() : '#F5F5F5'}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="moon-outline" size={24} color={getPrimaryColor()} style={styles.settingIcon} />
                <Text style={styles.settingLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#E0E0E0', true: `${getPrimaryColor()}80` }}
                thumbColor={darkModeEnabled ? getPrimaryColor() : '#F5F5F5'}
              />
            </View>
            
            <View style={styles.divider} />
            
            {/* Role-specific settings */}
            {renderRoleSpecificSettings()}
          </View>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => toast.info('Privacy Policy')}
          >
            <Ionicons name="shield-checkmark-outline" size={24} color={getPrimaryColor()} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => toast.info('Terms of Service')}
          >
            <Ionicons name="document-text-outline" size={24} color={getPrimaryColor()} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
          
          {/* Role-specific menu items */}
          {renderRoleSpecificMenuItems()}
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => toast.info('Help & Support')}
          >
            <Ionicons name="help-circle-outline" size={24} color={getPrimaryColor()} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: userType === 'doctor' ? '#FFF5F0' : userType === 'admin' ? '#F0FFF5' : '#FFF0F0' }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A80F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
  },
  badgeText: {
    color: '#4A80F0',
    fontWeight: '500',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  allergiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  allergyTag: {
    backgroundColor: '#F0F5FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
    marginBottom: 8,
  },
  allergyText: {
    color: '#4A80F0',
    fontWeight: '500',
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
});