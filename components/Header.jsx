import { View, Text } from 'react-native'

export default function Header({ title, children }) {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#2a2a2a',
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
          paddingVertical: 12
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}
