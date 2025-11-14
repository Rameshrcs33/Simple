import { MD3LightTheme as DefaultTheme } from "react-native-paper";

// Base palette with unique, clearly distinguishable colors
export const colors = {
	primary: "#4F46E5", // Indigo-600
	primaryDark: "#3730A3",
	secondary: "#10B981", // Emerald-500
	background: "#FFFFFF",
	surface: "#FFFFFF",
	card: "#FFFFFF",
	accent: "#F59E0B", // Amber-500
	error: "#EF4444", // Red-500
	warning: "#F97316", // Orange-500
	success: "#22C55E", // Green-500
	info: "#3B82F6", // Blue-500
	textPrimary: "#212121", // Gray-900
	textSecondary: "#616161", // Gray-700
	border: "#E0E0E0", // Gray-300
	divider: "#EEEEEE", // Gray-200
};

// Deterministic dynamic color for a string (e.g., category, product name)
export function getColorForString(key: string): string {
	let hash = 0;
	for (let i = 0; i < key.length; i++) {
		hash = key.charCodeAt(i) + ((hash << 5) - hash);
		hash |= 0;
	}
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 65%, 50%)`;
}

// Optional: pick a contrasting text color for a background
export function getReadableTextColor(bgColorHexOrHsl: string): "#000000" | "#FFFFFF" {
	// Quick heuristic: for HSL use lightness, for HEX compute luminance
	if (bgColorHexOrHsl.startsWith("hsl")) {
		const lightness = parseInt(bgColorHexOrHsl.split(",")[2]) || 50; // naive parse
		return lightness > 60 ? "#000000" : "#FFFFFF";
	}
	// HEX path
	const hex = bgColorHexOrHsl.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.6 ? "#000000" : "#FFFFFF";
}

// Paper theme wired to our palette
export const paperTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: colors.primary,
		secondary: colors.secondary,
		background: colors.background,
		surface: colors.surface,
		elevation: {
			...DefaultTheme.colors.elevation,
		},
		onSurface: colors.textPrimary,
		onSurfaceVariant: colors.textSecondary,
		error: colors.error,
	},
};

export default colors;


