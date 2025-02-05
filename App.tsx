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

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{}>;

function Section({children}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useGenericKeyboardHandler({
    onStart: () => {
      'worklet';

      console.log('onStart');
    },
    onMove: () => {
      'worklet';

      console.log('onMove');
    },
    onEnd: () => {
      'worklet';

      console.log('onEnd');
    },
    onInteractive: () => {
      'worklet';

      console.log('onInteractive');
    },
  });

  return (
    <View style={styles.sectionContainer}>
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
    <SafeAreaView style={backgroundStyle}>
      <SystemBars style={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section>Enter text to see the keyboard events</Section>
        </View>
      </ScrollView>
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
