import NewsArticleModel from "../models/ArticleModel";
import MainMenuItem from "./MenuItem";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { ListRenderItem } from "react-native";

let deviceWidth = Dimensions.get("window").width

type Pram = {
  menuData: NewsArticleModel[];
  onMenuItemPressed(action:NewsArticleModel):void
}

function Menu(props: Pram)
{
  // console.log(props)
    function onPressedHandler(itemDetails: NewsArticleModel) {
        props.onMenuItemPressed(itemDetails);
    }
    const renderCategoryItem: ListRenderItem<NewsArticleModel> = ({ item }) => (
        // console.log(itemData);
          <MainMenuItem
            title={item.title}
            img={item.urlToImage}
            onPress={onPressedHandler.bind(null, item)}
          />
    )

      return(
        <FlatList
        style={styles.flatlistStyle}
        data={props.menuData}
        keyExtractor={(item) => item.author + item.title + item.urlToImage}
        renderItem={renderCategoryItem}
      />
      )
}

export default Menu

const styles = StyleSheet.create({
    flatlistStyle: {
      flex: 1,
      width: deviceWidth,
    },
  });