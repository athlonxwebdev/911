import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnnouncementsScreen from '../screens/student/AnnouncementsScreen';
import ChatScreen from '../screens/student/ChatScreen';
import HomeScreen from '../screens/student/HomeScreen';
import ProfileScreen from '../screens/student/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function StudentTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
