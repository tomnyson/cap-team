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



function Login() {
    const port = process.env.PORT;
    const host_name = process.env.HOST_NAME;
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setupDeviceUUID = async () => {
      let deviceUUID = await AsyncStorage.getItem("DEVICE_UUID_KEY");
      if (!deviceUUID) {
        // Nếu UUID chưa tồn tại, tạo UUID mới
        deviceUUID = uuidv4();
        
        // Lưu UUID vào AsyncStorage để sử dụng sau này
        await AsyncStorage.setItem("DEVICE_UUID_KEY", deviceUUID);
      }
    };
    setupDeviceUUID();

    useEffect(() => {
      checkLoggedIn(); // Kiểm tra trạng thái đăng nhập khi component được mount
    }, []);
    const checkLoggedIn = async () => {
        try {
          const isLoggedIn = await AsyncStorage.getItem('info');
          if (isLoggedIn) {
            // Nếu đã đăng nhập, chuyển hướng đến HomePage
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomePage' }],
            });
          } else {
            // Nếu chưa đăng nhập, có thể thực hiện các hành động khác ở đây
          }
        } catch (error) {
          
          console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
        }
      };

    const handleLogin =  () =>{
      if(validateEmail()){
        const login =  axios.post(`http://${host_name}:${port}/api/auth/login`,{email, password})
      .then((res) =>  {
        
        if(res.status == 200){
          const accessToken = res.data.accessToken;
          console.log(accessToken);
          const url = `http://${host_name}:${port}/api/getUserbyEmail/?email=${email}`;
          //console.log(accessToken);
          const authorization = axios.get(url,
          {
            headers: {
            Authorization: `Bearer ${accessToken}`
          }
          })
          .then((res) => {
            
            const isLoggedIn= true;
            const id = res.data.id;
            const name = res.data.name;
            const phone = res.data.phoneNumber;
            const address = res.data.address;
            const role = res.data.roles;
            const gender = res.data.gender;
            
            
            AsyncStorage.setItem('info', JSON.stringify({id, name, email, phone, address, role, gender, accessToken,isLoggedIn}));
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomePage' }],
            });
          })
          .catch((err) =>{
            Toast.show({
              type: 'error',
              text1:'Login fails' 
            });
            console.log(err);
          })
          

          // const getUser = await authApis.getUser(accessToken, email);
                    
          //navigation.navigate("HomePage")
        }else{
          Toast.show({
            type: 'error',
            text1:'Login fails' 
          });
        }
       
      
      })      
      .catch((err) =>{
        Toast.show({
          type: 'error',
          text1:'Login fails' 
        });
        console.log("lỗi goi api: ",err);
      })

      };
    }
    
    const validateEmail = () => {
      // Sử dụng biểu thức chính quy để kiểm tra cấu trúc của email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Login</Text>
      </View>
      

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyle}>
        
        <View style={styles.emailInput}>
          <Input style = {{ height: 50}}
            value={email}
            onChangeText={(text) => setEmail(text)}
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
            placeholder="Email"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}

          />
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        
        <View style={styles.passInput}>
          <Input style = {{ height: 50}}
            value={password}
            onChangeText={(text) => setPassword(text)}
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
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
            secureTextEntry={true}
            placeholder="Password"
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
        <Button style={styles.buttonDesign} onPress={handleLogin}>
            LOGIN
        </Button>
      </View>
      <View style={styles.text2}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")} ><Text style={styles.signupText}> Sign up</Text></TouchableOpacity>
        
        
      </View>
      <TouchableOpacity style={styles.text2} onPress={() => navigation.navigate("EmailForgotPass")} ><Text style={styles.signupText}> Forgot password ?</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
     
        <Login />
      
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
