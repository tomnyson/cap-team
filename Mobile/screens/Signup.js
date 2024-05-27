import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Input, NativeBaseProvider, Button, Icon } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

function Signup() {
  const port = process.env.PORT;
  const host_name = process.env.HOST_NAME;
  const navigation = useNavigation();
  const [name, setFulname] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setSelectedGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [phone_number, setPhonenumber] = useState('');
  const [lock, setLock] = useState(true);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleRegister = () => {
    console.log({ email, password, phone_number, name, address, gender });
    if (handleCheckInput()) {
      setLock(false);
      axios.post(`http://${host_name}:${port}/api/auth/registerOTP`, {
        email,
        password,
        phone_number,
        name,
        address,
        gender,
      })
        .then((res) => {
          if (res.status === 200) {
            Toast.show({
              type: 'success',
              text1: res.data.message,
            });
            navigation.navigate('OTPregister', { email });
          } else {
            setLock(false);
            Toast.show({
              type: 'error',
              text1: res.data.message,
            });
          }
        })
        .catch((err) => {
          setLock(false);
          console.log('lỗi goi api: ', err);
          Toast.show({
            type: 'error',
            text1: 'Đăng ký thất bại',
          });
        });
    }
  };

  const handleCheckInput = () => {
    if (validateEmail()) {
      setSubmit(true);
    } else {
      setSubmit(false);
      alert('Email chưa đúng định dạng');
      return false;
    }
    if (validatePassword()) {
      setSubmit(true);
    } else {
      setSubmit(false);
      alert('Xác nhận mật khẩu chưa chính xác');
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return password === repassword;
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.Middle}>
            <Text style={styles.LoginText}>Sign up</Text>
          </View>

          <View style={styles.buttonStyle}>
            <View style={styles.emailInput}>
              <Input
                style={{ height: 50 }}
                value={name}
                onChangeText={(text) => setFulname(text)}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome5 name="user-alt" />}
                    size="sm"
                    m={2}
                    _light={{ color: '#336666' }}
                    _dark={{ color: 'gray.300' }}
                  />
                }
                variant="outline"
                placeholder="Full name"
                _light={{ placeholderTextColor: 'blueGray.400' }}
                _dark={{ placeholderTextColor: 'blueGray.50' }}
              />
            </View>
          </View>

          <View style={styles.buttonStyleX}>
            <View style={styles.emailInput}>
              <Input
                style={{ height: 50 }}
                value={address}
                onChangeText={(text) => setAddress(text)}
                InputLeftElement={
                  <Icon
                    as={<Entypo name="address" />}
                    size="sm"
                    m={2}
                    _light={{ color: '#336666' }}
                    _dark={{ color: 'gray.300' }}
                  />
                }
                variant="outline"
                placeholder="Address"
                _light={{ placeholderTextColor: 'blueGray.400' }}
                _dark={{ placeholderTextColor: 'blueGray.50' }}
              />
            </View>
          </View>

          <View style={styles.buttonStyleX}>
            <View style={styles.emailInput}>
              <Input
                style={{ height: 50 }}
                value={phone_number}
                onChangeText={(text) => setPhonenumber(text)}
                InputLeftElement={
                  <Icon
                    as={<Entypo name="phone" />}
                    size="sm"
                    m={2}
                    _light={{ color: '#336666' }}
                    _dark={{ color: 'gray.300' }}
                  />
                }
                variant="outline"
                placeholder="Phone number"
                _light={{ placeholderTextColor: 'blueGray.400' }}
                _dark={{ placeholderTextColor: 'blueGray.50' }}
              />
            </View>
          </View>

          <View style={styles.buttonStyleX}>
            <Text style={styles.text2}>Select your gender:</Text>
            <Text style={styles.text2}>Male        <TouchableOpacity
              style={[styles.button, gender === '1' && styles.selectedButton]}
              onPress={() => handleGenderSelect('1')}
            > 
            </TouchableOpacity> </Text>
            
            <Text style={styles.text2}>Female    <TouchableOpacity
              style={[styles.button, gender === '2' && styles.selectedButton]}
              onPress={() => handleGenderSelect('2')}
            >
            </TouchableOpacity></Text>
            
            
          </View>

          <View style={styles.buttonStyleX}>
            <View style={styles.emailInput}>
              <Input
                style={{ height: 50 }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="email" />}
                    size="sm"
                    m={2}
                    _light={{ color: '#336666' }}
                    _dark={{ color: 'gray.300' }}
                  />
                }
                variant="outline"
                placeholder="Email"
                _light={{ placeholderTextColor: 'blueGray.400' }}
                _dark={{ placeholderTextColor: 'blueGray.50' }}
              />
            </View>
          </View>

          <View style={styles.buttonStyleX}>
            <View style={styles.emailInput}>
              <Input
                style={{ height: 50 }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome5 name="key" />}
                    size="sm"
                    m={2}
                    _light={{ color: '#336666' }}
                    _dark={{ color: 'gray.300' }}
                  />
                }
                variant="outline"
                secureTextEntry
                placeholder="Password"
                _light={{ placeholderTextColor: 'blueGray.400' }}
                _dark={{ placeholderTextColor: 'blueGray.50' }}
              />
            </View>
          </View>

          <View style={styles.buttonStyleX}>
            <View style={styles.emailInput}>
              <Input
                style={{ height: 50 }}
                value={repassword}
                onChangeText={(text) => setrePassword(text)}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome5 name="key" />}
                    size="sm"
                    m={2}
                    _light={{ color: '#336666' }}
                    _dark={{ color: 'gray.300' }}
                  />
                }
                variant="outline"
                secureTextEntry
                placeholder="Confirm Password"
                _light={{ placeholderTextColor: 'blueGray.400' }}
                _dark={{ placeholderTextColor: 'blueGray.50' }}
              />
            </View>
          </View>

          {lock ? (
            <View style={styles.buttonStyle}>
              <Button style={styles.buttonDesign} onPress={handleRegister}>
                REGISTER NOW
              </Button>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#336666" />
          )}

          <View style={styles.text2}>
            <Text>Already have account? </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              }
            >
              <Text style={styles.signupText}> Login </Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  LoginText: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#336666',
  },
  Middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text2: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 1,
    marginTop: 10,
  },
  signupText: {
    fontWeight: 'bold',
    color: '#336666',
    opacity: 1,
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: '#336666',
  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  buttonGender: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 450,
    backgroundColor: '#336666',
  },
  text: {
    opacity: 0.6,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 75,
  },
  selectedButton: {
    backgroundColor: '#336666',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedGenderText: {
    marginTop: 20,
    fontSize: 16,
  },
});
