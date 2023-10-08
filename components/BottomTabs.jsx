import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Watched from '../screens/Watched'
import WatchLater from '../screens/WatchLater'

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          height: 60,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopColor: '#333333',
          backgroundColor: '#2a2a2a'
        }
      })}
    >
      <Tab.Screen
        name="İzlenenler"
        component={Watched}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="movie-open-check"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name="İzlenecekler"
        component={WatchLater}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="movie-open-plus"
              color={color}
              size={size}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
