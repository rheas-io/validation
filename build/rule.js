"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rule = /** @class */ (function () {
    function Rule(name) {
        if (name === void 0) { name = ""; }
        /**
         * Name of this rule.
         *
         * @var string
         */
        this.name = "";
        this.name = name;
    }
    /**
     * Returns the name of this rule.
     */
    Rule.prototype.getName = function () {
        return this.name;
    };
    return Rule;
}());
exports.Rule = Rule;
