import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const initialState = {
  name: "",
  area: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(true);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log("camera", photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
    console.log("nav", navigation);
    navigation.navigate("DefaultScreen", { photo, ...state, ...location });
    console.log("location", location);

    setPhoto(null);
  };

  const unreadValues = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={unreadValues}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ marginBottom: isShowKeyboard ? 90 : 20 }}>
        <View style={styles.header}>
          <Text style={styles.homeTitle}>Створити публікацію</Text>
          <TouchableOpacity>
            <Image
              style={styles.back}
              source={require("../assets/images/arrow-left.png")}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.form}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={styles.takenPhoto} />
              </View>
            )}

            <TouchableOpacity onPress={takePhoto}>
              <Image source={require("../assets/images/photoBtn.png")} />
            </TouchableOpacity>
          </Camera>

          <TouchableOpacity>
            <Text style={styles.loadPhoto}>Завантажити фото</Text>
          </TouchableOpacity>

          <View>
            <TextInput
              style={styles.inputName}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  name: value,
                }))
              }
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              value={state.name}
              placeholder="Назва..."
            />
          </View>

          <View>
            <TextInput
              style={styles.inputArea}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  area: value,
                }))
              }
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              value={state.area}
              placeholder="Місцевість..."
            />
            <Image
              style={styles.mapIn}
              source={require("../assets/images/map-pin.png")}
            />
          </View>

          <TouchableOpacity
            style={{ ...styles.publishBtn }}
            activeOpacity={0.7}
            onPress={sendPhoto}>
            <Text style={styles.textBtn}>Опубліковати</Text>
          </TouchableOpacity>
          <View style={styles.trashWrapper}>
            <TouchableOpacity style={styles.trashButton}>
              <Feather
                style={styles.trashIcon}
                name="trash-2"
                size={24}
                color="#DADADA"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",

    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 15,

    marginTop: 55,
  },
  homeTitle: {
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",

    color: "#212121",
  },
  back: {
    position: "absolute",
    top: -20,
    left: 0,
    marginLeft: "auto",
    display: "flex",
  },
  camera: {
    position: "relative",
    marginTop: 50,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
    height: "50%",
  },
  takenPhoto: {
    width: "100%",
    height: "100%",
  },
  loadPhoto: {
    marginBottom: 48,
  },
  form: {
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "#fff",
  },
  inputName: {
    fontSize: 16,
    lineHeight: 19,

    padding: 15,

    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",

    color: "#BDBDBD",
  },
  inputArea: {
    position: "relative",

    fontSize: 16,
    lineHeight: 19,

    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 35,

    marginBottom: 32,

    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",

    color: "#BDBDBD",
  },
  mapIn: {
    position: "absolute",
    top: 16,
    left: 0,
  },
  publishBtn: {
    alignItems: "center",
    justifyContent: "center",
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 100,
    marginBottom: 40,
  },
  trashWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: "#DADADA",
    alignSelf: "center",
    marginBottom: 30,
  },
  trashButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  trashIcon: {
    alignSelf: "center",
  },
});

export default CreatePostsScreen;
