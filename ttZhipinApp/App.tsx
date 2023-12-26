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
import BecomeBossPage from './src/pages/worker/mine/BecomeBossPage';
import InitMemberInfoPage from './src/pages/worker/init/InitMemberInfoPage';
import JobDetailPage from './src/pages/worker/job/JobDetailPage';
import ChatPage from './src/pages/worker/message/ChatPage';
import OnlineResumePage from './src/pages/worker/onlineResume/OnlineResumePage';
import AttachmentResumePage from './src/pages/worker/attachmentResume/AttachmentResumePage';
import PdfViewPage from './src/pages/worker/attachmentResume/PdfViewPage';


import ToutouTabPage from './src/pages/toutou/ToutouTabPage';
import ToutouMinePage from './src/pages/toutou/toutou_mine/ToutouMinePage';
import ToutouSearchPage from './src/pages/toutou/toutou_search/ToutouSearchPage';
import ToutouWorkerPage from './src/pages/toutou/toutou_worker/ToutouWorkerPage';




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
          <Stack.Screen options={{headerShown: false}} name='JobDetailPage' component={JobDetailPage}/>
          <Stack.Screen options={{headerShown: false}} name='InitMemberInfoPage' component={InitMemberInfoPage}/>

          <Stack.Screen options={{headerShown: false}} name='DiscoveryPage' component={DiscoveryPage}/>
          <Stack.Screen options={{headerShown: false}} name='MessagePage' component={MessagePage}/>
          <Stack.Screen options={{headerShown: false}} name='MinePage' component={MinePage}/>
          <Stack.Screen options={{headerShown: false}} name='BecomeBossPage' component={BecomeBossPage}/>
          <Stack.Screen options={{headerShown: false}} name='ChatPage' component={ChatPage}/>


          <Stack.Screen options={{headerShown: false}} name='OnlineResumePage' component={OnlineResumePage}/>
          <Stack.Screen options={{headerShown: false}} name='AttachmentResumePage' component={AttachmentResumePage}/>
          <Stack.Screen options={{headerShown: false}} name='PdfViewPage' component={PdfViewPage}/>


          
          <Stack.Screen options={{headerShown: false}} name='ToutouTabPage' component={ToutouTabPage}/>
          <Stack.Screen options={{headerShown: false}} name='ToutouMinePage' component={ToutouMinePage}/>
          <Stack.Screen options={{headerShown: false}} name='ToutouSearchPage' component={ToutouSearchPage}/>
          <Stack.Screen options={{headerShown: false}} name='ToutouWorkerPage' component={ToutouWorkerPage}/>

        </Stack.Navigator>
      </NavigationContainer>


    </SafeAreaProvider>
  );
}


export default App;
