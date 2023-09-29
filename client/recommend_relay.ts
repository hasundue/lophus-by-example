// Recommend relays
import { Relay } from "lophus/client";
import { EventPublisher } from "lophus/lib/events";
import { env } from "lophus/lib/env";

const relay_url = "wss://nostr-dev.wellorder.net";
const relay = new Relay(relay_url);

new EventPublisher(relay, env.PRIVATE_KEY)
  .publish({
    kind: 2,
    content: relay_url,
  })
  .then(relay.close);
