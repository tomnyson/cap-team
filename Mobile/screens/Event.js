import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import {Input, NativeBaseProvider, Button, Modal, Icon, Box } from 'native-base';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, AntDesign, Fontisto ,FontAwesome6} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message'

function Event() {
    const port = process.env.PORT;
    const host_name = process.env.HOST_NAME;
    const navigation = useNavigation();
    const route = useRoute();
    const event_id = route.params?.id;
    const name = route.params?.name;
    const e_latitude = route.params?.e_latitude;
    const e_longitude = route.params?.e_longitude;
    const y_latitude = route.params?.y_latitude;
    const y_longitude = route.params?.y_longitude;

    const [commentData, setCommentData] = useState(null);
    const [areaData, setAreaData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [cmt, setCmt] = useState("");

    useEffect(() => {
        const getData = async () => {
            const info = JSON.parse(await AsyncStorage.getItem('info'));
            const accessToken = info.accessToken;
            const user_id = info.id;

            axios.get(`http://${host_name}:${port}/api/getAllAreaByUserIdAndArea?user_id=${user_id}&event_id=${event_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                setAreaData(res.data);
            });
        }
        getData();
    }, []);
    
    const getData = async () => {
        const info = JSON.parse(await AsyncStorage.getItem('info'));
        const accessToken = info.accessToken;
        const user_id = info.id;

        axios.get(`http://${host_name}:${port}/api/getAllCommentByEventId?event_id=${event_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            //console.log(res.data);
            setCommentData(res.data);
        });
    }
    const handlePress = () => {
        // Handle area button press
    }

    const handleCmt = () => {
        getData();
        setShowForm(true);
    }
    const comment = async () =>{
        const info = JSON.parse(await AsyncStorage.getItem('info'));
            const accessToken = info.accessToken;
            const user_id = info.id;
            if(cmt == null || cmt == ""){
                Alert.alert(
                    'Warning!',
                    'Không được để trống!',
                    [
                      { text: 'OK' }
                    ]
                  );
            }else{
                axios.post(`http://192.168.0.100:3344/api/createComment`,{user_id, event_id, content: cmt}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
                })
                .then((res) => {
                    // console.log(res.data);
                    if(res.data.message == 'Thêm comment thành công'){
                        Toast.show({
                            type: 'success',
                            text1:"Đánh giá thành công"
                          });
                          getData();
                          setCmt("");
                    }else{
                        Toast.show({
                            type: 'erorr',
                            text1:"Đánh giá thất bại"
                          });
                    }
                    
                });
            }
            
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: "#336666", fontSize: 20, marginBottom: 30 }}>{name}</Text>
                </View>
                <Button onPress={handleCmt} style={{ backgroundColor: "#fff" }}>
                    <MaterialCommunityIcons name="comment-account" size={30} color="#336666" />
                </Button>
                <View style={{ height: 340 }}>
                    <MapView 
                        style={{ width: '100%', height: '100%' }}
                        initialRegion={{
                            latitude: e_latitude,
                            longitude: e_longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: e_latitude, longitude: e_longitude }}
                            description={name}
                        >
                            <FontAwesome6 name="house-flag" size={24} color="#336666" />
                        </Marker>
                        <Circle
                            center={{ latitude: e_latitude, longitude: e_longitude }}
                            radius={500}
                            strokeWidth={1}
                            strokeColor={'#336666'}
                            fillColor={'rgba(51, 102, 102, 0.3)'}
                        />
                        <Marker
                            coordinate={{ latitude: y_latitude, longitude: y_longitude }}
                            description='Your Location'
                        >
                            <Fontisto name="map-marker-alt" size={22} color="#880000"/>
                        </Marker>
                    </MapView>
                </View>
            </View>
            <ScrollView style={styles.area}>
                {areaData && areaData.map((item, index) => (
                    <Button key={index} style={styles.area1} onPress={() => handlePress(item)}>
                        <View style={styles.infomation}>
                            <Text style={{ fontWeight: 'bold', color: "#336666", fontSize: 20 }}>{item.area.name}</Text>
                            <Text style={{ fontSize: 15 }}>{new Date(item.area.start_date).getHours().toString().padStart(2, '0')}:{new Date(item.area.start_date).getMinutes().toString().padStart(2, '0')} - {new Date(item.area.end_date).getHours().toString().padStart(2, '0')}:{new Date(item.area.end_date).getMinutes().toString().padStart(2, '0')} | {new Date(item.area.start_date).toLocaleDateString()}</Text>
                        </View>
                    </Button>
                ))}
            </ScrollView>
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Feedback</Modal.Header>
                    <Modal.Body>
                        {commentData && commentData.map((cmt, index) =>(
                            <View key={index} style={styles.line}>
                            <FontAwesome5 name="user-secret" size={28} color="#336666" />
                            <View style ={styles.boxcmt}>
                              <Text style={{fontWeight: 'bold', fontSize: 16, color: "#336666" }}>
                                {cmt.user.name}
                              </Text>
                              <Text style={{  fontSize: 14 }}>
                                {cmt.content}
                              </Text>
                            </View>
                            
                          </View>
                        ))}
                      
                        

                    </Modal.Body>
                    <Modal.Footer style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 80 }}>
                      <View style={{flex:1,marginRight:50, flexDirection: 'row'}}>
                      <Input
                        style={{ width:90, height: 50 }}
                        value={cmt}
                        onChangeText={(text) => setCmt(text)}
                        variant="outline"
                        placeholder="Comment"
                        _light={{
                          placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                          placeholderTextColor: "blueGray.50",
                        }}
                      />
                      <Button style={{ backgroundColor:"#fff" }} onPress={comment}>
                        <FontAwesome name="send" size={24} color="#336666" />
                      </Button>
                      </View>
                     
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    );
}

export default () => {
    return (
        <NativeBaseProvider>
            <Event />
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        marginTop: 50,
        marginHorizontal: 30,
        height: 400,
    },
    area1: {
        backgroundColor: "#cccccc",
        marginHorizontal: 30,
        marginTop: 5,
    },
    area: {
        paddingTop: 5,
        marginTop:30
    },
    line :{
      flexDirection: 'row',
      marginBottom: 16
    },
    boxcmt:{
      marginLeft: 10,
      width: 245
    }
});
