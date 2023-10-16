// Global timeline streaming
import { Relay } from "$lophus/core/relays.ts?nips=1";
import { Timestamp } from "$lophus/lib/times.ts";
import { ConsoleLogger } from "$lophus/lib/logging.ts";

new Relay("wss://nos.lol")
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
