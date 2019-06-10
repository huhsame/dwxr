// src/js/lib.js
export const pi = Math.PI;

export function power(x, y) {
    // ES7: exponentiation operator
    return x ** y;
}

export class Foo {
    // stage 3: Class field declarations proposal
    private = 10;

    foo() {
        // stage 4: Object Rest/Spread Properties
        const { a, b, ...x } = { ...{ a: 1, b: 2 }, c: 3, d: 4 };
        return { a, b, x };
    }

    bar() {
        return this.private;
    }
}
