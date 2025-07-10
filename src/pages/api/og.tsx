import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Arian's blog";

    const hasPublishTime = searchParams.has("publishTime");
    const publishTime = hasPublishTime
      ? searchParams.get("publishTime")?.slice(0, 100)
      : "";

    const hasSummary = searchParams.has("summary");
    const description = hasSummary
      ? searchParams.get("summary")?.slice(0, 400)
      : "";

    return new ImageResponse(
      <div
        style={{
          backgroundColor: "#FED7AA",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "left",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
          flexWrap: "nowrap",
          padding: "4em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#592406",
          }}
        >
          <h1
            style={{
              fontSize: "4em",
              fontFamily: "sans-serif",
              margin: "0",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "2em",
              opacity: 0.65,
            }}
          >
            {description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: "normal",
            }}
          >
            <p
              style={{
                margin: "0",
                fontFamily: "unset",
                color: "#592406",
                opacity: 0.75,
                fontSize: "1.5em",
              }}
            >
              {publishTime}
            </p>
            <p
              style={{
                margin: "0",
                fontFamily: "sans-serif",
                color: "#592406",
                opacity: 0.75,
                fontSize: "1.5em",
              }}
            >
              Arian&apos;s blog | arian.gg
            </p>
          </div>
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3975 193.333L100 53.3334L186.603 193.333H13.3975Z"
              stroke="#592406"
              stroke-width="10"
            />
            <path
              d="M186.603 6.66663L100 146.667L13.3975 6.66663H186.603Z"
              stroke="#592406"
              stroke-width="10"
            />
          </svg>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
