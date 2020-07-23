"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor(name = "") {
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
    getName() {
        return this.name;
    }
}
exports.Rule = Rule;
