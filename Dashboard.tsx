import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Picker} from 'react-native';
import tw from 'twrnc';
import {useAppState, useActions} from './overmind';

const Dashboard = () => {
  const {movies} = useAppState() as any;
  const {saveMovies} = useActions() as any;

  const [selectedValue, setSelectedValue] = useState('title');

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    const res = await fetchMovies();
    const resJSON = await res.json();
    saveMovies(resJSON.movies);
  }

  function fetchMovies() {
    const url = 'https://reactnative.dev/movies.json';
    const request = new Request(url, {
      method: 'GET',
    });

    return fetch(request);
  }

  const sortedMovies = () => {
    if (selectedValue === 'title') {
      if (movies) {
        const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
        return (
          <FlatList
            data={sortedMovies}
            renderItem={({item}) => (
              <View testID="movie" style={tw`flex-row`}>
                <View style={tw`h-5 w-50`}>
                  <Text>{item.title}</Text>
                </View>
                <View style={tw`h-5 w-20`}>
                  <Text>{item.releaseYear}</Text>
                </View>
              </View>
            )}
          />
        );
      }
    }
    if (selectedValue === 'release-year') {
      if (movies) {
        const sortedMovies = [...movies].sort((a, b) => a.releaseYear.localeCompare(b.releaseYear));
        return (
          <FlatList
            data={sortedMovies}
            renderItem={({item}) => (
              <View testID="movie" style={tw`flex-row`}>
                <View style={tw`h-5 w-50`}>
                  <Text>{item.title}</Text>
                </View>
                <View style={tw`h-5 w-20`}>
                  <Text>{item.releaseYear}</Text>
                </View>
              </View>
            )}
          />
        );
      }
    }
  };

  return (
    <View style={tw`flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}>
      <View style={tw`mt-6`}>
        <Text style={tw`text-center text-3xl font-extrabold text-purple-500`}>Dashboard</Text>
      </View>
      <View style={tw` justify-center rounded-lg`}>
        <Picker
          style={tw`bg-sky-500 w-60 h-30 justify-center rounded-lg`}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Title" value="title" />
          <Picker.Item label="Release Year" value="release-year" />
        </Picker>
      </View>
      <View style={tw`mt-6 `}>
        <Text style={tw`font-bold text-xl`}>Movies from API:</Text>
      </View>
      <View style={tw`mt-6 h-30`}>{movies ? sortedMovies() : null}</View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default Dashboard;
