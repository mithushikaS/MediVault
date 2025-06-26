import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Share
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function EmergencyInfoScreen() {
  const navigation = useNavigation();
  
  // Mock emergency data
  const emergencyInfo = {
    name: 'John Doe',
    dateOfBirth: 'January 15, 1985',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts', 'Shellfish'],
    conditions: ['Asthma', 'Hypertension'],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' }
    ],
    emergencyContacts: [
      { name: 'Jane Doe', relationship: 'Spouse', phone: '+1 (555) 123-4567' },
      { name: 'Michael Doe', relationship: 'Brother', phone: '+1 (555) 987-6543' }
    ],
    primaryPhysician: {
      name: 'Dr. Sarah Johnson',
      phone: '+1 (555) 234-5678',
      address: '123 Medical Center Dr, Anytown, USA'
    },
    insuranceInfo: {
      provider: 'HealthPlus Insurance',
      policyNumber: 'HP12345678',
      groupNumber: 'G9876543',
      phone: '+1 (800) 555-1234'
    }
  };
  
  const handleShareInfo = async () => {
    try {
      const result = await Share.share({
        message: `
EMERGENCY MEDICAL INFORMATION - ${emergencyInfo.name}

Blood Type: ${emergencyInfo.bloodType}
Date of Birth: ${emergencyInfo.dateOfBirth}

Allergies: ${emergencyInfo.allergies.join(', ')}
Medical Conditions: ${emergencyInfo.conditions.join(', ')}

Current Medications:
${emergencyInfo.medications.map(med => `- ${med.name} ${med.dosage} (${med.frequency})`).join('\n')}

Emergency Contacts:
${emergencyInfo.emergencyContacts.map(contact => `- ${contact.name} (${contact.relationship}): ${contact.phone}`).join('\n')}

Primary Physician:
${emergencyInfo.primaryPhysician.name}
${emergencyInfo.primaryPhysician.phone}
${emergencyInfo.primaryPhysician.address}

Insurance:
${emergencyInfo.insuranceInfo.provider}
Policy #: ${emergencyInfo.insuranceInfo.policyNumber}
Group #: ${emergencyInfo.insuranceInfo.groupNumber}
        `
      });
      
      if (result.action === Share.sharedAction) {
        toast.success('Emergency info shared successfully');
      }
    } catch (error) {
      toast.error('Error sharing emergency info');
    }
  };
  
  const handleGenerateQRCode = () => {
    // In a real app, this would generate a QR code that links to emergency info
    toast.info('QR Code generation would happen here');
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
        <Text style={styles.headerTitle}>Emergency Info</Text>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShareInfo}
        >
          <Ionicons name="share-outline" size={24} color="#4A80F0" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.emergencyHeader}>
          <View style={styles.emergencyIconContainer}>
            <Ionicons name="alert-circle" size={32} color="white" />
          </View>
          <Text style={styles.emergencyTitle}>Medical Emergency Information</Text>
          <Text style={styles.emergencySubtitle}>Critical information for first responders</Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{emergencyInfo.name}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>{emergencyInfo.dateOfBirth}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Blood Type</Text>
              <View style={styles.bloodTypeTag}>
                <Text style={styles.bloodTypeText}>{emergencyInfo.bloodType}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Allergies & Conditions</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Allergies</Text>
              <View style={styles.tagsContainer}>
                {emergencyInfo.allergies.map((allergy, index) => (
                  <View key={index} style={[styles.tag, styles.allergyTag]}>
                    <Text style={styles.allergyTagText}>{allergy}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Medical Conditions</Text>
              <View style={styles.tagsContainer}>
                {emergencyInfo.conditions.map((condition, index) => (
                  <View key={index} style={[styles.tag, styles.conditionTag]}>
                    <Text style={styles.conditionTagText}>{condition}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Current Medications</Text>
          <View style={styles.infoCard}>
            {emergencyInfo.medications.map((medication, index) => (
              <React.Fragment key={index}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.medicationRow}>
                  <View style={styles.medicationIconContainer}>
                    <Ionicons name="medical" size={20} color="#4A80F0" />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{medication.name}</Text>
                    <Text style={styles.medicationDetails}>
                      {medication.dosage} • {medication.frequency}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <View style={styles.infoCard}>
            {emergencyInfo.emergencyContacts.map((contact, index) => (
              <React.Fragment key={index}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.contactRow}>
                  <View style={styles.contactIconContainer}>
                    <Ionicons name="person" size={20} color="#4A80F0" />
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactDetails}>
                      {contact.relationship} • {contact.phone}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.callButton}>
                    <Ionicons name="call" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Healthcare Provider</Text>
          <View style={styles.infoCard}>
            <View style={styles.providerRow}>
              <View style={styles.providerIconContainer}>
                <Ionicons name="medkit" size={20} color="#4A80F0" />
              </View>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{emergencyInfo.primaryPhysician.name}</Text>
                <Text style={styles.providerDetails}>{emergencyInfo.primaryPhysician.phone}</Text>
                <Text style={styles.providerAddress}>{emergencyInfo.primaryPhysician.address}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Insurance Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.insuranceRow}>
              <Text style={styles.insuranceProvider}>{emergencyInfo.insuranceInfo.provider}</Text>
              <View style={styles.insuranceDetails}>
                <View style={styles.insuranceItem}>
                  <Text style={styles.insuranceLabel}>Policy Number:</Text>
                  <Text style={styles.insuranceValue}>{emergencyInfo.insuranceInfo.policyNumber}</Text>
                </View>
                <View style={styles.insuranceItem}>
                  <Text style={styles.insuranceLabel}>Group Number:</Text>
                  <Text style={styles.insuranceValue}>{emergencyInfo.insuranceInfo.groupNumber}</Text>
                </View>
                <View style={styles.insuranceItem}>
                  <Text style={styles.insuranceLabel}>Phone:</Text>
                  <Text style={styles.insuranceValue}>{emergencyInfo.insuranceInfo.phone}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.qrCodeButton}
          onPress={handleGenerateQRCode}
        >
          <Ionicons name="qr-code" size={24} color="white" style={styles.qrCodeIcon} />
          <Text style={styles.qrCodeText}>Generate Emergency QR Code</Text>
        </TouchableOpacity>
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
  shareButton: {
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
  emergencyHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emergencyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emergencySubtitle: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
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
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
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
  bloodTypeTag: {
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  bloodTypeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  allergyTag: {
    backgroundColor: '#FFF0F0',
  },
  allergyTagText: {
    color: '#FF3B30',
    fontWeight: '500',
  },
  conditionTag: {
    backgroundColor: '#F0F5FF',
  },
  conditionTagText: {
    color: '#4A80F0',
    fontWeight: '500',
  },
  medicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  medicationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  contactDetails: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  providerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  providerDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  providerAddress: {
    fontSize: 14,
    color: '#666',
  },
  insuranceRow: {
    paddingVertical: 12,
  },
  insuranceProvider: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  insuranceDetails: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  insuranceItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  insuranceLabel: {
    fontSize: 14,
    color: '#666',
    width: 120,
  },
  insuranceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  qrCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A80F0',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  qrCodeIcon: {
    marginRight: 8,
  },
  qrCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});