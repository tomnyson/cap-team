
import React , { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome, MaterialIcons, AntDesign, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { WebView } from 'react-native-webview';


function HomePage() {
    const navigation = useNavigation();
    const port = process.env.PORT;
    const host_name = process.env.HOST_NAME;
    
    const resetNavigation = () => {
       
    };
    const handleProfile = () =>{

    };
    const handleScanQR = () =>{
      navigation.navigate("QRscanner")
    };
    const handleScaned = () =>{
      navigation.navigate("Scaned")
    };
    const handleLogout = async () =>{
      console.log("logout ");
      try {
        await AsyncStorage.removeItem('info');
        //console.log('Logout successfully');
        Toast.show({
          type: 'success',
          text1:'Logout successfully' 
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1:'Logout fail' 
        });
        console.error('Lỗi khi logout:', error);
      }
    }
    const getData = async (key) => {
        
        try {
          const value = await AsyncStorage.getItem('info');
          
          if (value !== null) {
            alert(value);
            
            //console.log('Data:', value);
            // Hoặc xử lý dữ liệu ở đây nếu cần
          } else {
            console.log('Không tìm thấy dữ liệu cho key:', key);
          }
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
        }
      };

      const handleTicketMenu = () =>{
        navigation.navigate("TIcketMenu")
      };





      

  return (
    <View style={styles.container}>
      <View style = {styles.top}>
        <Button  style={{backgroundColor: "#fff"}} onPress={handleLogout}>
          <Icon
            as={<MaterialIcons name="logout" style={{ fontSize: 32, }} color="#336666"  />}
          />
        </Button>
        
        <View style={{ flex: 1 }} />  
        {/* <Button  style={{backgroundColor: "#fff"}} onPress={handleProfile}>
          <Icon
            as={<AntDesign name="profile" style={{ fontSize: 32   }} color="#336666" />}
          />
        </Button> */}
        
      </View>
      <View style = {styles.center}>
        <View style = {styles.centerButton}>
          <Button style={styles.buttonDesign} onPress={handleTicketMenu}>
            <Icon
              as={<FontAwesome name="ticket" style={{ fontSize: 50 , textAlign:'center', marginVertical:20  }}color="#fff" />}
            />
              TICKET
          </Button>
        </View>
        <View style = {styles.centerButton}>
          
          <Button style={styles.buttonDesign} onPress={handleScanQR}>
            <Icon
              as={<MaterialIcons name="qr-code-scanner" style={{ fontSize: 50 , textAlign:'center', marginVertical:20  }}color="#fff" />}
            />
              SCAN QR CODE
          </Button>
        </View>
        <View style = {styles.centerButton}>
          
          <Button style={styles.buttonDesign} onPress={handleScaned}>
            <Icon
              as={<Octicons name="history" style={{ fontSize: 50 , textAlign:'center'  , marginVertical:20}} color="#fff" />}
            />
            SCANED EVENT
          </Button>
              
        </View>
      </View>
      {/* <View style={styles.Middle}>
        <Text style={styles.LoginText}>Home Page</Text>


        <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={getData}>
            PRESS
        </Button>
      </View>
      </View> */}
      
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
     
        <HomePage />
      
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    marginTop: 40,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    paddingVertical: 15,
    flexDirection:'row',
    justifyContent: 'space-between', // Căn hai icon ra hai bên trái và phải
    alignItems: 'center', // Căn giữa theo chiều dọc

    
  },
  center:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton:{
    marginVertical: 30,
  },
  buttonDesign:{
    backgroundColor:"#336666",
    width: 150,
    height: 150,
    borderRadius: 25
  }
});
