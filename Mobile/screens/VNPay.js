import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { View } from 'native-base';
import {Input, NativeBaseProvider, Button, Modal, Icon, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, AntDesign, Fontisto ,FontAwesome6} from '@expo/vector-icons';
function OpenLink() {
  const port = process.env.PORT;
  const host_name = process.env.HOST_NAME;
  //url = "https://facebook.com"'
  const navigation = useNavigation();
  const route = useRoute();
  const url = route.params?.url 
  return (
    <View style={{flex:1 }}> 
    <Button style={{backgroundColor: "#fff",  justifyContent: 'flex-start'}} onPress={() =>{ navigation.navigate("HomePage")}}>
      <FontAwesome style={{marginTop: 50, marginLeft: 30}} name="home" size={30} color="#336666" /> 
    </Button>
      
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
 );
};

export default () => {
  return (
      <NativeBaseProvider>
          <OpenLink />
      </NativeBaseProvider>
  );
}
