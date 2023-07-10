import { Dimensions, View, RefreshControl } from "react-native";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "../App";
import MenuModel from "../Models/MenuModel";
import Menu from "../Components/Menu";
import { useEffect, useState } from "react";
import { NEWS_URL } from "../Constants";
import axios from "axios";
import ArticleModel from "../models/ArticleModel";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "@rneui/themed";

let deviceWidth = Dimensions.get("window").width;
function NewsList({ navigation }: StackScreenProps<"News">) {
  const [fetchedNews, setFetchedNews] = useState<ArticleModel[]>([]);
  const [search, setSearch] = useState('');
  const [filteredNews, setFilteredNews] = useState<ArticleModel[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = NEWS_URL;
      const response = await axios.get(url);
      console.log(response)
      let newsObj: MenuModel = response.data;
      let listOfNewArticles: ArticleModel[] = newsObj.articles;
      setFetchedNews(listOfNewArticles);
      setFilteredNews(listOfNewArticles)
    };
    fetchNews();
  }, []);

  function menuItemPressed(itemDetails: ArticleModel) {
    console.log(itemDetails);
    navigation.navigate("NewsDetails" , {
      itemDetails: itemDetails
    } )
  }

  function refreshNews(){
    const fetchNews = async () => {
      const url = NEWS_URL;
      const response = await axios.get(url);
      console.log(response)
      let newsObj: MenuModel = response.data;
      let listOfNewArticles: ArticleModel[] = newsObj.articles;
      setFetchedNews(listOfNewArticles);
      setFilteredNews(listOfNewArticles)
    };
    fetchNews();
  }

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = fetchedNews.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredNews(newData);
      setSearch(text);
    } else {
      setFilteredNews(fetchedNews);
      setSearch(text);
    }
  };


  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.rootScreen}>
        <View style={styles.container}>
        <SearchBar
          platform="default"
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={(text: string) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction('')}
          placeholder="Search..."
          value={search}    
          containerStyle={styles.searchBarStyle}
          inputContainerStyle={styles.searchBarInnerStyle}
        />
          <Menu
            menuData={filteredNews}
            onMenuItemPressed={menuItemPressed}
            refreshControl= {refreshNews}
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
  },
  searchBarStyle: {
    width: deviceWidth - 24,
    backgroundColor:"transparent"  
  },
  searchBarInnerStyle: {
    backgroundColor:"#fff"
  }
});
