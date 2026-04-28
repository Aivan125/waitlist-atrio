/** Copy Acto B — escena Agent Chat (dos ejemplos en una misma tarjeta). */

// --- Ejemplo 1 (Monterrey / renta) ---

export const AGENT_USER_MESSAGE =
  "Busco casa en renta en Monterrey que sea pet friendly, presupuesto 10-15 mil pesos mensuales";

export const AGENT_LISTING_LINK = "https://app.brokernetwork.ai/listing/rth234jkaead";

export const AGENT_AI_SEGMENTS = [
  "He encontrado 1 opción de casa en renta en Monterrey que es pet friendly:",
  "• Título: Renta casa con jardín",
  "• Ubicación: Tecnológico, Monterrey, Nuevo León",
  "• Amenidades: jardín, pet friendly, estacionamiento",
  "• Renta mensual: 14,000 MXN",
  `Link: ${AGENT_LISTING_LINK}`,
  "Si necesitas más información, no dudes en preguntar.",
] as const;

// --- Ejemplo 2 (San Nicolás / venta — de la captura de WhatsApp) ---

export const AGENT2_USER_MESSAGE =
  "Busco casa en venta en San Nicolás con presupuesto entre 2 y 3 millones";

export const AGENT2_LISTING_LINK = "https://app.brokernetwork.ai/listing/san-nicolas";

export const AGENT2_AI_SEGMENTS = [
  "He encontrado 2 opciones de casas en venta en San Nicolás dentro de tu presupuesto:",
  "• Título: Casa en Jardines de Casa Blanca, San Nicolás",
  "• Ubicación: Jardines de Casa Blanca, San Nicolás de los Garza, Nuevo León",
  "• Amenidades: alberca, estacionamiento, seguridad",
  "• Precio de venta: 2,800,000 MXN",
  `Link: ${AGENT2_LISTING_LINK}`,
  "Si necesitas ver la segunda opción o ficha completa, dímelo.",
] as const;

export const AGENT_CHAT_HEADER_TITLE = "BrokerNetwork AI";
