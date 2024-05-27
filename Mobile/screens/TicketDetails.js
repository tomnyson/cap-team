
import React , { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio, ScrollView } from 'native-base';
import { FontAwesome5,Fontisto, MaterialIcons, AntDesign, Octicons,EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { style } from 'styled-system';
import  MapView ,{Marker} from 'react-native-maps';



function TicketDetails() {
    const port = process.env.PORT;
    const host_name = process.env.HOST_NAME;
    const navigation = useNavigation();
    //const { eventData } = route;
    const [ticketData, setTicketData] = useState(null);
    
    const route = useRoute();
    const ticket_id = route.params?.id 
    const a = 1;

    useEffect( () => {
      const getData = async () =>{
        const info =  JSON.parse( await AsyncStorage.getItem('info'));
        
        const accessToken = info.accessToken;
        
        const get = await axios.get(`http://${host_name}:${port}/api/getTicketDetails/?id=${ticket_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) =>  {
          const tk = res.data;
          console.log(res.data);
          setTicketData(tk)
        });
      };
      getData();
  
    }, []);
  let event, name, id, maximum, minimum, price, sale_end_date, status, quantity;
  let description, end_date, event_type, location, eventName, start_date;
  let latitude, longitude;
  let formattedPrice;

  if (ticketData) {
    ({ event, name, id, maximum, minimum, price, quantity,sale_end_date, status ,event_id} = ticketData.ticket);
    ({ description, end_date, event_type, location, name: eventName, start_date} = event);

    // Tách latitude và longitude từ location
    [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
    // console.log(latitude,longitude);
    formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
    const handlePayment = async () => {
      let url;
      const info =  JSON.parse( await AsyncStorage.getItem('info'));
      const email = info.email;
      const user_id = info.id;
      const accessToken = info.accessToken;
      const get =  axios.post(`http://${host_name}:${port}/api/createPayment`,
      {
        amount: price,
        email,
        name_ticket: name,
        name_event: eventName,
        user_id,
        event_id,
        ticket_id: id


      },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          
        })
        .then((res) =>  {
          
          if(res.data.message){
            Toast.show({
              type: 'error',
              text1:res.data.message
            });
          }else{
            url = res.data.redirectUrl;
            navigation.navigate("VNPay", { url })
          }
          
        })
        .catch((err) =>{
          // Toast.show({
          //   type: 'error',
          //   text1:'Bạn đã mua vé trước đó' 
          // });
          console.log(err);
        });
        
      
    }
  return (
    <View style={styles.container}>
    <View style={styles.top}>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        
      </View>
      
      <View style={{ height: 340 }}>
       {latitude &&<MapView 
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            description={eventName}>
            <Fontisto name="map-marker-alt" size={25} color="#336666"/>
                         
                         
            </Marker>
        </MapView>}
      </View>
    </View>
    
    <View style={styles.inf}>
      <Text style={{ fontWeight: 'bold', color:"#336666", fontSize: 30 }}>{name}</Text>
      <Text style={{ fontSize: 20 , fontWeight: 'bold'}}>{formattedPrice} VND</Text> 
      <Text style={{ fontSize: 20 , opacity: 0.5}}>{eventName}</Text> 
      <Text style={{ fontSize: 20 , opacity: 0.5}}>{event_type}</Text>
      <Text style={{ fontSize: 20 , opacity: 0.5}}>Description: {description}</Text>
      <Text style={{ fontSize: 20 , opacity: 0.5}}>Quantity: {quantity}</Text>
      <Text style={{ fontSize: 20 , opacity: 0.5}}>{new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}</Text> 
      <View style={styles.buttonStyle}>
      <Button style={styles.buttonDesign}  onPress={handlePayment}>
                Ticket Payment
            </Button>
      </View>
    </View>
  </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
     
        <TicketDetails />
      
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },top:{
    // justifyContent: 'center',
    marginTop: 50,
    marginHorizontal: 30,
    height: 400,
    
  },
  area1:{
    backgroundColor:"#336666",
    marginHorizontal: 30,
    marginTop: 5,
  },
  area:{
    paddingTop: 5
  },
  inf:{
    // justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 30,
    height: 400,
    fontSize: 25
  },
  buttonStyle:{
    marginTop: 40,
    marginLeft:15,
    marginRight:15
  },
  buttonDesign:{
    backgroundColor:'#336666',
    
  }
});
