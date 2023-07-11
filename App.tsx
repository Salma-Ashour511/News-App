import { StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import NewsList from './Screens/NewsList';
import NewsDetails from './Screens/NewsDetails';
import ArticleModel from "./models/ArticleModel";
import Settings from './Screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';


const BottomTabs = createBottomTabNavigator<StackParamList>();
function NewsBottomTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
      })}
    >
      <BottomTabs.Screen
        name="News"
        component={NewsList}
        options={{
          title: 'News',
          tabBarLabel: 'News',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator<StackParamList>();
  const theme = useColorScheme();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="NewsBottomTabs" component={NewsBottomTabs} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

type StackParamList = {
  NewsBottomTabs: undefined
  News: undefined
  Settings: undefined
  NewsDetails: { itemDetails: ArticleModel }
}

export type StackScreenProps<T extends keyof StackParamList> = NativeStackScreenProps< StackParamList, T>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
