import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Scaned from './screens/Scaned';
import Event from './screens/Event';
import HomePage from './screens/HomePage';
import QRscanner from './screens/QRscanner';
import TIcketMenu from './screens/TIcketMenu';
import MyTicket from './screens/MyTicket';
import TicketDetails from './screens/TicketDetails';
import OTPregister from './screens/OTPregister';
import VNPay from './screens/VNPay'
import EmailForgotPass from './screens/EmailForgotPass';
import OTPforgotPass from './screens/OTPforgotPass';
import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
function App() {
  

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Scaned" component={Scaned} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="TIcketMenu" component={TIcketMenu} />
      <Stack.Screen name="MyTicket" component={MyTicket} />
      <Stack.Screen name="TicketDetails" component={TicketDetails} />
      <Stack.Screen name="VNPay" component={VNPay} />
      <Stack.Screen name="QRscanner" component={QRscanner} />
      <Stack.Screen name="OTPregister" component={OTPregister} />
      <Stack.Screen name="EmailForgotPass" component={EmailForgotPass} />
      <Stack.Screen name="OTPforgotPass" component={OTPforgotPass} />
    </Stack.Navigator>
  );
}
export default () => {
  return (
    <NavigationContainer>
     
        <App />
        <Toast />
    </NavigationContainer>
  )
}
