// Publish a text note with NIP-7 extension
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { Signer } from "$lophus/nips/07/signs.ts";

new Relay("wss://nos.lol", { modules: [nip_01] })
  .publish(new Signer().sign({
    kind: 1,
    content: "This is Lophus, a fully-modular TypeScript library for Nostr.",
  }));
