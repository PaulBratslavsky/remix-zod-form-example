import { json } from "@remix-run/node";

export default function getTranscriptLoader() {
  return json({
    message: "Hello from get-transcript-action",
  });
}
