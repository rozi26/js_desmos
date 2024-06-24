import { Color, HSVToColor } from "../../../General/Color.js";
import { ColorizeBase } from "./ColorizeBase.js";
export const FRACTEL_COLORIZERS = {
    "black": new ColorizeBase((val) => new Color(val * 255, val * 255, val * 255)),
    "orange": new ColorizeBase((val) => HSVToColor(val * 6, 1, val == 1 ? 0 : 1))
};
//# sourceMappingURL=ColorizerList.js.map