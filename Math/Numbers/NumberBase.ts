export abstract class NumberBase<T extends NumberBase<T>>{
    abstract clone() : T;
    abstract add(num: T): void;
    abstract sub(num: T): void;
    abstract mul(num: T): void;
    abstract dev(num: T): void;
    abstract pow(num: T): void;
    abstract exp(): void;
    abstract ln(): void;
    abstract sin(): void;
    abstract cos(): void;
    abstract abs(): void;
    abstract equal(num: T): boolean;
    abstract greater(num :T) : boolean;
    abstract toString(): string;
    abstract asNumber(): Number

    //temp parsing
    abstract fromNumber(value: number): T;

    //overrideable operations
    log(base: T) : void
    {
        const dev = base.clone();
        dev.ln();
        this.ln();
        this.dev(dev);
    }

    inverse() : void
    {
        this.dev(this.fromNumber(1));
    }

    tan(): void
    {
        const c = this.clone(); c.cos();
        this.sin(); this.dev(c);
    }

    greaterEqual(num :T) : boolean {return this.greater(num) || this.equal(num);}
    smaller(num :T) : boolean {return !this.greaterEqual(num);}
    smallerEqual(num :T) : boolean {return !this.greater(num);}
}