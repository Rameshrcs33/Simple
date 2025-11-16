import React from "react";
import { FlatList, View } from "react-native";
import { Avatar, Button, Card, Dialog, Portal, Surface, Text, TouchableRipple } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import AppToolbar from "../../../components/common/AppToolbar";
import { colors, getColorForString, getReadableTextColor } from "../../../utils/colors";
import { useOrders } from "../../context/OrdersContext";

export default function OrdersScreen() {
    const { orders } = useOrders();
    const [selected, setSelected] = React.useState<any>(null);

    return (
        <View style={styles.container}>
            <AppToolbar title="Orders" showWishlist={false} showCart={false} showHome={true} />

            {orders.length === 0 ? (
                <View style={styles.empty}>
                    <Text variant="headlineSmall">No orders yet</Text>
                    <Text style={styles.sub}>Place an order to see it listed here.</Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(o) => o.id}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    renderItem={({ item }) => (
                        <TouchableRipple onPress={() => setSelected(item)}>
                            <Card style={styles.card} mode="elevated">
                                <View style={styles.row}>
                                    <Avatar.Text size={48} label={String(new Date(item.date).getDate())} style={[styles.avatar, { backgroundColor: colors.primary }]} />
                                    <View style={styles.body}>
                                        <Text variant="titleMedium">Order • {new Date(item.date).toLocaleString()}</Text>
                                        <Text style={styles.gray}>{item.items.length} items • ${item.total.toFixed(2)}</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableRipple>
                    )}
                />
            )}

            <Portal>
                <Dialog visible={!!selected} onDismiss={() => setSelected(null)}>
                    <Dialog.Title>Order Details</Dialog.Title>
                    <Dialog.Content>
                        {selected && (
                            <View>
                                {selected.items.map((it: any) => (
                                    <View key={it.id} style={styles.summaryRow}>
                                        <Surface style={[styles.summaryThumb, { backgroundColor: getColorForString(it.category || it.name) }]}>
                                            <Text style={[styles.summaryThumbText, { color: getReadableTextColor(getColorForString(it.category || it.name)) }]}>{it.name.split(" ").map((s: string) => s[0]).slice(0, 2).join("")}</Text>
                                        </Surface>
                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={1} style={styles.summaryTitle}>{it.name}</Text>
                                            <Text style={styles.gray}>{`Qty: ${it.qty} • $${it.price.toFixed(2)}`}</Text>
                                        </View>
                                        <Text style={styles.summaryPrice}>${(it.qty * it.price).toFixed(2)}</Text>
                                    </View>
                                ))}

                                <View style={{ height: 8 }} />
                                <View style={styles.rowBetween}><Text style={styles.gray}>Subtotal</Text><Text style={styles.gray}>${selected.total.toFixed(2)}</Text></View>
                            </View>
                        )}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setSelected(null)}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    empty: { flex: 1, alignItems: "center", justifyContent: "center" },
    sub: { marginTop: "8@vs", color: colors.textSecondary },
    list: { padding: "12@s", paddingBottom: "24@vs" },
    card: { padding: "12@s", borderRadius: "10@s" },
    row: { flexDirection: "row", alignItems: "center" },
    avatar: { marginRight: "12@s" },
    body: { flex: 1 },
    gray: { color: colors.textSecondary, marginTop: "4@vs" },
    summaryRow: { flexDirection: "row", alignItems: "center", paddingVertical: "8@vs" },
    summaryThumb: { width: "44@s", height: "44@s", borderRadius: "8@s", alignItems: "center", justifyContent: "center", marginRight: "10@s" },
    summaryThumbText: { fontWeight: "700", fontSize: "14@ms" },
    summaryTitle: { fontWeight: "600", color: colors.textPrimary },
    summaryPrice: { fontWeight: "700", color: colors.textPrimary },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", marginTop: "8@vs" },
});
