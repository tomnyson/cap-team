
import React , { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio, ScrollView } from 'native-base';
import { FontAwesome6, MaterialIcons, AntDesign, Octicons , MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { WebView } from 'react-native-webview';


function MyTicket() {
    const port = process.env.PORT;
    const host_name = process.env.HOST_NAME;
    const navigation = useNavigation();
    const [ticketData, setTicketData] = useState(null);
    useEffect( () => {
      const getData = async () =>{
        const info =  JSON.parse( await AsyncStorage.getItem('info'));
        
        const accessToken = info.accessToken;
        const user_id = info.id;
        console.log(accessToken);
        const ticketData =  axios.get(`http://${host_name}:${port}/api/getTicketPayment/?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) =>  {
          //console.log("my tk", res.data);
          setTicketData(res.data)
        });
      }
      getData();
      
    }, []);
    const handle = () =>{
      
    }
    
  return (
    <View style={styles.container}>
      <View style = {styles.top}>
        <Text style={{ fontSize: 25 , color: '#336666', fontWeight:"bold"}} >MY TICKET</Text>
      </View>
        <ScrollView style={styles.center}>
          {ticketData ? (
            <View style={styles.rowContainer}>
              {ticketData.ticket.map((ticket, index) => (
                <View key={ticket.id} style={styles.centerButton}>
                  <Button style={styles.buttonDesign} onPress={ handle}>
                  <View style={styles.buttonContent}>
                  <Icon as={<MaterialCommunityIcons name="ticket-account" style={styles.iconStyle} />} />
                  <View style={styles.textContainer}>
                    <Text style={styles.textStyle2}>{ticket.ticket.name}</Text>
                    <Text style={styles.textStyle}>Event: {ticket.event.name}</Text>
                    <Text style={{ fontSize: 18 , fontWeight: 'bold'}}>{ticket.ticket.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} VND</Text> 
                  </View>
                </View>
                    {/* <Icon
                      as={<MaterialCommunityIcons name="ticket-account" style={styles.iconStyle} />}
                    />
                    {ticket.name ? ticket.name : null}
                    {ticket.event ? <Text style={styles.textStyle}>Event: {ticket.event.name}</Text> : null} */}
                  </Button>
                </View>
              ))}
            </View>
          ) : (
            <Text>Loading tickets...</Text>
          )}
        </ScrollView>

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
     
        <MyTicket />
      
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
    justifyContent: 'space-between',
    alignItems: 'center', // Căn giữa theo chiều dọc

    
  },
  rowContainer: {
    // flexDirection: 'row',
    marginHorizontal: 12,
    justifyContent: 'space-around', 
    marginBottom: 10,// Adjust as needed
  },
  center:{
    flex: 1,
    // r
  },
  centerButton:{
    marginVertical: 10,
  },
  buttonDesign:{
    
    backgroundColor:"#808080",
    width: 350,
    height: 150,
    borderRadius: 25, 
    
    
  },buttonContent: {
    flexDirection: 'row', // Hiển thị nội dung theo chiều ngang
  // alignItems: 'center', // Căn chỉnh các phần tử theo chiều dọc
  // paddingHorizontal: 10, // Khoảng cách với các phần tử bên trong của button
  // justifyContent: 'space-between' // Căn các phần tử bên trong vào hai phía
  },
  iconStyle: {
    fontSize: 100, // Kích thước của icon
    color: '#fff' // Màu sắc của icon
  },
  textContainer: {
    marginLeft: 10, // Khoảng cách giữa icon và chữ
    width: 200
  },
  textStyle: {
    fontSize: 16, // Kích thước của chữ
    
  },
  textStyle2: {
    fontSize: 18, // Kích thước của chữ
    fontWeight:'bold',
    color: '#fff' // Màu sắc của chữ
  }
});
