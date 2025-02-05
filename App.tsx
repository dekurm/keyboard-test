/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {
  AndroidSoftInputModes,
  KeyboardController,
  KeyboardProvider,
  useGenericKeyboardHandler,
} from 'react-native-keyboard-controller';
import {SystemBars} from 'react-native-edge-to-edge';
import {runOnJS} from 'react-native-reanimated';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{}>;

function Section({children}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = React.useState<{
    name: string;
    keyboardHeight: number;
  } | null>(null);

  useGenericKeyboardHandler({
    onStart: event => {
      'worklet';

      runOnJS(setData)({
        name: 'onStart',
        keyboardHeight: event.height,
      });
    },
    // onMove: () => {
    //   'worklet';

    //   setData({
    //     name: 'onMove',
    //     keyboardHeight: event.height,
    //   });
    // },
    onEnd: event => {
      'worklet';

      runOnJS(setData)({
        name: 'onEnd',
        keyboardHeight: event.height,
      });
    },
    onInteractive: event => {
      'worklet';

      runOnJS(setData)({
        name: 'onInteractive',
        keyboardHeight: event.height,
      });
    },
  });

  return (
    <View style={styles.sectionContainer}>
      <Text>{JSON.stringify(data)}</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter text to see the keyboard events"
      />
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      // KeyboardController.setInputMode(
      //   AndroidSoftInputModes.SOFT_INPUT_ADJUST_NOTHING,
      // );
      // return () => {
      //   KeyboardController.setInputMode(
      //     AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
      //   );
      // };
    }
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <SystemBars style={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section>Enter text to see the keyboard events</Section>
      </View>
      <View
        style={{
          height: 100,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'red',
        }}>
        <Text>Bottom 0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
  },
});

export default () => (
  <KeyboardProvider>
    <App />
  </KeyboardProvider>
);
