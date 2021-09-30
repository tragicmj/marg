import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import Colors from './src/constants/colors'

import Home from './src/screens/Home'
import Details from './src/screens/Details'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  async componentDidMount() {

  }


  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName='Home'
              screenOptions={{
                detachPreviousScreen: false,
                enableScreens: true,
                headerStyle: {
                  backgroundColor: Colors.primary,
                  height: 60,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerBackTitleVisible: false,
                headerTitleAlign: 'left',
              }}
          >
              <Stack.Screen name="Home" component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Details"
                component={Details}
                options={{headerShown: false}}
                // options={({route}) => ({title: route.params.fullname})}
              >
              </Stack.Screen>              
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

export default App;