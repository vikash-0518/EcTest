import React, { useState, useEffect } from 'react';
import { FlatList, Text,StyleSheet, View, SafeAreaView ,Dimensions} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const { width, height } = Dimensions.get('window')

const VisitorListScreen = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{  width: '100%' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={styles.cardView}>
        <Text style={styles.title}>Name: {item.user_name}</Text>
        <Text style={styles.author}>Email: {item.user_email}</Text>
        <Text style={styles.author}>Type of Visitor: {item.user_typeVisit}</Text>
        <Text style={styles.author}>Date: {item.user_dateEntry}</Text>
        <Text style={styles.author}>Time Entry: {item.user_timeEntry}</Text>
        <Text style={styles.time}>Time Exit: {item.user_timeExit}</Text>

      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1}}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  cardView: {
      backgroundColor: 'white',
      margin: width * 0.03,
      borderRadius: width * 0.05,
      shadowColor: '#000',
      shadowOffset: { width:0.5, height: 0.5 },
      shadowOpacity: 0.5,
      shadowRadius: 3
  },
  title: {
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.03,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'

},
author: {
  marginBottom: width * 0.0,
  marginHorizontal: width * 0.05,
  fontSize: 15,
  color: 'gray'

},
time: {
  marginBottom: width * 0.1,
  marginHorizontal: width * 0.05,
  fontSize: 15,
  color: 'gray'

}

})
export default VisitorListScreen;