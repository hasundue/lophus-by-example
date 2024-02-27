// Echo bot
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
