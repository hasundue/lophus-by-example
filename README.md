# Lophus by Example

## Client

### Global timeline streaming

```ts
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { Timestamp } from "$lophus/lib/times.ts";
import { ConsoleLogger } from "$lophus/lib/logging.ts";

new Relay("wss://nos.lol", { modules: [nip_01] })
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
```

### Stream from multiple relays with a relay group

```ts
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { RelayGroup } from "$lophus/lib/relays.ts";
import { Timestamp } from "$lophus/lib/times.ts";
import { ConsoleLogger } from "$lophus/lib/logging.ts";

const relays = [
  new Relay("wss://nos.lol", { modules: [nip_01] }),
  new Relay("wss://relay.nostr.band"),
];

new RelayGroup(relays)
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
```

### Publish a text note with NIP-7 extension

```ts
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { Signer } from "$lophus/nips/07/signs.ts";

new Relay("wss://nos.lol", { modules: [nip_01] })
  .publish(new Signer().sign({
    kind: 1,
    content: "This is Lophus, a fully-modular TypeScript library for Nostr.",
  }));
```

### Publish contact list

```ts
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { type PublicKey, Signer } from "$lophus/lib/signs.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol", { modules: [nip_01] });
const signer = new Signer(env.PRIVATE_KEY);

relay.publish(signer.sign({
  kind: 3,
  content: "",
  tags: [
    ["p", env.PUBLIC_KEY, "wss://nos.lol", "me"],
    ["p", "02c0e..." as PublicKey, "wss://nos.lol", "friend"],
  ],
})).then(relay.close);
```

### Echo bot

```ts
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { Transformer } from "$lophus/lib/streams.ts";
import { EventInit, EventPublisher } from "$lophus/lib/events.ts";
import { TextNoteComposer } from "$lophus/lib/notes.ts";
import { Signer } from "$lophus/lib/signs.ts";
import { env } from "$lophus/lib/env.ts";

const relay = new Relay("wss://nos.lol", { modules: [nip_01] });

relay.subscribe({ kinds: [1], "#p": [env.PUBLIC_KEY] })
  .pipeThrough(
    new Transformer((ev) =>
      new TextNoteComposer().compose(
        { kind: 1, content: ev.content } satisfies EventInit<1>,
        { replyTo: ev },
      )
    ),
  )
  .pipeThrough(new EventPublisher(new Signer(env.PRIVATE_KEY)))
  .pipeTo(new Relay("wss://nos.lol").writable);
```

### Transfer text notes from relay to relay

```ts
import { Relay as RelayBase } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { RelayUrl } from "$lophus/core/protocol.d.ts";
import { Signer } from "$lophus/lib/signs.ts";
import { EventPublisher } from "$lophus/lib/events.ts";
import { env } from "$lophus/lib/env.ts";

class Relay extends RelayBase {
  constructor(url: RelayUrl) {
    super(url, { modules: [nip_01] });
  }
}

new Relay("wss://relay.nostr.band")
  .subscribe({
    kinds: [1],
    authors: [env.PUBLIC_KEY],
  }, { realtime: false })
  .pipeThrough(new EventPublisher(new Signer(env.PRIVATE_KEY)))
  .pipeTo(new Relay("wss://nos.lol").writable);
```
