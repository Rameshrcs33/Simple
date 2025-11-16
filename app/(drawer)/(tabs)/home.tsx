import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import {
  Avatar,
  Card,
  Chip,
  IconButton,
  Text,
  useTheme,
  Button,
} from "react-native-paper";
import AppToolbar from "../../../components/common/AppToolbar";
import { MaterialIcons } from "@expo/vector-icons";
import { useWishlist } from "../../context/WishlistContext";
import { ScaledSheet } from "react-native-size-matters";
import {
  colors,
  getColorForString,
  getReadableTextColor,
} from "../../../utils/colors";
import { useCart } from "../../context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const DUMMY_PRODUCTS: Product[] = [
  { id: "1", name: "Wireless Headphones", price: 79.99, category: "Audio" },
  { id: "2", name: "Smart Watch", price: 129.99, category: "Wearables" },
  { id: "3", name: "Portable Speaker", price: 49.5, category: "Audio" },
  { id: "4", name: "Gaming Mouse", price: 39.0, category: "Accessories" },
  { id: "5", name: "4K Action Camera", price: 199.0, category: "Cameras" },
  {
    id: "6",
    name: "Mechanical Keyboard",
    price: 89.0,
    category: "Accessories",
  },
  {
    id: "7",
    name: "Noise Cancelling Earbuds",
    price: 99.99,
    category: "Audio",
  },
  { id: "8", name: "Fitness Tracker", price: 59.99, category: "Wearables" },
  { id: "9", name: "USB-C Hub 8-in-1", price: 45.0, category: "Accessories" },
  { id: "10", name: "1080p Webcam", price: 54.99, category: "Cameras" },
  {
    id: "11",
    name: "Wireless Charger Stand",
    price: 24.99,
    category: "Accessories",
  },
  { id: "12", name: "Bluetooth Soundbar", price: 139.0, category: "Audio" },
  { id: "13", name: 'E-Reader 6"', price: 119.0, category: "Gadgets" },
  { id: "14", name: "Portable SSD 1TB", price: 89.99, category: "Storage" },
  { id: "15", name: "Drone with 4K Camera", price: 349.0, category: "Cameras" },
  {
    id: "16",
    name: "Smart LED Bulb (4-pack)",
    price: 29.99,
    category: "Smart Home",
  },
  { id: "17", name: "VR Headset", price: 229.0, category: "Gadgets" },
  {
    id: "18",
    name: "Ergonomic Office Chair",
    price: 179.0,
    category: "Furniture",
  },
  { id: "19", name: 'Curved Monitor 27"', price: 249.0, category: "Displays" },
  {
    id: "20",
    name: "Action Cam Accessories Kit",
    price: 34.5,
    category: "Cameras",
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const navigation: any = useNavigation();
  const { addToCart, items: cartItems, removeItem, changeQty } = useCart();
  const { contains, toggle } = useWishlist();
  const containerStyle = useMemo(
    () => [{ backgroundColor: colors.background }, styles.container],
    []
  );

  return (
    <View style={containerStyle}>
      <AppToolbar title="Products" />
      <FlatList
        data={DUMMY_PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const chipBg = getColorForString(item.category);
          const chipText = getReadableTextColor(chipBg);
          return (
            <Card style={styles.card} mode="elevated">
              <Card.Title
                title={item.name}
                titleVariant="titleMedium"
                subtitle={`$${item.price.toFixed(2)}`}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    color={theme.colors.onPrimary}
                    style={{ backgroundColor: theme.colors.primary }}
                    icon="cart"
                  />
                )}
                right={(props) => {
                  const inWishlist = contains(item.id);
                  return (
                    <IconButton
                      {...props}
                      onPress={() => toggle({ id: item.id, name: item.name, price: item.price, category: item.category })}
                      icon={(p) => (
                        <MaterialIcons name={inWishlist ? "favorite" : "favorite-border"} size={p.size ?? 24} color={inWishlist ? colors.error : p.color} />
                      )}
                    />
                  );
                }}
              />
              <Card.Content>
                <Chip
                  style={[styles.chip, { backgroundColor: chipBg }]}
                  textStyle={{ color: chipText }}
                  icon="tag"
                >
                  {item.category}
                </Chip>
                <Card.Actions>
                  {(() => {
                    const cartItem = cartItems.find((c) => c.id === item.id);
                    if (cartItem) {
                      return (
                        <View style={styles.actionRow}>
                          <View style={styles.qtyControls}>
                            <IconButton
                              icon="minus"
                              size={20}
                              onPress={() => changeQty(item.id, cartItem.qty - 1)}
                            />
                            <Text style={styles.qtyNumber}>{cartItem.qty}</Text>
                            <IconButton
                              icon="plus"
                              size={20}
                              onPress={() => changeQty(item.id, cartItem.qty + 1)}
                            />
                          </View>
                          <Button
                            mode="outlined"
                            onPress={() => removeItem(item.id)}
                            style={{ borderColor: colors.error }}
                            labelStyle={{ color: colors.error }}
                          >
                            Remove
                          </Button>
                        </View>
                      );
                    }
                    return (
                      <Button mode="contained" onPress={() => addToCart({ id: item.id, name: item.name, price: item.price, category: item.category })}>
                        Add to cart
                      </Button>
                    );
                  })()}
                </Card.Actions>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "12@s",
    paddingTop: "12@vs",
  },
  title: {
    color: colors.textPrimary,
    marginBottom: "8@vs",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  listContent: {
    paddingBottom: "16@vs",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  chip: {
    marginTop: "8@vs",
    alignSelf: "flex-start",
  },
  actionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "8@vs" },
  qtyControls: { flexDirection: "row", alignItems: "center" },
  qtyNumber: { minWidth: "24@s", textAlign: "center", fontWeight: "600" },
  separator: {
    height: "8@vs",
  },
});

