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
import { Colors } from "@/src/constants/colors";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
// linear gradient
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
// 🌟 Import AsyncStorage to store the completion flag permanently
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // track the view and then update the current index
  const onViewRef = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  // 🌟 Modified to handle the asynchronous storage saving safely
  const handleNext = async () => {
    if (currentIndex < onboardingSlides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      try {
        // 🌟 1. Permanently lock this flag so _layout.tsx skips onboarding next launch!
        await AsyncStorage.setItem("HAS_LAUNCHED_BEFORE", "true");

        // 🌟 2. Replace the layout route instead of pushing so they can't hardware back-button return here
        router.replace("/(auth)/signin");
      } catch (error) {
        console.log("Failed to commit onboarding flag to memory:", error);
        // Fallback redirection safely just in case storage fails
        router.replace("/(auth)/signin");
      }
    }
  };

  const renderItem = ({ item }: { item: Slide }) => {
    const Icon = item.icon;

    return (
      <View style={styles.slide}>
        <View style={styles.iconContainer}>
          <Icon width={340} height={340} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.mainTextContainer}>
            <Title text={item.title} />
          </View>
          <View style={styles.descriptionContainer}>
            <Paragraph text={item.description} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <MySafeAreaView style={styles.container}>
      {/* GLOBAL BACKGROUND */}
      <ImageBackground
        source={require("@/assets/images/onboarding/OnboardingBg.png")}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />

      {/* Linear gradient at center */}
      <LinearGradient
        colors={["rgba(27,35,42,0)", "rgba(27,35,42,1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.centerGradient}
      />

      {/* CONTENT */}
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* the dot pagination */}
      <View style={styles.dotsContainer}>
        {onboardingSlides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.nextBtn}>
        <PrimaryButton onPress={handleNext} text={"Next"} alignText="center" />
      </View>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  mainTextContainer: {
    marginBottom: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
  },
  nextBtn: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    width: 180,
  },
  //   paginated dot
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 170,
  },
  dot: {
    width: 12.24,
    height: 12.24,
    borderRadius: 100,
    backgroundColor: Colors.dark,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.secondary,
  },
  centerGradient: {
    position: "absolute",
    top: "40%", // adjust to move the gradient up/down
    left: 0,
    right: 0,
    height: 144, // exact height from your SVG
    zIndex: 10,
  },
});
