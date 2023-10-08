import { Text, View } from 'react-native'

export default function Badge({ style, children }) {
  return (
    <View
      style={{
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#222',
        borderWidth: 1,
        borderColor: '#333333',
        ...style
      }}
    >
      <Text style={{ fontWeight: '500', color: '#fff' }}>{children}</Text>
    </View>
  )
}
