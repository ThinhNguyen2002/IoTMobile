import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable as PressBtn} from 'react-native';
import BroadLinkComponent from './src/pages/broadLink';
import MQTTConnection from './src/pages/mptt';

const App = () => {
  const [viewItem, setViewItem] = useState('BROAD_LINK');
  return (
    <View style={styles.wrapApp}>
      <View style={styles.wrapAction}>
        <PressBtn
          onPress={() => setViewItem('BROAD_LINK')}
          style={[
            styles.btn,
            viewItem !== 'BROAD_LINK' && styles.inactiveItem,
          ]}>
          <Text style={styles.textBtn}>BroadLink</Text>
        </PressBtn>
        <PressBtn
          onPress={() => setViewItem('MQTT')}
          style={[
            styles.btn,
            viewItem === 'BROAD_LINK' && styles.inactiveItem,
          ]}>
          <Text style={styles.textBtn}>MQTT</Text>
        </PressBtn>
      </View>
      {viewItem === 'BROAD_LINK' ? <BroadLinkComponent /> : <MQTTConnection />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapApp: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  wrapAction: {
    flexDirection: 'row',
    margin: 15,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#33FF99',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textBtn: {
    color: 'black',
  },
  inactiveItem: {
    opacity: 1,
    backgroundColor: '#AAAAAA',
  },
});
