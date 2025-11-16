import React from "react";
import { Appbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text as RNText } from "react-native";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ScaledSheet } from "react-native-size-matters";
import { colors } from "../utils/colors";

type Props = {
    title?: string;
    showMenu?: boolean;
    showWishlist?: boolean;
    showCart?: boolean;
    showHome?: boolean;
};

export default function AppToolbar({
    title,
    showMenu = true,
    showWishlist = true,
    showCart = true,
    showHome = false,
}: Props) {
    const navigation: any = useNavigation();
    const { count: cartCount } = useCart();
    const { count: wishlistCount } = useWishlist();

    const Badge: React.FC<{ value?: number }> = ({ value }) => {
        if (!value || value <= 0) return null;
        return (
            <View style={styles.badge} pointerEvents="none">
                <RNText style={styles.badgeText}>{value > 99 ? "99+" : String(value)}</RNText>
            </View>
        );
    };

    return (
        <Appbar.Header>
            {showMenu && <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />}
            <Appbar.Content title={title} />

            {showWishlist && (
                <Appbar.Action
                    icon={(props) => (
                        <View style={{ width: props.size ?? 24, height: props.size ?? 24 }}>
                            <MaterialIcons name="favorite" size={props.size ?? 24} color={props.color} />
                            <Badge value={wishlistCount} />
                        </View>
                    )}
                    onPress={() => navigation.navigate("Wishlist")}
                />
            )}

            {showCart && (
                <Appbar.Action
                    icon={(props) => (
                        <View style={{ width: props.size ?? 24, height: props.size ?? 24 }}>
                            <MaterialIcons name="shopping-cart" size={props.size ?? 24} color={props.color} />
                            <Badge value={cartCount} />
                        </View>
                    )}
                    onPress={() => navigation.navigate("Tabs", { screen: "Cart" })}
                />
            )}

            {showHome && (
                <Appbar.Action
                    icon={(props) => (
                        <MaterialIcons name="home-filled" size={props.size ?? 24} color={props.color} />
                    )}
                    onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
                />
            )}
        </Appbar.Header>
    );
}

const styles = ScaledSheet.create({
    badge: {
        position: "absolute",
        right: -6,
        top: -6,
        backgroundColor: colors.error,
        minWidth: "18@s",
        height: "18@s",
        borderRadius: "9@s",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: "4@s",
    },
    badgeText: { color: "#fff", fontSize: "10@ms", fontWeight: "700" },
});
