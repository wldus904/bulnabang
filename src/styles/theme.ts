// page에 적용할 style
import { DefaultTheme } from "styled-components";

const deviceSizes: { [key: String]: number } = {
    mobile: 375,
    tablet: 768,
    laptop: 1024,
};

export const theme: DefaultTheme = {
    deviceSizes,
    device: {
        mobile: `screen and (max-width: ${deviceSizes.mobile}px)`,
        tablet: `screen and (max-width: ${deviceSizes.tablet}px)`,
        laptop: `screen and (max-width: ${deviceSizes.laptop}px)`,
    },
    colors: {
        primary: "#5D87FF",
        secondary: "#49BEFF",
        info: "#539BFF",
        success: "#13DEB9",
        accent: "#FFAB91",
        warning: "#FFAE1F",
        error: "#EF5350",
        muted: "#5A6A85",
        lightprimary: "#ECF2FF",
        lightsecondary: "#E8F7FF",
        lightsuccess: "#E6FFFA",
        lighterror: "#FDEDE8",
        lightwarning: "#FEF5E5",
        textPrimary: "#3C4148",
        textSecondary: "#5A616D",
        borderColor: "#e5eaef",
        inputBorder: "#000",
        containerBg: "#ffffff",
        hoverColor: "#f6f9fc",
        surface: "#fff",
        "on-surface-variant": "#fff",
        grey100: "#F2F6FA",
        grey200: "#EAEFF4",
    },
};
