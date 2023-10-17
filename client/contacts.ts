// Publish contact list
import { Relay } from "$lophus/core/relays.ts?nips=1,2";
import { type PublicKey, Signer } from "$lophus/lib/signs.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol");
const signer = new Signer(env.PRIVATE_KEY);

relay.publish(signer.sign({
  kind: 3,
  content: "",
  tags: [
    ["p", env.PUBLIC_KEY, "wss://nos.lol", "me"],
    ["p", "02c0e..." as PublicKey, "wss://nos.lol", "friend"],
  ],
})).then(relay.close);
