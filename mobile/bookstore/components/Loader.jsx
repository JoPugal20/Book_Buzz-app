import {
  View,
  Text
} from 'react-native'
export default function Loader(size="large") {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  )
}