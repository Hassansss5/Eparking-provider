import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  FlatList
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ngrok_Url } from '../keys';


const ProviderProfileScreen = ({ navigation }) => {

  const Data = [
    { id: 1, name: 'abc', email: 'abc@gmail.com' },
  ]

  // const [firstName, setfirstName] = useState("loading")
  // const [lastName, setlastName] = useState("loading")
  // const [email, setEmail] = useState("loading")


  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [image,setimage] =  useState(null)
  const [id,Setid] =  useState('');
0
  console.log(data, loading)
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    fetch(`${Ngrok_Url}/provider`, {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    }).then(res => res.json())
      .then(results => {
        console.log('from profile one two', results.data)
        setData(results.data);
        setLoading(false)
      }).catch(err => {
        Alert.alert("someting went wrong")
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchDataForImg = async () => {
    const token = await AsyncStorage.getItem("token")
    fetch(`${Ngrok_Url}/provider/rec/fetch`, {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    }).then(res => res.json())
      .then(result => {
        Setid(result.id);
        setimage(result.image);
        console.log(id);
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchDataForImg()
  }, [])

  const submitData = ()=>{
    fetch(`${Ngrok_Url}/provider/image/${id}`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            image
        })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log('from pic',data)
      alert(`${image}: Picture Upload Successfully`);
     // navigation.navigate("HomeSeller")
  })
  .catch(err=>{
    console.log(err)
  })
    
}


  // const authFetch = async () => {
  //   const token = await AsyncStorage.getItem("token")
  //   fetch('http://123ea6e4.ngrok.io/user', {
  //     headers: new Headers({
  //       Authorization: "Bearer " + token
  //     })
  //   }).then(res => res.json())
  //     .then(results => {
  //       console.log('fefefegewgewgwe',results)
  //       setData(results.data)
  //       setLoading(false)
  //     })
  // }
  // useEffect(() => {
  //   authFetch()
  // }, [])

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    navigation.navigate('ProviderLoginScreen');
  };

  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState("");

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `abc/${data.uri.split(".")[1]}`,
          name: `abc.${data.uri.split(".")[1]}`
        }
        handleUpload(newfile)
      }
    } else {
      Alert.alert('You need to Give Permission');
    }
  }

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `abc/${data.uri.split(".")[1]}`,
          name: `abc.${data.uri.split(".")[1]}`
        }
        handleUpload(newfile)
      }
    } else {
      Alert.alert('You need to Give Permission');
    }
  }

  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'User-eparking')
    data.append('cloud_name', 'abdullah1997')

    fetch('https://api.cloudinary.com/v1_1/abdullah1997/image/upload', {
      method: 'post',
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      body: data,
    }).then(res => res.json()).
      then(data => {
        console.log(data);
        setimage(data.url);
        setModal(false);
      }).catch(err=>{
        console.log(err);
        Alert.alert("error while uploading")
    })
  }


  const renderList = ((item) => {
    //console.log(item)
    return (
      <View>
        <Card style={styles.myCard} key={item.id}>
          <View style={styles.cardContent}>
            <MaterialIcons name='person-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
            <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{item.fullName}</Text>
          </View>
        </Card>
        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialCommunityIcons name='email-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
            <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{item.email}</Text>
          </View>
        </Card>
      </View>
    );
  })
  // const renderList = (item) => {
  //   return (
  //     <View>
  // <Card style={styles.myCard} key={item._id}>
  //   <View style={styles.cardContent}>
  //     <MaterialIcons name='person-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
  //     <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{item.firstName}</Text>
  //   </View>
  // </Card>
  // <Card style={styles.myCard}>
  //   <View style={styles.cardContent}>
  //     <MaterialCommunityIcons name='email-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
  //     <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{item.email}</Text>
  //   </View>
  // </Card>
  //     </View>
  //   );
  // }

  // idhr bana ra hon flatlist
  // const renderList = (item) => {
  //   return (
  //     <View>
  //       <Card style={styles.myCard} key={item.id}>
  //         <View style={styles.cardContent}>
  //           <MaterialIcons name='person-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
  //           <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{item.firstName}</Text>
  //         </View>
  //       </Card>
  //       <Card style={styles.myCard}>
  //         <View style={styles.cardContent}>
  //           <MaterialCommunityIcons name='email-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
  //           <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{item.email}</Text>
  //         </View>
  //       </Card>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#FFBE59', '#006F9C']}
          style={{ height: '40%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
        />
        <TouchableOpacity onPress={() => setModal(true)}>
        <View style={{ alignItems: "center" }}>
          <Image style={{ width: 170, height: 170, borderRadius: 170 / 2, marginTop: -100, borderColor:'#FFBE59', borderWidth:1 }}
            //source={require('../images/drawer')}
            source = {{uri:image}}
          />
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgbutton} onPress = {()=>submitData()}>
          <Text style={styles.textimg}>Upload Image</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress = {()=>submitData()}>
          <Text>check</Text>
        </TouchableOpacity> */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modelButtoView}>
              <TouchableOpacity style={styles.modelButton} onPress={() => pickFromCamera()}>
                <Text style={styles.modalTextCam}>
                  <Feather
                    name='camera'
                    color='#fff'
                    size={22}
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modelButton} onPress={() => pickFromGallery()}>
                <Text style={styles.textregister}>
                  <Feather
                    name='image'
                    color='#fff'
                    size={22}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modelButtonCancel} onPress={() => setModal(false)}>
              <Text style={styles.textregister}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return renderList(item)
            }}
            keyExtractor={item => item.id}
            onRefresh={() => fetchData()}
            refreshing={loading}
          />
        </View>
        {/* <Card style={styles.myCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name='person-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
              <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{firstName}{" "}{lastName}</Text>
            </View>
          </Card>
          <Card style={styles.myCard}>
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name='email-outline' size={35} color='#006F9C' style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} />
              <Text style={{ fontSize: 20, paddingTop: 11, color: '#FFBE59' }}>{email}</Text>
            </View>
          </Card> */}
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/home/win8/50/ffffff' }} />
          </View>
          <View style={styles.infoContent}>
            <TouchableOpacity style={styles.buttonupdate} onPress={() => navigation.navigate('ProviderUpdate')}>
              <Text style={styles.textregister}>
                Update
         </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/settings/win8/50/ffffff' }} />
          </View>
          <View style={styles.infoContent}>
            <TouchableOpacity style={styles.buttonlogout} onPress={this._signOutAsync}>
              <Text style={styles.textregister}>
                Logout
         </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};


ProviderProfileScreen.navigationOptions = () => {
  return {
    title: 'User Profile',
    headerStyle: {
      backgroundColor: '#FFBE59',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      letterSpacing: 1,
      fontSize: 20,
      flex: 1,
      textAlign: "center",
    },
  }
}


// UserProfileScreen.navigationOptions = () => {
//   return {
//       tabBarLabel: 'Profile', 
//       tabBarIcon: ({ tintColor }) => (
//           // <Ionicons name="ios-home" color={tintColor} size={25} />
//           <Feather
//               name='user-o'
//               color={tintColor}
//               size={25}
//             />
//       )
//     // tabBarOptions: {
//     //   activeTintColor: '#006F9C',
//     //   labelStyle: {
//     //     fontSize: 12,
//     //   },
//     //   style: {
//     //     backgroundColor: '#FFBE59',
//     //   },
//     // }
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  modalView: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#FFBE59',
    borderRadius: 50,
    width: '90%',
    marginLeft: 20
  },
  header: {
    backgroundColor: "#fff",
    paddingBottom: 50,
    height: 440
  },
  myCard: {
    margin: 10,
    marginTop: 15
  },
  cardContent: {
    flexDirection: "row",
    height: 50,
  },
  modelButton: {
    width: '30%',
    height: 45,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    marginLeft: 55,
    marginTop: 50,
    borderRadius: 30,
    paddingTop: 10,
  },
  modelButtonCancel: {
    width: '60%',
    height: 40,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    marginLeft: '22%',
    marginTop: 30,
    borderRadius: 30,
    paddingTop: 10,
    marginBottom: 30
  },
  modalTextCam: {
    color: 'white',
    fontSize: 18,
    textAlign: "center"
  },
  headerContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    marginTop: 50
  },
  modelButtoView: {
    flexDirection: "row",
  },
  name: {
    fontSize: 22,
    color: "#FF9C00",
    fontWeight: '600',
    marginTop: 20
  },
  userInfo: {
    fontSize: 20,
    color: "#006F9C",
    fontWeight: '600',
    marginTop: 10
  },
  body: {
    backgroundColor: "#fff",
    height: 300,
    flexDirection: "row",
    paddingTop: 150,
  },
  item: {
    flexDirection: "column",
    padding: 20
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  textregister: {
    color: 'white',
    fontSize: 18,
    textAlign: "center"
  },
  textimg: {
    color: 'white',
    fontSize: 12,
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonupdate: {
    width: 130,
    height: 45,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    borderRadius: 30,
    marginLeft: 38,
    paddingTop: 10
  },
  imgbutton: {
    width: '30%',
    height: 35,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    marginLeft: '35%',
    marginTop: 20,
    borderRadius: 30,
    paddingTop: 10
  },
  buttonlogout: {
    width: 130,
    height: 45,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    borderRadius: 30,
    paddingTop: 10
  },
  // iconContent:{
  //   flex:1,
  //   alignItems:'flex-end',
  //   paddingRight:5,
  // },
  // icon:{
  //   width:30,
  //   height:30,
  //   marginTop:20,
  // },
  // info:{
  //   fontSize:18,
  //   marginTop:20,
  //   color: "#FFFFFF",
  // }
});


export default ProviderProfileScreen;