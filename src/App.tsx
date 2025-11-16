import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { WishlistProvider } from "./context/WishlistContext";
import DrawerMain from "./navigation/DrawerMain";
import { paperTheme } from "./utils/colors";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <CartProvider>
          <WishlistProvider>
            <OrdersProvider>
              <NavigationContainer>
                <DrawerMain />
              </NavigationContainer>
            </OrdersProvider>
          </WishlistProvider>
        </CartProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
