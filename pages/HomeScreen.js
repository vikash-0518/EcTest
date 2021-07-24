
import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(20), user_typeVisit VARCHAR(20),user_dateEntry VARCHAR(20),user_timeEntry VARCHAR(20),user_timeExit VARCHAR(20))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
        
          <Mybutton
            title="Visitor Entry "
            customClick={() => navigation.navigate('VisitorScreen')}
          />
          
          
          <Mybutton
            title="Visitor Logs List "
            customClick={() => navigation.navigate('VisitorList')}
          />
           <Mybutton
            title="Latest News"
            customClick={() => navigation.navigate('LatestNews')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
