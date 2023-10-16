# Lophus by Example

## Client

### Global timeline streaming

```ts
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { Timestamp } from "$lophus/lib/times.ts";
import { ConsoleLogger } from "$lophus/lib/logging.ts";

new Relay("wss://nos.lol")
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
```

### Stream from multiple relays with a relay pool

```ts
import { RelayPool } from "$lophus/lib/pools.ts";
import { Timestamp } from "$lophus/lib/times.ts";
import { ConsoleLogger } from "$lophus/lib/logging.ts";

new RelayPool("wss://nos.lol", "wss://relay.nostr.band")
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
```

### Publish a text note

```ts
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol");

new EventPublisher(relay, env.PRIVATE_KEY)
  .publish({
    kind: 1,
    content:
      "Hello, Nostr! This is Lophus, yet another JS/TS library for Nostr!",
  })
  .then(relay.close);
```

### Echo bot

```ts
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { Transformer } from "$lophus/lib/streams.ts";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nostr-dev.wellorder.net");

relay.subscribe({ kinds: [1], "#p": [env.PUBLIC_KEY] })
  .pipeThrough(new Transformer((ev) => ({ kind: 1, content: ev.content })))
  .pipeTo(new EventPublisher(relay, env.PRIVATE_KEY));
```

### Transfer your notes from relay to relay

```ts
import { Relay } from "$lophus/core/relays.ts";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

new Relay("wss://relay.nostr.band")
  .subscribe({
    kinds: [1],
    authors: [env.PUBLIC_KEY],
  }, { realtime: false })
  .pipeTo(new EventPublisher(new Relay("wss://nos.lol"), env.PRIVATE_KEY));
```
