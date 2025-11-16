import React from "react";
import { FlatList, View } from "react-native";
import {
  Button,
  Snackbar,
  Text,
  Card,
  Avatar,
  Chip,
  IconButton,
  TouchableRipple,
} from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import AppToolbar from "../components/AppToolbar";
import { colors, getColorForString, getReadableTextColor } from "../utils/colors";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistScreen() {
  const { items, remove, toggle } = useWishlist();
  const { items: cartItems, addToCart } = useCart();
  const [snackbar, setSnackbar] = React.useState<{ visible: boolean; msg?: string }>({ visible: false, msg: "" });

  const moveToCart = (item: { id: string; name: string; price: number; category?: string }) => {
    const exists = cartItems.find((c) => c.id === item.id);
    if (exists) {
      setSnackbar({ visible: true, msg: "Item already in cart" });
      return;
    }
    addToCart({ id: item.id, name: item.name, price: item.price, category: item.category }, 1);
    remove(item.id);
    setSnackbar({ visible: true, msg: "Added to cart" });
  };

  return (
    <View style={styles.container}>
      <AppToolbar title="Wishlist" showWishlist={false} showCart={false} showHome={false} />

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="headlineSmall">No items in wishlist</Text>
          <Text style={styles.sub}>Tap the heart icon on a product to add it to your wishlist.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => {
            const bg = getColorForString(item.category || item.name);
            const textColor = getReadableTextColor(bg);
            const initials = item.name
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("");

            return (
              <Card style={styles.card} elevation={3}>
                <TouchableRipple onPress={() => { }}>
                  <View style={styles.cardRow}>
                    <Avatar.Text size={56} label={initials} style={[styles.avatar, { backgroundColor: bg }]} labelStyle={{ color: textColor }} />

                    <View style={styles.cardBody}>
                      <View style={styles.titleRow}>
                        <Text variant="titleMedium" numberOfLines={1} style={styles.itemTitle}>
                          {item.name}
                        </Text>
                        <Text style={styles.priceBadge}>${item.price.toFixed(2)}</Text>
                      </View>

                      <View style={styles.metaRow}>
                        <Chip compact style={styles.chip} textStyle={styles.chipText}>
                          {item.category || "General"}
                        </Chip>
                        <Text style={styles.grayText}> • Added to wishlist</Text>
                      </View>

                      <View style={styles.actionsRow}>
                        <Button mode="contained" onPress={() => moveToCart(item)} style={styles.moveBtn} labelStyle={styles.moveLabel}>
                          Move to cart
                        </Button>
                        <Button mode="text" onPress={() => toggle(item)} textColor={colors.error}>
                          Remove
                        </Button>
                      </View>
                    </View>

                    <IconButton icon="heart" iconColor={colors.primary} size={22} onPress={() => toggle(item)} style={styles.heart} accessibilityLabel="Remove from wishlist" />
                  </View>
                </TouchableRipple>
              </Card>
            );
          }}
        />
      )}

      <Snackbar visible={snackbar.visible} onDismiss={() => setSnackbar({ visible: false })} duration={2000}>
        {snackbar.msg}
      </Snackbar>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: "16@s" },
  sub: { marginTop: "8@vs", color: colors.textSecondary, textAlign: "center" },

  list: { padding: "12@s", paddingBottom: "24@vs" },
  card: { marginBottom: "6@vs", borderRadius: "12@s", overflow: "hidden" },
  cardRow: { flexDirection: "row", alignItems: "center", padding: "12@s" },
  avatar: { marginRight: "12@s" },

  cardBody: { flex: 1, justifyContent: "center" },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemTitle: { color: colors.textPrimary, flex: 1, marginRight: "8@s" },
  priceBadge: { fontWeight: "700", color: colors.primary },

  metaRow: { flexDirection: "row", alignItems: "center", marginTop: "6@vs" },
  chip: { backgroundColor: colors.surface, marginRight: "8@s", height: "26@s" },
  chipText: { fontSize: "11@ms" },
  grayText: { color: colors.textSecondary, fontSize: "12@ms" },

  actionsRow: { flexDirection: "row", alignItems: "center", marginTop: "10@vs" },
  moveBtn: { marginRight: "8@s" },
  moveLabel: { fontSize: "13@ms" },

  heart: { marginLeft: "6@s" },
});
