import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function TabsLayout() {
	const theme = useTheme();
	const { count: cartCount } = useCart();
	const { count: wishlistCount } = useWishlist();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.colors.surface,
					borderTopColor: theme.colors.outline ?? "#2A2F3A",
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="home-filled" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="cart"
				options={{
					title: "Cart",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="shopping-cart" size={size} color={color} />
					),
					tabBarBadge: cartCount > 0 ? cartCount : undefined,
				}}
			/>

			<Tabs.Screen
				name="orders"
				options={{
					title: "Orders",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="receipt-long" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-circle" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
