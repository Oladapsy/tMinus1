import { View, FlatList, Dimensions } from "react-native";
import { useRef, useState } from "react";
import { onboardingSlides } from "@/src/constants/onboardingSlides";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: any) => {
  const ImageComponent = item.icon;

  return (
    <View style={{ width, alignItems: "center", justifyContent: "center" }}>
      <ImageComponent width={250} height={250} />
    </View>
  );
};

  return (
    <FlatList
      ref={flatListRef}
      data={onboardingSlides}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}
