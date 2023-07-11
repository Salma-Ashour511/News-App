import { View } from "react-native";
import { StackScreenProps } from "../App";
import Selector from '../Components/LanguageSelector';
import { useTranslation } from "react-i18next";

function Settings({ route }: StackScreenProps<"Settings">) {
  const { i18n } = useTranslation();
  let lang = i18n.language;
  let isLangRTL = lang === "ar";
    return (
        <View style={[{ flex: 1, backgroundColor: '#fff' }, {direction: isLangRTL ? "rtl" : "ltr"}]}>
          <Selector />
        </View>
      );
}

export default Settings