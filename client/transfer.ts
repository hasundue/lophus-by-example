// Transfer your notes from relay to relay
import { Relay } from "lophus/client";
import { EventPublisher } from "lophus/lib/events";
import { env } from "lophus/lib/env";

new Relay("wss://relay.nostr.band")
  .subscribe({
    kinds: [1],
    authors: [env.PUBLIC_KEY],
  }, { realtime: false })
  .pipeTo(new EventPublisher(new Relay("wss://nos.lol"), env.PRIVATE_KEY));
