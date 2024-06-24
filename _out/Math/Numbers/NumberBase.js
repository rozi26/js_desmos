export class NumberBase {
    //overrideable operations
    log(base) {
        const dev = base.clone();
        dev.ln();
        this.ln();
        this.dev(dev);
    }
    inverse() {
        this.dev(this.fromNumber(1));
    }
    greaterEqual(num) { return this.greater(num) || this.equal(num); }
    smaller(num) { return !this.greaterEqual(num); }
    smallerEqual(num) { return !this.greater(num); }
}
//# sourceMappingURL=NumberBase.js.map