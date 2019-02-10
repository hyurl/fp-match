"use strict";

const assert = require("assert");
const match = require(".").default;
const any = require(".").any;

describe("match.case", () => {
    it("should match the target as expected", () => {
        var result = false;
        match("Hello, World!").case("Hello, World!", () => {
            result = true;
        });
        assert.ok(result);
    });

    it("should match the target from multiple conditions as expected", () => {
        var result = false;
        match("Hello, World!").case("Hello, World!", () => {
            result = true;
        }).case("hello, world1", () => {
            result = false;
        });
        assert.ok(result);
    });

    it("should match the target from multiple conditions diordered as expected", () => {
        var result = false;
        match("Hello, World!").case("hello, world1", () => {
            result = false;
        }).case("Hello, World!", () => {
            result = true;
        });
        assert.ok(result);
    });

    it("should match the target and pass target to the callback as expected", () => {
        var result = false;
        match("Hello, World!").case("hello, world1", () => {
            result = false;
        }).case("Hello, World!", (value) => {
            result = value;
        });
        assert.strictEqual(result, "Hello, World!");
    });

    it("should call the default callback as expected", () => {
        var result = false;
        match("Hello, World!").case("hello, world1", () => {
            result = false;
        }).case("Hello, World", () => {
            result = false;
        }).default((value) => {
            result = value;
        });
        assert.strictEqual(result, "Hello, World!");
    });

    it("should match the target with object conditions as expected", () => {
        var result = 0;
        match({ foo: "hello", bar: "world!" })
            .case({ foo: "hello", bar: "World!" }, () => {
                result = 1;
            }).case({ foo: "hello", bar: "world!" }, () => {
                result = 2;
            }).case({ foo: "hello" }, () => {
                result = 3;
            });
        assert.strictEqual(result, 2);
    });

    it("should match the target with partial object conditions as expected", () => {
        var result = 0;
        match({ foo: "hello", bar: "world!" })
            .case({ foo: "hello", bar: "World!" }, () => {
                result = 1;
            }).case({ foo: "hello" }, () => {
                result = 2;
            }).case({ foo: "hello", bar: "world!" }, () => {
                result = 3;
            });
        assert.strictEqual(result, 2);
    });

    it("should match the target with object conditions and NaN as expected", () => {
        var result = 0;
        match({ foo: "hello", bar: "world!", nan: NaN })
            .case({ foo: "hello", bar: "World!" }, () => {
                result = 1;
            }).case({ foo: "hello", bar: "world!", nan: NaN }, () => {
                result = 2;
            }).case({ foo: "hello" }, () => {
                result = 3;
            });
        assert.strictEqual(result, 2);
    });

    it("should match the target with array conditions as expected", () => {
        var result = 0;
        match(["hello", "world", NaN])
            .case(["hello", "world", "NaN"], () => {
                result = 1;
            }).case(["hello", "world", NaN], () => {
                result = 2;
            }).case(["hello", "world"], () => {
                result = 3;
            });
        assert.strictEqual(result, 2);
    });

    it("should match the target with deep object conditions as expected", () => {
        var result = 0;
        match({ foo: "hello", bar: "world!", arr: ["hello", "world", NaN] })
            .case({ foo: "hello", bar: "World!" }, () => {
                result = 1;
            }).case({ foo: "hello", bar: "world!", arr: ["hello", "world", NaN] }, () => {
                result = 2;
            }).case({ foo: "hello" }, () => {
                result = 3;
            });
        assert.strictEqual(result, 2);
    });

    it("should match a number as expected", () => {
        var result = 0;
        match(123).case(123, value => {
            result = value;
        });
        assert.strictEqual(result, 123);
    });

    it("should match a boolean as expected", () => {
        var result = 0;
        match(true).case(true, value => {
            result = value;
        });
        assert.strictEqual(result, true);
        match(false).case(true, value => {
            result = value;
        }).case(false, value => {
            result = value;
        });
        assert.strictEqual(result, false);
    });

    it("should match null as expected", () => {
        var result = 0;
        match(null).case(null, value => {
            result = value;
        });
        assert.strictEqual(result, null);
    });

    it("should match Infinity as expected", () => {
        var result = 0;
        match(Infinity).case(Infinity, value => {
            result = value;
        });
        assert.strictEqual(result, Infinity);
    });

    it("should match null as expected", () => {
        var result = 0;
        match(NaN).case(NaN, value => {
            result = value;
        });
        assert.ok(isNaN(result));
        // assert.strictEqual(result, NaN);
    });

    it("should match any type of value as expected", () => {
        var result = 0;
        match({ foo: "hello", bar: "world" }).case({ bar: any }, value => {
            result = value;
        });
        assert.deepStrictEqual(result, { foo: "hello", bar: "world" });
    });

    it("shou; match a function as expected", () => {
        var result = 0;
        match(123).case((target) => target === 123, value => {
            result = value;
        });
        assert.strictEqual(result, 123);
        match({ foo: "hello" }).case(() => ({ foo: "hello" }), value => {
            result = value;
        });
        assert.deepStrictEqual(result, { foo: "hello" });

        match({ foo: "hello", bar: "world" }).case((target) => {
            return target.foo === "hello";
        }, value => {
            result = value;
        });
        assert.deepStrictEqual(result, { foo: "hello", bar: "world" });
    });
});