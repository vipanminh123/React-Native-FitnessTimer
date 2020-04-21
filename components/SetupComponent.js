/*
 * This is Setup Screen
*/

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import Button from 'react-native-button';

import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import { WorkingScreen } from '../screenName';

import { insertNewTimer, updateTimer, queryTimer } from '../databases/allSchemas';

import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded, } from 'react-native-admob';

import Rate, { AndroidMarket } from 'react-native-rate'

export default class SetupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sets: '1',
            work_minute: '0',
            work_seconds: '1',
            rest_minute: '0',
            rest_seconds: '0',
            check: false,
            rated: false,
        };
        this.getTimer(1);
    }
    changeValueOfSets = (attr) => {
        let x = this.state.sets;
        x = x == '' || x == 0 ? '1' : x;
        x = parseInt(x, 10);
        if ( attr == 'down' ) {
            if ( x > 1 ) {
                x--;
            }
        }
        else {
            x++;
        }
        x = x.toString();
        this.setState({ sets: x });
    }
    changeValueOfTime = (attr, action) => {
        let x = action == 'work' ? this.state.work_minute : this.state.rest_minute;
        let y = action == 'work' ? this.state.work_seconds : this.state.rest_seconds;
        x = x == '' ? '0' : x;
        y = y == '' ? '0' : y;
        x = parseInt(x, 10);
        y = parseInt(y, 10);
        if ( attr == 'down' ) {
            if ( x > 0 || y > 0 ) {
                if ( y == 0 ) {
                    x--;
                    y = 59;
                }
                else {
                    y--;
                }
            }
            if ( action == 'work' && x == 0 && y == 0 ) {
                y = 1;
            }
        }
        else {
            if ( y == 59 ) {
                x++;
                y = 0;
            }
            else {
                y++;
            }
        }
        x = x.toString();
        y = y.toString();
        if ( action == 'work' ) {
            this.setState({ work_minute: x, work_seconds: y });
        }
        else {
            this.setState({ rest_minute: x, rest_seconds: y });
        }
    }
    getTimer = (id) => {
        queryTimer(id).then((timer) => {
            this.setState({
                sets: timer.sets,
                work_minute: timer.work_minute,
                work_seconds: timer.work_seconds,
                rest_minute: timer.rest_minute,
                rest_seconds: timer.rest_seconds,
                check: true,
            });
        }).catch((error) => {
            // alert(error);
        });
    }
    render() {
        return (
            <LinearGradient colors={['#1eaac8', '#1477a9']} style={styles.linearGradient}>
                <AdMobBanner
                    adSize="smartBannerPortrait"
                    adUnitID="ca-app-pub-5951247838319975/6899067221"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.log(error)}
                />
                <View style={styles.wrapper}>
                    <View style={styles.mainContent}>
                        <View style={styles.block}>
                            <Text style={styles.block_title}>Sets</Text>
                            <View style={styles.block_content}>
                                <Button 
                                    containerStyle={styles.button_icon}
                                    onPress={() => {
                                        this.changeValueOfSets('down')
                                    }}
                                ><Text style={styles.icon_left}></Text></Button>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(number) => {
                                        if ( number.indexOf('.') < 0 && number.indexOf(' ') < 0 && !isNaN(number) ) {
                                            this.setState({
                                                sets: number
                                            });
                                        }                                    
                                    }}
                                    maxLength={2}
                                    keyboardType={"numeric"}
                                    value={this.state.sets}
                                    onEndEditing={() => {
                                        if ( this.state.sets == 0 || this.state.sets == '' ) {
                                            this.setState({ sets: '1' });
                                        }
                                    }}
                                />
                                <Button 
                                    containerStyle={styles.button_icon}
                                    onPress={() => {
                                        this.changeValueOfSets('up')
                                    }}
                                ><Text style={styles.icon_right}></Text></Button>
                            </View>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.block_title}>Work</Text>
                            <View style={styles.block_content}>
                                <Button 
                                    containerStyle={styles.button_icon}
                                    onPress={() => {
                                        this.changeValueOfTime('down', 'work')
                                    }}
                                ><Text style={styles.icon_left}></Text></Button>
                                <View style={styles.wrap_time}>
                                    <TextInput
                                        style={styles.textInput}
                                        onChangeText={(number) => {
                                            if ( number.indexOf('.') < 0 && number.indexOf(' ') < 0 && !isNaN(number) ) {
                                                this.setState({
                                                    work_minute: number
                                                });
                                            }                                    
                                        }}
                                        maxLength={2}
                                        keyboardType={"numeric"}
                                        value={this.state.work_minute}
                                        onEndEditing={() => {
                                            if ( this.state.work_minute == '' ) {
                                                this.setState({ work_minute: '0' });
                                            }
                                        }}
                                    />
                                    <Text style={[styles.textInput, styles.between_time]}>:</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        onChangeText={(number) => {
                                            if ( number.indexOf('.') < 0 && number.indexOf(' ') < 0 && !isNaN(number) ) {
                                                x = parseInt(number, 10);
                                                if ( x > 59 ) {
                                                    minute = Math.floor(x / 60);
                                                    seconds = x % 60;
                                                    number = seconds.toString();
                                                    y = parseInt(this.state.work_minute, 10);
                                                    y += minute;
                                                    this.setState({ work_minute: y.toString() });
                                                }
                                                this.setState({
                                                    work_seconds: number
                                                });
                                            }                                    
                                        }}
                                        maxLength={2}
                                        keyboardType={"numeric"}
                                        value={this.state.work_seconds}
                                        onEndEditing={() => {
                                            if ( this.state.work_minute == 0  && (this.state.work_seconds == 0 || this.state.work_seconds == '') ) {
                                                this.setState({ work_seconds: '1' });
                                            }
                                        }}
                                    />
                                </View>
                                <Button 
                                    containerStyle={styles.button_icon}
                                    onPress={() => {
                                        this.changeValueOfTime('up', 'work')
                                    }}
                                ><Text style={styles.icon_right}></Text></Button>
                            </View>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.block_title}>Rest</Text>
                            <View style={styles.block_content}>
                                <Button 
                                    containerStyle={styles.button_icon}
                                    onPress={() => {
                                        this.changeValueOfTime('down', 'rest')
                                    }}
                                ><Text style={styles.icon_left}></Text></Button>
                                <View style={styles.wrap_time}>
                                    <TextInput
                                        style={styles.textInput}
                                        onChangeText={(number) => {
                                            if ( number.indexOf('.') < 0 && number.indexOf(' ') < 0 && !isNaN(number) ) {
                                                this.setState({
                                                    rest_minute: number
                                                });
                                            }                                    
                                        }}
                                        maxLength={2}
                                        keyboardType={"numeric"}
                                        value={this.state.rest_minute}
                                        onEndEditing={() => {
                                            if ( this.state.rest_minute == '' ) {
                                                this.setState({ rest_minute: '0' });
                                            }
                                        }}
                                    />
                                    <Text style={[styles.textInput, styles.between_time]}>:</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        onChangeText={(number) => {
                                            if ( number.indexOf('.') < 0 && number.indexOf(' ') < 0 && !isNaN(number) ) {
                                                x = parseInt(number, 10);
                                                if ( x > 59 ) {
                                                    minute = Math.floor(x / 60);
                                                    seconds = x % 60;
                                                    number = seconds.toString();
                                                    y = parseInt(this.state.rest_minute, 10);
                                                    y += minute;
                                                    this.setState({ rest_minute: y.toString() });
                                                }
                                                this.setState({
                                                    rest_seconds: number
                                                });
                                            }                                    
                                        }}
                                        maxLength={2}
                                        keyboardType={"numeric"}
                                        value={this.state.rest_seconds}
                                        onEndEditing={() => {
                                            if ( this.state.rest_seconds == '' ) {
                                                this.setState({ rest_seconds: '0' });
                                            }
                                        }}
                                    />
                                </View>
                                <Button 
                                    containerStyle={styles.button_icon}
                                    onPress={() => {
                                        this.changeValueOfTime('up', 'rest')
                                    }}
                                ><Text style={styles.icon_right}></Text></Button>
                            </View>
                        </View>  
                    </View>
                    <Button
                        containerStyle={styles.button_start_container}
                        style={styles.button_start}
                        onPress={() => {
                            this.setState({
                                sets: this.state.sets == 0 || this.state.sets == '' ? '1' : this.state.sets,
                                work_minute: this.state.work_minute == '' ? '0' : this.state.work_minute,
                                work_seconds: this.state.work_minute == 0 ? (this.state.work_seconds == 0 || this.state.work_seconds == '' ? '1' : this.state.work_seconds) : (this.state.work_seconds == '' ? '0' : this.state.work_seconds),
                                rest_minute: this.state.rest_minute == '' ? '0' : this.state.rest_minute,
                                rest_seconds: this.state.rest_seconds == '' ? '0' : this.state.rest_seconds,
                            });
                            const timer = {
                                id: 1,
                                sets: this.state.sets,
                                work_minute: this.state.work_minute,
                                work_seconds: this.state.work_seconds,
                                rest_minute: this.state.rest_minute,
                                rest_seconds: this.state.rest_seconds,
                            };
                            if ( !this.state.check ) {
                                insertNewTimer(timer).then().catch((error) => {
                                    // alert(`Error: ${error}`);
                                })
                            }
                            else {
                                updateTimer(timer).then().catch((error) => {
                                    // alert(`Error: ${error}`);
                                })
                            }
                            this.props.navigation.dispatch(NavigationActions.navigate({
                                routeName: WorkingScreen,
                                params: {
                                    sets: this.state.sets == '' ? '0' : this.state.sets,
                                    work_minute: this.state.work_minute == '' ? '0' : this.state.work_minute,
                                    work_seconds: this.state.work_seconds == '' ? '0' : this.state.work_seconds,
                                    rest_minute: this.state.rest_minute == '' ? '0' : this.state.rest_minute,
                                    rest_seconds: this.state.rest_seconds == '' ? '0' : this.state.rest_seconds,
                                }
                            }))                       
                        }}
                    >Start</Button>
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
        flex: 1
    },
    wrapper: {
        flex: 1,
        //backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    block_title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    block_content: {
        display: 'flex',
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button_icon: {
        // backgroundColor: 'black',
        width: 40,
        height: 40,
    },
    icon_left: {
        width: 25,
        height: 25,
        marginLeft: 7,
        marginTop: 1,
        borderLeftColor: 'white',
        borderBottomColor: 'white',
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        transform: [{
            rotate: "-45deg",
        }]
    },
    icon_right: {
        width: 25,
        height: 25,
        marginLeft: 7,
        marginTop: 16,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderTopWidth: 4,
        borderRightWidth: 5,
        transform: [{
            rotate: "-45deg",
        }]
    },
    textInput: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
    },
    between_time: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 4
    },
    wrap_time: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_start_container: {
        padding: 10,
        margin: 15,
        width: 120,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button_start: {
        fontSize: 20,
        color: '#1477a9',
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
