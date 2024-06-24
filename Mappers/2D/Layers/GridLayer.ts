import { GridLayerBase } from "../GridLayerBase.js";
import {GRID_LOG_LEVEL, CENTER_GRID_THICKNESS, SECANDERY_GRID_THICKNESS, THIRD_GRID_THICKNESS, CENTER_GRID_COLOR, SECANDERY_GRID_COLOR, THIRD_GRID_COLOR} from "../../../App/settings.js";


export class GridLayer extends GridLayerBase
{
    renderAt(px1: number, py1: number, px2: number, py2: number)
    {
        const H1 = CENTER_GRID_THICKNESS / 2;
        const H2 = SECANDERY_GRID_THICKNESS / 2;
        const H3 = THIRD_GRID_THICKNESS / 2;
        
        //const linesLevelX1 = Math.pow(GRID_LOG_LEVEL,~~(Math.log(Math.abs(this.transformer.pixelToLocX(this.writer.width) - this.transformer.pixelToLocX(0))) / Math.log(GRID_LOG_LEVEL)));
        //const linesLevelY1 = Math.pow(GRID_LOG_LEVEL,~~(Math.log(Math.abs(this.transformer.pixelToLocY(this.writer.height) - this.transformer.pixelToLocY(0))) / Math.log(GRID_LOG_LEVEL)));
        const linesLevel1 = Math.pow(GRID_LOG_LEVEL,~~(Math.log(Math.max(Math.abs(this.transformer.pixelToLocX(this.writer.width) - this.transformer.pixelToLocX(0)),Math.abs(this.transformer.pixelToLocY(this.writer.height) - this.transformer.pixelToLocY(0)))) / Math.log(GRID_LOG_LEVEL)));
        const linesLevelX1 = linesLevel1
        const linesLevelY1 = linesLevel1;
        const linesLevelX2 = linesLevelX1 / GRID_LOG_LEVEL;
        const linesLevelY2 = linesLevelY1 / GRID_LOG_LEVEL;
        
        const startX = this.transformer.pixelToLocX(px1);
        const endX = this.transformer.pixelToLocX(px2);
        if (startX < 0 && endX > 0)
        {
            const centerPix = this.transformer.locToPixelX(0);
            this.writer.setRect(centerPix - H1, py1, centerPix + H1, py2, CENTER_GRID_COLOR);
        }

        const startY = this.transformer.pixelToLocY(py2);
        const endY = this.transformer.pixelToLocY(py1);
        //console.log(startY + " - " + endY);
        if (startY < 0 && endY > 0)
        {
            const centerPix = this.transformer.locToPixelY(0);
            this.writer.setRect(px1,centerPix - H1, px2, centerPix + H1, CENTER_GRID_COLOR);
        }

        let pix;
        let l = startX - (startX % linesLevelX1);
        while (l < endX)
        {
            pix = this.transformer.locToPixelX(l);
            this.writer.setRect(pix - H2, py1, pix + H2, py2, SECANDERY_GRID_COLOR);
            l += linesLevelX1;
        }
        l = startX - (startX % linesLevelX2);
        while (l < endX)
        {
            pix = this.transformer.locToPixelX(l);
            this.writer.setRect(pix - H3, py1, pix + H3, py2, THIRD_GRID_COLOR);
            l += linesLevelX2;
        }
        l = startY - (startY % linesLevelY1);
        while (l < endY)
        {
            pix = this.transformer.locToPixelY(l);
            this.writer.setRect(px1,pix - H2, px2, pix + H2, SECANDERY_GRID_COLOR);
            l += linesLevelY1;
        }
        l = startY - (startY % linesLevelY2);
        while (l < endY)
        {
            pix = this.transformer.locToPixelY(l);
            this.writer.setRect(px1,pix - H3, px2, pix + H3,THIRD_GRID_COLOR);
            l += linesLevelY2;
        }
    }
}