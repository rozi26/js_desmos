import { LayerBase } from "../LayerBase.js";


const MINIMUM_DISTANTE_PIXELS = 100;
const CENTER_LINE_COLOR = 35 + (35<<8) + (35<<16)
const SUB_LINE_COLOR1 = 120 + (120<<8) + (120<<16)
const SUB_LINE_COLOR2 = 180 + (180<<8) + (180<<16)
const CENTER_LINE_RAD = 0.8;
const WITH_TEXT = true;

const TEXT_COLOR1 = 20 + (20<<8) + (20<<16)
const TEXT_COLOR2 = 120 + (120<<8) + (120<<16)

export class GridLayer2 extends LayerBase
{
    renderAt(px1: number, py1: number, px2: number, py2: number) {
        //calculate the gup size between the lines
        const sizeX = this.transformer.ratio * MINIMUM_DISTANTE_PIXELS
        const mang = Math.pow(10,Math.ceil(Math.log10(sizeX)) );
        let rel = sizeX / mang;
        console.log(rel)
        rel = (rel <= 1) ? 1 : ((rel <= 2) ? 2 : 5);
        const main_jump = rel * mang; // the jump between the thick lines
        const sub_jump = main_jump / (rel == 2 ? 4 : 5); // the jump between the thin lines
        
        const cx = this.transformer.locToPixelX(0);
        const cy = this.transformer.locToPixelY(0);

        if (WITH_TEXT) //set the text propaties
        {
            
        }

        if (px1 <= cx && px2 >= cx)
        {
            this.writer.drawFloatRect(cx-CENTER_LINE_RAD,py1, cx+CENTER_LINE_RAD, py2, CENTER_LINE_COLOR)
        }

        if (py1 <= cy && py2 >= cy)
        {
            this.writer.drawFloatRect(px1,cy-CENTER_LINE_RAD, px2, cy+CENTER_LINE_RAD, CENTER_LINE_COLOR)
        }
        
        const LINE_X_MAX = this.transformer.pixelToLocX(px2);
        const LINE_Y_MAX = this.transformer.pixelToLocY(py2);
        
        const startX = this.transformer.pixelToLocX(px1);
        const startY = this.transformer.pixelToLocY(py1);
        
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
            lineX1 += main_jump;
            this.writer.writeText("" + lineX1, px, 40)
        }

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
            lineY1 -= main_jump;
        }

    }
}