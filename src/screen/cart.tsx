import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    FlatList,
    Platform,
    TouchableOpacity,
    View
} from "react-native";
import {
    ActivityIndicator,
    Button,
    Card,
    Dialog,
    IconButton,
    Paragraph,
    Portal,
    Snackbar,
    Surface,
    Text,
} from "react-native-paper";
import AppToolbar from "../components/AppToolbar";
import { ScaledSheet } from "react-native-size-matters";
import { colors, getColorForString, getReadableTextColor } from "../utils/colors";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";

type CartItem = {
    id: string;
    name: string;
    price: number;
    qty: number;
    category?: string;
};

export default function CartScreen() {
    const navigation: any = useNavigation();
    const { items, changeQty, removeItem, total, clearCart } = useCart();
    const { addOrder } = useOrders();
    const [checkoutVisible, setCheckoutVisible] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [successVisible, setSuccessVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            <AppToolbar title="Your Cart" showCart={false} showHome={true} />

            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
                        Your cart is empty
                    </Text>
                    <Text style={styles.emptySub}>Add items from the Products tab to get started.</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(i) => i.id}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => {
                        const bg = getColorForString(item.category || item.name);
                        const textColor = getReadableTextColor(bg);
                        const initials = item.name
                            .split(" ")
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("");
                        return (
                            <Card mode="elevated" style={styles.cardRow}>
                                <View style={styles.rowInner}>
                                    <Surface style={[styles.thumb, { backgroundColor: bg }]}>
                                        <Text style={[styles.thumbText, { color: textColor }]}>{initials}</Text>
                                    </Surface>

                                    <View style={styles.info}>
                                        <Text variant="titleMedium" numberOfLines={1} style={styles.itemTitle}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.categoryText}>{item.category}</Text>
                                        <View style={styles.bottomRow}>
                                            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>

                                            <View style={styles.qtyControls}>
                                                <TouchableOpacity onPress={() => changeQty(item.id, item.qty - 1)} style={styles.qtyBtn}>
                                                    <Text style={styles.qtyBtnText}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.qtyNumber}>{item.qty}</Text>
                                                <TouchableOpacity onPress={() => changeQty(item.id, item.qty + 1)} style={styles.qtyBtn}>
                                                    <Text style={styles.qtyBtnText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <IconButton icon="delete" size={20} onPress={() => removeItem(item.id)} />
                                </View>
                            </Card>
                        );
                    }}
                />
            )}

            {/* Sticky footer */}
            {items.length > 0 && (
                <View style={styles.footerWrap} pointerEvents="box-none">
                    <Surface style={styles.footerCard}>
                        <View style={styles.footerInner}>
                            <View style={styles.totalsCol}>
                                <View style={styles.subRow}>
                                    <Text style={styles.footerLabel}>Subtotal</Text>
                                    <Text style={styles.subValue}>${total.toFixed(2)}</Text>
                                </View>
                                <View style={styles.subRow}>
                                    <Text style={styles.footerLabel}>Delivery</Text>
                                    <Text style={styles.subValue}>Free</Text>
                                </View>
                                <View style={styles.subRowTotal}>
                                    <Text style={styles.footerLabel}>Total</Text>
                                    <Text variant="titleLarge" style={styles.footerTotal}>${total.toFixed(2)}</Text>
                                </View>
                            </View>

                            <Button mode="contained" onPress={() => setCheckoutVisible(true)} style={styles.checkoutBtn} contentStyle={styles.checkoutContent}>
                                Checkout • ${total.toFixed(2)}
                            </Button>
                        </View>
                    </Surface>
                </View>
            )}

            <Portal>
                <Dialog visible={checkoutVisible} onDismiss={() => setCheckoutVisible(false)} style={styles.dialog}>
                    <Dialog.Title>Confirm Order</Dialog.Title>
                    <Dialog.Content>
                        <View style={styles.summaryList}>
                            {items.map((it: CartItem) => {
                                const bg = getColorForString(it.category || it.name);
                                const fg = getReadableTextColor(bg);
                                const initials = it.name.split(" ").map((s) => s[0]).slice(0, 2).join("");
                                return (
                                    <View key={it.id} style={styles.summaryRow}>
                                        <Surface style={[styles.summaryThumb, { backgroundColor: bg }]}>
                                            <Text style={[styles.summaryThumbText, { color: fg }]}>{initials}</Text>
                                        </Surface>
                                        <View style={styles.summaryBody}>
                                            <Text numberOfLines={1} style={styles.summaryTitle}>{it.name}</Text>
                                            <Text style={styles.grayText}>Qty: {it.qty} • ${it.price.toFixed(2)}</Text>
                                        </View>
                                        <Text style={styles.summaryPrice}>${(it.price * it.qty).toFixed(2)}</Text>
                                    </View>
                                );
                            })}
                        </View>

                        <View style={styles.dialogTotals}>
                            <View style={styles.rowBetween}><Text style={styles.grayText}>Subtotal</Text><Text style={styles.grayText}>${total.toFixed(2)}</Text></View>
                            <View style={styles.rowBetween}><Text style={styles.grayText}>Delivery</Text><Text style={styles.grayText}>Free</Text></View>
                            <View style={styles.rowBetween}><Text style={styles.footerLabel}>Total</Text><Text variant="titleMedium" style={styles.footerTotal}>${total.toFixed(2)}</Text></View>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setCheckoutVisible(false)}>Cancel</Button>
                        <Button
                            mode="contained"
                            onPress={() => {
                                setProcessing(true);
                                // simulate network
                                setTimeout(() => {
                                    // Save order before clearing cart
                                    try {
                                        addOrder({ items: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, category: i.category })), total });
                                    } catch (e) {
                                        // ignore
                                    }
                                    clearCart();
                                    setProcessing(false);
                                    setCheckoutVisible(false);
                                    setSuccessVisible(true);
                                }, 900);
                            }}
                            contentStyle={styles.confirmContent}
                        >
                            {processing ? <ActivityIndicator animating size={18} color="#fff" /> : "Confirm Order"}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Snackbar visible={successVisible} onDismiss={() => setSuccessVisible(false)} duration={3000}>
                Order placed successfully
            </Snackbar>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: "12@s" },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: "10@vs" },
    title: { color: colors.textPrimary, marginLeft: "8@s" },

    listContent: { paddingBottom: Platform.OS === "ios" ? "140@vs" : "120@vs" },
    separator: { height: "10@vs" },

    cardRow: {
        borderRadius: 12,
        padding: "12@s",
        backgroundColor: colors.card,
        overflow: "hidden",
    },
    rowInner: { flexDirection: "row", alignItems: "center" },
    thumb: { width: "56@s", height: "56@s", borderRadius: "10@s", alignItems: "center", justifyContent: "center", marginRight: "12@s" },
    thumbText: { fontWeight: "700", fontSize: "18@ms" },

    info: { flex: 1 },
    itemTitle: { color: colors.textPrimary, marginBottom: "4@vs" },
    categoryText: { color: colors.textSecondary, fontSize: "12@ms", marginBottom: "8@vs" },

    bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    priceText: { fontWeight: "700", color: colors.textPrimary },

    qtyControls: { flexDirection: "row", alignItems: "center" },
    qtyBtn: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: "10@s", paddingVertical: "6@vs", borderRadius: "6@s", marginHorizontal: "6@s" },
    qtyBtnText: { fontWeight: "700", color: colors.textPrimary },
    qtyNumber: { minWidth: "28@s", textAlign: "center", fontWeight: "600" },

    emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
    emptySub: { color: colors.textSecondary, marginTop: "8@vs" },

    footerWrap: { position: "absolute", left: 0, right: 0, bottom: 0, padding: "12@s" },
    footerCard: { borderRadius: 12, padding: "12@s", backgroundColor: colors.surface, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 6 },
    footerInner: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    footerLabel: { color: colors.textSecondary, fontSize: "12@ms" },
    footerTotal: { color: colors.textPrimary },
    checkoutBtn: { minWidth: "140@s" },
    checkoutContent: { height: "44@vs" },

    totalsCol: { marginRight: "12@s" },
    subRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: "6@vs" },
    subRowTotal: { flexDirection: "row", justifyContent: "space-between", marginTop: "6@vs", alignItems: "center" },
    subValue: { color: colors.textPrimary, fontWeight: "600" },

    dialog: { borderRadius: 12 },
    summaryList: { marginBottom: "8@vs" },
    summaryRow: { flexDirection: "row", alignItems: "center", paddingVertical: "8@vs" },
    summaryThumb: { width: "44@s", height: "44@s", borderRadius: "8@s", alignItems: "center", justifyContent: "center", marginRight: "10@s" },
    summaryThumbText: { fontWeight: "700", fontSize: "14@ms" },
    summaryBody: { flex: 1 },
    summaryTitle: { fontWeight: "600", color: colors.textPrimary },
    summaryPrice: { fontWeight: "700", color: colors.textPrimary },

    dialogTotals: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: "10@vs", marginTop: "8@vs" },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: "6@vs" },
    grayText: { color: colors.textSecondary },
    confirmContent: { height: "44@vs", paddingHorizontal: "18@s" },
});
