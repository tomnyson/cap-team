import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { CameraView , useCameraPermissions }  from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import axios from "axios";
import Toast from 'react-native-toast-message'
import { Alert } from 'react-native';

function QRscanner() {
  const port = process.env.PORT;
  const host_name = process.env.HOST_NAME;
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Waiting camera...');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lcted, setlcted] = useState(false);
  const [lcted3, setlcted3] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  
  const askForCameraPermission = () => {
    ( () => {
      setHasPermission(true);
    })()
  }
  
  //get location
  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setlcted(true);
      setlcted3(true);
      setLocation(location);
    })();
  }, []);
  const getLocation =  () =>{
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      
      text = JSON.stringify(location);
    }
    return text;
  }
  
  
  //get device inf
  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);
  
  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    const lct = JSON.parse(getLocation());
    
    setScanned(true);
    setlcted(false);
    //setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
    const info =  JSON.parse( await AsyncStorage.getItem('info'));
    const accessToken = info.accessToken;
    const user_id = info.id;
    const device_code =  await AsyncStorage.getItem('DEVICE_UUID_KEY');
    const location = ""+ lct.coords.latitude +","+ lct.coords.longitude;
    
    const code = data;
    const scan = await axios.post(`http://${host_name}:${port}/api/createAttendance`,
    {code, location , user_id, device_code},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      
    })
    .then((res) =>  {
      console.log(res.data)
      const mess = res.data.message;

      // if(mess ==''){
      //   Alert.alert(
      //     'Warning!',
      //     "Đây không phải mã của sự kiện này",
      //     [
      //       { text: 'OK' }
      //     ]
      //   );
      // }
      if(mess == false){
        Alert.alert(
          'Warning!',
          'Đã có lỗi xãy ra vui lòng quét lại mã',
          [
            { text: 'OK' }
          ]
        );
        
      }else if(mess == 'Quét mã thành công truy cập lịch sử quét mã để xem chi tiết.'){
        Toast.show({
          type: 'success',
          text1:mess
        });
      }else{
        Alert.alert(
          'Warning!',
          mess,
          [
            { text: 'OK' }
          ]
        );
      }
    })
    
  };
  
  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <View style={styles.container}>
      {lcted && (<View style={styles.barcodebox}>
      
          <CameraView 
            onBarcodeScanned={handleBarCodeScanned}
            style={{ height: 400, width: 400 }} 
          />
        
      </View>)}
      {!lcted3 &&
        <ActivityIndicator size="large" color="#336666" />
      }
      
      
      {scanned && <Button title={'Scan again?'} onPress={() =>{setlcted(true); setScanned(false)}} color='#336666' />}
      {/* {scanned && <Button title='SCAN' style={styles.buttonDesign} onPress={() => setScanned(false)}></Button>} */}
      
    </View>
  );
}
export default QRscanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#336666'
  },
  buttonDesign:{
    backgroundColor:'#336666'
  }
});
