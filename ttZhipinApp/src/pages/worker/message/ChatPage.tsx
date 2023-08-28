import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send, IMessage, InputToolbar } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CommonColor } from '../../../common/CommonColor';
import ChatTopMenu from './components/ChatTopMenu';
import { useRoute } from '@react-navigation/native';


export default function ChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { params } = useRoute<any>();

  useEffect(() => {
    console.log(params.name + " " + params.jobTitle);
    setMessages([
      {
        _id: 1,
        text: '您好，我是负责蜀地招聘的顾问姜维.我们正在寻访武将谋士，薪资open(一级将领可谈)，另有每月20-70两黄金的奖金，多地可选、多岗位招聘，看了您的简历觉得很匹配，方便详聊吗?',
        createdAt: new Date(),
        user: {
          _id: 2,
          avatar: 'https://tt-zhipin-oss.oss-cn-shenzhen.aliyuncs.com/image/default2.png',
        },
      },
    ])
  }, []);
  const onSend = useCallback((msg: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "#FFF",
            fontSize: 12
          },

          left: {
            color: 'black',
            fontSize: 11
          }
        }}

        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
          },
          right: {
            backgroundColor: CommonColor.mainColor,
            paddingVertical: 1,
            paddingHorizontal: 4
          },
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send
        {...props}
        alwaysShowSend={true}
      >
        <View style={styles.sendBtn}>
          <Text style={{ color: '#ffffff', fontSize: 14 }}>发送</Text>
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props:any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ borderTopWidth: 0}}
      />
    );
  };

  

  const renderTime = () => null;

  return (
    <>
    <SafeAreaView style={styles.mainContent}>
      <ChatTopMenu name={params.name} jobTitle={params.jobTitle} />

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        showUserAvatar={true}
        locale={'zh-cn'}
        showAvatarForEveryMessage={true}
        renderBubble={renderBubble}
        placeholder={'开始聊天吧'}
        renderSend={renderSend}
        inverted={true}
        renderUsernameOnMessage={true}
        renderTime={renderTime}
        renderUsername={renderTime}
        renderInputToolbar={renderInputToolbar}
        user={{
          _id: 50,
          name: '邓艾',
          avatar: 'https://tt-zhipin-oss.oss-cn-shenzhen.aliyuncs.com/image/default3.png',
        }}
        alignTop={true}
      />
    </SafeAreaView>

    </>
  );
}
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: CommonColor.tagBg,
  },
  sendBtn: {
    width: 63,
    height: 32,
    borderRadius: 3,
    backgroundColor: CommonColor.normalBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  }
});