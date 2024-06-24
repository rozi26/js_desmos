import { LINE_WIDTH, LINE_COLOR } from "./settings.js";
function colorToRGB(color) {
    return [(color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF];
}
export class CanvasWriter {
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.canvas = canvas;
        console.log(this.width);
        this.context = this.canvas.getContext('2d');
        this.pixelData = this.context.getImageData(0, 0, this.width, this.height);
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.context = this.canvas.getContext('2d');
        this.pixelData = this.context.getImageData(0, 0, this.width, this.height);
    }
    setAt(x, y, color) {
        const rgb = colorToRGB(color);
        this.setAtColor(x, y, rgb[0], rgb[1], rgb[2]);
    }
    setAtColor(x, y, r, g, b) {
        let index = (y * this.width + x) << 2;
        this.pixelData.data[index++] = r;
        this.pixelData.data[index++] = g;
        this.pixelData.data[index++] = b;
        this.pixelData.data[index] = 255;
    }
    setRect(x1, y1, x2, y2, color) {
        const rgb = colorToRGB(color);
        this.setRectAtColor(x1, y1, x2, y2, rgb[0], rgb[1], rgb[2]);
    }
    setRectAtColor(x1, y1, x2, y2, r, g, b) {
        x1 = Math.max(0, ~~x1);
        y1 = Math.max(0, ~~y1);
        x2 = Math.min(~~x2, this.width);
        y2 = Math.min(~~y2, this.height);
        r = ~~r;
        g = ~~g;
        b = ~~b;
        let globalStart = ((y1 * this.width) + x1) << 2;
        for (let y = y1; y < y2; y++) {
            let loc = globalStart;
            for (let x = x1; x < x2; x++) {
                this.pixelData.data[loc++] = r;
                this.pixelData.data[loc++] = g;
                this.pixelData.data[loc++] = b;
                this.pixelData.data[loc++] = 255;
            }
            globalStart += (this.width << 2);
        }
    }
    getAt(x, y) {
        const index = (y * this.width + x) * 4;
        const red = this.pixelData.data[index];
        const green = this.pixelData.data[index + 1];
        const blue = this.pixelData.data[index + 2];
        return (red << 16) | (green << 8) | blue;
    }
    move(mx, my) {
        const copyX = (srcY, destY, mx) => {
            if (mx <= 0)
                for (let x = 0; x < this.width + mx; x++)
                    this.setAt(x, destY, this.getAt(x - mx, srcY));
            else
                for (let x = this.width; x > mx; x--)
                    this.setAt(x, destY, this.getAt(x - mx, srcY));
        };
        if (my <= 0)
            for (let y = 0; y < this.height + my; y++)
                copyX(y - my, y, mx);
        else
            for (let y = this.height; y >= my; y--)
                copyX(y - my, y, mx);
    }
    render(x1, y1, x2, y2) {
        this.context.putImageData(this.pixelData, 0, 0, x1, y1, x2 - x1, y2 - y1);
    }
    fullRender() {
        this.render(0, 0, this.width, this.height);
    }
}
export class CanvasWriterPlus extends CanvasWriter {
    constructor(canvas) {
        super(canvas);
    }
    drawLine(x1, y1, x2, y2, color = LINE_COLOR, width = LINE_WIDTH) {
        if (x1 === x2 && y1 === y2)
            return;
        const widthHalf = width / 2;
        const rgb = colorToRGB(color);
        const xwise = Math.abs(x1 - x2) >= Math.abs(y1 - y2);
        if (xwise ? (x2 < x1) : (y2 < y1)) {
            const tempX = x1;
            const tempY = y1;
            x1 = x2;
            y1 = y2;
            x2 = tempX;
            y2 = tempY;
        }
        if (xwise) {
            const m = (y2 - y1) / (x2 - x1);
            let y = y1;
            for (let x = x1; x < x2; x++) {
                this.setRectAtColor(x, y - widthHalf, x + 1, y + widthHalf, rgb[0], rgb[1], rgb[2]);
                y += m;
            }
            return;
        }
        const m = (x2 - x1) / (y2 - y1);
        let x = x1;
        for (let y = y1; y < y2; y++) {
            this.setRectAtColor(x - widthHalf, y, x + widthHalf, y + 1, rgb[0], rgb[1], rgb[2]);
            x += m;
        }
    }
    drawCircle(x, y, color, radius = 10) {
        if (x + radius < 0 || x - radius >= this.width || y + radius < 0 || y - radius >= this.height)
            return;
        const r2 = radius * radius;
        let width;
        for (let ay = -radius; ay < radius; ay++) {
            width = ~~Math.sqrt(r2 - ay * ay);
            super.setRect(x - width, y + ay, x + width, y + ay + 1, color);
        }
    }
}
//# sourceMappingURL=canvesWriter.js.map