// Publish a metadata (profile) event to the relay.
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol");

new EventPublisher(relay, env.PRIVATE_KEY)
  .publish({
    kind: 0,
    content: {
      name: "Lophus",
      about: "Fully-modular library for Nostr.",
      picture: "https://chiezo.dev/lophus.png",
    },
  })
  .then(relay.close);
