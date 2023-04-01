import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapBroadLink: {
    marginTop: 20,
    flex: 1,
  },
  wrapSetup: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#33FF99',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 40,
    borderRadius: 10,
    borderColor: '#555555',
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
  },
  scrollView: {
    height: 200,
    marginBottom: 80,
  },
  wrapDevices: {
    marginBottom: 20,
    backgroundColor: '#CCCCCC',
    padding: 20,
  },
  wrapLearning: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
