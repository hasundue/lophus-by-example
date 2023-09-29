// Global timeline streaming
import { Relay } from "lophus/client";
import { Timestamp } from "lophus/lib/times";
import { ConsoleLogger } from "lophus/lib/logging";

new Relay("wss://nos.lol")
  .subscribe({ kinds: [1], since: Timestamp.now })
  .pipeTo(new ConsoleLogger());
