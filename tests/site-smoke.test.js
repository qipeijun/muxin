const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const rootDir = path.resolve(__dirname, "..");
const pages = [
  "index.html",
  "about.html",
  "products.html",
  "solutions.html",
  "cases.html",
  "contact.html",
  "partner-tdk.html",
  "partner-murata.html",
];

function read(filePath) {
  return fs.readFileSync(path.join(rootDir, filePath), "utf8");
}

function exists(filePath) {
  return fs.existsSync(path.join(rootDir, filePath));
}

function expectIncludes(content, needle, message) {
  assert.ok(content.includes(needle), message);
}

for (const page of pages) {
  const content = read(page);

  expectIncludes(content, 'name="viewport"', `${page} should define viewport`);
  expectIncludes(content, 'assets/css/main.css', `${page} should load main.css`);
  expectIncludes(content, 'assets/js/main.js', `${page} should load main.js`);
  expectIncludes(content, 'class="site-header"', `${page} should include shared header`);
  expectIncludes(content, 'class="site-footer"', `${page} should include shared footer`);
}

const index = read("index.html");
expectIncludes(index, 'class="hero"', "index.html should define a hero section");
expectIncludes(index, 'data-menu-toggle', "index.html should include a mobile menu toggle");
expectIncludes(index, "TDK 一级代理", "index.html should include the referenced company positioning");
expectIncludes(index, "应用领域", "index.html should include an applications section");
expectIncludes(index, "磁珠", "index.html should include bead products");
expectIncludes(index, "滤波器", "index.html should include filter products");
expectIncludes(index, "assets/images/hero/main-board.jpg", "index.html should use a local hero image");
expectIncludes(index, "assets/images/scenes/aerospace.jpg", "index.html should use local scene images");
expectIncludes(index, "assets/images/scenes/led-light.jpg", "index.html should use the LED scene image");
expectIncludes(index, "assets/images/scenes/wireless-charger-module.jpg", "index.html should use the wireless charger scene image");
expectIncludes(index, "assets/images/scenes/semiconductor.png", "index.html should use the semiconductor scene image");
expectIncludes(index, "assets/images/brand/white-logo.png", "index.html should use the local white logo");

const partner = read("cases.html");
expectIncludes(partner, "partner-tdk.html", "cases.html should link to TDK partner detail page");
expectIncludes(partner, "partner-murata.html", "cases.html should link to Murata partner detail page");
expectIncludes(partner, "assets/images/brand/tdk.png", "cases.html should use the local TDK brand image");
expectIncludes(partner, "assets/images/brand/murata.png", "cases.html should use the local Murata brand image");
expectIncludes(partner, "assets/images/brand/regular-logo.png", "cases.html should use the local regular logo");

const murata = read("partner-murata.html");
expectIncludes(murata, "LQG", "partner-murata.html should include Murata series information");
expectIncludes(murata, "assets/images/series/lqg.png", "partner-murata.html should use local Murata series imagery");

const about = read("about.html");
expectIncludes(about, "assets/images/banners/about.png", "about.html should use the local about banner");
expectIncludes(about, "assets/images/brand/regular-logo.png", "about.html should use the local regular logo");

const contact = read("contact.html");
expectIncludes(contact, "assets/images/banners/contact.jpg", "contact.html should use the local contact banner");

const inductors = read("solutions.html");
expectIncludes(inductors, "assets/images/products/inductors.png", "solutions.html should use local inductor imagery");
expectIncludes(inductors, "assets/images/scenes/module-power.png", "solutions.html should use local module power imagery");
expectIncludes(inductors, "assets/images/scenes/wireless-charger-module.jpg", "solutions.html should use local wireless charger imagery");

const tdk = read("partner-tdk.html");
expectIncludes(tdk, "assets/images/brand/tdk.png", "partner-tdk.html should use the local TDK brand image");
expectIncludes(tdk, "assets/images/products/capacitors.png", "partner-tdk.html should use local product imagery");
expectIncludes(tdk, "assets/images/scenes/car.png", "partner-tdk.html should use local automotive imagery");

const styles = read("assets/css/main.css");
expectIncludes(styles, "@media (max-width: 960px)", "main.css should include tablet breakpoint");
expectIncludes(styles, "@media (max-width: 720px)", "main.css should include mobile breakpoint");
expectIncludes(styles, ".media-card", "main.css should include image-driven card styles");
expectIncludes(styles, ".brand-strip", "main.css should include brand strip styles");

const script = read("assets/js/main.js");
expectIncludes(script, "menuOpen", "main.js should implement menu toggle state");

[
  "assets/images/hero/main-board.jpg",
  "assets/images/products/capacitors.png",
  "assets/images/products/inductors.png",
  "assets/images/products/beads.png",
  "assets/images/products/filters.png",
  "assets/images/scenes/aerospace.jpg",
  "assets/images/scenes/car.png",
  "assets/images/scenes/communication.jpg",
  "assets/images/scenes/led-light.jpg",
  "assets/images/scenes/medical.png",
  "assets/images/scenes/module-power.png",
  "assets/images/scenes/semiconductor.png",
  "assets/images/scenes/wireless-charger-module.jpg",
  "assets/images/banners/about.png",
  "assets/images/banners/contact.jpg",
  "assets/images/brand/regular-logo.png",
  "assets/images/brand/white-logo.png",
  "assets/images/brand/tdk.png",
  "assets/images/brand/murata.png",
  "assets/images/series/lqg.png",
  "assets/images/series/lqh.png",
  "assets/images/series/lqp.png",
  "assets/images/series/lqw.png",
].forEach((filePath) => {
  assert.ok(exists(filePath), `${filePath} should exist locally`);
});

console.log("Site smoke checks passed.");
