import React, {useState} from 'react';
import { Text, View, Image, TextInput, Button } from 'react-native';
import tw from 'twrnc';
const staticImage = require('./logo.png');
import { useAppState, useActions } from './overmind';

const Login = () => {
    // saveUserToken('the token')
    // login('the username', 'the password')
    const {text} = useAppState();
    const {saveText} = useActions();

    const [newText, setNewText] = useState<string>('');

    return (
        <View
            style={tw`flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}
        >
            <View
                style={tw`max-w-md w-full`}
            >
                <View>
                    <Image source={staticImage} style={tw`mx-auto h-36 w-auto`}/>
                    <Text
                        style={tw`mt-6 text-center text-3xl font-extrabold text-purple-500`}
                    >
            Login
                    </Text>
                </View>
                <Text
                    style={tw`mt-6 text-center text-gray-900`}
                >
                    {text}
                </Text>
                <TextInput onChangeText={newText => setNewText(newText)}
                    style={tw`p-2.5 mt-6 text-purple-500 border border-gray-400`}
                />
                <Button
                    onPress={() => saveText(newText)}
                    title="Save count"
                />

            </View>
        </View>
    );
};

export default Login;
