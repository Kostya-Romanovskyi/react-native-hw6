import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CommentsScreen = ({ route }) => {
  console.log(route.params.photo);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.homeTitle}>Коментарі</Text>
        <TouchableOpacity>
          <Image
            style={styles.back}
            source={require("../../assets/images/arrow-left.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image source={{ uri: route.params.photo }} style={styles.photo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",

    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 15,

    marginTop: 55,
    marginBottom: 32,
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
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 10,
  },
});

export default CommentsScreen;
