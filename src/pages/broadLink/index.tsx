import {
  View,
  Text,
  Pressable as PressBtn,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import * as broadLink from '../../helpers/broadLinkModule';
import {styles} from './styles';
import Device from '../../helpers/broadLinkModule/device';

const BroadLinkComponent = () => {
  const [mySsId, setMySsId] = useState('');
  const [myNetWorkPass, setMyNetWorkPass] = useState('');
  const [dataFrequencies, setDataFrequencies] = useState('');
  const [listDevices, setListDevices] = useState<Device[]>();

  const handleDiscover = useCallback(async () => {
    const device = await broadLink.discover();
    console.log('List devices', device);
    setListDevices(device);
  }, []);

  const handleSetup = useCallback(async () => {
    broadLink.setup(mySsId, myNetWorkPass, 3);
  }, [myNetWorkPass, mySsId]);

  const handleAuth = useCallback(async () => {
    if (listDevices && listDevices.length > 0) {
      await listDevices[0].auth();
      Alert.alert('Authenticated');
    } else {
      Alert.alert('Unable to authenticate because there is no device');
    }
  }, [listDevices]);

  const handleLearning = useCallback(async () => {
    if (listDevices && listDevices.length > 0) {
      const rmminiDevice = listDevices[0] as broadLink.Rmmini;
      await rmminiDevice.enterLearning();
      Alert.alert('Enter Learning');
    } else {
      Alert.alert('Unable to learning because there is no device');
    }
  }, [listDevices]);

  const handleSweep = useCallback(async () => {
    if (listDevices && listDevices.length > 0) {
      const rmproDevice = listDevices[0] as broadLink.Rmpro;
      const responseRaw = await rmproDevice.sweepFrequency();
      setDataFrequencies(JSON.stringify(responseRaw));
    } else {
      Alert.alert('Unable to sweep because there is no device');
    }
  }, [listDevices]);

  const handleCancelSweep = useCallback(async () => {
    if (listDevices && listDevices.length > 0) {
      const rmproDevice = listDevices[0] as broadLink.Rmpro;
      const responseRaw = await rmproDevice.cancelSweepFrequency();
      setDataFrequencies(JSON.stringify(responseRaw));
    } else {
      Alert.alert('Unable to sweep because there is no device');
    }
  }, [listDevices]);

  return (
    <ScrollView
      style={styles.wrapBroadLink}
      showsVerticalScrollIndicator={false}>
      <View style={styles.wrapSetup}>
        <TextInput
          style={styles.input}
          onChangeText={setMySsId}
          value={mySsId}
          placeholder="My SS ID"
        />
        <TextInput
          style={styles.input}
          onChangeText={setMyNetWorkPass}
          value={myNetWorkPass}
          placeholder="My net work pass"
        />
        <PressBtn style={styles.btn} onPress={handleSetup}>
          <Text>Setup broadLink</Text>
        </PressBtn>
      </View>
      <View>
        <PressBtn style={styles.btn} onPress={handleDiscover}>
          <Text>Discover</Text>
        </PressBtn>
        <Text style={styles.title}>List Devices: {listDevices?.length}</Text>
        <View style={styles.wrapDevices}>
          {listDevices && listDevices.length > 0 ? (
            <Text>{JSON.stringify(listDevices)}</Text>
          ) : (
            <Text> No Devices</Text>
          )}
        </View>
      </View>
      <View>
        <PressBtn style={styles.btn} onPress={handleAuth}>
          <Text>Auth Devices</Text>
        </PressBtn>
      </View>
      <PressBtn style={styles.btn} onPress={handleLearning}>
        <Text>Enter Learning</Text>
      </PressBtn>
      <Text style={styles.title}>Sweep RF frequencies</Text>
      <View style={styles.wrapLearning}>
        <PressBtn style={styles.btn} onPress={handleSweep}>
          <Text>Start Sweep</Text>
        </PressBtn>
        <PressBtn style={styles.btn} onPress={handleCancelSweep}>
          <Text>Cancel Sweep</Text>
        </PressBtn>
      </View>
      <View style={styles.wrapDevices}>
        {dataFrequencies ? (
          <Text>{dataFrequencies}</Text>
        ) : (
          <Text> No Data</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default BroadLinkComponent;
