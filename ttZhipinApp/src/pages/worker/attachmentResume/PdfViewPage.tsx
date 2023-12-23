import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, StyleSheet, Alert } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TitleBar from './components/TitleBar';
import { observer, useLocalStore } from 'mobx-react';
import { CommonColor } from '../../../common/CommonColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLogo } from '../../../common/CommonLogo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Pdf from 'react-native-pdf';

import AttachmentResumeStore from '../../../stores/AttachmentResumeStore';

export default observer(() => {

  const store = useLocalStore(() => new AttachmentResumeStore());

  const navigation = useNavigation<StackNavigationProp<any>>();

  const { params } = useRoute<any>();


  const insets = useSafeAreaInsets();


  const [dataLoaded, setDataLoaded] = useState(false);


  const source = { uri: params.url, cache: true };


  function processFileName(fileName: string): string {
    // 查找文件名中的第一个点（.）的索引
    const dotIndex = fileName.indexOf('.');
  
    // 如果存在点（.）并且点不在字符串的末尾
    if (dotIndex !== -1 && dotIndex < fileName.length - 1) {
      // 截取点之前的部分
      let processedName = fileName.substring(0, dotIndex);
  
      // 如果字符串长度超过20个字符，则截取前20个字符并添加省略号
      if (processedName.length > 20) {
        processedName = processedName.substring(0, 20) + '...';
      }
  
      return processedName;
    } else {
      // 如果没有点或点在字符串末尾，则直接返回原始字符串
      return fileName;
    }
  }
  
  useEffect(() => {
    store.requestOnlineResumeInfo().then(res => {
      console.log(res);
      if(res) {
        setDataLoaded(true);
      }
    });
  }, []);

  const renderConfirmLayout = () => {
    return (
        <View style={styles.bottomConfirmLayout}>
            {/* 固定在页面底部的按钮 */}
            <TouchableOpacity style={styles.button2} activeOpacity={0.9}  onPress={() => {
                store.saveAttachmentResume(params.filename, params.url).then(res => {
                  if(res.code !== 0) {
                    Alert.alert(res.message);
                    return;
                  }else {
                    navigation.replace('AttachmentResumePage');
                  }
                });
                
            }}>
                <Text style={styles.buttonText2}>确认并保存</Text>
            </TouchableOpacity>
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
          <Text style={styles.leftText}>{processFileName(params.filename)}</Text>

          {/** 添加按钮和搜索按钮 */}
          <View>
            <Ionicons style={styles.leftIcon} name={CommonLogo.Ionicons.share_social_outline} />
          </View>
        </View>


        <TitleBar/>
        </View>


        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages,filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}/>


            {params.confirm ? renderConfirmLayout() : null}

            
        </View>
        
      </View> 
    </>
    );
  }
)


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: CommonColor.transparentGreyBg
    },
    pdf: {
        flex:1,
        width:'99%',
        alignItems: 'center',
        height:Dimensions.get('window').height,
    },

    root: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
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
      fontSize: 13,
      fontWeight: '500',
      color: 'black',
    },
  
    rightContainer: {
      color: CommonColor.fontColor
    },
  
    leftIcon: {
      fontSize: 22,
      color: 'black',
      paddingLeft: 10
    },
  
    bottomConfirmLayout: {
        height: 80,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: CommonColor.chatBg,
        width: '100%'
    },

    button2: {
        backgroundColor: CommonColor.transparentMainColor2, // 按钮背景颜色
        width: Dimensions.get('window').width - 20,
        borderRadius: 10,
        padding: 12,
        alignItems: 'center', // 水平居中
        marginBottom: 20,
        marginTop: 10
      },
      buttonText2: {
        color: 'white', // 按钮文字颜色
        fontSize: 14,
        fontWeight: 'bold'
      },
  });