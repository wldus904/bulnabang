// theme.ts에서 사용할 변수들의 타입
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: String;
            secondary: String;
            info: String;
            success: String;
            accent: String;
            warning: String;
            error: String;
            muted: String;
            lightprimary: String;
            lightsecondary: String;
            lightsuccess: String;
            lighterror: String;
            lightwarning: String;
            textPrimary: String;
            textSecondary: String;
            borderColor: String;
            inputBorder: String;
            containerBg: String;
            hoverColor: String;
            surface: String;
            "on-surface-variant": String;
            grey100: String;
            grey200: String;
        };
    }
}
