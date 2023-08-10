import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { Linking } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


import icon_logo_main from '../../assets/images/logo_bg_transparent.png';
import icon_un_selection from '../../assets/icons/un_selection.png';
import icon_selection from '../../assets/icons/selection.png';

import icon_arrow from '../../assets/icons/arrow_left.png';
import icon_wx from '../../assets/icons/weixin.png';
import icon_apple from '../../assets/icons/apple.png';
import icon_phone from '../../assets/icons/phone.png';
import icon_qq from '../../assets/icons/qq.png';
import icon_triangle from '../../assets/icons/show_more.png';
import icon_view from '../../assets/icons/view.png';
import icon_viewOff from '../../assets/icons/view_off.png';
import icon_exchange from '../../assets/icons/exchange.png';
import icon_close from '../../assets/icons/close.png';
import { formatPhone, replaceBlank, generateString } from "../../utils/StrUtil";
import MemberStore from "../../stores/MemberStore";

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [loginType, setLoginType] = useState<'quick'|'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('123456');
  const [password, setPassword] = useState<string>('123456');

  const onPressByLogin =async () => {
    //const canLogin = phone?.length === 13 && password?.length >=8 && check ? true : false;

    const canLogin = check ? true : false;
    if(!canLogin) {
      return;
    }
    
    const finalPhone = replaceBlank(phone);

    MemberStore.requestLogin(finalPhone, password, (success: boolean) => {
      if(success) {
        console.log("登录成功");
        console.log("MemberStore.token: %s", MemberStore.token);
        navigation.replace('TabPage');
      }else {
        console.log("登陆失败");
      }
    });
  }


  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },

      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
      },

      otherLoginText: {
        color: '#303080',
        fontSize: 13
      },

      otherLoginIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [{rotate: '180deg'}]
      },

      wxLoginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#05c160',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      },

      wxLoginIcon: {
        width: 26,
        height: 26
      },

      wxLoginText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 8
      },

      appleLoginButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 0.8,
        marginBottom: 10,
      },

      appleLoginIcon: {
        width: 26,
        height: 26
      },

      appleLoginText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 8
      },

      qqLoginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#1296db',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      },

      qqLoginIcon: {
        width: 26,
        height: 26
      },

      qqLoginText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 8
      },


      oneClickLoginButton: {
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      },

      oneClickLoginText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 8
      },

      logo_main: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 80,
      }




    });


    return (
      <View style={styles.root}>

        {/** 注册登录协议 */}
        <View style={commonStyles.protocolLayout}>
          
          <TouchableOpacity onPress={() => { setCheck(!check) }}>
            <Image style={commonStyles.radioButton} source={check ? icon_selection : icon_un_selection}/>
          </TouchableOpacity>

          <Text style={commonStyles.labelText}>我已阅读并同意</Text>
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://www.google.com');
          }}>
            <Text style={commonStyles.protocolText}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>


        {/** 其他登录方式 */}
        <TouchableOpacity onPress={() => {
          //LayoutAnimation.easeInEaseOut();
          setLoginType((type: 'quick'|'input') => {
            if(type === 'quick') {
              return 'input';
            }else {
              return 'quick';
            }
          } )
        }} style={styles.otherLoginButton}>
          <Text style={styles.otherLoginText}>其他登录方式</Text>
          <Image style={styles.otherLoginIcon} source={icon_arrow}/>
        </TouchableOpacity>

        {/** APPLE登录方式 */}
        <TouchableOpacity style={styles.appleLoginButton} activeOpacity={0.8}>
          <Image style={styles.appleLoginIcon} source={icon_apple}/>
          <Text style={styles.appleLoginText}>通过Apple登录</Text>
        </TouchableOpacity>

        {/** 微信登录方式 */}
        <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.8}>
          <Image style={styles.wxLoginIcon} source={icon_wx}/>
          <Text style={styles.wxLoginText}>微信登录</Text>
        </TouchableOpacity>

        {/** 微信登录方式 */}
        <TouchableOpacity style={styles.qqLoginButton} activeOpacity={0.8}>
          <Image style={styles.qqLoginIcon} source={icon_qq}/>
          <Text style={styles.qqLoginText}>QQ登录</Text>
        </TouchableOpacity>

        {/** 手机号登录方式 */}
        <TouchableOpacity style={styles.oneClickLoginButton} activeOpacity={0.8}>
          <Image style={styles.wxLoginIcon} source={icon_phone}/>
          <Text style={styles.oneClickLoginText}>手机号登录</Text>
        </TouchableOpacity>


        {/** 登录LOGO */}
        <Image style={styles.logo_main} source={icon_logo_main}/>

      </View>
    );
  }

  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 56,
      },

      passwordLogin: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 54,
        marginRight: 110,
      },

      passwordTip: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
      },

      phoneInputLayout: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 20,
      }, 
      phoneInputPre: {
        fontSize: 16,
        color: 'black',
      },
      phoneInputPreIcon:{
        width: 12,
        height: 6,
        marginLeft: 3,
      },

      phoneInput:{
        flex: 1,
        height: 50,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 16,
        marginLeft: 10,
        color: '#333'

      },
      passwordInputLayout: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 4,
      },
      passwordInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 16,
        marginLeft: 0,
        marginRight: 16,
        color: '#333'
      },

      passwordEye: {
        width: 20,
        height: 20,
      },

      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row'
      },

      exchangeIcon: {
        width: 12,
        height: 12,
      },
      
      codeLoginText: {
        fontSize: 12,
        color: '#303080',
        flex: 1,
        marginLeft: 4
      },

      forgetPasswordText: {
        fontSize: 12,
        color: '#303080',
      },

      loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10
      },

      unloginButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'red',
        opacity: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10
      },
      

      loginText: {
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold'
      },

      thridPartyLoginLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center'
      },

      icon_qq: {
        width: 56,
        height: 56,
      },
      icon_wx: {
        width: 56,
        height: 56,
        marginRight: 60
      },

      closeButtonLayout: {
        position: 'absolute',
        top: 5,
        left: 20,
      },

      closeButtonIcon: {
        width: 24,
        height: 24
      }


    });

    const canLogin = check ? true : false;

    return (
      <View style={styles.root}>
          
          {/** 密码登录提示 */}
          <Text style={styles.passwordLogin}>手机号密码登录</Text>


          {/** 登录手机号表单 */}
          <View style={styles.phoneInputLayout}>
            <Text style={styles.phoneInputPre}>+86</Text>
            <Image style={styles.phoneInputPreIcon} source={icon_triangle} />
            <TextInput style={styles.phoneInput} placeholderTextColor='#999' placeholder="请输入手机号" autoFocus={false}
               keyboardType="number-pad" maxLength={13} value={phone} 
               onChangeText={(text:string) => {
                setPhone(formatPhone(text))
              }}/>
          </View>

          {/** 登录密码表单 */}
          <View style={styles.passwordInputLayout}>
            <TextInput style={styles.passwordInput} placeholderTextColor='#999' placeholder="请输入密码" autoFocus={false}
              maxLength={18} value={password} 
              secureTextEntry={eyeOpen}
              onChangeText={(text:string) => {
                setPassword(text)
              }}/>
            <TouchableOpacity onPress={() => { setEyeOpen(!eyeOpen); }}>
              <Image style={styles.passwordEye} source={eyeOpen ? icon_view : icon_viewOff}/>
            </TouchableOpacity>
          </View>

          {/** 注册登录协议 */}
          <View style={commonStyles.protocolLayout}>
            
            <TouchableOpacity onPress={() => { setCheck(!check) }}>
              <Image style={commonStyles.radioButton} source={check ? icon_selection : icon_un_selection}/>
            </TouchableOpacity>

            <Text style={commonStyles.labelText}>已阅读并同意</Text>
            <TouchableOpacity onPress={() => {
              Linking.openURL('https://www.google.com');
            }}>
              <Text style={commonStyles.protocolText}>《用户协议》和《隐私政策》</Text>
            </TouchableOpacity>
          </View>

          {/** 登录按钮 */}
          <TouchableOpacity style={canLogin ? styles.loginButton : styles.unloginButton} 
            activeOpacity={canLogin ? 0.7 : 1} 
            onPress={onPressByLogin}>
            <Text style={styles.loginText}>登录</Text>
          </TouchableOpacity>


          {/** 扩展功能 */}
          <View style={styles.changeLayout}>
            <Image style={styles.exchangeIcon} source={icon_exchange}/>
            <Text style={styles.codeLoginText}>找回密码</Text>
            <Text style={styles.forgetPasswordText}>邮箱密码登录</Text>
          </View>
          


          {/** 关闭页面 */}
          <TouchableOpacity onPress={() => {setLoginType('quick')}} style={styles.closeButtonLayout}>
            <Image style={styles.closeButtonIcon} source={icon_close}/>
          </TouchableOpacity>
          
      </View>
    );
  }

  return (
    <View style={commonStyles.root}>
        {
          loginType === 'quick' ? renderQuickLogin() : renderInputLogin()
        }
    </View>
  )
}


const commonStyles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },

    protocolLayout: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 15,
    },

    radioButton: {
      width: 20,
      height: 20,
    },

    labelText: {
      fontSize: 10,
      color: '#999',
      marginLeft: 6,
    },

    protocolText: {
      fontSize: 10,
      color: '#1020ff'
    },
})