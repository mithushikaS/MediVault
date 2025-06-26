import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';

// Import screens
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import HealthRecordsScreen from "./screens/HealthRecordsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UploadRecordScreen from "./screens/UploadRecordScreen";
import EmergencyInfoScreen from "./screens/EmergencyInfoScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
// Define the type for our stack navigatori
const RootStackParamList = {
  Welcome: undefined,
  Login: { userType: 'string' },
  Register: { userType: 'string' },
  ForgotPassword: { userType: 'string' },
  Home: { userType: 'string' },
  HealthRecords: { userType: 'string' },
  Profile: { userType: 'string' },
  UploadRecord: { userType: 'string' },
  Profile: { userType: 'string' },
  EmergencyInfo: { userType: 'string' },
  VisitHistory: { userType: 'string' },
  TestResults: { userType: 'string' },
  Settings: { userType: 'string' },
  RecordDetail: { record: {}, userType: 'string' },
  PatientList: { userType: 'string' },
  Appointments: { userType: 'string' },
  Messages: { userType: 'string' },
  UserManagement: { userType: 'string' },
  SystemLogs: { userType: 'string' },
  Analytics: { userType: 'string' },

};

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HealthRecords" component={HealthRecordsScreen} />
      <Stack.Screen name="UploadRecord" component={UploadRecordScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EmergencyInfo" component={EmergencyInfoScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      {/* These screens would be implemented in a full app */}
      <Stack.Screen name="VisitHistory" component={HealthRecordsScreen} />
      <Stack.Screen name="TestResults" component={HealthRecordsScreen} />
      <Stack.Screen name="Settings" component={ProfileScreen} />
      <Stack.Screen name="RecordDetail" component={HealthRecordsScreen} />
      <Stack.Screen name="PatientList" component={HealthRecordsScreen} />
      <Stack.Screen name="Appointments" component={HealthRecordsScreen} />
      <Stack.Screen name="Messages" component={HealthRecordsScreen} />
      <Stack.Screen name="UserManagement" component={HealthRecordsScreen} />
      <Stack.Screen name="SystemLogs" component={HealthRecordsScreen} />
      <Stack.Screen name="Analytics" component={HealthRecordsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Toaster />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});