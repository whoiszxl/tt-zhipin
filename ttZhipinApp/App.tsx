import React from 'react';
import { StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashPage from './src/pages/splash/SplashPage';
import LoginPage from './src/pages/login/LoginPage';
import CheckSmsCaptchaPage from './src/pages/login/CheckSmsCaptchaPage';
import TabPage from './src/pages/worker/TabPage';

import JobPage from './src/pages/worker/job/JobPage';
import DiscoveryPage from './src/pages/worker/discovery/DiscoveryPage';
import MessagePage from './src/pages/worker/message/MessagePage';
import MinePage from './src/pages/worker/mine/MinePage';


const Stack = createStackNavigator();

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      

      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />


      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashPage'>
          <Stack.Screen options={{headerShown: false}} name='SplashPage' component={SplashPage}/>
          <Stack.Screen options={{headerShown: false}} name='LoginPage' component={LoginPage}/>
          <Stack.Screen options={{headerShown: false}} name='CheckSmsCaptchaPage' component={CheckSmsCaptchaPage}/>
          <Stack.Screen options={{headerShown: false}} name='TabPage' component={TabPage}/>
          <Stack.Screen options={{headerShown: false}} name='JobPage' component={JobPage}/>

          <Stack.Screen options={{headerShown: false}} name='DiscoveryPage' component={DiscoveryPage}/>
          <Stack.Screen options={{headerShown: false}} name='MessagePage' component={MessagePage}/>
          <Stack.Screen options={{headerShown: false}} name='MinePage' component={MinePage}/>


        </Stack.Navigator>
      </NavigationContainer>


    </SafeAreaProvider>
  );
}


export default App;
