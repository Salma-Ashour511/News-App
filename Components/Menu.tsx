import React from 'react';
import NewsArticleModel from "../models/ArticleModel";
import MainMenuItem from "./MenuItem";
import { FlatList, StyleSheet, Dimensions, RefreshControl } from "react-native";
import { ListRenderItem } from "react-native";

let deviceWidth = Dimensions.get("window").width

type Param = {
  menuData: NewsArticleModel[];
  onMenuItemPressed(action:NewsArticleModel):void
  refreshControl():void
}

function Menu(props: Param)
{
    function onPressedHandler(itemDetails: NewsArticleModel) {
        props.onMenuItemPressed(itemDetails);
    }
    const renderCategoryItem: ListRenderItem<NewsArticleModel> = ({ item }) => (
          <MainMenuItem
            title={item.title}
            img={item.urlToImage}
            onPress={onPressedHandler.bind(null, item)}
          />
    )

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      props.refreshControl()
      setRefreshing(false)
    }, []);

      return(
        <FlatList
        style={styles.flatlistStyle}
        data={props.menuData}
        keyExtractor={(item) => item.author + item.title + item.urlToImage}
        renderItem={renderCategoryItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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