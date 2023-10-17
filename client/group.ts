// Stream from multiple relays with a relay group
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { RelayGroup } from "$lophus/lib/relays.ts";
import { Timestamp } from "$lophus/lib/times.ts";
import { ConsoleLogger } from "$lophus/lib/logging.ts";

const relays = [
  new Relay("wss://nos.lol"),
  new Relay("wss://relay.nostr.band"),
];

new RelayGroup(relays)
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
