import { FlatList, StyleSheet, Text, View, Dimensions, Image, StatusBar, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeStore from '../../../stores/HomeStore';
import { useLocalStore, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Ionicons';
import FlowList from '../../../components/flowlist/FlowList.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TitleBar from './components/TitleBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { GestureResponderEvent } from 'react-native';
import { CommonColor } from '../../../common/CommonColor';
import { calculateDistance } from '../../../utils/DistanceUtil';




const {width:SCREEN_WIDTH} = Dimensions.get('window');


export default observer(() => {
  const insets = useSafeAreaInsets();


  const store = useLocalStore(() => new HomeStore());

  const [index, setIndex] = useState<number>(0);



  useEffect(() => {
    store.requestLatestTest();
  }, []);

  const onJobRefresh = () => {
    store.resetPage();
    store.requestLatestTest();
  };

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



    //首页职位item UI
    const renderItem = ({item, index}: {item:JobEntity, index:number}) => {
      const memberInfo = JSON.parse(item.memberInfo);
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
          fontSize: 14,
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
          paddingTop: 5
        },

        twoLineText: {
          fontSize: 12,
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
          paddingLeft: 5
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
        }


      });

      return (
        <>
          <TouchableOpacity activeOpacity={1} style={styles.item} key={index}>
            <View style={styles.root}>

              {/* 职位名与薪资范围 */}
              <View style={styles.oneLine}>
                <Text style={styles.oneLineJobName}>{item.jobName}</Text>
                <Text style={styles.oneLineJobSalary}>{Math.floor(item.salaryRangeStart / 1000)} - {Math.floor(item.salaryRangeEnd / 1000)}K</Text>
              </View>

              {/* 公司信息 */}
              <View style={styles.twoLine}>
                <Text style={styles.twoLineText}>{item.companyResponse.companyAbbrName} </Text>
                <Text style={styles.twoLineText}>{item.companyResponse.financingStage} </Text>
                <Text style={styles.twoLineText}>{item.companyResponse.companyScale} </Text>
              </View>

              {/* 岗位标签 */}
              <View style={styles.threeLine}>
                {JSON.parse(item.jobTags).map((tag:any, index:number) => (
                  <View key={index} style={styles.threeLineTag}>
                    <Text style={styles.threeLineTagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* HR信息与地址信息 */}
              <View style={styles.fourLine}>
                
                <View style={styles.fourLineHR}>
                  {/* 头像 */}
                  <Image style={styles.fourLineHRAvatar} source={{uri: memberInfo.avatar}}/>

                  <View style={{flexDirection: 'column'}}>
                    {/* HR信息 */}
                    <Text style={styles.fourLineHRText}>{memberInfo.name + " · " + memberInfo.jobTitle}</Text>
                    <Text style={styles.fourLineHRReplyText}>3分钟前回复</Text>
                  </View>

                </View>

                <View style={styles.fourLineAddress}>
                  <Text style={styles.fourLineAddressDistance}>{calculateDistance(28.195666, 112.962398, item.latitude, item.longitude)}</Text>
                  <Text style={styles.fourLineAddressInfo}>{item.district + " " + item.addressDetail}</Text>
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
          onRefresh={onJobRefresh} 
          onEndReachedThreshold={0.2}
          onEndReached={loadData}
          ListFooterComponent={MyFooter}
        />
      </>
    );
  }

  const renderNearBy = () => {
    return (
      <View style={{alignContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row'}}>
        <Text>附近列表</Text>
      </View>
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

      {index === 0 ? renderRecommend() : (index === 1 ? renderNearBy() : renderLatest())}
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