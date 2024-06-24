export function round(num, digits) {
    const mul = Math.pow(10, digits);
    return ~~(num * mul) / mul;
}
export function getRandomInt(min, max) {
    return ~~(Math.random() * (max - min) + min);
}
//# sourceMappingURL=General.js.map