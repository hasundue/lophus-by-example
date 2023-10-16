// Publish a text note
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol");

new EventPublisher(relay, env.PRIVATE_KEY)
  .publish({
    kind: 1,
    content:
      "Hello, Nostr! This is Lophus, yet another JS/TS library for Nostr!",
  })
  .then(relay.close);
