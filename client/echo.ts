// Echo bot
import { Relay } from "lophus/core/relays";
import { Transformer } from "lophus/lib/streams";
import { EventPublisher } from "lophus/lib/events";
import { env } from "lophus/lib/env";

const relay = new Relay("wss://nostr-dev.wellorder.net");

relay.subscribe({ kinds: [1], "#p": [env.PUBLIC_KEY] })
  .pipeThrough(new Transformer((ev) => ({ kind: 1, content: ev.content })))
  .pipeTo(new EventPublisher(relay, env.PRIVATE_KEY));
