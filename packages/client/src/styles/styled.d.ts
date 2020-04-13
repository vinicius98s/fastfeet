import { Color } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Color;
  }
}
