import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType = 'patient' } = route.params || {};
  
  // State for user-specific content
  const [userName, setUserName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  
  useEffect(() => {
    // Set user-specific content based on role
    if (userType === 'doctor') {
      setUserName('Dr. Smith');
      setWelcomeMessage('Healthcare Provider Dashboard');
    } else if (userType === 'admin') {
      setUserName('Admin');
      setWelcomeMessage('System Administration');
    } else {
      setUserName('John');
      setWelcomeMessage('Welcome to');
    }
  }, [userType]);
  
  const navigateTo = (screen) => {
    navigation.navigate(screen, { userType });
  };

  // Render different quick access items based on user role
  const renderQuickAccessItems = () => {
    if (userType === 'doctor') {
      return (
        <>
          <TouchableOpacity 
            style={styles.quickAccessItem} 
            onPress={() => navigateTo('PatientList')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E6F2FF' }]}>
              <Ionicons name="people" size={24} color="#4A80F0" />
            </View>
            <Text style={styles.quickAccessText}>Patient List</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('Appointments')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFF0E6' }]}>
              <Ionicons name="calendar" size={24} color="#FF8C42" />
            </View>
            <Text style={styles.quickAccessText}>Appointments</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('UploadRecord')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E6FFF0' }]}>
              <Ionicons name="add-circle" size={24} color="#2ECC71" />
            </View>
            <Text style={styles.quickAccessText}>Add Records</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('Messages')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFE6E6' }]}>
              <Ionicons name="chatbubble" size={24} color="#E74C3C" />
            </View>
            <Text style={styles.quickAccessText}>Messages</Text>
          </TouchableOpacity>
        </>
      );
    } else if (userType === 'admin') {
      return (
        <>
          <TouchableOpacity 
            style={styles.quickAccessItem} 
            onPress={() => navigateTo('UserManagement')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E6F2FF' }]}>
              <Ionicons name="people" size={24} color="#4A80F0" />
            </View>
            <Text style={styles.quickAccessText}>User Management</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('SystemLogs')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFF0E6' }]}>
              <Ionicons name="list" size={24} color="#FF8C42" />
            </View>
            <Text style={styles.quickAccessText}>System Logs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('Analytics')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E6FFF0' }]}>
              <Ionicons name="stats-chart" size={24} color="#2ECC71" />
            </View>
            <Text style={styles.quickAccessText}>Analytics</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('Settings')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFE6E6' }]}>
              <Ionicons name="settings" size={24} color="#E74C3C" />
            </View>
            <Text style={styles.quickAccessText}>System Settings</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      // Default patient view
      return (
        <>
          <TouchableOpacity 
            style={styles.quickAccessItem} 
            onPress={() => navigateTo('HealthRecords')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E6F2FF' }]}>
              <Ionicons name="document-text" size={24} color="#4A80F0" />
            </View>
            <Text style={styles.quickAccessText}>Health Records</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('VisitHistory')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFF0E6' }]}>
              <Ionicons name="calendar" size={24} color="#FF8C42" />
            </View>
            <Text style={styles.quickAccessText}>Visit History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('TestResults')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E6FFF0' }]}>
              <Ionicons name="flask" size={24} color="#2ECC71" />
            </View>
            <Text style={styles.quickAccessText}>Test Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={() => navigateTo('EmergencyInfo')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFE6E6' }]}>
              <Ionicons name="alert-circle" size={24} color="#E74C3C" />
            </View>
            <Text style={styles.quickAccessText}>Emergency Info</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  // Render different recent activity items based on user role
  const renderRecentActivity = () => {
    if (userType === 'doctor') {
      return (
        <>
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="person" size={20} color="#4A80F0" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New Patient: Sarah Johnson</Text>
              <Text style={styles.activityDate}>Added on June 15, 2025</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="document-text" size={20} color="#FF8C42" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Updated Medical Records</Text>
              <Text style={styles.activityDate}>Added on June 10, 2025</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </View>
        </>
      );
    } else if (userType === 'admin') {
      return (
        <>
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="person-add" size={20} color="#4A80F0" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New Doctor Registration</Text>
              <Text style={styles.activityDate}>Added on June 15, 2025</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="shield" size={20} color="#FF8C42" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>System Security Update</Text>
              <Text style={styles.activityDate}>Added on June 10, 2025</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </View>
        </>
      );
    } else {
      // Default patient view
      return (
        <>
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="document-text" size={20} color="#4A80F0" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Blood Test Results</Text>
              <Text style={styles.activityDate}>Added on June 15, 2025</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="calendar" size={20} color="#FF8C42" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Dr. Smith Appointment</Text>
              <Text style={styles.activityDate}>Added on June 10, 2025</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </View>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>{welcomeMessage}</Text>
            <Text style={styles.appTitle}>
              {userType === 'patient' ? 'MediVault' : `Hello, ${userName}`}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigateTo('Profile')}
          >
            <Ionicons name="person-circle" size={40} color={
              userType === 'doctor' ? '#FF8C42' : 
              userType === 'admin' ? '#2ECC71' : 
              '#4A80F0'
            } />
          </TouchableOpacity>
        </View>
        
        {/* Quick Access Section */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            {renderQuickAccessItems()}
          </View>
        </View>
        
        {/* Recent Activity Section */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {renderRecentActivity()}
        </View>
        
        {/* Tips Section - Only show for patients */}
        {userType === 'patient' && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Health Tips</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>Stay Hydrated</Text>
              <Text style={styles.tipText}>
                Remember to drink at least 8 glasses of water daily to maintain optimal health.
              </Text>
            </View>
          </View>
        )}
        
        {/* System Status - Only show for admins */}
        {userType === 'admin' && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>System Status</Text>
            <View style={[styles.tipCard, { backgroundColor: '#2ECC71' }]}>
              <Text style={styles.tipTitle}>All Systems Operational</Text>
              <Text style={styles.tipText}>
                Database and authentication services are running normally. Last backup: 2 hours ago.
              </Text>
            </View>
          </View>
        )}
        
        {/* Upcoming Appointments - Only show for doctors */}
        {userType === 'doctor' && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <View style={[styles.tipCard, { backgroundColor: '#FF8C42' }]}>
              <Text style={styles.tipTitle}>Next: Sarah Johnson</Text>
              <Text style={styles.tipText}>
                Annual checkup scheduled for tomorrow at 10:00 AM. Patient has uploaded new test results.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={
            userType === 'doctor' ? '#FF8C42' : 
            userType === 'admin' ? '#2ECC71' : 
            '#4A80F0'
          } />
          <Text style={[styles.navText, styles.activeNavText, {
            color: userType === 'doctor' ? '#FF8C42' : 
                  userType === 'admin' ? '#2ECC71' : 
                  '#4A80F0'
          }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigateTo(
            userType === 'doctor' ? 'PatientList' :
            userType === 'admin' ? 'UserManagement' :
            'UploadRecord'
          )}
        >
          <Ionicons name={
            userType === 'doctor' ? 'people' :
            userType === 'admin' ? 'people' :
            'add-circle'
          } size={24} color="#A0A0A0" />
          <Text style={styles.navText}>{
            userType === 'doctor' ? 'Patients' :
            userType === 'admin' ? 'Users' :
            'Upload'
          }</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigateTo('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#A0A0A0" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    padding: 4,
  },
  quickAccessSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  recentSection: {
    marginBottom: 24,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activityDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  tipsSection: {
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#4A80F0',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#4A80F0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    lineHeight: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#A0A0A0',
  },
  activeNavText: {
    color: '#4A80F0',
    fontWeight: '500',
  },
});