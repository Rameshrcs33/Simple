import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainStack from "./MainStack";
import CustomDrawer from "@/utils/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerMain = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={MainStack} />
    </Drawer.Navigator>
  );
};

export default DrawerMain;
