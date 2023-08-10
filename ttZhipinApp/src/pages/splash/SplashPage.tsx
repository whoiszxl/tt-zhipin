import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


import icon_logo from '../../assets/images/logo_bg_transparent.png';


//闪屏页
export default () => {

  const navigation = useNavigation<StackNavigationProp<any>>();

  //两秒后跳转到登录页面
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('TabPage');
    }, 1000);
  }, []);


  return (
    <View style={styles.root}>
        {/** 闪屏页图标 */}
        <Image style={styles.icon_logo} source={icon_logo}></Image>

        {/** 闪屏页文字 */}
        <Text style={styles.title}>TT直聘</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },

    icon_logo: {
        width: 300,
        height: 150,
        marginTop: 200,
        resizeMode: 'contain'
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "black"
    }
})