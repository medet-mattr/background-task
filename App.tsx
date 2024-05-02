/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {Worklets} from 'react-native-worklets-core';

function test(amount: number) {
  let val = 0;
  let i = 0;
  while (i < amount) {
    val += Math.sin(amount);
    i++;
  }
  return val;
}

function testWorklet(amount: number) {
  'worklet';
  let val = 0;
  let i = 0;
  while (i < amount) {
    val += Math.sin(amount);
    i++;
  }
  return val;
}

function App(): React.JSX.Element {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [valueWorklet, setValueWorklet] = useState(0);

  const handleIncrease = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);

  const handleTest = useCallback(async () => {
    setValue(test(100000000));
  }, [setValue]);

  const handleTestWorklet = useCallback(async () => {
    const result = await Worklets.defaultContext.runAsync(() => {
      'worklet';
      return testWorklet(100000000);
    });
    Worklets.runOnJS(() => setValueWorklet(result));
  }, [setValueWorklet]);

  return (
    <SafeAreaView>
      <Text>Short operation</Text>
      <Text>Count: {count}</Text>
      <Button title="Increase" onPress={handleIncrease} />
      <View style={styles.divider} />
      <Text>Long operation</Text>
      <Text>Result: {value}</Text>
      <Button title="Run" onPress={handleTest} />
      <View style={styles.divider} />
      <Text>Long operation with Worklet</Text>
      <Text>Result: {valueWorklet}</Text>
      <Button title="Run with Worklet" onPress={handleTestWorklet} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default App;
