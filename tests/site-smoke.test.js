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

function count(content, needle) {
  return content.split(needle).length - 1;
}

for (const page of pages) {
  const content = read(page);

  expectIncludes(content, 'name="viewport"', `${page} should define viewport`);
  expectIncludes(content, 'assets/css/main.css', `${page} should load main.css`);
  expectIncludes(content, 'assets/js/main.js', `${page} should load main.js`);
  expectIncludes(content, 'class="site-header"', `${page} should include shared header`);
  expectIncludes(content, 'class="site-footer"', `${page} should include shared footer`);
  const navOrder = [
    content.indexOf(">首页<"),
    content.indexOf(">贴片电容<"),
    content.indexOf(">贴片电感<"),
    content.indexOf(">合作伙伴<"),
    content.indexOf(">关于我们<"),
    content.indexOf(">RFQ<"),
  ];
  assert.ok(navOrder.every((index) => index >= 0), `${page} should include the reordered navigation labels`);
  assert.ok(
    navOrder.every((index, idx) => idx === 0 || navOrder[idx - 1] < index),
    `${page} should keep the procurement-first navigation order`
  );
  expectIncludes(content, 'class="footer-nav"', `${page} should include the shared footer navigation group`);
  const footerOrder = [
    content.lastIndexOf(">首页<"),
    content.lastIndexOf(">贴片电容<"),
    content.lastIndexOf(">贴片电感<"),
    content.lastIndexOf(">合作伙伴<"),
    content.lastIndexOf(">关于我们<"),
    content.lastIndexOf(">立即询价<"),
  ];
  assert.ok(footerOrder.every((index) => index >= 0), `${page} should include the shared footer labels`);
  assert.ok(
    footerOrder.every((index, idx) => idx === 0 || footerOrder[idx - 1] < index),
    `${page} should keep footer navigation aligned with the header order`
  );
  assert.equal(count(content, 'class="button button-small button-ghost desktop-cta"'), 1, `${page} should include exactly one desktop CTA`);
  assert.equal(count(content, ">立即咨询<"), 0, `${page} should remove the vague consult CTA wording`);
}

const index = read("index.html");
expectIncludes(index, 'class="hero"', "index.html should define a hero section");
expectIncludes(index, 'data-menu-toggle', "index.html should include a mobile menu toggle");
expectIncludes(index, "hero-shell", "index.html should use the simplified hero shell");
expectIncludes(index, "hero-proof", "index.html should include a proof-oriented hero module");
expectIncludes(index, "section-emphasis", "index.html should include emphasized B2B sections");
expectIncludes(index, "资质与信任", "index.html should include a trust proof section");
expectIncludes(index, "采购服务能力", "index.html should include a procurement capability section");
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
expectIncludes(contact, "RFQ", "contact.html should include RFQ content");
expectIncludes(contact, "料号", "contact.html should include structured RFQ fields");
expectIncludes(contact, "BOM", "contact.html should include BOM guidance");
expectIncludes(contact, "action-panel", "contact.html should include an RFQ action panel");
expectIncludes(contact, "发送询价", "contact.html should include a send RFQ action");
expectIncludes(contact, "提交 BOM", "contact.html should include a BOM submission action");
expectIncludes(contact, "电话沟通", "contact.html should include a phone contact action");

const inductors = read("solutions.html");
expectIncludes(inductors, "assets/images/products/inductors.png", "solutions.html should use local inductor imagery");
expectIncludes(inductors, "assets/images/scenes/module-power.png", "solutions.html should use local module power imagery");
expectIncludes(inductors, "assets/images/scenes/wireless-charger-module.jpg", "solutions.html should use local wireless charger imagery");
expectIncludes(inductors, "选型", "solutions.html should include selection guidance");

const tdk = read("partner-tdk.html");
expectIncludes(tdk, "assets/images/brand/tdk.png", "partner-tdk.html should use the local TDK brand image");
expectIncludes(tdk, "assets/images/products/capacitors.png", "partner-tdk.html should use local product imagery");
expectIncludes(tdk, "assets/images/scenes/car.png", "partner-tdk.html should use local automotive imagery");
expectIncludes(tdk, "可供应范围", "partner-tdk.html should include supply scope");

const products = read("products.html");
expectIncludes(products, "选型导览", "products.html should include selection guidance");
expectIncludes(products, "系列", "products.html should include series guidance");

const tokens = read("assets/css/tokens.css");
expectIncludes(tokens, "--font-weight-regular", "tokens.css should define regular weight token");
expectIncludes(tokens, "--font-weight-medium", "tokens.css should define medium weight token");
expectIncludes(tokens, "--font-weight-semibold", "tokens.css should define semibold weight token");
expectIncludes(tokens, "--font-weight-bold", "tokens.css should define bold weight token");
expectIncludes(tokens, "--font-size-hero", "tokens.css should define hero title size token");
expectIncludes(tokens, "--font-size-page-title", "tokens.css should define page title size token");
expectIncludes(tokens, "--font-size-section-title", "tokens.css should define section title size token");
expectIncludes(tokens, "--font-size-card-title", "tokens.css should define card title size token");
expectIncludes(tokens, "--font-size-body", "tokens.css should define body size token");
expectIncludes(tokens, "--font-size-small", "tokens.css should define small text size token");

const styles = read("assets/css/main.css");
expectIncludes(styles, "@media (max-width: 960px)", "main.css should include tablet breakpoint");
expectIncludes(styles, "@media (max-width: 720px)", "main.css should include mobile breakpoint");
expectIncludes(styles, ".media-card", "main.css should include image-driven card styles");
expectIncludes(styles, ".brand-strip", "main.css should include brand strip styles");
expectIncludes(styles, ".rfq-grid", "main.css should include RFQ layout styles");
expectIncludes(styles, ".hero-shell", "main.css should include the refined hero shell styles");
expectIncludes(styles, ".action-panel", "main.css should include the RFQ action panel styles");
expectIncludes(styles, ".footer-nav", "main.css should include shared footer nav styles");
expectIncludes(styles, ".card > * + *", "main.css should enforce consistent card content spacing");
expectIncludes(styles, ".media-card-body > * + *", "main.css should enforce spacing inside media card bodies");
expectIncludes(styles, ".section-heading > * + *", "main.css should enforce heading stack spacing");
expectIncludes(styles, ".hero-copy > * + *", "main.css should enforce hero content spacing");
expectIncludes(styles, ".page-hero .narrow", "main.css should enforce spacing inside page hero copy groups");
expectIncludes(styles, ".hero-band", "main.css should refine spacing between hero rows");
expectIncludes(styles, ".footer-grid > div", "main.css should enforce spacing inside footer columns");
expectIncludes(styles, ".lead {", "main.css should define a readable measure for lead paragraphs");
expectIncludes(styles, ".card h2,", "main.css should refine heading rhythm inside cards");
expectIncludes(styles, ".mini-card {", "main.css should stabilize the density of compact cards");
expectIncludes(styles, "font-size: var(--font-size-hero);", "main.css should map hero title to the hero token");
expectIncludes(styles, "font-size: var(--font-size-page-title);", "main.css should map page titles to the page title token");
expectIncludes(styles, "font-size: var(--font-size-section-title);", "main.css should map section titles to the section title token");
expectIncludes(styles, "font-size: var(--font-size-card-title);", "main.css should map card titles to the card title token");
expectIncludes(styles, "font-size: var(--font-size-body);", "main.css should map body copy to the body token");
expectIncludes(styles, "font-size: var(--font-size-small);", "main.css should map small text to the small token");

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
