import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// ... other imports


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const TextInputExample = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState(false);

  useEffect(() => {
    if (isPhoneNumberValid) {
      Alert.alert("Số điện thoại hợp lệ.");
      navigation.navigate('Details');
    }
  }, [isPhoneNumberValid]);

  const validatePhoneNumber = (number)=> {
    const phoneNumberRegex = /^(03|05|07|08|09|01[2689])+([0-9]{8})\b/;
    return phoneNumberRegex.test(number);
  };

  const handlePress = () => {
    if (validatePhoneNumber(text)) {
      setIsPhoneNumberValid(true);
    } else {
      Alert.alert("Không đúng định dạng! Nhập lại");
      onChangeText(''); // Clear the TextInput
      setIsPhoneNumberValid(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.boldText}>Please input your phone number</Text>
        <View style={styles.spacer} />
        <Text>Use your phone number to sign in</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          keyboardType="phone-pad"
          placeholder="Input your phone number"
        />
        <Button title="Tiếp tục" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SignIn" component={TextInputExample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  spacer: {
    height: 10,
  },
  input: {
    height: 40,
    margin: 12,
  },
  TextInput:{
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boldPlaceholder: {
    fontWeight: 'bold',
    color: '#000000', 
  },
});

export default App;
