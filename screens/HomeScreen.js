import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType = 'patient' } = route.params || {};

  const [userName, setUserName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
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

  const renderQuickAccessItems = () => {
    if (userType === 'doctor') {
      return (
        <>
          <QuickAccessItem icon="people" color="#4A80F0" bg="#E6F2FF" label="Patient List" onPress={() => navigateTo('PatientList')} />
          <QuickAccessItem icon="calendar" color="#FF8C42" bg="#FFF0E6" label="Appointments" onPress={() => navigateTo('Appointments')} />
          <QuickAccessItem icon="add-circle" color="#2ECC71" bg="#E6FFF0" label="Add Records" onPress={() => navigateTo('UploadRecord')} />
          <QuickAccessItem icon="chatbubble" color="#E74C3C" bg="#FFE6E6" label="Messages" onPress={() => navigateTo('Messages')} />
        </>
      );
    } else if (userType === 'admin') {
      return (
        <>
          <QuickAccessItem icon="people" color="#4A80F0" bg="#E6F2FF" label="User Management" onPress={() => navigateTo('UserManagement')} />
          <QuickAccessItem icon="list" color="#FF8C42" bg="#FFF0E6" label="System Logs" onPress={() => navigateTo('SystemLogs')} />
          <QuickAccessItem icon="stats-chart" color="#2ECC71" bg="#E6FFF0" label="Analytics" onPress={() => navigateTo('Analytics')} />
          <QuickAccessItem icon="settings" color="#E74C3C" bg="#FFE6E6" label="System Settings" onPress={() => navigateTo('Settings')} />
        </>
      );
    } else {
      return (
        <>
          <QuickAccessItem icon="document-text" color="#4A80F0" bg="#E6F2FF" label="Health Records" onPress={() => navigateTo('HealthRecords')} />
          <QuickAccessItem icon="calendar" color="#FF8C42" bg="#FFF0E6" label="Visit History" onPress={() => navigateTo('VisitHistory')} />
          <QuickAccessItem icon="flask" color="#2ECC71" bg="#E6FFF0" label="Test Results" onPress={() => navigateTo('TestResults')} />
          <QuickAccessItem icon="alert-circle" color="#E74C3C" bg="#FFE6E6" label="Emergency Info" onPress={() => navigateTo('EmergencyInfo')} />
        </>
      );
    }
  };

  const renderRecentActivity = () => {
    if (userType === 'doctor') {
      return (
        <>
          <ActivityItem icon="person" color="#4A80F0" title="New Patient: Sarah Johnson" date="June 15, 2025" />
          <ActivityItem icon="document-text" color="#FF8C42" title="Updated Medical Records" date="June 10, 2025" />
        </>
      );
    } else if (userType === 'admin') {
      return (
        <>
          <ActivityItem icon="person-add" color="#4A80F0" title="New Doctor Registration" date="June 15, 2025" />
          <ActivityItem icon="shield" color="#FF8C42" title="System Security Update" date="June 10, 2025" />
        </>
      );
    } else {
      return (
        <>
          <ActivityItem icon="document-text" color="#4A80F0" title="Blood Test Results" date="June 15, 2025" />
          <ActivityItem icon="calendar" color="#FF8C42" title="Dr. Smith Appointment" date="June 10, 2025" />
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>{welcomeMessage}</Text>
            <Text style={styles.appTitle}>{userType === 'patient' ? 'MediVault' : `Hello, ${userName}`}</Text>
          </View>
          <TouchableOpacity onPress={() => navigateTo('Profile')}>
            <Ionicons name="person-circle" size={40} color={
              userType === 'doctor' ? '#005D8F' :
              userType === 'admin' ? '#2ECC71' :
              '#17C3B2'} />
          </TouchableOpacity>
        </View>

        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            {renderQuickAccessItems()}
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {renderRecentActivity()}
        </View>

        {userType === 'patient' && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Health Tips</Text>
            <TipCard title="Stay Hydrated" text="Drink at least 8 glasses of water daily to maintain optimal health." color="#17C3B2" />
          </View>
        )}

        {userType === 'admin' && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>System Status</Text>
            <TipCard title="All Systems Operational" text="Database and authentication services are running normally. Last backup: 2 hours ago." color="#2ECC71" />
          </View>
        )}

        {userType === 'doctor' && (
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TipCard title="Next: Sarah Johnson" text="Annual checkup scheduled for tomorrow at 10:00 AM." color="#005D8F" />
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="home" label="Home" active color={
          userType === 'doctor' ? '#005D8F' :
          userType === 'admin' ? '#2ECC71' :
          '#17C3B2'
        } />
        <NavItem icon={
          userType === 'doctor' || userType === 'admin' ? 'people' : 'add-circle'
        } label={
          userType === 'doctor' ? 'Patients' :
          userType === 'admin' ? 'Users' : 'Upload'
        } onPress={() => navigateTo(
          userType === 'doctor' ? 'PatientList' :
          userType === 'admin' ? 'UserManagement' : 'UploadRecord'
        )} />
        <NavItem icon="settings-outline" label="Settings" onPress={() => navigateTo('Settings')} />
      </View>
    </SafeAreaView>
  );
}

// Reusable Components

const QuickAccessItem = ({ icon, color, bg, label, onPress }) => (
  <TouchableOpacity style={styles.quickAccessItem} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: bg }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.quickAccessText}>{label}</Text>
  </TouchableOpacity>
);

const ActivityItem = ({ icon, color, title, date }) => (
  <View style={styles.activityCard}>
    <View style={[styles.activityIconContainer, { backgroundColor: '#F0F5FF' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityDate}>Added on {date}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
  </View>
);

const TipCard = ({ title, text, color }) => (
  <View style={[styles.tipCard, { backgroundColor: color }]}>
    <Text style={styles.tipTitle}>{title}</Text>
    <Text style={styles.tipText}>{text}</Text>
  </View>
);

const NavItem = ({ icon, label, onPress, active, color = '#A0A0A0' }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color={color} />
    <Text style={[styles.navText, active && { color }]}>{label}</Text>
  </TouchableOpacity>
);

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
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
    textAlign: 'center',
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
    elevation: 2,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    borderRadius: 12,
    padding: 20,
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
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
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
});

