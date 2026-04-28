# WhatsApp UI Kit — Atrio Bot

The single product surface for Atrio. A closed WhatsApp conversation with `@atrio` in which a broker uploads inventory, searches by natural language, gets matches, and celebrates sinergias.

## Scope

This kit reconstructs an **iOS WhatsApp** chat — the surface most of Atrio's members will use. Android parity is visually similar and can be derived from these components.

This is a **visual reconstruction** of the WhatsApp chat surface, not a literal recreation — enough to showcase how Atrio's copy, rhythm, and attachments feel inside WhatsApp. Bubble colors match WhatsApp's published palette (outgoing `#DCF8C6`, incoming `#FFFFFF`, surface `#E5DDD5`).

## Components

- `PhoneFrame.jsx` — iPhone bezel + status bar + home indicator.
- `ChatHeader.jsx` — WhatsApp chat header (back, avatar, name, presence).
- `ChatComposer.jsx` — WhatsApp composer (attachment, input, mic/send).
- `MessageBubble.jsx` — incoming / outgoing bubble with timestamp + ticks.
- `TypingDots.jsx` — the three-dot typing indicator.
- `PropertyCard.jsx` — rich property card embedded in a message.
- `DaySeparator.jsx` — centered pill "HOY" / "AYER".
- `SystemNote.jsx` — centered pale-yellow system message ("Cerraste tu primera sinergia").
- `AtrioAvatar.jsx` — circular avatar using the Atrio spiral.

## Interactive flow (index.html)

1. Welcome from bot: *"Bienvenido a Atrio. Ya eres parte de la red."*
2. Broker uploads inventory (paperclip → attached PDF), bot confirms.
3. Broker searches by natural language.
4. Bot responds with matched property cards.
5. Broker taps a card → receives contact.
6. System note: *"Cerraste tu primera sinergia. Eso es Atrio."*

All message scripting is fake; there is no backend call.

## Caveats

- We do not have the real Atrio bot transcript; copy is drawn from the messaging block of the brand guidelines (welcome, first upload, 7-day nudge, first close) plus plausibly-worded extensions that obey the voice pillars.
- The iPhone status-bar chrome is a plain CSS recreation, not a licensed Apple asset.
