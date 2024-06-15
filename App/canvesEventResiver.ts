import { SCROLL_MUL } from "./settings.js";

export interface ICanvesEventResiver
{
    leftClick(x: number, y:number);
    rightClick(x: number, y:number);

    leftClickUp(x: number, y:number);
    rightClickUp(x: number, y:number);

    move(mx: number, my: number, px: number, py: number);
    zoom(x: number, y:number, timer: number);

    moveRight(x: number, y: number);
}

export function activateResiver(resiver: ICanvesEventResiver, canves: HTMLCanvasElement)
{
    let leftDown = false;
    let rightDown = false;
    let prevX = -1;
    let prevY = -1;

    canves.addEventListener("wheel", (e) => {
        resiver.zoom(e.offsetX,e.offsetY,e.deltaY * SCROLL_MUL);
    });

    canves.addEventListener("mousedown", (e) => {
        if (e.button === 0)
        {
            leftDown = true;
            resiver.leftClick(e.offsetX, e.offsetY);
        }
        if (e.button === 2)
        {
            rightDown = true;
            resiver.rightClick(e.offsetX, e.offsetY);
        }
    });

    canves.addEventListener("mousemove", (e) => {
        if (leftDown && prevX !== -1)
        {
            resiver.move(e.offsetX - prevX, e.offsetY - prevY, e.offsetX, e.offsetY);
        }
        if (rightDown) resiver.moveRight(e.offsetX, e.offsetY);

        prevX = e.offsetX;
        prevY = e.offsetY;
    })

    canves.addEventListener('mouseleave', (e) => {leftDown = false; rightDown = false;})
    canves.addEventListener('mouseup', (e) => {
        if (e.button === 0) { leftDown = false; resiver.leftClickUp(e.offsetX,e.offsetY)}
        if (e.button === 2) {rightDown = false; resiver.rightClickUp(e.offsetX, e.offsetY)}
    })

}