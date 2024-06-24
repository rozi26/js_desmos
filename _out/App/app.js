import { CanvasWriterPlus } from "./canvesWriter.js";
import { activateResiver } from "./canvesEventResiver.js";
import { Desmos2DTest } from "../Desmos/2D/desmos2Dtest.js";
const canves = document.getElementById("canves");
const topMenu = document.getElementById("top_menu");
const sideMenu = document.getElementById("side_menu");
const bottomMenu = document.getElementById("bottom_menu");
const writer = new CanvasWriterPlus(canves);
//let res : ICanvesDisplayer = new test2d(writer);
let res = new Desmos2DTest(writer);
//let res = new FractelsRegularDisplayer(writer);
//let res = new NewtonRafsonDisplayer(writer);
function resize() {
    const canvesStyle = getComputedStyle(canves);
    const canvesWidth = parseInt(canvesStyle.width);
    const canvesHeight = parseInt(canvesStyle.height);
    canves.width = canvesWidth;
    canves.height = canvesHeight;
    writer.resize(canvesWidth, canvesHeight);
    res.resize(canvesWidth, canvesHeight);
    res.fullRender();
}
function changeResiver(resiver) {
    activateResiver(resiver, canves);
    resiver.setBottomMenuDiv(bottomMenu);
    resiver.setSideDiv(sideMenu);
}
export function Run() {
    canves.addEventListener('contextmenu', (eve) => eve.preventDefault());
    console.log("start program");
    window.addEventListener("resize", () => resize());
    resize();
    changeResiver(res);
    writer.fullRender();
}
//# sourceMappingURL=app.js.map