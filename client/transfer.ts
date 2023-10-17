// Transfer text notes from relay to relay
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { Signer } from "$lophus/lib/signs.ts";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

new Relay("wss://relay.nostr.band")
  .subscribe({
    kinds: [1],
    authors: [env.PUBLIC_KEY],
  }, { realtime: false })
  .pipeThrough(new EventPublisher(new Signer(env.PRIVATE_KEY)))
  .pipeTo(new Relay("wss://nos.lol"));
