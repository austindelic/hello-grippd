// A tiny web app: one page that greets you and counts visits since the server started.
let visits = 0;

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/") return new Response("Not found\n", { status: 404 });
    visits++;
    const name = url.searchParams.get("name")?.slice(0, 40) || "there";
    const safe = name.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
    return new Response(
      `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hello</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font: 18px/1.6 system-ui, sans-serif; }
  h1 { font-size: 44px; margin: 0 0 8px; }
  p { margin: 0; opacity: 0.7; }
</style>
</head>
<body>
  <main>
    <h1>Hello, ${safe}</h1>
    <p>This page has been loaded ${visits} time${visits === 1 ? "" : "s"}. Try <code>?name=you</code>.</p>
  </main>
</body>
</html>`,
      { headers: { "content-type": "text/html; charset=utf-8" } },
    );
  },
};
