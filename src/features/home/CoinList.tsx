import { View, FlatList, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Title from "../shared/components/Title";
import RecentCoinCard from "../shared/components/RecentCoinCard";


export interface CoinItem {
  icon: React.ReactNode;
  price: string;
  pair: string;
  change: string;
  changePositive: boolean;
  onPress?: () => void;
}

interface CoinListProps {
  title: string;
  data: CoinItem[];
}

export default function CoinList({ title, data }: CoinListProps) {
  return (
    <View style={styles.container}>
      {/* Section title */}
      <View style={styles.titleWrapper}>
        <Title
          text={title}
          color={Colors.primary}
          size={18}
          fontFamily={FontFamily.bold}
        />
      </View>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.scrollContent}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <RecentCoinCard
            icon={item.icon}
            price={item.price}
            pair={item.pair}
            change={item.change}
            changePositive={item.changePositive}
            onPress={item.onPress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 27.34,
  },
  titleWrapper: {
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingLeft: 24,
    paddingRight: 12,
    backgroundColor: "#FFFFFF"
  },
});
