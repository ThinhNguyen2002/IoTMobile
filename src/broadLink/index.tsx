import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import * as broadLink from '../broadLinkModule/index';

const BroadLinkComponent = () => {
  useEffect(() => {
    console.log('Broadlink', broadLink);
    broadLink.discover().then(devices => console.log(devices));
  }, []);

  return (
    <View>
      <Text>BroadLinkComponent</Text>
    </View>
  );
};

export default BroadLinkComponent;
