/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import { Provider } from 'react-redux'
import { SafeAreaView } from 'react-native'
import createStore from './store/createStore'
import GameArea from './containers/GameArea'

const { store, persistor } = createStore();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <GameArea persistor={persistor} />
      </SafeAreaView>
    </Provider>
  );
};


export default App;
