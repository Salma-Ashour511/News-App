import {
    View,
    StyleSheet,
    Text,
    Image,
  } from "react-native";
  import { StackScreenProps } from "../App";
  import { LinearGradient } from "expo-linear-gradient";
  import ArticleModel from "../models/ArticleModel";
  
  function NewsDetails({ route }: StackScreenProps<"NewsDetails">) {
    const itemDetails: ArticleModel = route.params.itemDetails;
    let strSplitDate = String(itemDetails.publishedAt).split("T")
    let date = strSplitDate[0]
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.rootScreen}>
          <View style={styles.container}>
            <Image
              style={styles.imageStyle}
              source={{ uri: itemDetails.urlToImage }}
            />
            <Text style={styles.title}> {itemDetails.title} </Text>
              <Text style={styles.descStyle}> {itemDetails.description}</Text>
              <Text style={styles.contentStyle}> {itemDetails.content} </Text>
            </View>
      </LinearGradient>
    );
  }
  
  export default NewsDetails;
  
  const styles = StyleSheet.create({
    rootScreen: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    title: {
      margin: 8,
      alignItems: "center",
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    imageStyle: {
      height: 200,
      width: "100%",
    },
    descStyle: {
      margin: 8,
      justifyContent: "flex-start",
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    contentStyle: {
      margin: 8,
      justifyContent: "flex-start",
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    }
  });