import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    route.params && setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  console.log(posts);

  const handleMap = () => {
    navigation.navigate("Map", route.params);
  };
  const handleComments = () => {
    navigation.navigate("Comments", route.params);
  };
  return (
    <ImageBackground style={styles.bg}>
      <View style={styles.header}>
        <Text style={styles.homeTitle}>Публікації</Text>
        <TouchableOpacity>
          <Image
            style={styles.logOut}
            source={require("../../assets/images/log-out.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <View style={styles.imgContainer}></View>
        <View style={styles.text}>
          <Text>Natali Romanova</Text>
          <Text>email@example.com</Text>
        </View>
      </View>
      <View style={styles.main}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.photo }} style={styles.photo} />
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.infoContainer}>
                <TouchableOpacity
                  style={styles.comments}
                  onPress={handleComments}>
                  <Image
                    style={styles.commentIcon}
                    source={require("../../assets/images/comment.png")}
                  />
                  <Text>0</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.map} onPress={handleMap}>
                  <Image
                    style={styles.mapIcon}
                    source={require("../../assets/images/map-pin.png")}
                  />
                  <Text style={styles.area}>{item.area}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {},
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
  logOut: {
    position: "absolute",
    top: -20,
    right: 0,
    marginLeft: "auto",
    display: "flex",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 32,
    marginBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  main: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
  },
  imgContainer: {
    width: 50,
    height: 50,
    backgroundColor: "grey",
    borderRadius: 20,
  },
  text: {
    marginLeft: 10,
  },
  photo: {
    height: 240,
    width: "100%",
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,

    marginBottom: 11,

    color: "#212121",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  comments: {
    position: "relative",
    marginLeft: 30,
  },
  commentIcon: {
    position: "absolute",
    top: 0,
    left: -30,
  },
  map: {
    position: "relative",
    marginRight: 10,
  },
  mapIcon: {
    position: "absolute",
    top: 0,
    left: -30,
  },
  area: {
    fontSize: 16,
    lineHeight: 19,

    textDecorationLine: "underline",

    color: "#212121",
  },
});

export default DefaultPostsScreen;
