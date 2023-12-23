import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, TouchableHighlight } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TitleBar from './components/TitleBar';
import { Image } from 'react-native';
import { observer, useLocalStore } from 'mobx-react';
import { CommonColor } from '../../../common/CommonColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLogo } from '../../../common/CommonLogo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import file_logo from '../../../assets/icons/file-logo.png';
import AttachmentResumeStore from '../../../stores/AttachmentResumeStore';

import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
  } from 'react-native-document-picker'
import apis from '../../../apis/apis';
import MemberStore from '../../../stores/MemberStore';
import TtDivider from '../../../components/ttDivider';


export default observer(() => {


  const [result, setResult] 
    = React.useState<Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null>();

  const store = useLocalStore(() => new AttachmentResumeStore());

  const navigation = useNavigation<StackNavigationProp<any>>();


  const insets = useSafeAreaInsets();


  const [dataLoaded, setDataLoaded] = useState(false);

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
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

  const [modalVisible, setModalVisible] = useState(false);

  const [id, setId] = useState('');

  const handlePress = (id:string) => {
    setModalVisible(!modalVisible);
    setId(id);
  };

  const renderResumeList = () => {
    const styles = StyleSheet.create({
      container: {
        padding: 16,
        
      },
      itemList: {
        paddingTop: 4,
      },
      item: {
        borderBottomWidth: 1,
        borderColor: CommonColor.line,
        paddingVertical: 10
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
      filenameText: {
        fontSize: 15,
        color: CommonColor.fontColor,
        lineHeight: 20,
      },

      updateText: {
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
      },

      fileItemLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      fileItemLeftLayout: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      fileIcon: {
        width: 33,
        height: 33,
        marginHorizontal: 5,
      },

      modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: '25%',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 10,
        width: '80%',
      },
      menuButton: {
        color: CommonColor.fontColor,
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold'
      },

      deleteButton: {
        color: 'red',
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold'
      },

      cancelButton: {
        color: CommonColor.normalGrey,
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold'
      },


    });

      return (
        <View style={styles.container}>          
          <ScrollView style={styles.itemList}>
            {store.attachmentResumeList.map((item:AttachmentResume, index) => (
              <View style= {styles.item} key={index}>
                
                <View style={styles.fileItemLayout}>


                    <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.push("PdfViewPage", { "filename": item.filename, "url": item.url }) }} style={{alignItems: 'center'}}>
                        <View style={styles.fileItemLeftLayout}>
                            <View>
                                <Image style={styles.fileIcon} source={file_logo}/>
                            </View>
                            <View>
                                <Text style={styles.filenameText}>
                                    {item.filename}
                                </Text>
                                <Text style={styles.updateText}>
                                    {"更新于 "  + item.createdAt}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                    <View>
                      <TouchableOpacity onPress={() => { handlePress(item.id) }}>
                        <Ionicons style={styles.rightText} name={CommonLogo.Ionicons.three_dot_menu}/>
                      </TouchableOpacity>
                    </View>
                </View>

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                      <TouchableHighlight underlayColor="transparent" onPress={() => {console.log("重命名");}}>
                        <Text style={styles.menuButton}>重命名</Text>
                      </TouchableHighlight>

                      <TtDivider/>


                      <TouchableHighlight underlayColor="transparent" onPress={() => {console.log("发送至邮箱");}}>
                        <Text style={styles.menuButton}>发送至邮箱</Text>
                      </TouchableHighlight>

                      <TtDivider/>

                      <TouchableHighlight underlayColor="transparent" onPress={() => {
                        store.deleteAttachmentResume(item.id).then(res => {
                          if(res.code === 0) {
                            navigation.replace("");
                          }
                        })
                      }}>
                        <Text style={styles.deleteButton}>删除</Text>
                      </TouchableHighlight>
                      <TtDivider/>

                      
                      <TouchableHighlight underlayColor="transparent" 
                        onPress={() => { setModalVisible(!modalVisible);}} >
                        <Text style={styles.cancelButton}>取消</Text>
                      </TouchableHighlight>

                      
                    </View>
                  </View>
                </Modal>


              </View>
            ))}

<Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                      <TouchableHighlight underlayColor="transparent" onPress={() => {console.log("重命名");}}>
                        <Text style={styles.menuButton}>重命名</Text>
                      </TouchableHighlight>

                      <TtDivider/>


                      <TouchableHighlight underlayColor="transparent" onPress={() => {console.log("发送至邮箱");}}>
                        <Text style={styles.menuButton}>发送至邮箱</Text>
                      </TouchableHighlight>

                      <TtDivider/>

                      <TouchableHighlight underlayColor="transparent" onPress={() => {
                        store.deleteAttachmentResume(id).then(res => {
                          setModalVisible(!modalVisible);
                          store.requestOnlineResumeInfo();
                        })
                      }}>
                        <Text style={styles.deleteButton}>删除</Text>
                      </TouchableHighlight>
                      <TtDivider/>

                      
                      <TouchableHighlight underlayColor="transparent" 
                        onPress={() => { setModalVisible(!modalVisible);}} >
                        <Text style={styles.cancelButton}>取消</Text>
                      </TouchableHighlight>

                      
                    </View>
                  </View>
                </Modal>
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

          <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate('TabPage', {screen: 'MinePage'}) }}>
            <Ionicons style={styles.leftIcon} name={CommonLogo.Ionicons.arrow_back} />
          </TouchableOpacity>

          {/** 职位类型 */}
          <Text style={styles.leftText}>管理附件</Text>

          {/** 添加按钮和搜索按钮 */}
          <View>
            <Ionicons style={styles.leftIcon} name={CommonLogo.Ionicons.help_tips} />
          </View>
        </View>


        <TitleBar/>
        </View>


        {dataLoaded ? (

            <ScrollView style={styles.container}>


              {/** 渲染工作经历 */}
              {renderResumeList()}

            </ScrollView>



        ) : (<Text>加载中</Text>)}




        <View>
            {
              store.attachmentResumeList.length >= 3 ? null : (
                <>
                  {/* 固定在页面底部的按钮 */}
                  <TouchableOpacity style={styles.button1} activeOpacity={0.9}  onPress={async () => {
                      try {
                        const pickerResult = await DocumentPicker.pickSingle({
                          presentationStyle: 'fullScreen',
                          copyTo: 'cachesDirectory',
                        })

                        console.log("pickerResult", pickerResult);
                        setResult([pickerResult])

                        await MemberStore.uploadAvatar(apis.fileUpload.url, pickerResult.fileCopyUri!, pickerResult.name!, pickerResult.type!, (data:any) => {
                          // 跳转到PDF预览页面

                          console.log("上传的文件信息:", pickerResult.name);
                          navigation.push("PdfViewPage", { "filename": data.originalFilename, "url": data.url, confirm: true })
                        });
              
                      } catch (e) {
                        handleError(e)
                      }
                  }}>
                      <Text style={styles.buttonText1}>上传简历</Text>
                  </TouchableOpacity>
                
                </>
              )
            }

            {/* 固定在页面底部的按钮 */}
            <TouchableOpacity style={styles.button2} activeOpacity={0.9}  onPress={() => {}}>
                <Text style={styles.buttonText2}>制作新简历（超多模板）</Text>
            </TouchableOpacity>
        </View>

        
      </View> 
    </>
    );
  }
)


const styles = StyleSheet.create({

    button1: {
        backgroundColor: CommonColor.tagBg, // 按钮背景颜色
        width: Dimensions.get('window').width - 20,
        borderRadius: 10,
        padding: 12,
        alignItems: 'center', // 水平居中
        marginBottom: 10
      },
      buttonText1: {
        color: CommonColor.deepGrey, // 按钮文字颜色
        fontSize: 14,
        fontWeight: 'bold'
      },

      button2: {
        backgroundColor: CommonColor.transparentMainColor2, // 按钮背景颜色
        width: Dimensions.get('window').width - 20,
        borderRadius: 10,
        padding: 12,
        alignItems: 'center', // 水平居中
        marginBottom: 40
      },
      buttonText2: {
        color: 'white', // 按钮文字颜色
        fontSize: 14,
        fontWeight: 'bold'
      },


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
      fontSize: 22,
      color: 'black',
      paddingLeft: 10
    },
  
  });