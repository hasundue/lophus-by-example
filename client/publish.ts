// Publish a text note with NIP-7 extension
import { Relay } from "$lophus/core/relays.ts?nips=1,7";
import { Signer } from "$lophus/nips/07/signs.ts";

new Relay("wss://nos.lol")
  .publish(new Signer().sign({
    kind: 1,
    content: "This is Lophus, a fully-modular TypeScript library for Nostr.",
  }));
