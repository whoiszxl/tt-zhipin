import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send, IMessage, InputToolbar } from 'react-native-gifted-chat';
// 引入中文语言包
import 'dayjs/locale/zh-cn';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CommonColor } from '../../../common/CommonColor';
import ChatTopMenu from './components/ChatTopMenu';
import { useRoute } from '@react-navigation/native';
import WebSocketUtil from '../../../utils/WebSocketUtil';
import DatabaseHelper from '../../../utils/DatabaseHelper';
import command from '../../../common/Command';
import ChatWebSocket from '../../../stores/ChatWebSocket';
import StorageUtil from '../../../utils/StorageUtil';
import { CommonConstant } from '../../../common/CommonConstant';


export default function ChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { params } = useRoute<any>();

  const [currentId, setCurrentId] = useState<number>(0);
  const [currentAvatar, setCurrentAvatar] = useState<string>('');


  useEffect(() => {
    StorageUtil.getItem(CommonConstant.MEMBER_INFO).then(data => {
      console.log("获取到当前用户信息:", data);
      
      if(data !== null) {
        const memberInfo = JSON.parse(data);
        setCurrentId(memberInfo.id);
        console.log(memberInfo.id);
        setCurrentAvatar(memberInfo.avatar);


        //初次进入界面，获取全量聊天记录   TODO 增量拉取聊天记录待优化
    DatabaseHelper.initializeDatabase('im.db')
    .then(() => {
      console.log('Database initialized');
    })
    .catch((error) => {
      console.error('Error initializing database:', error);
    });

    //初始化私聊消息表
    DatabaseHelper.executeQuery("CREATE TABLE IF NOT EXISTS im_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_member_id INTEGER, from_member_id INTEGER, to_member_id INTEGER, body TEXT);")
    .then(() => {
      console.log('Table initialized');
    })
    .catch((error) => {
      console.error('Error initializing Table:', error);
    });

    WebSocketUtil.addListener('chatMessage', handleMessage);
    WebSocketUtil.addListener('close', handleClose);

    //加载本地数据库消息到UI中
    DatabaseHelper.executeSQL('SELECT * FROM im_messages where owner_member_id = ' + params.memberId + ' order by id desc')
      .then((data) => {
        var messageList: IMessage[] = [];
        data.forEach(e => {
          const obj = JSON.parse(e.body);
          var newMessage: IMessage = {
            _id: Math.round(Math.random() * 1000000),
            text: obj.data.body,
            createdAt: new Date(),
            user: {
              _id: obj.data.fromMemberId,
              avatar: obj.data.fromMemberId.toString() === memberInfo.id.toString() ? memberInfo.avatar : params.avatar,
            },
          };

          messageList.push(newMessage);
        });
        setMessages(previousMessages => GiftedChat.append(previousMessages, messageList))
    })
    .catch((error) => {
      console.error('Error initializing Table:', error);
    });


      }
        
    });

    
  }, []);

  const handleClose = () => {
  }

  const handleMessage = (message: any) => {
    const chat: PrivateChatMessage = JSON.parse(message);
    console.log("接收到的消息:", chat);

    if (chat.command === command.MessageCommand.PRIVATE_CHAT) {
      //接收到其他人发送过来的消息，添加到message中
      var newMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: chat.data.body,
        createdAt: new Date(),
        user: {
          _id: 1,
          avatar: params.avatar,
        },
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      return;
    }

    //接收到自己发送消息的ack，将ack消息存到数据库中
    if(chat.command === command.MessageCommand.PRIVATE_CHAT_ACK) {
      return;
    }


  }

  const onSend = useCallback((msg: IMessage[] = []) => {
    ChatWebSocket.sendPrivateChatMessage(msg[0].text, params.memberId);
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "#FFF",
            fontSize: 11
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
          _id: 4,
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
    backgroundColor: CommonColor.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  }
});