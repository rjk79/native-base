import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  Switch,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import {useAppState, useActions} from './overmind';

const staticImage = require('./logo.png');

const Login = () => {
  const {text} = useAppState() as any;
  const {saveText} = useActions() as any;

  const [newText, setNewText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    const res = await fetchMovies();
    const resJSON = await res.json();
    setMovies(resJSON.movies);
  }

  function fetchMovies() {
    const url = 'https://reactnative.dev/movies.json';
    const request = new Request(url, {
      method: 'GET',
    });

    return fetch(request);
  }

  return (
    <View style={tw`flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}>
      <View style={tw`max-w-md w-full`}>
        <View>
          <Image source={staticImage} style={tw`mx-auto h-36 w-auto`} />
          <Text style={tw`mt-6 text-center text-3xl font-extrabold text-purple-500`}>Landing</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled((previousState) => !previousState)}
            value={isEnabled}
            style={tw`mr-2`}
          />
          {isEnabled && <Text style={tw`text-center text-gray-900`}>Saved Text: {text}</Text>}
        </View>
        <TextInput
          defaultValue="I'm not a placeholder"
          onChangeText={(newText) => setNewText(newText)}
          style={tw`p-2.5 mt-6 text-purple-500 border border-gray-400`}
        />
        <TouchableOpacity onPress={() => saveText(newText)}>
          <Text style={tw`p-2.5 my-6 text-white bg-purple-500 rounded-lg text-center`}>
            Save Text
          </Text>
        </TouchableOpacity>
        <Button onPress={() => setModalVisible(true)} title="Show Modal" />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Hey</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{color: 'white'}}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={tw`mt-6`}>
          <Text style={tw`font-bold text-xl`}>Movies from API:</Text>
          <FlatList data={movies} renderItem={({item}) => <Text>{item.title}</Text>} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 6,
    backgroundColor: '#2196F3',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
