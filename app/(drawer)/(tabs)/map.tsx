import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import { IconButton, Text, Button } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import { colors } from "../../../utils/colors";

// --- MAPBOX SETUP ---
let MapboxGL: any = null;
let MapView: any = null;
let Camera: any = null;

try {
  MapboxGL = require("@rnmapbox/maps").default;
  MapView = require("@rnmapbox/maps").MapView;
  Camera = require("@rnmapbox/maps").Camera;

  MapboxGL.setAccessToken(
    "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycW1nMGtjeGt4YTIifQ.rJcFIG214AriISLbB6B6HA"
  );
} catch (e) {
  console.warn("Mapbox module not available", e);
}

export default function MapScreen() {
  const navigation: any = useNavigation();
  const [markerCoord, setMarkerCoord] = useState<[number, number]>([
    77.5946,
    12.9716,
  ]);

  const isMapboxAvailable = !!MapboxGL && !!MapView && !!Camera;
  const cameraRef = useRef<any>(null);

  const handleMapPress = (e: any) => {
    const coords = e?.geometry?.coordinates;
    if (!coords || coords.length < 2) return;

    const lng = coords[0];
    const lat = coords[1];
    setMarkerCoord([lng, lat]);

    cameraRef.current?.moveTo([lng, lat], 500);
  };

  const renderFallback = () => (
    <View style={styles.placeholderContainer}>
      <Text variant="headlineSmall" style={styles.placeholderTitle}>
        Mapbox Not Available
      </Text>

      <Text variant="bodyMedium" style={styles.placeholderText}>
        Mapbox requires a development build. Expo Go cannot load native modules.
      </Text>

      <ScrollView style={styles.instructionsScroll}>
        <Text style={styles.instruction}>Run the following:</Text>

        <Text style={styles.code}>npx expo prebuild</Text>
        <Text style={styles.code}>npx expo run:android</Text>
        <Text style={styles.code}>npx expo run:ios</Text>
      </ScrollView>

      <Button
        mode="contained"
        onPress={() =>
          Alert.alert(
            "Development Build Required",
            "Use: npx expo run:android or npx expo run:ios"
          )
        }
      >
        Learn More
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <IconButton
          icon="menu"
          onPress={() => navigation.openDrawer()}
          size={24}
          iconColor={colors.textPrimary}
        />
        <Text variant="headlineSmall" style={styles.title}>
          Map
        </Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {!isMapboxAvailable ? (
          renderFallback()
        ) : (
          <View style={styles.mapWrapper}>
            <MapView
              style={styles.map}
              styleURL={MapboxGL.StyleURL.Street}
              onPress={handleMapPress}
            >
              <Camera
                ref={cameraRef}
                defaultSettings={{
                  centerCoordinate: markerCoord,
                  zoomLevel: 5,
                }}
              />

              <MapboxGL.PointAnnotation
                id="marker"
                coordinate={markerCoord}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={styles.markerContainer}>
                  <View style={styles.marker} />
                </View>
              </MapboxGL.PointAnnotation>
            </MapView>

            {/* Marker Info */}
            <View style={styles.infoOverlay}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Marker</Text>
                <Text style={styles.infoValue}>
                  {markerCoord[1].toFixed(4)}°, {markerCoord[0].toFixed(4)}°
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "12@s",
    paddingTop: "12@vs",
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  title: {
    color: colors.textPrimary,
    marginBottom: "4@vs",
    fontWeight: "600",
  },

  mapContainer: {
    flex: 1,
    margin: "12@s",
    borderRadius: 12,
    overflow: "hidden",
  },

  mapWrapper: { flex: 1 },

  map: { flex: 1 },

  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  marker: {
    width: "20@s",
    height: "20@s",
    borderRadius: "10@s",
    backgroundColor: colors.error,
    borderWidth: 2,
    borderColor: "#fff",
  },

  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "16@s",
  },

  placeholderTitle: {
    color: colors.textPrimary,
    marginBottom: "12@vs",
    fontWeight: "600",
  },

  placeholderText: {
    color: colors.textSecondary,
    marginBottom: "16@vs",
    textAlign: "center",
  },

  instructionsScroll: {
    maxHeight: "200@vs",
    width: "100%",
  },

  instruction: { color: colors.textSecondary, marginBottom: "8@vs" },

  code: {
    color: colors.primary,
    backgroundColor: colors.background,
    fontFamily: "monospace",
    padding: "6@s",
    borderRadius: 4,
    marginBottom: "4@vs",
  },

  infoOverlay: {
    position: "absolute",
    top: "12@s",
    right: "12@s",
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: "8@s",
    elevation: 3,
  },

  infoLabel: { fontSize: 11, color: colors.textSecondary },

  infoValue: {
    fontFamily: "monospace",
    fontSize: 12,
    color: colors.textPrimary,
  },
});
