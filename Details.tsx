import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import tw from 'twrnc';

const Details = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    window.setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <View style={tw`flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}>
      <View style={tw`max-w-md w-full`}>
        <View>
          <Text style={tw`mt-6 text-center text-3xl font-extrabold text-purple-500`}>Details</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Text style={tw`p-2.5 my-6 text-purple-500 rounded-lg text-center`}>
            Navigate to Landing
          </Text>
        </TouchableOpacity>
        {loading ? <ActivityIndicator animating={true} /> : <Text>Done Loading</Text>}
      </View>
    </View>
  );
};

export default Details;
