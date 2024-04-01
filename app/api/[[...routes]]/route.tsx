/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { abi } from "./abi.js";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame("/", (c) => {
  return c.res({
    action: "/second",
    image: (
      <div
        style={{
          color: "white",
          fontSize: 60,
          fontStyle: "normal",
          letterSpacing: "-0.025em",
          lineHeight: 1.4,
          marginTop: 30,
          padding: "0 120px",
          whiteSpace: "pre-wrap",
        }}
      >
        This is our first frame
      </div>
    ),
    intents: [
      <Button>Go to the next frame</Button>,
      <Button.Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
        Go to the video
      </Button.Link>,
      <Button.Transaction target="/mint">Mint the NFT</Button.Transaction>
    ],
  });
});

app.frame("/second", (c) => {
  return c.res({
    image: (
      <div
        style={{
          color: "white",
          fontSize: 60,
          fontStyle: "normal",
          letterSpacing: "-0.025em",
          lineHeight: 1.4,
          marginTop: 30,
          padding: "0 120px",
          whiteSpace: "pre-wrap",
        }}
      >
        This is our second frame
      </div>
    ),
    intents: [<Button>Go to the next frame</Button>],
  });
});

app.transaction("/mint", (c) => {
  const { inputText } = c;

  return c.contract({
    abi,
    chainId: "eip155:84532",
    functionName: "mint",
    to: "0xe5138d2B0f718871fe28B12Caa9c71432a7EfBC0",
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
