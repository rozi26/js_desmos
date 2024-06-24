import { GridLayerBase } from "../../../Mappers/2D/GridLayerBase.js";
export var Desmos2DElementsTypes;
(function (Desmos2DElementsTypes) {
    Desmos2DElementsTypes[Desmos2DElementsTypes["Function"] = 0] = "Function";
    Desmos2DElementsTypes[Desmos2DElementsTypes["Point"] = 1] = "Point";
    Desmos2DElementsTypes[Desmos2DElementsTypes["Var"] = 2] = "Var";
    Desmos2DElementsTypes[Desmos2DElementsTypes["None"] = 3] = "None";
})(Desmos2DElementsTypes || (Desmos2DElementsTypes = {}));
export class Desmos2DElementBase extends GridLayerBase {
    constructor() {
        super();
    }
    setTransformer(transformer) {
        this.transformer = transformer;
    }
    getBoxExtand() {
        return document.createElement("div");
    }
}
//# sourceMappingURL=IDesmos2DElement.js.map