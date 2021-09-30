import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  View,
  TextInput,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList
} from 'react-native';

import Colors from '../constants/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const doctorDetails = require('../data/sample_doctor_list.json')

const { width, height } = Dimensions.get("window");

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          isSearchOn: false,
          searchTxt: '',
          toDisplay: doctorDetails,
      };
    }

    getDetails = async () => {
        try {
            await this.setState({
                isLoading: false
            })
            // console.log(doctorDetails)
        } catch (error) {
            console.log(error)
        }
    }

    searchDoctor = async () => {
        const txt = this.state.searchTxt.toLowerCase()
        if(this.state.searchTxt != ""){
            const val = doctorDetails.filter((item)=>{
                const name = `${item.prefix} ${item.fullname}`
                return name.toLowerCase().match(txt)
            })
            console.log(val)
            if(val.length != 0){
                await this.setState({
                    toDisplay: val
                })
            }
        }
        else{
            await this.setState({
                toDisplay: doctorDetails
            })
        }
    }

    resetSearch = async () => {
        await this.setState({
            searchTxt: '',
            toDisplay: doctorDetails,
            isSearchOn: false
        })
    }

    async componentDidMount() {
        this.getDetails()
    }
    
    renderItem = ({item,index}) => {
        return(
            <Pressable style={styles.itemWrap}
                onPress={
                    () => {
                        this.props.navigation.push('Details', {
                            prefix: item.prefix,
                            fullName: item.fullname,
                            mobileNo: item.mobileNo,
                            email: item.email,
                            specialityIn: item.specialityIn,
                            orgName: item.orgName,
                            orgAddress: item.orgAddress,
                            orgCity: item.orgCity,
                            orgState: item.orgState,
                            latitude: item.latitude,
                            longtitude: item.longtitude
                          });
                    }
                }
            >
                <View style={styles.itemIconWrap}>
                   <Image source={require("../data/doctor.png")} style={styles.itemIcon} />
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.doctorName} numberOfLines={1}>
                        {item.prefix} {item.fullname} 
                    </Text>
                    <Text style={styles.txt}>
                        Speciality: {item.specialityIn}
                    </Text>
                    {
                        item.orgCity != "" ? (
                            <Text style={styles.txt}>
                                City {item.orgCity}
                            </Text>
                        ) : (null)
                    }
                </View>
            </Pressable>
        )
    }

    render(){
        if (this.state.isLoading) {
            return (
              <SafeAreaView
                style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: Colors.white}}>
                <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
                <ActivityIndicator size="large" color={Colors.primary} />
              </SafeAreaView>
            );
          }

        return(
            <Fragment>
                <View style={styles.headerWrap}>
                   {
                       this.state.isSearchOn ? (
                        <View style={styles.searchBarWrap}>
                            <View style={styles.searchBarIconWrap}>
                                <Pressable 
                                    style={({pressed}) => [
                                        styles.searchBarIcon,
                                        {backgroundColor: pressed ? '#ffffff50' : '#ffffff00'},
                                    ]} 
                                    onPress={async () => {await this.resetSearch()}}
                                >
                                    <Icon name="chevron-back-outline" style={styles.searchIcon} />
                                </Pressable>
                            </View>
                            <TextInput 
                                value={this.state.searchTxt}
                                style={styles.searchBar}
                                placeholder="Search Doctor"
                                autoFocus={true}
                                onChangeText={async (txt)=> {await this.setState({searchTxt:txt})}}
                                onEndEditing={()=>{this.searchDoctor()}}
                                placeholderTextColor={Colors.white}
                            />
                            <View style={styles.searchBarIconWrap}>
                                <Pressable
                                    style={({pressed}) => [
                                        styles.searchBarIcon,
                                        {backgroundColor: pressed ? '#ffffff50' : '#ffffff00',marginTop: 6},
                                    ]} 
                                    onPress={()=>{this.searchDoctor()}}
                                >
                                    <Icon name="search-outline" style={styles.searchIcon} />
                                </Pressable>
                            </View>
                        </View>
                       ) : (
                        <Fragment>
                            <View>
                                <Text style={styles.headerTitle}>MargHealth</Text>
                            </View>
                            <Pressable onPress={async () => {await this.setState({isSearchOn: true})}}>
                                <Icon name="search-outline" style={styles.searchIcon} />
                            </Pressable>
                        </Fragment>
                       )
                   }
                </View>
                <FlatList 
                    data={this.state.toDisplay}
                    contentContainerStyle={{ paddingVertical: 40 }}
                    style={styles.flatlistWrap}
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.email}
                />
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    headerWrap: {
        // minHeight: height * 0.1,
        height: 90,
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingVertical: 25,
        display: 'flex',
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: 23,
        color: Colors.white,
        fontWeight: "600"
    },
    searchIcon: {
        color: Colors.white,
        fontSize: 26
    },
    searchBarWrap:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    searchBar: {
        maxWidth: '75%',
        flexBasis: '75%',
        color: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.white,
        fontSize: 15
    },
    searchBarIconWrap: {
        maxWidth: '10%',
        flexBasis: '10%'
    },
    searchBarIcon:{
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatlistWrap: {
        // minHeight: height * 0.9,
        flexGrow:1,
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '5%',
    },
    itemWrap: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 3,
        paddingHorizontal: 25,
        paddingVertical: 30,
        borderRadius: 12,
        borderWidth: 0,
        marginBottom: 25
    },
    itemIconWrap: {
        maxWidth: '25%',
        flexBasis: '25%'
    },
    itemContent: {
        maxWidth: '70%',
        flexBasis: '70%',
        paddingLeft: 15
    },
    itemIcon: {
        width: 65,
        height: 65,
        resizeMode: 'contain'
    },
    doctorName: {
        fontSize: 19,
        color: Colors.primary,
        marginBottom: 4
    },
    txt: {
        fontSize: 14,
        marginBottom: 2,
        color: '#4f5e7b',
        opacity: 0.8
    }
})

export default Home;