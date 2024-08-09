import { CanvasWriter, CanvasWriterPlus } from "./canvesWriter.js";
import { ICanvesDisplayer } from "./canvesDisplayer.js";
import { activateResiver } from "./canvesEventResiver.js";
import { test2d } from "../Mappers/2D/test2d.js";
import { Desmos2DTest } from "../Desmos/2D/desmos2Dtest.js";
import { FractelsRegularDisplayer } from "../Fractels/Regular/FractelsRegularDisplayer.js";
import { NewtonRafsonDisplayer } from "../Fractels/NewtonRafson/NewtonRafsonDisplayer.js";
import { Desmos2D2Page } from "../Desmos2D2/UI/Desmos2D2Page.js";

const canves: HTMLCanvasElement = document.getElementById("canves") as HTMLCanvasElement;
const topMenu = document.getElementById("top_menu");
const sideMenu = document.getElementById("side_menu");
const bottomMenu = document.getElementById("bottom_menu");

const writer: CanvasWriterPlus = new CanvasWriterPlus(canves);
//let res : ICanvesDisplayer = new test2d(writer);
//let res: ICanvesDisplayer = new Desmos2DTest(writer);
//let res = new FractelsRegularDisplayer(writer);
//let res = new NewtonRafsonDisplayer(writer);
let res = new Desmos2D2Page(writer);

function resize()
{
    const canvesStyle = getComputedStyle(canves);
    const canvesWidth = parseInt(canvesStyle.width);
    const canvesHeight = parseInt(canvesStyle.height);
    canves.width = canvesWidth;
    canves.height = canvesHeight;
    writer.resize(canvesWidth, canvesHeight);
    res.resize(canvesWidth, canvesHeight);
    res.fullRender();
}

function changeResiver(resiver: ICanvesDisplayer)
{
    activateResiver(resiver, canves);
    resiver.setBottomMenuDiv(bottomMenu as HTMLDivElement);
    resiver.setSideDiv(sideMenu as HTMLDivElement);
}

export function Run()
{
    canves.addEventListener('contextmenu', (eve) => eve.preventDefault())
    console.log("start program");
    window.addEventListener("resize", () => resize());
    resize();

    changeResiver(res);
    
    writer.fullRender();
}