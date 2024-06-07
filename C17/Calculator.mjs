export const PI = 22 / 7;

export class Calculator {
    constructor() {
        this.x = 1;
    }

    add(value) {
        this.x += value;
        return this;
    }

    substract(value) {
        this.x -= value;
        return this;
    }

    multiply(value) {
        this.x *= value;
        return this;
    }

    divide(value) {
        this.x /= value;
        return this;
    }

    square() {
        this.x *= this.x
        return this;
    }

    squareRoot() {
        this.x = Math.sqrt(this.x)
        return this;
    }

    exponent(value){
        let temp = this.x;
        for (let i = 1; i < value; i++) {
            this.x *= temp; 
        }
        return this;
    }

    result() {
        console.log(this.x)
        return this;
    }
}
