import { StatusBar } from 'expo-status-bar';
import React , { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import { GestureHandlerRootView} from 'react-native-gesture-handler'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useRoute } from '@react-navigation/native';

function OTPregister () {
    const port = process.env.PORT;
    const host_name = process.env.HOST_NAME;
    const navigation = useNavigation();
    const [OTP, setOTP] = useState('');
    const route = useRoute();
    const email = route.params?.email 
    const handleCofirmOTP = ()=>{
        const register = axios.post(`http://${host_name}:${port}/api/auth/confirmOtpRegisted`,{email, otp: OTP})
        .then((res) =>  {
        //console.log(res);
        if(res.status == 200){
          Toast.show({
            type: 'success',
            text1:res.data.message 
          });
          navigation.navigate("Login")
        }else{
          Toast.show({
            type: 'error',
            text1:res.data.message 
          });
        }
       
      
      })      
      .catch((err) =>{
        console.log("lỗi goi api: ",err);
        Toast.show({
          type: 'error',
          text1:"Lỗi OTP vui lòng xem lại email"
        });
      })
    }
return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>CONFIRM OTP</Text>
      </View>
      

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyle}>
        
        <View style={styles.emailInput}>
          <Input style = {{ height: 50}}
            value={OTP}
            onChangeText={(text) => setOTP(text)}
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="user-alt" />}
                size="sm"
                m={2}
                _light={{
                  color: "#336666",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            placeholder="Enter otp in your email"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}

          />
        </View>
      </View>
      {/* Button */}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={handleCofirmOTP}>
            Confirm OTP
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  
        )
}
export default () => {
    return (
      <NativeBaseProvider>
       
          <OTPregister />
        
      </NativeBaseProvider>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    LoginText: {
      marginTop:100,
      fontSize:30,
      fontWeight:'bold',
      color: "#336666"
    },
    Middle:{
      alignItems:'center',
      justifyContent:'center',
    },
    text2:{
      flexDirection:'row',
      justifyContent:'center',
      paddingTop:5,
      color: "#336666",
      marginTop:30,
     
    },
    signupText:{
      fontWeight:'bold',
      color: "#336666",
     
    },
    emailField:{
      marginTop:30,
      marginLeft:15
    },
    emailInput:{
      marginTop:100,
      marginRight:5
    },
    passInput:{
      marginTop:15,
      marginRight:5
    },
    buttonStyle:{
      marginTop:30,
      marginLeft:15,
      marginRight:15
    },
    buttonStyleX:{
      marginTop:12,
      marginLeft:15,
      marginRight:15
    },
    buttonDesign:{
      backgroundColor:'#336666'
    },
    lineStyle:{
      flexDirection:'row',
      marginTop:30,
      marginLeft:15,
      marginRight:15,
      alignItems:'center'
    },
    imageStyle:{
      width:80,
      height:80,
      marginLeft:20,
    }
   
  });