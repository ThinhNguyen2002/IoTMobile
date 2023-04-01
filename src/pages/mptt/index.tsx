import {View, Text, Pressable as PressBtn, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useMQTTConnectionInstance} from '../../customHooks/useMQTTConnection';
import {MQTTStatus} from '../../customHooks/type';

const MQTTConnection = () => {
  const options = {
    host: 'broker.mqttdashboard.com',
    port: 8000,
    path: '/testTopic',
    id: 'client-iot',
  };
  const [topicName, setTopicName] = useState('');
  const [messageText, setMessageText] = useState('');

  const {connect, disconnect, subscribeTopic, sendMessage, status} =
    useMQTTConnectionInstance(options);

  useEffect(() => {
    return () => {
      console.log('UNMOUNT');
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrap}>
      <Text>Host: {options.host}</Text>
      <Text>Path: {options.path}</Text>
      <Text>ClientID: {options.id}</Text>
      {status !== MQTTStatus.Connected && (
        <PressBtn onPress={connect} style={styles.btn}>
          <Text>CONNECT</Text>
        </PressBtn>
      )}
      {status === MQTTStatus.Connected && (
        <PressBtn
          onPress={() => {
            disconnect();
            setTopicName('');
          }}
          style={styles.btn}>
          <Text>DISCONNECT</Text>
        </PressBtn>
      )}
      {status === MQTTStatus.Connected && (
        <>
          <TextInput
            style={styles.input}
            onChangeText={setTopicName}
            value={topicName}
            placeholder="Subscribe Topic Name"
          />
          <PressBtn
            onPress={() => subscribeTopic(topicName)}
            style={styles.btn}>
            <Text>Subscribe Topic</Text>
          </PressBtn>
        </>
      )}
      {topicName && (
        <>
          <TextInput
            style={styles.input}
            onChangeText={setMessageText}
            value={messageText}
            placeholder="Message Text"
          />
          <PressBtn
            onPress={() => {
              sendMessage(messageText, topicName);
              setMessageText('');
            }}
            style={styles.btn}>
            <Text>Send Message</Text>
          </PressBtn>
        </>
      )}
    </View>
  );
};

export default MQTTConnection;
