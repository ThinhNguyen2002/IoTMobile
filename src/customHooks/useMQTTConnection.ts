import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import {OptionsConnectType} from '../pages/mptt/type';
import {MQTTStatus} from './type';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

export const useMQTTConnectionInstance = (options: OptionsConnectType) => {
  const [clientInstance, setClientInstance] = useState<any>();
  const [status, setStatus] = useState('');

  useEffect(() => {
    setClientInstance(
      new Paho.MQTT.Client(options.host, options.port, options.path),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (clientInstance) {
      clientInstance.onConnectionLost = onConnectionLost;
      clientInstance.onMessageArrived = onMessageArrived;
    }
  }, [clientInstance]);

  const onConnectionLost = (responseObject: any) => {
    if (responseObject.errorCode !== 0) {
      Alert.alert(`onConnectionLost ------- ${responseObject.errorMessage}`);
    }
  };

  const onMessageArrived = (message: any) => {
    console.log('onMessageArrived:', typeof message, String(message));
    Alert.alert(`
      Arrived: ${message.payloadString}
    `);
  };

  const onConnect = () => {
    Alert.alert('connected');
    setStatus(MQTTStatus.Connected);
  };

  const onFailure = (err: any) => {
    Alert.alert(`Connect failed! ------- ${err}`);
    setStatus(MQTTStatus.Failed);
  };

  const connect = () => {
    clientInstance.connect({
      onSuccess: onConnect,
      useSSL: false,
      timeout: 3,
      onFailure: onFailure,
    });
  };

  const disconnect = () => {
    if (clientInstance && status === MQTTStatus.Connected) {
      clientInstance && clientInstance.disconnect();
      setStatus(MQTTStatus.Disconnect);
      Alert.alert('disconnect');
    }
  };

  const subscribeTopic = (topic: string) => {
    clientInstance.subscribe(topic, {qos: 0});
    Alert.alert(`subscribeTopic ${topic}`);
  };

  const unsubscribeTopic = (topic: string) => {
    clientInstance.unsubscribe(topic, {qos: 0});
    Alert.alert(`unsubscribe ${topic}`);
  };

  const sendMessage = (messageText: string, subscribedTopic: string) => {
    const message = new Paho.MQTT.Message(options.id + ':' + messageText);
    message.destinationName = subscribedTopic;
    clientInstance.send(message);
  };

  return {
    clientInstance,
    connect,
    status,
    disconnect,
    subscribeTopic,
    unsubscribeTopic,
    sendMessage,
  };
};
