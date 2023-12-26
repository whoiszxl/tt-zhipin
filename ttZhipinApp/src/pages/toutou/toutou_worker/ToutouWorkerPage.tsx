import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalStore, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Ionicons';
import FlowList from '../../../components/flowlist/FlowList.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TitleBar from './components/TitleBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { GestureResponderEvent } from 'react-native';
import { CommonColor } from '../../../common/CommonColor';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ToutouWorkerStore from '../../../stores/ToutouWorkerStore';
import { CommonStyle } from '../../../common/CommonStyle';
import DateUtil from '../../../utils/DateUtil';
import { getChineseEducation, getEducationType, getJobStatus } from '../../../common/NormalEnum';

const {width:SCREEN_WIDTH} = Dimensions.get('window');


export default observer(() => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<any>>();

  const store = useLocalStore(() => new ToutouWorkerStore());

  const [index, setIndex] = useState<number>(0);


  useEffect(() => {
    store.requestLatestTest();
  }, []);


  const loadData = () => {
    store.requestLatestTest();
  };

  const MyFooter = () => {
    return (
      <Text style={{
        textAlign: 'center',
        color: '#999',
        width: '100%',
        padding: 10,
        paddingBottom: 20
      }}>已经滑到底部了</Text>
    );
  };


  const renderMemberInfoResponse = ({item, index}: {item:BossMemberEntity, index:number}) => {
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
            <Text style={styles.textTitle}>{item.fullName}</Text>
          </View>
          <Text style={styles.textSubtitle}>{DateUtil.calculateAge(item.birthday)}</Text>
          <View style={styles.contactLayout}>
            <View style={styles.contactItemLayout}>
              <Text style={styles.textSubtitle}>{item.phone}</Text>
            </View>
            <View style={[styles.contactItemLayout, CommonStyle.pl5]}>
              <Text style={styles.textSubtitle}>{item.wxCode}</Text>
            </View>

            
          </View>
        </View>
  
        {/* 右边头像部分 */}
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: item.avatar }} // 你的头像图片地址
          />
        </View>
      </View>
    );
  }




    //首页职位item UI
    const renderItem = ({item, index}: {item:BossMemberEntity, index:number}) => {
      const styles = StyleSheet.create({
        root: {
          backgroundColor: 'white',
          width: '100%',
          flexDirection: 'column'
        },

        item: {
          width: SCREEN_WIDTH - 10,
          backgroundColor: 'white',
          marginHorizontal: 5,
          marginBottom: 6,
          borderRadius: 6,
          overflow: 'hidden'
        },

        oneLine: {
          flexDirection: 'row', // 将子组件排列在一行
          alignItems: 'center', // 垂直居中对齐
          justifyContent: 'space-between', // 在容器中水平分散对齐
          paddingHorizontal: 12,
          paddingTop: 10
        },

        oneLineJobName: {
          fontWeight: 'bold',
          fontSize: 18,
          color: 'black'
        },

        oneLineJobSalary: {
          fontWeight: '500',
          fontSize: 12,
          color: CommonColor.mainColor
        },

        twoLine: {
          flexDirection: 'row', // 将子组件排列在一行
          alignItems: 'center', // 垂直居中对齐
          paddingHorizontal: 12,
          paddingTop: 0
        },

        twoLineText: {
          fontSize: 10,
          color: CommonColor.deepGrey
        },

        threeLine: {
          flexDirection: 'row', // 将子组件排列在一行
          alignItems: 'center', // 垂直居中对齐
          paddingHorizontal: 12,
          paddingTop: 5
        },

        threeLineTag: {
          backgroundColor: CommonColor.tagBg,
          borderRadius: 5,
          paddingVertical: 2,
          paddingHorizontal: 4,
          marginRight: 3
        },
        threeLineTagText: {
          color: CommonColor.deepGrey,
          fontSize: 10
        },

        fourLine: {
          flexDirection: 'row', // 将子组件排列在一行
          alignItems: 'center', // 垂直居中对齐
          justifyContent: 'space-between', // 在容器中水平分散对齐
          paddingHorizontal: 12,
          paddingTop: 7,
          paddingBottom: 6
        },

        fourLineHR: {
          flexDirection: 'row',
          alignItems: 'center',
        },

        fourLineHRAvatar: {
          width: 18,
          height: 18,
          resizeMode: 'cover',
          borderRadius: 100
        },

        fourLineHRText:{
          color: CommonColor.fontColor,
          fontSize: 11,
        },

        fourLineHRReplyText:{
          color: CommonColor.normalGrey,
          fontSize: 10,
          paddingLeft: 5
        },
      

        fourLineAddress: {
          flexDirection: 'row'
        },

        fourLineAddressInfo: {
          fontSize: 10,
          color: CommonColor.normalGrey
        },

        fourLineAddressDistance: {
          fontSize: 10,
          color: CommonColor.normalGrey,
          paddingRight: 4
        },

        avatar: {
          width: 40,
          height: 40,
          resizeMode: 'cover',
          borderRadius: 100
        },

      });

      return (
        <>
          <TouchableOpacity onPress={() => {
            //跳转到职位详情页
            navigation.push('JobDetailPage', {id: item.id});

          }} activeOpacity={1} style={styles.item} key={index}>
            <View style={styles.root}>

              {/* 职位名与薪资范围 */}
              <View style={styles.oneLine}>
                <Text style={styles.oneLineJobName}>{item.fullName}</Text>
                
                <Image
                  style={styles.avatar}
                  source={{ uri: item.avatar }} // 你的头像图片地址
                />
              </View>

              {/* 公司信息 */}
              <View style={styles.twoLine}>
                <Text style={styles.twoLineText}>
                  {
                    DateUtil.calculateAge(item.birthday) + "岁" + " | "
                    + getChineseEducation(item.highestQualification) + " | "
                    + getEducationType(item.highestQualificationType) + " | "
                    + getJobStatus(item.workStatus)
                  
                  } 
                </Text>
              </View>

              {/* HR信息与地址信息 */}
              <View style={styles.fourLine}>
                
                <View style={styles.fourLineHR}>

                  <View style={{flexDirection: 'column'}}>
                    {/* HR信息 */}
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.fourLineHRText}>{"拥有扎实的编程基础和多年的实际项目经验。我的专业领域涵盖了后端开发、分布式系统以及大数据处理。通过多次项目实践，我熟练掌握了Java语言及相关技术栈，包括Spring框架、Hibernate、Maven等"}</Text>
                  </View>

                </View>

                <View style={styles.fourLineAddress}>

                </View>
              </View>

            </View>
          </TouchableOpacity>

        </>
  
        
  
      );
    }

  const renderRecommend = () => {
    return (
      <>
        {/** 主页视频列表 */}
        <FlowList 
          keyExtractor={(item: JobEntity) => `${item.id}`}
          contentContainerStyle={styles.container} 
          style={styles.flatList} 
          data={store.jobList} 
          extraData={[store.refreshing]}
          renderItem={renderItem} 
          numColumns={1}
          refreshing={store.refreshing}
          onRefresh={loadData} 
          onEndReachedThreshold={0.2}
          onEndReached={loadData}
          ListFooterComponent={MyFooter}
        />
      </>
    );
  }

  const renderLatest = () => {
    return (
      <View style={{alignContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row'}}>
        <Text>最新列表</Text>
      </View>
    );
  }



  return (
    
    <View style={styles.root}>
      <View style={[{paddingTop: insets.top, height: insets.top + 75}]}>
      
        {/** 顶部标题栏 */}
        <View style={styles.topTitle}>

          {/** 职位类型 */}
          <Text style={styles.leftText}>Java</Text>

          {/** 添加按钮和搜索按钮 */}
          <View style={styles.rightContainer}>
            <TouchableOpacity activeOpacity={1}>
              <Icon style={styles.rightIcon} name="add" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1}>
              <Icon style={styles.rightIcon} name="search-outline" />
            </TouchableOpacity>
          </View>
        </View>


      <TitleBar tab={0} onAddButtonPress={(event: GestureResponderEvent) => {
        }} onTabChanged={(tab: number) => { setIndex(tab); }}/>
      </View>

      {index === 0 ? renderRecommend() : renderLatest()}
    </View>
    
  );

})

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  flatList: {
    width: '100%',
    height: '100%',
    backgroundColor: CommonColor.normalBg
  },

  topTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },

  leftText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: '500',
    color: 'black'
  },

  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  rightIcon: {
    fontSize: 25,
    color: 'black',
    paddingLeft: 10
  },

  container: {
    paddingTop: 6
  },
  
});