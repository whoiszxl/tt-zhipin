import { StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeStore from '../../../stores/HomeStore';
import { useLocalStore, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonColor } from '../../../common/CommonColor';
import DetailTitleBar from './components/DetailTitleBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default observer(() => {

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.9;

  const insets = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<any>>();

  const store = useLocalStore(() => new HomeStore());

  const [index, setIndex] = useState<number>(0);

  const { params } = useRoute<any>();


  const [jobEntity, setJobEntity] = useState<JobEntity>();
  const [memberInfo, setMemberInfo] = useState<string>();

  const [dataLoaded, setDataLoaded] = useState(false);



  const [longText, setLongText] = useState<string>('');


  const maxCharsToShow = 500;

  const [showFullText, setShowFullText] = useState(false);

  const textToShow = showFullText ? longText : longText.slice(0, maxCharsToShow);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onJobRefresh = () => {
    store.resetPage();
    store.requestLatestTest();
  };

  const loadData = () => {
    store.requestDetail2(params.id, (data) => {
      if (data) {
        setJobEntity(data);
        setMemberInfo(data.memberInfo);
        setLongText(data.jobDescription);
        setDataLoaded(true);
      }
    });
  };

  const renderFastJobLabel = () => {
    const styles = StyleSheet.create({
      root: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 8,
        justifyContent: 'flex-start',
        height: 70,
        zIndex: 10
      },

      backgroundImage: {
        width: '100%', // 图片宽度占满父容器
        height: '100%', // 图片高度占满父容器
        borderRadius: 5, // 设置圆角
      },

      mainTitle: {
        color: 'white',
        fontSize: 13,
        alignItems: 'center'
      },

      subTitle: {
        color: 'white',
        fontSize: 10,
        alignItems: 'center'
      },
    });

    return (

      <ImageBackground style={styles.root} imageStyle={styles.backgroundImage} source={require('../../../assets/images/mine_bg4.jpg')} resizeMode='cover'>

        <View style={{ paddingLeft: 10, paddingBottom: 15 }}>
          <Icon name='flash' size={25} color={'white'} />
        </View>

        <View style={{ paddingLeft: 10, paddingBottom: 15 }}>
          <Text style={styles.mainTitle}>该职位为急聘职位</Text>
          <Text style={styles.subTitle}>你可以点击下方的一键投递直接发送简历</Text>
        </View>

      </ImageBackground>

    );
  }

  const renderHRLabel = () => {
    const styles = StyleSheet.create({
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
        width: 38,
        height: 38,
        resizeMode: 'cover',
        borderRadius: 100
      },

      fourLineHRText: {
        color: CommonColor.fontColor,
        fontSize: 12,
        paddingLeft: 10,
        fontWeight: 'bold'
      },

      fourLineHRReplyText: {
        color: CommonColor.normalGrey,
        fontSize: 10,
        paddingLeft: 10
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
      fourLineTips: {
        fontSize: 10,
        color: CommonColor.deepGrey
      }
    });
    const parsedMemberInfo = memberInfo ? JSON.parse(memberInfo) : null;

    return (

      <>
        {/* HR信息与地址信息 */}
        <View style={styles.fourLine}>

          <View style={styles.fourLineHR}>
            {/* 头像 */}
            <Image style={styles.fourLineHRAvatar} source={{ uri: parsedMemberInfo.avatar }} />

            <View style={{ flexDirection: 'column' }}>
              {/* HR信息 */}
              <Text style={styles.fourLineHRText}>{parsedMemberInfo.name + " · " + parsedMemberInfo.jobTitle}</Text>
              <Text style={styles.fourLineHRReplyText}>3分钟前回复</Text>
            </View>

          </View>

          <View>
            <Text style={styles.fourLineTips}>{'更多相似职位 >'}</Text>
          </View>

        </View>
      </>

    );
  }

  const renderJobDetailLabel = () => {
    const styles = StyleSheet.create({
      root: {
        flexDirection: 'column',
        paddingTop: 12,
        paddingBottom: 6
      },

      title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: CommonColor.fontColor
      },

      tags: {
        flexDirection: 'row',
        paddingTop: 10
      },

      tagText: {
        fontSize: 10,
        color: CommonColor.deepGrey,
        paddingHorizontal: 6,
        paddingVertical: 3,
        backgroundColor: CommonColor.tagBg,
        marginRight: 10,
        borderRadius: 3
      },

      descs: {
        paddingTop: 10,
        color: '#616161',
        fontSize: 12,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
      },

      toggleButton: {
        fontSize: 13,
        color: CommonColor.mainColor,
        paddingLeft: 5,
        paddingTop: 3
      }
    });

    const jobTags = jobEntity?.jobTags ? JSON.parse(jobEntity?.jobTags) : null;
    return (

      <>
        {/* 职位详情 */}
        <View style={styles.root}>

          <Text style={styles.title}>职位详情</Text>

          <View style={styles.tags}>
            {jobTags.map((item: any, index: any) => (
              <Text style={styles.tagText} key={index}>{item}</Text>
            ))}
          </View>

          <View>
            <Text style={styles.descs}>
              {textToShow}
              <TouchableOpacity>
                {longText.length > maxCharsToShow && (
                  <Text style={styles.toggleButton} onPress={toggleShowFullText} >{showFullText ? '收起' : '查看全部'}</Text>
                )}
              </TouchableOpacity>
            </Text>

          </View>

        </View>
      </>

    );
  }

  const renderCompanyLabel = () => {
    const styles = StyleSheet.create({
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
        width: 38,
        height: 38,
        resizeMode: 'cover',
        borderRadius: 100
      },

      fourLineHRText: {
        color: CommonColor.fontColor,
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: 'bold'
      },

      fourLineHRReplyText: {
        color: CommonColor.deepGrey,
        fontSize: 11,
        paddingLeft: 10,
        paddingTop: 3
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
      fourLineTips: {
        fontSize: 10,
        color: CommonColor.deepGrey
      }
    });
    const parsedMemberInfo = memberInfo ? JSON.parse(memberInfo) : null;

    return (

      <>
        {/* HR信息与地址信息 */}
        <View style={styles.fourLine}>

          <View style={styles.fourLineHR}>
            {/* 头像 */}
            <Image style={styles.fourLineHRAvatar} source={{ uri: jobEntity?.companyResponse.companyLogo }} />

            <View style={{ flexDirection: 'column' }}>
              {/* HR信息 */}
              <Text style={styles.fourLineHRText}>{jobEntity?.companyResponse.companyFullName}</Text>
              <Text style={styles.fourLineHRReplyText}>
                {
                  jobEntity?.companyResponse.financingStage
                  + "·" +
                  jobEntity?.companyResponse.companyScale
                  + "·" +
                  jobEntity?.companyResponse.industry
                }

              </Text>
            </View>

          </View>

          <View>
            <Icon name="chevron-forward-outline" size={16} />
          </View>

        </View>
      </>

    );
  }


  const renderMapLabel = () => {
    const styles = StyleSheet.create({
      fourLine: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
      },

      fourLineHR: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      fourLineHRAvatar: {
        width: 38,
        height: 38,
        resizeMode: 'cover',
        borderRadius: 100
      },

      fourLineHRText: {
        color: CommonColor.fontColor,
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: 'bold'
      },

      fourLineHRReplyText: {
        color: CommonColor.deepGrey,
        fontSize: 11,
        paddingLeft: 10,
        paddingTop: 3
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
      fourLineTips: {
        fontSize: 10,
        color: CommonColor.deepGrey
      },
      map: {
        flex: 1,
      },
    });

    return (

      <>
        {/* HR信息与地址信息 */}
        <View style={styles.fourLine}>
          <Image style={{ height: 200, width: '100%', borderRadius: 5 }} resizeMode='cover' source={{ uri: jobEntity?.locationImg }} />
        </View>
      </>

    );
  }

  const renderAnayLabel = () => {
    const styles = StyleSheet.create({
      root: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
      },
      lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 8,
        marginTop: 4
      },
      segment: {
        flex: 1,
        height: '100%'
      },

      lineTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
        alignContent: 'center'
      },

      lineLabel: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        width: '25%' 
      },

      lineLabelText: {
        fontSize: 11
      }
    });

    return (

      <>
        <View>
          <View style={styles.root}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: CommonColor.fontColor, fontSize: 14, fontWeight: 'bold' }}>你的竞争力分析</Text>
            </View>
            <Text style={{ color: CommonColor.deepGrey, fontSize: 12 }}>{'查看详细分析 >'}</Text>
          </View>

          <Text style={{ fontSize: 12, color: CommonColor.deepGrey }}>三个月内共 10 位打工仔沟通，你超过了 30% 的打工仔，优秀打工仔通常会 xx，建议你可以 xx</Text>
          <Text style={{ fontSize: 11, color: CommonColor.fontColor, fontWeight: 'bold', paddingTop: 5 }}>你与职位匹配情况</Text>

          <View style={styles.lineContainer}>
            <View style={[styles.segment, { backgroundColor: 'rgba(66, 133, 244, 0.7)', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }]} />
            <View style={[styles.segment, { backgroundColor: 'rgba(66, 133, 244, 0.75)', marginLeft: 1 }]} />
            <View style={[styles.segment, { backgroundColor: 'rgba(66, 133, 244, 0.8)', marginLeft: 1 }]} />
            <View style={[styles.segment, { backgroundColor: 'rgba(66, 133, 244, 0.85)', marginLeft: 1, borderTopRightRadius: 5, borderBottomRightRadius: 5 }]} />
          </View>

          <View style={styles.lineTextContainer}>
            <View style={styles.lineLabel}>
              <Text style={styles.lineLabelText}>一般</Text>
            </View>
            <View style={styles.lineLabel}>
              <Text style={styles.lineLabelText}>良好</Text>
            </View>
            <View style={styles.lineLabel}>
              <Text style={styles.lineLabelText}>优秀</Text>
            </View>
            <View style={styles.lineLabel}>
              <Text style={styles.lineLabelText}>极好</Text>
            </View>
          </View>
        </View>

      </>

    );
  }

  const renderSafeTipsLabel = () => {
    const styles = StyleSheet.create({
      root: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
      },
      lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 8,
        marginTop: 4
      },
      segment: {
        flex: 1,
        height: '100%'
      },

      lineTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
        alignContent: 'center'
      },

      lineLabel: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        width: '25%' 
      },

      lineLabelText: {
        fontSize: 11
      }
    });

    return (

      <>
        <View>
          <View style={styles.root}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name="Safety" color={CommonColor.mainColor} size={16}/>

              <Text style={{ color: CommonColor.fontColor, fontSize: 14, fontWeight: 'bold', paddingLeft: 4 }}>TT安全提示</Text>
            </View>
          </View>

          <Text style={{ fontSize: 12, color: CommonColor.deepGrey }}>
          TT直聘严禁用人单位和招聘者用户做出任何损害求职者合法权益的违法违规行为，包括但不限于扣押求职者证件、收取求职者财物、向求职者集资、让求职者入股、诱导求职者异地入职、异地参加培训、违法违规使用求职者简历等，您一旦发现此类行为，请立即举报。
          </Text>

          <Text style={{ fontSize: 12, color: CommonColor.mainColor }}>
            {'了解更多打工安全防范知识 >'}
          </Text>
        </View>

      </>

    );
  }

  const parsedMemberInfo = memberInfo ? JSON.parse(memberInfo) : null;

  return (

    <View style={styles.root}>

      {dataLoaded ? (
        <>
          <View style={[{ paddingTop: insets.top, height: insets.top + 90 }]}>

            {/** 顶部标题栏 */}
            <View style={styles.topTitle}>

              {/** 职位类型 */}
              <TouchableOpacity style={styles.leftText} onPress={() => { navigation.goBack() }}>
                <Icon name='chevron-back-outline' size={22} color={CommonColor.fontColor} />
              </TouchableOpacity>

              {/** 添加按钮和搜索按钮 */}
              <View style={styles.rightContainer}>
                <TouchableOpacity activeOpacity={1}>
                  <AntDesign style={styles.rightIcon} name="staro" />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1}>
                  <Icon style={styles.rightIcon} name="share-outline" />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1}>
                  <AntDesign style={styles.rightIcon} name="ellipsis1" />
                </TouchableOpacity>
              </View>
            </View>

            <DetailTitleBar />

          </View>

          <ScrollView style={{ width: '100%', flexDirection: 'column' }}>
            <View style={styles.content}>

              {/* 急聘职位label */}
              {renderFastJobLabel()}

              {/* HR信息 */}
              {renderHRLabel()}

              {/* 分割线 */}
              <View style={{ height: 0.5, backgroundColor: CommonColor.tagBg, marginTop: 15 }} />

              {/* 职位详情 */}
              {renderJobDetailLabel()}

              {/* 分割线 */}
              <View style={{ height: 0.5, backgroundColor: CommonColor.tagBg, marginTop: 15, marginBottom: 10 }} />

              {/* 公司信息 */}
              {renderCompanyLabel()}

              {/* 公司地图 */}
              {renderMapLabel()}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={12} style={{ paddingRight: 2, color: CommonColor.normalGrey }} name='home' />
                  <Text style={{ color: CommonColor.fontColor, fontSize: 12 }}>距离我的住址 345 米</Text>
                </View>
                <Text style={{ color: CommonColor.mainColor, fontSize: 12 }}>去修改</Text>
              </View>

              {/* 分割线 */}
              <View style={{ height: 0.5, backgroundColor: CommonColor.tagBg, marginTop: 10, marginBottom: 20 }} />



              {/* 竞争力分析 */}
              {renderAnayLabel()}

              {/* 分割线 */}
              <View style={{ height: 0.5, backgroundColor: CommonColor.tagBg, marginTop: 20, marginBottom: 20 }} />

              {/* 安全提示 */}
              {renderSafeTipsLabel()}

            </View>

          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={1} style={[styles.button, { width: buttonWidth }]} onPress={() => {
                //跳转到职位详情页
                navigation.push('ChatPage', {
                  memberId: store.memberInfo.memberId,
                  avatar: parsedMemberInfo.avatar, 
                  name: parsedMemberInfo.name, 
                  jobTitle: parsedMemberInfo.jobTitle
                });
            }}>
              <Text style={styles.buttonText}>立即沟通</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>加载中</Text>
      )}

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
    fontSize: 20,
    color: 'black',
    paddingLeft: 10
  },

  container: {
    paddingTop: 6
  },

  content: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 80
  },


  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 5,
    borderTopColor: CommonColor.tagBg,
    borderTopWidth: 0.5,
    backgroundColor: 'white', // 背景色可以根据需要调整
  },
  button: {
    backgroundColor: CommonColor.transparentMainColor2, // 按钮颜色
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText: {
    color: 'white', // 按钮文字颜色
    fontSize: 16,
  },

});