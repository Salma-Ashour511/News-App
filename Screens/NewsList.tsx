import { Dimensions, View } from "react-native";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "../App";
import MenuModel from "../Models/MenuModel";
import Menu from "../Components/Menu";
import { useEffect, useState } from "react";
import { NEWS_URL } from "../Constants";
import axios from "axios";
import ArticleModel from "../models/ArticleModel";
import { LinearGradient } from "expo-linear-gradient";

let deviceWidth = Dimensions.get("window").width;
function NewsList({ navigation }: StackScreenProps<"News">) {
  const [fetchedNews, setFetchedNews] = useState<ArticleModel[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = NEWS_URL;
      const response = await axios.get(url);
      let newsObj: MenuModel = response.data;
      let listOfNewArticles: ArticleModel[] = newsObj.articles;
      setFetchedNews(listOfNewArticles);
    };
    fetchNews();
  }, []);

  function menuItemPressed(itemDetails: ArticleModel) {
    console.log(itemDetails);
    navigation.navigate("NewsDetails" , {
      itemDetails: itemDetails
    } )
  }

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.rootScreen}>
        <View style={styles.container}>
          <Menu
            menuData={fetchedNews}
            onMenuItemPressed={menuItemPressed}
          />
        </View>
    </LinearGradient>
  );
}
export default NewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuStyle: {
    flex: 1,
    width: deviceWidth,
  },
  rootScreen: {
    flex: 1,
  }
});
