import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import TitleBar from './components/TitleBar';
import { GestureResponderEvent, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OnlineResumeStore from "../../../stores/OnlineResumeStore";
import { observer, useLocalStore } from 'mobx-react';
import { getChineseEducation, getEducationType } from '../../../common/NormalEnum';
import { CommonColor } from '../../../common/CommonColor';


export default observer(() => {

  const store = useLocalStore(() => new OnlineResumeStore());


  const insets = useSafeAreaInsets();


  const [dataLoaded, setDataLoaded] = useState(false);


  const calculateAge = (dateOfBirth: string) => {
    // Using regex to check if the dateOfBirth is in the correct format
    const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  
    if (!dateRegex.test(dateOfBirth)) {
      throw new Error('Invalid date format. Please use the format: 2002-08-26 10:03:12');
    }
  
    // Parse the input date string into a Date object
    const birthDate: Date = new Date(dateOfBirth);
  
    // Get the current date
    const currentDate: Date = new Date();
  
    // Calculate the age
    const ageInMillis: number = currentDate.getTime() - birthDate.getTime();
    const ageInYears: number = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));
  
    return ageInYears;
  }
  
  useEffect(() => {
    store.requestOnlineResumeInfo().then(res => {
      console.log(res);
      if(res) {
        setDataLoaded(true);
      }
    });
  }, []);


  const renderMemberInfoResponse = () => {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row', // 主容器横向排列
        justifyContent: 'space-between', // 左右对齐
        alignItems: 'center', // 垂直居中对齐
        padding: 16,
      },
      textContainer: {
        flex: 1, // 左边文字部分占用剩余空间
        marginRight: 16, // 右边头像部分的间隔
      },
      textTitle: {
        fontSize: 18,
        color: CommonColor.fontColor,
        fontWeight: 'bold',
      },
      textSubtitle: {
        fontSize: 13,
        color: CommonColor.deepGrey,
      },
      avatarContainer: {
        width: 60, // 右边头像部分的宽度
        height: 60, // 右边头像部分的高度
        borderRadius: 30, // 使图片变成圆形
        overflow: 'hidden', // 超出部分裁剪成圆形
      },
      avatar: {
        width: '100%',
        height: '100%',
      },
    });

    return (
      <View style={styles.container}>
        {/* 左边文字部分 */}
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{store.onlineResumeInfo.memberInfoResponse.fullName}</Text>
          <Text style={styles.textSubtitle}>{calculateAge(store.onlineResumeInfo.memberInfoResponse.birthday) + "岁" + " · " + getChineseEducation(store.onlineResumeInfo.memberInfoResponse.highestQualification)  +  " · " + getEducationType(store.onlineResumeInfo.memberInfoResponse.highestQualificationType)}</Text>
          <Text style={styles.textSubtitle}>{store.onlineResumeInfo.memberInfoResponse.phone + " · " + store.onlineResumeInfo.memberInfoResponse.wxCode}</Text>
        </View>
  
        {/* 右边头像部分 */}
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: store.onlineResumeInfo.memberInfoResponse.avatar }} // 你的头像图片地址
          />
        </View>
      </View>
    );
  }


  return (
    <>
      <View style={styles.root}>

      <View style={[{paddingTop: insets.top, height: insets.top + 25}]}>
      
        {/** 顶部标题栏 */}
        <View style={styles.topTitle}>


          <TouchableOpacity activeOpacity={1}>
            <Feather style={styles.rightIcon} name="arrow-left" />
          </TouchableOpacity>

          {/** 职位类型 */}
          <Text style={styles.leftText}>我的在线简历</Text>

          {/** 添加按钮和搜索按钮 */}
          <View style={styles.rightContainer}>
            <Text>预览</Text>
          </View>
        </View>


        <TitleBar/>
        </View>


        {dataLoaded ? (

            <ScrollView style={styles.container}>

              {/** 渲染用户信息 */}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}
              {renderMemberInfoResponse()}

            </ScrollView>



        ) : (<Text>加载中</Text>)}
        
      </View> 
    </>
    );
  }
)


const styles = StyleSheet.create({

    root: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    container: {
      width: '100%',
      height: '100%',
    },
    item: {
      padding: 1,
      fontSize: 18,
      height: 44,
      width: '100%'
    },
    title: {
      fontSize: 16,
    },

    topTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor: 'white'
    },
  
    leftText: {
      textAlign: 'center',
      fontSize: 17,
      fontWeight: '500',
      color: 'black',
    },
  
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  
    rightIcon: {
      fontSize: 18,
      color: 'black',
      paddingLeft: 10
    },
  
  });