import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Linking,
  Alert,
  Pressable,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import { openComposer } from "react-native-email-link";
import openMap from 'react-native-open-maps';
import Colors from '../constants/colors'
import Snackbar from 'react-native-snackbar';

class Details extends Component {
    constructor(props) {
      super(props);
      this.state = {
        };
    }

    callNumber = async () =>{
        try {
           if(this.props.route.params.mobileNo != ""){
            let number = parseInt(this.props.route.params.mobileNo)
            let phoneNumber = `tel:${number}`;
            const supported = await Linking.openURL(phoneNumber)
           }
           else{
                Snackbar.show({
                    text: 'Phone Number Not Present',
                    duration: 1000,
                });
           }
        } catch (error) {
            console.log(error)
        }
    }

    sendEmail = async () => {
        try {
            openComposer({
                to: this.props.route.params.email
            });
        } catch (error) {
            console.log(error)
        }
    }

    openMap = async () => {
        try {
            if(this.props.route.params.latitude != "" && this.props.route.params.longtitude != ""){
                const lat = parseFloat(this.props.route.params.latitude)
                const long = parseFloat(this.props.route.params.longtitude)
                // console.log(lat,long)
                const val = await openMap({ latitude:lat, longitude: long });
                // console.log(val)
            }
            else{
                Snackbar.show({
                    text: 'Location Not Found',
                    duration: 1000,
                  });
            }
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {

    }

    render(){
        const {
            prefix,
            fullName,
            mobileNo,
            email,
            specialityIn,
            orgName,
            orgAddress,
            orgCity,
            orgState,
            latitude,
            longtitude
        } = this.props.route.params
        return(
            <ScrollView
                style={{flexGrow:1,backgroundColor: Colors.white}}
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    colors={[Colors.primary, Colors.white]}
                    locations={[0.8,1]}
                    style={styles.banner}
                >

                    <View style={styles.detailsHeader}>
                        <Pressable 
                         style={({pressed}) => [
                            styles.backIconWrap,
                            {backgroundColor: pressed ? '#ffffff50' : '#ffffff00'},
                          ]} 
                          onPress={()=>{this.props.navigation.goBack()}}
                        >
                            <Icon name="chevron-back-outline" style={styles.backIcon}  />
                        </Pressable>
                        <View>
                            <Image source={require("../data/doctorTwo.jpg")} style={styles.doctorImg} />
                        </View>
                    </View>
                    <View style={styles.doctorNameSpec}>
                        <Text style={styles.name}>{prefix} {fullName}</Text>
                        <Text style={styles.spec}>{specialityIn}</Text>
                    </View>
                    <View style={styles.callEmailWrap}>
                        {
                            mobileNo != "" ? (
                                <Pressable style={({pressed}) => [
                                    styles.callEmail,
                                    {backgroundColor: pressed ? '#ffffff30' : '#ffffff50'},
                                  ]} onPress={this.callNumber}>
                                    <Icon name="call" style={styles.callEmailIcon} />
                                </Pressable>
                            ) : (null)
                        }
                       {
                           email != "" ? (
                            <Pressable
                                style={({pressed}) => [
                                    styles.callEmail,
                                    {backgroundColor: pressed ? '#ffffff30' : '#ffffff50', marginLeft: 18},
                                ]} 
                                onPress={this.sendEmail}
                            >
                                <Icon name="mail" style={styles.callEmailIcon} />
                            </Pressable>
                           ) : (null)
                       }
                    </View>
                </LinearGradient>   
                <View style={styles.restDetailsWrap}>
                        <Text style={styles.title}>About Doctor</Text>
                        <Text style={styles.txt}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        </Text>
                        <Text style={styles.title}>Organization</Text>
                        <Pressable style={styles.locationWrap} onPress={this.openMap}>
                            <View style={styles.iconWrap}>
                                <LinearGradient style={styles.iconBg}  colors={[Colors.primary, Colors.secondary]}>
                                    <Icon name="navigate" style={styles.locationIcon} />
                                </LinearGradient>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.orgName}>{orgName}</Text>
                                <Text style={styles.address}>{orgAddress}</Text>
                                <Text style={styles.address}>{orgCity} , {orgState}</Text>
                            </View>
                        </Pressable>
                </View>       
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    banner: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 35,
        display: 'flex',
    },
    detailsHeader: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    backIconWrap: {
       position:'absolute',
       top: '5%',
       width: 40,
       height: 40,
       left: '5%',
       alignItems:'center',
       justifyContent:'center',
       borderRadius: 100,
    },
    backIcon:{
        color: Colors.white,
        fontSize: 25
    },
    doctorImg: {
        width: 120,
        height: 120,
        borderRadius: 100
    },
    doctorNameSpec: {
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: '6%',
    },
    name:{
        color: Colors.white,
        fontSize: 21,
        marginBottom: 6,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 1
    },
    spec: {
        color: Colors.white,
        fontSize: 17,
        textAlign: 'center'
    },
    callEmailWrap:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 20
    },
    callEmail:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    callEmailIcon: {
        fontSize: 25,
        color: Colors.white,
        opacity: 0.8
    },
    restDetailsWrap: {
        paddingHorizontal: '6%',
        paddingVertical: 20
    },
    title:{
        fontSize: 24,
        marginBottom: 12,
        fontWeight: '600',
        color: Colors.offBlack
    },
    txt:{
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 15
    },
    locationWrap:{
        flexDirection:'row',
        flexWrap:'wrap',
        width: '100%',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        elevation:2,
        borderRadius:12,
        paddingHorizontal: 15,
        paddingVertical: 12
    },
    iconWrap:{
        maxWidth: '15%',
        flexBasis: '15%',
    },
    iconBg:{
        width: 45,
        height: 45,
        borderRadius: 100,
        alignItems:'center',
        justifyContent: 'center'
    },
    locationIcon:{
        fontSize: 20,
        color: Colors.white
    },
    content:{
        maxWidth: '83%',
        flexBasis: '83%',
        paddingLeft:12
    },
    orgName:{
        fontSize: 17,
        fontWeight: '500',
        color: Colors.primary,
        marginBottom: 4
    },
    address:{
        fontSize: 14,
        marginBottom: 1,
        color: '#4f5e7b',
        opacity: 0.8
    }

})

export default Details;