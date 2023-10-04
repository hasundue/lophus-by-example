// Publish a metadata (profile) event to the relay.
import { Relay } from "lophus/core/relays";
import { EventPublisher } from "lophus/lib/events";
import { env } from "lophus/lib/env";

const relay = new Relay("wss://nos.lol");

new EventPublisher(relay, env.PRIVATE_KEY)
  .publish({
    kind: 0,
    content: {
      name: "Lophus",
      about:
        "Yet another JS/TS library for Nostr. https://github.com/hasundue/../../..",
      picture: "https://chiezo.dev/lophus.png",
    },
  })
  .then(relay.close);
