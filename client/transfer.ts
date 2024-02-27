// Transfer text notes from relay to relay
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
