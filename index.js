/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
// import App from './App';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import SetupComponent from './components/SetupComponent';
import WorkingComponent from './components/WorkingComponent';

import { SetupScreen, WorkingScreen } from './screenName';

import {name as appName} from './app.json';

const AppNavigator = createStackNavigator({
    SetupScreen: {
        screen: SetupComponent,
        navigationOptions: () => ({
            header: null,
        }),
    },
    WorkingScreen: {
        screen: WorkingComponent,
        navigationOptions: () => ({
            header: null,
        }),
    },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

AppRegistry.registerComponent(appName, () => App);
