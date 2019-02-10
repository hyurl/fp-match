"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class MatchContext {
    constructor(target) {
        this.target = target;
        this.resolved = false;
    }

    case(value, callback) {
        if (!this.resolved && this.test(value))
            (this.resolved = true) && callback(this.target);

        return this;
    }

    default(callback) {
        if (!this.resolved)
            (this.resolved = true) && callback(this.target);
    }

    test(value) {
        let type = typeof value;

        if (type === "function") {
            let result = value(this.target);
            type = typeof result;

            if (type === "boolean")
                return result;
            else
                return matchTest(type, this.target, result);
        } else {
            return matchTest(type, this.target, value);
        }
    }
}

function match(target) {
    return new MatchContext(target);
}

exports.default = exports.match = match;
exports.MatchContext = MatchContext;
exports.any = Symbol("any");

function matchTest(type, a, b) {
    if (type === "object") {
        if (!objectMatch(a, b))
            return false;
    } else if (type === "number" && isNaN(b)) {
        if (typeof a !== "number" || !isNaN(a))
            return false;
    } else if (b === exports.any) {
        if (a === undefined)
            return false;
    } else if (a !== b) {
        return false;
    }

    return true;
}

function objectMatch(target, value) {
    if (Array.isArray(value)) {
        return value.every((v, i) => matchTest(typeof v, target[i], v));
    } else {
        for (let x in value) {
            if (!matchTest(typeof value[x], target[x], value[x])) {
                return false;
            }
        }

        return true;
    }
}