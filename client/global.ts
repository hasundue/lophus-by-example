// Global timeline streaming
import { Relay } from "$lophus/core/relays.ts";
import nip_01 from "$lophus/nips/01/relays.ts";
import { Timestamp } from "$lophus/lib/times.ts";
import { ConsoleLogger } from "$lophus/lib/logging.ts";

new Relay("wss://nos.lol", { modules: [nip_01] })
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
