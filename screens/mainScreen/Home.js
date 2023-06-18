import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "../PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen";
import ProfileScreen from "../ProfileScreen";

import MapScreen from "../nestedScreens/MapScreen";

const PostsNav = createStackNavigator();
const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#212121CC",
          tabBarActiveTintColor: "#ffffff",
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarStyle: { height: 70 },

          tabBarItemStyle: {
            borderRadius: 30,
            height: 50,
            width: 10,
            marginTop: 10,
          },
        }}>
        <MainTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons name="grid-outline" size={24} color={color} />
            ),
            headerShown: false,
          }}
          name="Posts"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Feather name="plus" size={24} color={color} />
            ),
            headerShown: false,
          }}
          name="CreatePosts"
          component={CreatePostsScreen}
        />
        <MainTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Feather name="user" size={24} color={color} />
            ),
            headerShown: false,
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    </>
  );
};

export default Home;
