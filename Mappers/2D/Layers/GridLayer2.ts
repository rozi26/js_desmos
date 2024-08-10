import { round } from "../../../Math/General.js";
import { LayerBase } from "../LayerBase.js";


const MINIMUM_DISTANTE_PIXELS = 100;
const CENTER_LINE_COLOR = 35 + (35<<8) + (35<<16)
const SUB_LINE_COLOR1 = 120 + (120<<8) + (120<<16)
const SUB_LINE_COLOR2 = 180 + (180<<8) + (180<<16)
const CENTER_LINE_RAD = 0.8;
const WITH_TEXT = true;

const TEXT_COLOR1 = 0;
const TEXT_COLOR2 = 120 + (120<<8) + (120<<16);
const WHITE = 255 + (255<<8) + (255<<16)

export class GridLayer2 extends LayerBase
{
    renderAt(px1: number, py1: number, px2: number, py2: number) {
        //calculate the gup size between the lines
        const sizeX = this.transformer.ratio * MINIMUM_DISTANTE_PIXELS;
        const digitsSide = Math.ceil(Math.log10(sizeX));
        const mang = Math.pow(10,digitsSide);
        let rel = sizeX / mang;
        rel = (rel <= 1) ? 1 : ((rel <= 2) ? 2 : 5);
        const main_jump = rel * mang; // the jump between the thick lines
        const sub_jump = main_jump / (rel == 2 ? 4 : 5); // the jump between the thin lines
        
        const cx = this.transformer.locToPixelX(0);
        const cy = this.transformer.locToPixelY(0);

        if (WITH_TEXT) //set the text propaties
        {
            var X_AXIS_TEXT_Y = (cy < 0) ? 0 : ((cy >= this.writer.height - 10) ? this.writer.height : cy);
            var Y_AXIS_TEXT_X = (cx < 0) ? 0 : ((cx >= this.writer.width - 10)  ? this.writer.width : cx);
        }

        if (px1 <= cx && px2 >= cx)
        {
            this.writer.setRect(cx-1,py1, cx+1, py2, CENTER_LINE_COLOR)
        }

        if (py1 <= cy && py2 >= cy)
        {
            this.writer.setRect(px1,cy-1, px2, cy+1, CENTER_LINE_COLOR)
        }
        
        const LINE_X_MAX = this.transformer.pixelToLocX(px2);
        const LINE_Y_MAX = this.transformer.pixelToLocY(py2);
        
        const startX = this.transformer.pixelToLocX(px1);
        const startY = this.transformer.pixelToLocY(py1);
        
        this.writer.setTextOnContextColor(X_AXIS_TEXT_Y == cy ? TEXT_COLOR1 : TEXT_COLOR2); //if the number axis is not on the axis line make them in diffrent color
        let lineX2 = startX - (startX % sub_jump)
        while (lineX2 < LINE_X_MAX)
        {
            const px = Math.floor(this.transformer.locToPixelX(lineX2));
            this.writer.setRect(px, py1, px + 1, py2, SUB_LINE_COLOR2)
            lineX2 += sub_jump;
        }

        let lineX1 = startX - (startX % main_jump)
        while (lineX1 < LINE_X_MAX)
        {
            const px = Math.floor(this.transformer.locToPixelX(lineX1));
            this.writer.setRect(px, py1, px + 1, py2, SUB_LINE_COLOR1)
            this.writer.writeTextOnContext("" + round(lineX1,Math.max(0,-digitsSide)), px, X_AXIS_TEXT_Y, (lineX1 == 0 ? -1.1 : -0.5),(X_AXIS_TEXT_Y == this.writer.height ? -1 : 0.1), WHITE)
            lineX1 += main_jump;
        }

        this.writer.setTextOnContextColor(Y_AXIS_TEXT_X == cx ? TEXT_COLOR1 : TEXT_COLOR2); //if the number axis is not on the axis line make them in diffrent color
        let lineY2 = startY - (startY % sub_jump)
        while (lineY2 > LINE_Y_MAX)
        {
            const py = Math.floor(this.transformer.locToPixelY(lineY2));
            this.writer.setRect(px1,py, px2, py+1, SUB_LINE_COLOR2)
            lineY2 -= sub_jump;
        }

        let lineY1 = startY - (startY % main_jump)
        while (lineY1 > LINE_Y_MAX)
        {
            const py = Math.floor(this.transformer.locToPixelY(lineY1));
            this.writer.setRect(px1,py, px2, py+1, SUB_LINE_COLOR1)
            this.writer.writeTextOnContext("" + lineY1, Y_AXIS_TEXT_X, py, (Y_AXIS_TEXT_X == 0 ? 0.1 : -1.1), (lineY1 == 0) ? 0.1: -0.5, WHITE)
            lineY1 -= main_jump;
        }

    }
}