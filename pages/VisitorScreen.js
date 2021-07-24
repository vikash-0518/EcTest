import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const VisitorScreen = ({navigation}) => {

  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userTypeVisit, setUserTypeVisit] = useState('');
  let [userDateEntry, setUserDateEntry] = useState('');
  let [userTimeEntry, setUserTimeEntry] = useState('');
  let [userTimeExit, setUserTimeExit] = useState('');

  let visitor_user = () => {
    console.log(userName,userEmail,userTypeVisit,userDateEntry,userTimeEntry,userTimeExit);

    if (!userName) {
      alert('Please fill name');
      return;
    }
   else if (!userEmail) {
      alert('Please fill Email');
      return;
    }
  else  if (!userTypeVisit) {
      alert('Please fill Type of visit');
      return;
    }
  else  if (!userDateEntry) {
      alert('Please fill current date');
      return;
    }
   else if (!userTimeEntry) {
      alert('Please fill entry time');
      return;
    }
 else if (!userTimeExit) {
    alert('Please fill exit time');
    return;
  }

  
  

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_email,user_typeVisit,user_dateEntry,user_timeEntry,user_timeExit) VALUES (?,?,?,?,?,?)',
        [userName, userEmail, userTypeVisit,userDateEntry,userTimeEntry,userTimeExit],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(userName) => setUserName(userName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Email"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
                style={{padding: 10}}
              />
             <Mytextinput
                placeholder="Type of visit"
                onChangeText={(userTypeVisit) => setUserTypeVisit(userTypeVisit)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Date of entry"
                onChangeText={(userDateEntry) => setUserDateEntry(userDateEntry)}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Time of entry"
                onChangeText={(userTimeEntry) => setUserTimeEntry(userTimeEntry)}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Time of exit"
                onChangeText={(userTimeExit) => setUserTimeExit(userTimeExit)}
                keyboardType="numeric"
                style={{padding: 10}}
              />
               <Mybutton title="Submit" customClick={visitor_user} />
       
      
             
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VisitorScreen;

