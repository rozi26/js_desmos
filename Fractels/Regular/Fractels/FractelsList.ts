import { ComplexNum } from "../../../Math/Numbers/ComplexNum.js";
import { Fractel } from "./FractelBase.js";

export const FRACTELS = 
{
    "Mandelbort": new Fractel((z: ComplexNum, c: ComplexNum) => {z.square(); z.add(c);})
}