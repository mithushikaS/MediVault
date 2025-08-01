import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function UploadRecordScreen() {
  const navigation = useNavigation();
  const [recordTitle, setRecordTitle] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [recordDate, setRecordDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  const categories = [
    { id: 'lab', name: 'Lab Results', icon: 'flask' },
    { id: 'exam', name: 'Examination', icon: 'medical' },
    { id: 'imaging', name: 'Imaging', icon: 'scan' },
    { id: 'vax', name: 'Vaccination', icon: 'shield-checkmark' },
    { id: 'prescription', name: 'Prescription', icon: 'document-text' },
    { id: 'other', name: 'Other', icon: 'folder' },
  ];
  
  const handleUpload = () => {
    // Basic validation
    if (!recordTitle || !doctorName || !recordDate || !selectedCategory || !selectedFile) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would upload the file to a backend here
    // For demo purposes, we'll just show a success message and navigate back
    toast.success('Record uploaded successfully');
    navigation.goBack();
  };
  
  const handleSelectFile = () => {
    // In a real app, you would use a document picker here
    // For demo purposes, we'll just simulate selecting a file
    setSelectedFile({
      name: 'medical_record.pdf',
      size: '2.4 MB',
      type: 'application/pdf'
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#17C3B2" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload Health Record</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Record Information</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Record Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Annual Physical Examination"
                placeholderTextColor="#A0A0A0"
                value={recordTitle}
                onChangeText={setRecordTitle}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Doctor/Provider Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Dr. Sarah Johnson"
                placeholderTextColor="#A0A0A0"
                value={doctorName}
                onChangeText={setDoctorName}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Record Date *</Text>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#A0A0A0"
                  value={recordDate}
                  onChangeText={setRecordDate}
                />
                <TouchableOpacity style={styles.datePickerButton}>
                  <Ionicons name="calendar" size={20} color="#17C3B2" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Category *</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.selectedCategoryButton
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View 
                    style={[
                      styles.categoryIconContainer,
                      selectedCategory === category.id && styles.selectedCategoryIconContainer
                    ]}
                  >
                    <Ionicons 
                      name={category.icon} 
                      size={24} 
                      color={selectedCategory === category.id ? 'white' : '#17C3B2'} 
                    />
                  </View>
                  <Text 
                    style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.selectedCategoryText
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Upload File *</Text>
            <TouchableOpacity 
              style={styles.fileUploadContainer}
              onPress={handleSelectFile}
            >
              {!selectedFile ? (
                <>
                  <View style={styles.uploadIconContainer}>
                    <Ionicons name="cloud-upload" size={32} color="#17C3B2" />
                  </View>
                  <Text style={styles.uploadText}>Tap to select a file</Text>
                  <Text style={styles.uploadSubtext}>PDF, JPG, PNG (Max 10MB)</Text>
                </>
              ) : (
                <View style={styles.selectedFileContainer}>
                  <View style={styles.fileIconContainer}>
                    <Ionicons name="document" size={24} color="#17C3B2" />
                  </View>
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileName}>{selectedFile.name}</Text>
                    <Text style={styles.fileSize}>{selectedFile.size}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.removeFileButton}
                    onPress={() => setSelectedFile(null)}
                  >
                    <Ionicons name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add any additional information about this record..."
              placeholderTextColor="#A0A0A0"
              value={notes}
              onChangeText={setNotes}
              multiline
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handleUpload}
          >
            <Text style={styles.uploadButtonText}>Upload Record</Text>
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
    color: '#17C3B2',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerButton: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedCategoryButton: {
    borderColor: '#17C3B2',
    backgroundColor: '#F0F5FF',
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCategoryIconContainer: {
    backgroundColor: '#17C3B2',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedCategoryText: {
    color: '#17C3B2',
  },
  fileUploadContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#888',
  },
  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  fileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 14,
    color: '#888',
  },
  removeFileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    height: 120,
  },
  uploadButton: {
    backgroundColor: '#17C3B2',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});