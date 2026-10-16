import test from "node:test";
import assert from "node:assert/strict";
import { calculate, validate, initialValues, verdict } from "./analytics.js";
test("default lifetime calculation and phone ratio", () => {
  const r = calculate(initialValues);
  assert.equal(r.sessions, 8766);
  assert.equal(r.minutes, 105192);
  assert.equal(r.days, 73.05);
  assert.ok(Math.abs(r.phoneDays - 51.135) < 1e-9);
  assert.equal(r.percent, 100 / 120);
});
test("all-day upper bound and impossible input", () => {
  assert.equal(
    calculate({ age: 20, sessions: 8, minutes: 180, phone: 100 }).percent,
    100,
  );
  assert.ok(validate({ ...initialValues, age: 0 }));
  assert.ok(validate({ ...initialValues, sessions: 20, minutes: 180 }));
  assert.ok(validate({ ...initialValues, minutes: NaN }));
  assert.equal(validate(initialValues), "");
});
test("verdict boundaries", () => {
  assert.match(verdict(4), /Efikasan/);
  assert.match(verdict(5), /civilizovanog/);
  assert.match(verdict(15), /destinacija/);
  assert.match(verdict(30), /pitanja/);
  assert.match(verdict(60), /pitanja/);
  assert.match(verdict(61), /adresu/);
});
