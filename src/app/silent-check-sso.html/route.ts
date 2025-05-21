import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
    <title>Silent SSO Check</title>
    <script>
        parent.postMessage(location.href, location.origin);
    </script>
</head>
<body>
    <!-- Silent check for SSO -->
</body>
</html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
