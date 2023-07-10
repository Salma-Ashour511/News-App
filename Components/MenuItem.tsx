import { Pressable, View, Text, StyleSheet, Platform, Image, Dimensions } from 'react-native';

type Param = {
  title: string
  img: string

  onPress: () => void
}
let deviceWidth = Dimensions.get("window").width;
function MenuItem(props: Param){
    return(
        <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={props.onPress}
      >
        <View style={[styles.innerContainer]}>
          <Image style={styles.imageStyle} source={{uri: props.img}}/>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    gridItem: {
      flex: 1,
      margin: 16,
      borderRadius: 8,
      elevation: 3,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      height: 200,
    },
    button: {
      flex: 1,
    },
    buttonPressed: {
      opacity: 0.5,
    },
    innerContainer: {
      flex: 1,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: "column",
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
      color: "#4c669f", 
      padding: 6,
      maxWidth: deviceWidth - 32
    },
    imageStyle: {
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      marginTop: -16,
      height: 130,
      width: deviceWidth - 32,
    }
  })