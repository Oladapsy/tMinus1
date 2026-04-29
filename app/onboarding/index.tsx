import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRef, useState } from "react";
import { onboardingSlides, Slide } from "@/src/constants/onboardingSlides";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import OnboardingBg from "@/assets/icons/onboarding/OnboardingBg.svg";
import { Colors } from "@/src/constants/colors";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: Slide }) => {
    const ImageComponent = item.icon;

    return (
      <MySafeAreaView style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/onboarding/OnboardingBg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.render}>
            <ImageComponent width={300} height={300} />
          </View>
        </ImageBackground>
      </MySafeAreaView>
    );
  };

  return (
    <View style={styles.content}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  render: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
