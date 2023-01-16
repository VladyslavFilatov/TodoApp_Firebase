/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const App: () => Node = () => {
  const [text, setText] = useState('');
  const ref = firestore().collection('todos');
  const [list, setList] = useState([]);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push({
          id: doc.data().id,
          title: doc.data().title,
          complete: doc.data().complete,
        });
      });
      setList(list);
    });
  }, []);
  const onSubmitPress = async () => {
    console.log(text, 'work');
    if (text.length == 0) {
      Alert.alert('Please enter todo');
      return;
    }
    await ref.add({
      title: text,
      complete: false,
    }),
      console.log(text);
    setText('');
  };
  console.log(list);
  return (
    <View style={styles.mainConteiner}>
      <View style={{flexDirection:'row'}}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <TouchableOpacity
          disabled={text.length === 0}
          style={styles.button}
          onPress={onSubmitPress}>
          <Text style={{color:'red'}}>Submit</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={{color: 'white'}}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    backgroundColor: 'green',
    width: '70%',
    height: 50,
    color: 'white',
    borderRadius: 5,
  },
  mainConteiner: {
    flex: 1,
    backgroundColor: '#EEEEE',
    padding: 10,
    paddingTop: 15,
  },

  button: {
    width: 90,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default App;
