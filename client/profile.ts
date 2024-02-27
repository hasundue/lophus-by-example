// Publish a metadata (profile) event to the relay.
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { Signer } from "$lophus/lib/signs.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol", { modules: [nip_01] });
const signer = new Signer(env.PRIVATE_KEY);

relay.publish(signer.sign({
  kind: 0,
  content: {
    name: "Lophus",
    about: "Fully-modular library for Nostr.",
    picture: "https://chiezo.dev/lophus.png",
  },
})).then(relay.close);
