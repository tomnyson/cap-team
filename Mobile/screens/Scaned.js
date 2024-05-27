
import React , { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio, ScrollView } from 'native-base';
import { FontAwesome6, Fontisto,FontAwesome, MaterialIcons, AntDesign, Octicons,EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { style } from 'styled-system';
import  MapView ,{Marker, Callout} from 'react-native-maps';

function Scaned() {
    const port = process.env.PORT;
    const host_name = process.env.HOST_NAME;
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [nameEvent, setNameEvent] = useState('');
    const [dateS, setDateS] = useState('');
    const [dateE, setDateE] = useState('');
    const [status, setStatus] = useState(false);
    const [isGr, setIsGr] = useState(false)
    const [id, setId] = useState(null)
    const [eventData, setEventData] = useState(null);
    const handleSearch = () =>{

    };
    
    useEffect( () => {
      const getData = async () =>{
        const info =  JSON.parse( await AsyncStorage.getItem('info'));
        
        const accessToken = info.accessToken;
        const user_id = info.id;
        const Data =  axios.get(`http://${host_name}:${port}/api/getAllAttendanceByUserId?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) =>  {
          
          setEventData(res.data)
        });
      }
      getData();
      
    }, []);

    const handleEvent = (id, name, e_latitude, e_longitude, y_latitude, y_longitude) =>{
        navigation.navigate('Event', { id, name, e_latitude, e_longitude, y_latitude, y_longitude });
    }
  return (
    <View style={styles.container}>
      <View style = {styles.top}>
        <Text style={{ fontSize: 25 , color: '#336666', fontWeight:"bold"}} >HISTORY ATTENDACE</Text>
      </View>
        <View style={styles.topContainer}>
        {/* <View style={styles.searchInput}>
          <Input style = {{ height: 50 ,fontSize: 17 }}
            value={search}
            onChangeText={(text) => setSearch(text)}
            InputRightElement={
                <Button  style={{backgroundColor: "#fff"  }} onPress={handleSearch}>
                    <EvilIcons name="search" style={{ fontSize: 40  }} color="#336666" />
                </Button>
                
            }
            variant="outline"
            placeholder="Search"

            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}

          />
        </View> */}
        </View>
        <View style={styles.centerContainer}>
            <ScrollView style={styles.listEvent}>
            {eventData ? (
              eventData.map((event, index) => {
                // Kiểm tra giá trị location
                const location = event.event.location ? event.event.location.split(',') : null;
                const latitude = location ? parseFloat(location[0]) : 0;
                const longitude = location ? parseFloat(location[1]) : 0;
                const y_location = event.location ? event.location.split(',') : null;
                const y_latitude = y_location ? parseFloat(y_location[0]) : 0;
                const y_longitude = y_location ? parseFloat(y_location[1]) : 0;
                
                return (
                  <Button key={index} style={styles.event} onPress={() => handleEvent(event.event.id, event.event.name, latitude, longitude, y_latitude, y_longitude )}>
                    <View style={styles.location}>
                      <MapView
                        style={{ width: '100%', height: '100%' }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        zoomControlEnabled={false}
                        initialRegion={{
                          latitude: latitude,
                          longitude: longitude,
                          latitudeDelta: 0.001,
                          longitudeDelta: 0.001,
                        }}
                      >
                        {location && (
                          <Marker coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                              }}>
                                <FontAwesome6 name="house-flag" size={25} color="#336666"/>
                         
                         
                           </Marker>
                           
                        
                        )}
                        
                      </MapView>
                    </View>
                    <View style={styles.infomation}>
                      <Text style={{ fontWeight: 'bold', color: "#336666", fontSize: 20 }}>{event.event.name}</Text>
                      <Text>{new Date(event.event.start_date).toLocaleDateString()} - {event.event.end_date ? new Date(event.event.end_date).toLocaleDateString() : 'Ongoing'}</Text>
                      <Text >{event.event.group_id ? <FontAwesome name="group" size={20} color="#336666" /> : <FontAwesome name="group" size={20} color="#CCCCCC" />}</Text>
                    </View>
                  </Button>
                );
              })
            ) : (
              <Text>Loading event...</Text>
            )}
            </ScrollView>
        </View>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
     
        <Scaned />
      
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // topContainer: {
  //   marginTop:40,
  //   marginHorizontal: 30,


  // },
  
  listEvent:{
    marginBottom: 110
    //marginHorizontal: 30,
  },
  event:{
    borderColor: "#e8e8e8",
    borderWidth: 2,
    backgroundColor: '#fff',
    marginHorizontal: 30,
    paddingVertical: 5,
    flexDirection:'row',
    marginBottom: 10,
    borderRadius: 10
  },
  location: {
    backgroundColor: "black",
    width: 300,
    height: 100,
   
  
    
  },
  top: {
    marginTop: 40,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    paddingVertical: 15,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center', // Căn giữa theo chiều dọc

    
  }
});
