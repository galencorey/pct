// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/veras/Desktop/pct/.cache/layouts/index.js"))
}

exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/veras/Desktop/pct/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/veras/Desktop/pct/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/veras/Desktop/pct/src/pages/index.js")),
  "component---src-pages-page-2-js": preferDefault(require("/Users/veras/Desktop/pct/src/pages/page-2.js"))
}

exports.json = {
  "layout-index.json": require("/Users/veras/Desktop/pct/.cache/json/layout-index.json"),
  "dev-404-page.json": require("/Users/veras/Desktop/pct/.cache/json/dev-404-page.json"),
  "layout-index.json": require("/Users/veras/Desktop/pct/.cache/json/layout-index.json"),
  "404.json": require("/Users/veras/Desktop/pct/.cache/json/404.json"),
  "layout-index.json": require("/Users/veras/Desktop/pct/.cache/json/layout-index.json"),
  "index.json": require("/Users/veras/Desktop/pct/.cache/json/index.json"),
  "layout-index.json": require("/Users/veras/Desktop/pct/.cache/json/layout-index.json"),
  "page-2.json": require("/Users/veras/Desktop/pct/.cache/json/page-2.json"),
  "layout-index.json": require("/Users/veras/Desktop/pct/.cache/json/layout-index.json"),
  "404-html.json": require("/Users/veras/Desktop/pct/.cache/json/404-html.json")
}