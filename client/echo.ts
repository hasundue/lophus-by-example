// Echo bot
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { Transformer } from "$lophus/lib/streams.ts";
import { EventInit, EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol");

relay.subscribe({ kinds: [1], "#p": [env.PUBLIC_KEY] })
  .pipeThrough(
    new Transformer((
      ev,
    ) => ({ kind: 1, content: ev.content } satisfies EventInit<1>)),
  )
  .pipeTo(new EventPublisher(relay, env.PRIVATE_KEY));
