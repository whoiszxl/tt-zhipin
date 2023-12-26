import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, TouchableHighlight } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { observer, useLocalStore } from 'mobx-react';
import { CommonColor } from '../../../common/CommonColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLogo } from '../../../common/CommonLogo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import file_logo from '../../../assets/icons/file-logo.png';
import AttachmentResumeStore from '../../../stores/AttachmentResumeStore';

import TtDivider from '../../../components/ttDivider';

import become_boss_png from '../../../assets/images/become-boss.png';


export default observer(() => {


  const store = useLocalStore(() => new AttachmentResumeStore());

  const navigation = useNavigation<StackNavigationProp<any>>();

  const { params } = useRoute<any>();


  const [dataLoaded, setDataLoaded] = useState(false);
  
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


        <Image style={styles.becomeBossImg} source={become_boss_png}/>

        <Text style={styles.tips}>{"你当前的身份是" + (params.is_toutou === 1 ? '“头头”' : '“打工仔”')}</Text>

        <TouchableOpacity style={styles.button2} activeOpacity={0.9}  onPress={() => {
            // 如果是打工仔页面跳转过来的
            if(params.page === 'MinePage') {
                // 判断用户是打工仔身份需要调用成为头头的接口后再跳转到头头页面
                if(params.is_toutou === 0) {
                    // TODO 调用接口
                }
                navigation.navigate('ToutouTabPage');
            }else {
                navigation.navigate('TabPage');
            }
            



        }}>
            <Text style={styles.buttonText2}>{"切换为" + (params.is_toutou === 0 ? '“头头”' : '“打工仔”') + "身份"}</Text>
        </TouchableOpacity>

        
      </View> 
    </>
    );
  }
)


const styles = StyleSheet.create({

    tips: {
        color: CommonColor.fontColor,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },

    becomeBossImg: {
        width: 300,
        height: 200,
        marginTop: 100
    },

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
        marginTop: 100
      },
      buttonText2: {
        color: 'white', // 按钮文字颜色
        fontSize: 14,
        fontWeight: 'bold'
      },


    root: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center'
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