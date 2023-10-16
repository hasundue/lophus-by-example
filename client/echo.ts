// Echo bot
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { Transformer } from "$lophus/lib/streams.ts";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nostr-dev.wellorder.net");

relay.subscribe({ kinds: [1], "#p": [env.PUBLIC_KEY] })
  .pipeThrough(new Transformer((ev) => ({ kind: 1, content: ev.content })))
  .pipeTo(new EventPublisher(relay, env.PRIVATE_KEY));
