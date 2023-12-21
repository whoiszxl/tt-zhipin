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
import { getChineseEducation, getEducationType, getJobStatus } from '../../../common/NormalEnum';
import { CommonColor } from '../../../common/CommonColor';
import TtDivider from '../../../components/ttDivider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateUtil from '../../../utils/DateUtil';
import { CommonStyle } from '../../../common/CommonStyle';
import { CommonLogo } from '../../../common/CommonLogo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export default observer(() => {

  const store = useLocalStore(() => new OnlineResumeStore());

  const navigation = useNavigation<StackNavigationProp<any>>();


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
      textIcon: {
        paddingLeft: 6,
        color: CommonColor.fontColor,
      },
      fullNameLayout: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      textSubtitle: {
        fontSize: 13,
        color: CommonColor.deepGrey,
        paddingLeft: 1
      },
      contactLayout: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      contactItemLayout: {
        flexDirection: 'row',
        alignItems: 'center',
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
          <View style={styles.fullNameLayout}>
            <Text style={styles.textTitle}>{store.onlineResumeInfo.memberInfoResponse.fullName}</Text>
            <AntDesign name="form" style={styles.textIcon} size={13}/>
          </View>
          <Text style={styles.textSubtitle}>{calculateAge(store.onlineResumeInfo.memberInfoResponse.birthday) + "岁" + " · " + getChineseEducation(store.onlineResumeInfo.memberInfoResponse.highestQualification)  +  " · " + getEducationType(store.onlineResumeInfo.memberInfoResponse.highestQualificationType)}</Text>
          <View style={styles.contactLayout}>
            <View style={styles.contactItemLayout}>
              <Ionicons name="phone-portrait" color={CommonColor.normalGrey} size={12}/>
              <Text style={styles.textSubtitle}>{store.onlineResumeInfo.memberInfoResponse.phone}</Text>
            </View>
            <View style={[styles.contactItemLayout, CommonStyle.pl5]}>
              <AntDesign name="wechat" color={CommonColor.normalGrey} size={14}/>
              <Text style={styles.textSubtitle}>{store.onlineResumeInfo.memberInfoResponse.wxCode}</Text>
            </View>

            
          </View>
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


  const renderWorkStatus = () => {
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
        color: CommonColor.fontColor,
      },
      avatarContainer: {
        width: 60, // 右边头像部分的宽度
        height: 60, // 右边头像部分的高度
        borderRadius: 30, // 使图片变成圆形
        overflow: 'hidden', // 超出部分裁剪成圆形
      },
    });

    return (
      <View style={styles.container}>
        {/* 左边文字部分 */}
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>求职状态</Text>
          <Text style={styles.textSubtitle}></Text>
          <Text style={styles.textSubtitle}>{getJobStatus(store.onlineResumeInfo.memberInfoResponse.workStatus)}</Text>
        </View>
  
        {/* 右边头像部分 */}
        <AntDesign name="right" color={CommonColor.deepGrey} size={14}/>
      </View>
    );
  }



  
  const renderAdvantage = () => {
    const styles = StyleSheet.create({
      container: {
        padding: 16,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      leftText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      rightText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: CommonColor.deepGrey
      },
      paragraphText: {
        fontSize: 12,
        color: CommonColor.deepGrey,
        lineHeight: 20,
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.leftText}>个人优势</Text>
          <Ionicons style={styles.rightText} name="create-outline"/>
        </View>
        
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.paragraphText}>
          {store.onlineResumeInfo.advantage}
        </Text>
    </View>
    );
  }



  const renderWorkExpect = () => {
    const styles = StyleSheet.create({
      container: {
        padding: 16,
      },
      itemList: {
        paddingTop: 4
      },
      item: {
        paddingTop: 4
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      leftText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      rightText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: CommonColor.deepGrey
      },
      paragraphText: {
        fontSize: 12,
        color: CommonColor.deepGrey,
        lineHeight: 20,
      },
    });

      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.mainText}>求职期望</Text>
            <Ionicons style={styles.rightText} name="add-circle-outline"/>
          </View>
          
          <ScrollView style={styles.itemList}>
            {store.onlineResumeInfo.workExpectDtoList.map((item:WorkExpectDto, index) => (
              <View style= {styles.item} key={index}>
                <View style={styles.row}>
                  <Text style={styles.leftText}>{item.job + "  " + item.salaryRangeStart + "K-" + item.salaryRangeEnd + "K"}</Text>
                  <Ionicons style={styles.rightText} name="chevron-forward-sharp"/>

                </View>
                <Text style={styles.paragraphText}>
                  {item.city}
                </Text>
                <Text style={styles.paragraphText}>
                  {item.industryArr.join("、")}
                </Text>
              </View>
            ))}
          </ScrollView>
    </View>
    );
  }


  const renderWorkExperience = () => {
    const styles = StyleSheet.create({
      container: {
        padding: 16,
      },
      itemList: {
        paddingTop: 4
      },
      item: {
        paddingTop: 4
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      leftText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      rightText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: CommonColor.deepGrey
      },
      paragraphText: {
        fontSize: 12,
        color: CommonColor.deepGrey,
        lineHeight: 20,
      },

      dateLayout: {
        flexDirection: 'row',
        alignItems: 'center'
      },

      dateText: {
        fontSize: 13,
        color: CommonColor.normalGrey
      }

    });

      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.mainText}>工作经历</Text>
            <Ionicons style={styles.rightText} name="add-circle-outline"/>
          </View>
          
          <ScrollView style={styles.itemList}>
            {store.onlineResumeInfo.workExperienceDtoList.map((item:WorkExperienceDto, index) => (
              <View style= {styles.item} key={index}>
                <View style={styles.row}>
                  <Text style={styles.leftText}>{item.companyFullName}</Text>

                  <View style={styles.dateLayout}>
                    <Text style={styles.dateText}>{DateUtil.formatWorkDate(item.workDateStart) + " - " + DateUtil.formatWorkDate(item.workDateEnd)}</Text>
                    <Ionicons style={styles.rightText} name="chevron-forward-sharp"/>
                  </View>
                </View>
                <Text style={styles.paragraphText}>
                  {item.industry + " · " + item.jobName}
                </Text>
                <Text style={styles.paragraphText}>
                  {"内容："  + item.workDetail}
                </Text>
              </View>
            ))}
          </ScrollView>
    </View>
    );
  }


  const renderProjectExperience = () => {
    const styles = StyleSheet.create({
      container: {
        padding: 16,
      },
      itemList: {
        paddingTop: 4
      },
      item: {
        paddingTop: 4
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      leftText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      rightText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: CommonColor.deepGrey
      },
      paragraphText: {
        fontSize: 12,
        color: CommonColor.deepGrey,
        lineHeight: 20,
      },

      dateLayout: {
        flexDirection: 'row',
        alignItems: 'center'
      },

      dateText: {
        fontSize: 13,
        color: CommonColor.normalGrey
      }

    });

      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.mainText}>项目经历</Text>
            <Ionicons style={styles.rightText} name="add-circle-outline"/>
          </View>
          
          <ScrollView style={styles.itemList}>
            {store.onlineResumeInfo.projectExperienceDtoList.map((item:ProjectExperienceDto, index) => (
              <View style= {styles.item} key={index}>
                <View style={styles.row}>
                  <Text style={styles.leftText}>{item.projectName}</Text>

                  <View style={styles.dateLayout}>
                    <Text style={styles.dateText}>{DateUtil.formatWorkDate(item.projectDateStart) + " - " + DateUtil.formatWorkDate(item.projectDateEnd)}</Text>
                    <Ionicons style={styles.rightText} name="chevron-forward-sharp"/>
                  </View>
                </View>
                <Text style={styles.paragraphText}>
                  {item.projectRole}
                </Text>
                <Text style={styles.paragraphText}>
                  {"内容："  + item.projectResult}
                </Text>
              </View>
            ))}
          </ScrollView>
    </View>
    );
  }


  const renderEduExperience = () => {
    const styles = StyleSheet.create({
      container: {
        padding: 16,
      },
      itemList: {
        paddingTop: 4
      },
      item: {
        paddingTop: 4
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      leftText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: CommonColor.fontColor,
      },
      rightText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: CommonColor.deepGrey
      },
      paragraphText: {
        fontSize: 12,
        color: CommonColor.deepGrey,
        lineHeight: 20,
      },

      dateLayout: {
        flexDirection: 'row',
        alignItems: 'center'
      },

      dateText: {
        fontSize: 13,
        color: CommonColor.normalGrey
      }

    });

      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.mainText}>教育经历</Text>
            <Ionicons style={styles.rightText} name="add-circle-outline"/>
          </View>
          
          <ScrollView style={styles.itemList}>
            {store.onlineResumeInfo.eduExperienceDtoList.map((item:EduExperienceDto, index) => (
              <View style= {styles.item} key={index}>
                <View style={styles.row}>
                  <Text style={styles.leftText}>{item.schoolName}</Text>

                  <View style={styles.dateLayout}>
                    <Text style={styles.dateText}>{item.yearStart + " - " + item.yearEnd}</Text>
                    <Ionicons style={styles.rightText} name="chevron-forward-sharp"/>
                  </View>
                </View>
                <Text style={styles.paragraphText}>
                  {item.educationAttainment + " · " + item.major}
                </Text>
                <Text style={styles.paragraphText}>
                  {"在校经历："  + item.schoolExp}
                </Text>
                <Text style={styles.paragraphText}>
                  {"毕设/论文："  + item.paper}
                </Text>
              </View>
            ))}
          </ScrollView>
    </View>
    );
  }

  return (
    <>
      <View style={styles.root}>

      <View style={[{paddingTop: insets.top, height: insets.top + 25}]}>
      
        {/** 顶部标题栏 */}
        <View style={styles.topTitle}>

          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.goBack() }}>
            <Ionicons style={styles.leftIcon} name={CommonLogo.Ionicons.arrow_back} />
          </TouchableOpacity>

          {/** 职位类型 */}
          <Text style={styles.leftText}>我的在线简历</Text>

          {/** 添加按钮和搜索按钮 */}
          <View>
            <Text style={styles.rightContainer}>预览</Text>
          </View>
        </View>


        <TitleBar/>
        </View>


        {dataLoaded ? (

            <ScrollView style={styles.container}>

              {/** 渲染用户信息 */}
              {renderMemberInfoResponse()}
              <TtDivider/>

              {/** 渲染工作状态 */}
              {renderWorkStatus()}
              <TtDivider/>

              {/** 渲染个人优势 */}
              {renderAdvantage()}
              <TtDivider/>

              {/** 渲染求职期望 */}
              {renderWorkExpect()}
              <TtDivider/>

              {/** 渲染工作经历 */}
              {renderWorkExperience()}

              {/** 渲染项目经历 */}
              {renderProjectExperience()}

              {/** 渲染教育经历 */}
              {renderEduExperience()}

              <TtDivider/>

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
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: 'white'
    },
  
    leftText: {
      fontSize: 17,
      fontWeight: '500',
      color: 'black',
    },
  
    rightContainer: {
      color: CommonColor.fontColor
    },
  
    leftIcon: {
      fontSize: 18,
      color: 'black',
      paddingLeft: 10
    },
  
  });