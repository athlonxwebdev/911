import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import StudentTabs from './navigation/StudentTabs';

const Root = () => {
  const { user, loading } = useAuth();
  const [mode, setMode] = useState('login');

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return mode === 'login' ? (
      <LoginScreen onSwitch={() => setMode('signup')} />
    ) : (
      <SignupScreen onSwitch={() => setMode('login')} />
    );
  }

  if (user.role === 'admin') {
    return <AdminDashboardScreen />;
  }

  return (
    <NavigationContainer>
      <StudentTabs />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
