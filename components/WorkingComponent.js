/*
 * This is Working Screen
*/

import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

import Button from 'react-native-button';
import CountDown from 'react-native-countdown-component';

import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { SetupScreen } from '../screenName';

import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded, } from 'react-native-admob';

import Rate, { AndroidMarket } from 'react-native-rate'

// Import the react-native-sound module
var Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');
// Load the sound file 'ping.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var ping = new Sound('ping.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});

export default class WorkingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sets: parseInt(this.props.navigation.state.params.sets, 10),
            work_minute: parseInt(this.props.navigation.state.params.work_minute, 10),
            work_seconds: parseInt(this.props.navigation.state.params.work_seconds, 10),
            rest_minute: parseInt(this.props.navigation.state.params.rest_minute, 10),
            rest_seconds: parseInt(this.props.navigation.state.params.rest_seconds, 10),
            watches_sets: parseInt(this.props.navigation.state.params.sets, 10),
            watches_minute: 0,
            watches_seconds: 5,
            action: 'ready',
            running: true,
            button_run_content: 'Pause',
            text_action: 'Get Ready',
            rated: false,
        }
    }
    render() {
        return (
            <LinearGradient colors={['#78c787', '#1a984f']} style={styles.linearGradient}>
                <AdMobBanner
                    adSize="smartBannerPortrait"
                    adUnitID="ca-app-pub-5951247838319975/6899067221"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.log(error)}
                />
                <View style={styles.wrapper}>
                    <View style={styles.wrapper_sets}>
                        <Text style={styles.title}>Sets</Text>
                        <Text style={styles.text}>{this.state.watches_sets}</Text>
                    </View>                
                    <CountDown
                        until={60 * this.state.watches_minute + this.state.watches_seconds}
                        size={20}
                        onChange={(number) => {
                            let arr = [1, 2, 3, 4, 5, 6];
                            if ( arr.includes(number) )  {
                                ping.play();
                            };                        
                        }}
                        onFinish={() => {
                            setTimeout(() => {
                                if ( this.state.action == 'ready' ) {
                                    this.setState({
                                        watches_minute: this.state.work_minute,
                                        watches_seconds: this.state.work_seconds,
                                        action: 'work',
                                        text_action: 'Work'
                                    });
                                }
                                else if ( this.state.action == 'rest' ) {
                                    this.setState({
                                        watches_minute: this.state.work_minute,
                                        watches_seconds: this.state.work_seconds,
                                        action: 'work',
                                        text_action: 'Work'
                                    });
                                }
                                else {
                                    if ( this.state.watches_sets == 1 ) {
                                        this.setState({
                                            watches_sets: 0
                                        });
                                        Alert.alert(
                                            'Finish',
                                            '',
                                            [
                                                {
                                                    text: 'OK',
                                                    onPress: () => {
                                                        this.props.navigation.dispatch(NavigationActions.back({
                                                            key: null
                                                        }))
                                                    }
                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }
                                    else {
                                        this.setState({
                                            watches_minute: this.state.rest_minute,
                                            watches_seconds: this.state.rest_seconds,
                                            action: 'rest',
                                            text_action: 'Rest',
                                            watches_sets: this.state.watches_sets - 1,
                                        });
                                    }
                                }
                            }, 1000);
                            
                        }}
                        digitStyle={{backgroundColor: '#fff'}}
                        digitTxtStyle={{color: '#1a984f', fontSize: 30}}
                        separatorStyle={{color: '#FFF', fontSize: 30}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: '', s: ''}}
                        showSeparator
                        running={this.state.running}
                        style={styles.countDown}
                    />
                    <Text style={styles.title}>{this.state.text_action}</Text>
                    <View style={styles.wrapper_button_bottom}>
                        <Button
                            containerStyle={styles.button_container}
                            style={styles.button}
                            onPress={() => {
                                this.props.navigation.dispatch(NavigationActions.back({
                                    key: null
                                }))
                            }}
                        >Back</Button>
                        <Button
                            containerStyle={styles.button_container}
                            style={styles.button}
                            onPress={() => {
                                let x = this.state.running ? false : true;
                                let b_content = this.state.running ? 'Resume' : 'Pause';
                                this.setState({ 
                                    running: x,
                                    button_run_content: b_content
                                });
                            }}
                        >{this.state.button_run_content}</Button>
                    </View>
                    <Button 
                        containerStyle={styles.button_rate_container}
                        style={styles.button_rate_content}
                        onPress={()=>{
                            let options = {
                                GooglePackageName: "com.fitnessTimerNstIkulee",
                                preferredAndroidMarket: AndroidMarket.Google,
                            }
                            Rate.rate(options, success=>{
                                if (success) {
                                    // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                                    this.setState({rated:true})
                                }
                            })
                        }}
                    >Rate App</Button>
                </View>
            </LinearGradient>
        );
    }
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        // backgroundColor: 'mediumseagreen',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper_sets: {
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'white',
        marginBottom: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15
    },
    countDown: {
        marginBottom: 25
    },
    wrapper_button_bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    button_container: {
        padding: 5,
        margin: 10,
        width: 120,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button: {
        fontSize: 20,
        color: '#1a984f',
        fontWeight: 'bold'
    },
    button_rate_container: {
        position: "absolute",
        right: 0,
        bottom: 0,
        padding: 10,
        margin: 15,
        width: 100,
        height: 30,
        borderRadius: 40,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button_rate_content: {
        fontSize: 14,
        color: '#1477a9',
        fontWeight: 'bold'
    }
});
