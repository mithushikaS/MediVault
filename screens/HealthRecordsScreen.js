import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Sample data for health records
const SAMPLE_RECORDS = [
  {
    id: '1',
    title: 'Annual Physical Examination',
    date: 'June 10, 2025',
    doctor: 'Dr. Sarah Johnson',
    category: 'Examination',
    fileType: 'PDF'
  },
  {
    id: '2',
    title: 'Blood Test Results',
    date: 'May 22, 2025',
    doctor: 'Dr. Michael Chen',
    category: 'Lab Results',
    fileType: 'PDF'
  },
  {
    id: '3',
    title: 'X-Ray Report - Chest',
    date: 'April 15, 2025',
    doctor: 'Dr. Emily Rodriguez',
    category: 'Imaging',
    fileType: 'Image'
  },
  {
    id: '4',
    title: 'Vaccination Record - COVID-19',
    date: 'March 5, 2025',
    doctor: 'Dr. James Wilson',
    category: 'Vaccination',
    fileType: 'PDF'
  },
  {
    id: '5',
    title: 'Allergy Test Results',
    date: 'February 18, 2025',
    doctor: 'Dr. Lisa Thompson',
    category: 'Lab Results',
    fileType: 'PDF'
  }
];

export default function HealthRecordsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(SAMPLE_RECORDS);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Lab Results', 'Examination', 'Imaging', 'Vaccination'];
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      handleCategoryFilter(activeCategory);
      return;
    }
    
    const filtered = SAMPLE_RECORDS.filter(record => 
      record.title.toLowerCase().includes(text.toLowerCase()) ||
      record.doctor.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredRecords(filtered);
  };
  
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setFilteredRecords(SAMPLE_RECORDS);
      return;
    }
    
    const filtered = SAMPLE_RECORDS.filter(record => 
      record.category === category
    );
    
    setFilteredRecords(filtered);
  };
  
  const renderRecordItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.recordCard}
      onPress={() => {
        // @ts-ignore
        navigation.navigate('RecordDetail', { record: item });
      }}
    >
      <View style={styles.recordIconContainer}>
        <Ionicons 
          name={item.fileType === 'PDF' ? 'document-text' : 'image'} 
          size={24} 
          color="#4A80F0" 
        />
      </View>
      <View style={styles.recordContent}>
        <Text style={styles.recordTitle}>{item.title}</Text>
        <Text style={styles.recordDoctor}>{item.doctor}</Text>
        <Text style={styles.recordDate}>{item.date}</Text>
      </View>
      <View style={styles.recordActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Records</Text>
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search records..."
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => handleSearch('')}
          >
            <Ionicons name="close-circle" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                activeCategory === item && styles.activeCategoryButton
              ]}
              onPress={() => handleCategoryFilter(item)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  activeCategory === item && styles.activeCategoryText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderRecordItem}
        contentContainerStyle={styles.recordsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#A0A0A0" />
            <Text style={styles.emptyText}>No records found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('UploadRecord');
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  categoriesContainer: {
    marginVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#4A80F0',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: 'white',
  },
  recordsList: {
    padding: 16,
    paddingBottom: 80,
  },
  recordCard: {
    flexDirection: 'row',
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
  recordIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  recordDoctor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  recordDate: {
    fontSize: 12,
    color: '#888',
  },
  recordActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A80F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A80F0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});