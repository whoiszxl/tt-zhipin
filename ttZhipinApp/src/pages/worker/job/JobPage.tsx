import { FlatList, StyleSheet, Text, View, Dimensions, Image, StatusBar, RefreshControl } from 'react-native'
import React, { Component, useCallback, useEffect, useRef, useState } from 'react'
import HomeStore from '../../../stores/HomeStore';
import { useLocalStore, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Ionicons';
import FlowList from '../../../components/flowlist/FlowList.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TitleBar from './components/TitleBar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { GestureResponderEvent } from 'react-native';
import { CommonColor } from '../../../common/CommonColor';




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
        width: '100%'
      }}>已经滑到底部了</Text>
    );
  };



    //首页视频item UI
    const renderItem = ({item, index}: {item:JobEntity, index:number}) => {
      const styles = StyleSheet.create({
        root: {
          backgroundColor: 'white',
          width: '100%',
          flexDirection: 'column'
        },

        item: {
          width: SCREEN_WIDTH,
          backgroundColor: 'white',
          marginLeft: 6,
          marginBottom: 6,
          borderRadius: 6,
          overflow: 'hidden'
        },

        oneLine: {
          flexDirection: 'row', // 将子组件排列在一行
          alignItems: 'center', // 垂直居中对齐
          justifyContent: 'space-between', // 在容器中水平分散对齐
          paddingHorizontal: 16,
          paddingVertical: 8,
        },

        oneLineJobName: {
          fontWeight: '400',
          fontSize: 14,
          color: 'black'
        },

        oneLineJobSalary: {
          fontWeight: '400',
          fontSize: 12,
          color: CommonColor.mainColor
        },

        twoLine: {
          flexDirection: 'row', // 将子组件排列在一行
          alignItems: 'center', // 垂直居中对齐
          paddingHorizontal: 16,
          paddingVertical: 8,
        },

        twoLineCompany: {

        }

      });

      return (
        <>
          <TouchableOpacity activeOpacity={1} style={styles.item} key={index}>
            <View style={styles.root}>

              <View style={styles.oneLine}>
                <Text style={styles.oneLineJobName}>{item.jobName}</Text>
                <Text style={styles.oneLineJobSalary}>{item.salaryRangeStart} - {item.salaryRangeEnd}</Text>
              </View>

              <View style={styles.twoLine}>
                <Text style={styles.twoLineCompany}>{item.jobName}</Text>
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
          onEndReachedThreshold={0.1}
          onEndReached={loadData}
          ListFooterComponent={MyFooter}
        />
      </>
    );
  }

  const renderNearBy = () => {
    return (
      <View style={{alignContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row'}}>
        <Text>附近列表22</Text>
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
      <View style={[{paddingTop: insets.top, height: insets.top + 65}]}>
      
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