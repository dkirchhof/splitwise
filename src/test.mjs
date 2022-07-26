import assert from "node:assert";
import test from "node:test";
import { simplifyDebts } from "./lib.mjs";

const nodes = [
    "alice",
    "bob",
    "charlie",
    "david",
    "ema",
    "fred",
    "gabe",
];

const debts = [
    { from: "gabe", to: "bob", value: 30 },
    { from: "gabe", to: "david", value: 10 },
    { from: "fred", to: "bob", value: 10 },
    { from: "fred", to: "charlie", value: 30 },
    { from: "fred", to: "david", value: 10 },
    { from: "fred", to: "ema", value: 10 },
    { from: "bob", to: "charlie", value: 40 },
    { from: "charlie", to: "david", value: 20 },
    { from: "david", to: "ema", value: 50 },
];

const result = simplifyDebts(nodes, debts);

test("passing min cash flow test", () => {
    assert.deepStrictEqual(result, [
        { from: 'fred', to: 'ema', value: 60 },
        { from: 'gabe', to: 'charlie', value: 40 },
        { from: 'david', to: 'charlie', value: 10 },
    ]);
});
