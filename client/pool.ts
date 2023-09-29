// Stream from multiple relays with a relay pool
import { RelayPool } from "lophus/lib/pools";
import { Timestamp } from "lophus/lib/times";
import { ConsoleLogger } from "lophus/lib/logging";

new RelayPool("wss://nos.lol", "wss://relay.nostr.band")
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
