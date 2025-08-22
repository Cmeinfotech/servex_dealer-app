import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../../../constants/colors'

const PendingServiceLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightPrimary }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  )
}

export default PendingServiceLayout