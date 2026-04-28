# MVP del bot Atrio — especificación ampliada

Documento de trabajo para alinear visión de producto, guion de un **video demostrativo** y, más adelante, alcance técnico real del bot. Se asume **superficie WhatsApp** como entrada principal y **enlaces web** para pasos que no caben bien en chat (swipe, agendamiento).

---

## 0. Alcance del video (meramente demostrativo)

Este documento describe **cómo vamos a trabajar** y el **flujo** que queremos mostrar a los brokers. El video **no compromete** UI final, ni stack, ni reglas de negocio cerradas.

- **Interfaz en pantalla:** puede ser **esquemática, simbólica o de prototipo** (wireframes, mockups genéricos, Remotion, placeholders). No hace falta pixel-perfect ni design system definitivo.
- **Sin autenticación en el guion del video:** no mostrar login, tokens ni límites de propiedades; el enlace “funciona” como recurso narrativo para enseñar el recorrido.
- **Sin cap de cantidad** en la demo: el número de fichas o resultados es el que sirva al relato (3, 5, 12…); no es una especificación.
- **Agendamiento:** basta una **representación simple** (calendario genérico, dos opciones de horario, texto “Visita agendada”) para cerrar la historia.
- **Lo que sí debe quedar claro en el video:** la **secuencia** — WhatsApp → enlace broker (curar) → enlace cliente (swipe + favoritas + agendar) → notificación al broker → fin.
- **Todo puede evolucionar** cuando pase a producto real; este archivo es ancla para **comunicar el flujo**, no contrato de entrega.

El resto del documento mezcla **narrativa útil para el video** y **detalle orientado a un MVP de producto futuro** (secciones 3–4 y tabla 7); para editar solo el audiovisual, prioriza las fases 5 y 9 y la sección 0.

---

## 1. Resumen ejecutivo

El MVP demuestra un flujo completo **desde la búsqueda en WhatsApp** hasta que **el cliente final** agenda **visitas** a las propiedades que le interesaron. El proceso **termina** cuando el cliente confirma en el enlace la(s) cita(s) de visita (fecha/hora o franja acordada según diseño del MVP). En el medio, el **broker** recibe un enlace con el resultado de la búsqueda, revisa fichas en un modo tipo **Tinder** (una propiedad a la vez) y elige cuáles enviar al cliente, respetando disponibilidad.

**Dataset de demostración:** ~100 propiedades ficticias o semilla en el **Área Metropolitana de Monterrey (AMM)**, mezcla **venta y renta**, enfoque **residencial** (con tipologías extensibles a comercial/industrial según tabla de tipos).

---

## 2. Actores y objetivos


| Actor                                  | Rol en el MVP                                                                  | Objetivo                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Broker (miembro de la red)             | Pregunta al bot en lenguaje natural o sigue un cuestionario guiado             | Obtener matches acotados y un enlace para curar antes de pasar al cliente                                            |
| Broker (misma sesión o paso siguiente) | Abre enlace “resultados + swipe interno”                                       | Filtrar visualmente, descartar no disponibles, seleccionar candidatas finales                                        |
| Cliente del broker                     | Recibe enlace distinto (más simple, orientado a decisión y cierre)             | Ver fichas con **swipe** (no me interesa / me interesa) y, al final, **agendar visita** a las propiedades que eligió |
| Sistema                                | Persiste criterios, resultados, estados de disponibilidad, selecciones y citas | Orquestar: búsqueda → resultados → subset broker → subset cliente → **agendamiento** → **sesión cerrada**            |


---

## 3. Dimensión de búsqueda (lo que el bot debe entender)

El bot debe poder **extraer, confirmar o preguntar** por los siguientes ejes. En MVP se puede combinar **NLU + botones/listas** en WhatsApp para no depender solo del texto libre.

### 3.1 Operación

- **Tipo de operación:** `venta` | `renta` (mutuamente excluyente por búsqueda; si el usuario mezcla, el bot aclara).

### 3.2 Tipología de propiedad

Catálogo MVP sugerido (alineado a tu lista):

- `casa`
- `departamento`
- `industrial`
- `comercial`
- `oficina`
- `terreno`

Regla: el bot normaliza sinónimos (“depto”, “penthouse” → departamento; “bodega” → industrial o comercial según reglas simples del MVP).

### 3.3 Zona geográfica

- **Zona** como concepto de negocio (no solo pin en mapa): ej. San Pedro, Valle Oriente, Cumbres, zona sur, carretera nacional, etc.
- El MVP debe **clasificar cada propiedad del dataset con una o más zonas** y permitir filtro por zona explícita o por texto (“cerca de Valle”).
- Futuro cercano: polígonos o colonias; en MVP basta **taxonomía cerrada de zonas AMM** + alias.

### 3.4 Presupuesto

- Moneda implícita **MXN** en copy y datos de demo.
- Entrada posible: rango (`mín`–`máx`), “hasta X”, “desde X”, “alrededor de X”.
- El bot confirma en mensaje corto: *“Busco venta, departamento, Valle, hasta $8M.”*

### 3.5 Requerimientos especiales (filtros “soft” y “hard”)

Filtros o etiquetas que pueden venir en texto o checklist:

- **Amenidades:** alberca, gimnasio, seguridad 24h, roof garden, cuarto de servicio, estacionamiento N cajones, etc.
- **Uso / estilo:** compatible **Airbnb** (si el dato existe en ficha), **pet friendly**, amueblado / semi / sin amueblar.
- Otros ejemplos MVP: **recámaras mínimas**, **baños mínimos**, **m² mínimos**, **nivel** (PB, nivel alto).

Convención útil:

- **Hard filter:** descarta propiedades que no cumplan (ej. mínimo 3 recámaras).
- **Soft filter:** ordena o prioriza pero no excluye (ej. “ideal con alberca”).

Documentar en implementación qué etiquetas son hard vs soft en v1.

---

## 4. Dataset de demostración (~100 propiedades)

### 4.1 Composición sugerida

- **Total:** ~100 registros.
- **Operación:** mezcla **venta y renta** (ej. 70/30 o 60/40, ajustable para el video).
- **Tipología:** mayoría **casa + departamento**; incluir **algunos** terrenos/oficinas/comercial/industrial para mostrar que el **tipo** importa en la búsqueda.
- **Zona:** distribución realista sobre varias zonas del AMM.
- **Precio:** rangos creíbles por zona y tipo.
- **Media:** cada ficha con **fotos** (stock o placeholders), **título corto**, **descripción** (2–4 líneas estilo broker), **flags** (pet friendly, Airbnb, amenidades).

### 4.2 Ficha técnica mínima (para enlace y swipe)

Campos mínimos visibles en UI tipo Tinder:

- ID interno
- Operación, tipo, zona
- Precio (formateado, `tabular` si aplica)
- Recámaras / baños / m² (lo que exista)
- Descripción breve
- Galería (1 imagen hero en carta; carrusel opcional en detalle)
- Badges: amenidades y requisitos especiales
- **Estado de disponibilidad** (para el paso broker): disponible / en negociación / no disponible (MVP puede simular con toggle o datos fijos)

---

## 5. Flujo end-to-end (para producto y para video)

Numeración alineada a tu descripción. En el **video**, cada paso puede mostrarse de forma **resumida o simbólica**; en **producto**, estos pasos son la referencia funcional.

### Fase A — Búsqueda en WhatsApp

1. El broker inicia conversación con el bot (mensaje libre o menú).
2. El bot **recolecta criterios** (sección 3) hasta tener un conjunto **suficiente** para buscar o hasta que el broker diga “busca ya”.
3. El bot ejecuta búsqueda sobre el dataset y responde con:
  - **Resumen** en texto (número de resultados, 1 línea de criterios confirmados).
  - **Enlace único** al “reporte / sesión de resultados” (ver Fase B).

Mensaje tipo (ejemplo de tono, no copy final):

- *“Encontré 12 opciones. Abre el enlace para revisarlas una por una.”*

### Fase B — Enlace broker: revisión tipo Tinder

1. El broker abre el enlace (en **video**: sin explicar login ni seguridad; en **producto** se definirá cómo asegurar el acceso).
2. UI muestra **una propiedad a la vez** (foto grande, datos clave, descripción corta).
3. Gestos / acciones:
  - **Swipe izquierda** (o botón): descartar para esta sesión / no enviar al cliente.
  - **Swipe derecha** (o botón): **marcar como candidata** para enviar al cliente.
4. Reglas MVP:
  - Si la propiedad **ya no está disponible**, el broker puede marcarla o el sistema la muestra con etiqueta; idealmente **no** llega al cliente.
5. Al terminar la pila (o al pulsar “Listo”), el broker **confirma el subconjunto** a enviar al cliente.

### Fase C — Enlace cliente: selección con swipe + agendamiento de visitas

1. El sistema genera un **segundo enlace** (o la misma sesión en vista “cliente”) con **solo** las propiedades que el broker aprobó.
2. **Paso 1 — Curación con swipe:** el cliente recorre las fichas (carta + swipe o botones equivalentes):
  - **Izquierda / “No”:** no me interesa; la propiedad queda descartada para esta sesión.
    - **Derecha / “Sí”:** me interesa; pasa al conjunto **“me gustaron”** para el paso siguiente.
3. **Paso 2 — Revisión de favoritas:** pantalla resumen con la lista de propiedades que marcó con interés (puede quitar alguna antes de continuar).
4. **Paso 3 — Agendar visitas:** para cada propiedad que siga en la lista (o solo las que elija en esta pantalla), el cliente **programa la visita**:
  - MVP mínimo: elegir **fecha** y **franja horaria** (o slots propuestos por el broker / reglas fijas de demo).
    - Opcional MVP: notas cortas (“prefiero por la mañana”), teléfono de contacto si no se heredó del contexto.
5. **Confirmación y cierre del proceso:** al enviar el agendamiento, la UI muestra **confirmación** (“Visitas solicitadas” o mensaje equivalente) y el flujo del cliente **queda terminado**. No hay paso obligatorio posterior en el mismo enlace.
6. **Notificación al broker:** el broker recibe por **WhatsApp** (y/o resumen en panel MVP) un mensaje con:
  - propiedades que el cliente **marcó con interés**;
    - **fecha y hora (o franja)** solicitada(s) por propiedad;
    - estado de la sesión: **cerrada / completada** tras el agendamiento.

> **Regla de producto:** el **fin del MVP** en experiencia cliente es **agendar la visita** a las propiedades que le gustaron. Hasta ese momento el proceso no se considera cerrado.

### Fase D — Después del cierre (post-MVP o mensaje opcional)

- **Recordatorios**, reprogramación, firma de cita en calendario externo, CRM y comisión: pueden quedar **fuera** del MVP técnico; basta con el cierre descrito en Fase C.
- Opcional: el bot envía al broker un **recordatorio** en texto plano o un enlace de calendario en una iteración posterior.

---

## 6. Requisitos de experiencia (UX) en el enlace web

### Para el video

- Lo mínimo: que se **entienda** cada paso (chat → enlace → cartas → resumen → calendario ficticio → confirmación → WhatsApp al broker).
- **No** hace falta cumplir design system, accesibilidad ni rendimiento real.

### Para el producto (futuro)

- **Mobile-first:** broker y cliente en celular.
- **Flujo cliente en dos bloques:** (1) swipe sobre fichas, (2) **agendamiento** hasta confirmación.
- **Marca Atrio** (cuando exista UI real): Cal / Negro, Geist, etc., según design system.
- **Privacidad y enlaces:** expiración, tokens, límites — a definir en implementación; **no** son requisito del video.

---

## 7. Alcance explícito del MVP vs no-MVP


| Incluido en MVP                                                                                   | Fuera (post-MVP)                                                                    |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Búsqueda multi-criterio sobre dataset fijo ~100                                                   | Integración MLS real, inventario en vivo de todos los brokers                       |
| Enlace resultados + swipe broker + swipe cliente + **agendamiento de visitas** y cierre de sesión | App nativa, dashboard pesado                                                        |
| Disponibilidad simulada o manual                                                                  | Sync automático de estatus con portales                                             |
| Zonas como taxonomía AMM                                                                          | Mapas interactivos avanzados                                                        |
| Fichas con fotos y texto                                                                          | Tours 360, video walkthrough                                                        |
| Notificación al broker con citas solicitadas                                                      | Recordatorios automáticos, integración bidireccional con Google Calendar del broker |


---

## 8. Decisiones: video vs producto futuro

### Video demostrativo (no bloquea el guion)

- **Autenticación:** no mostrar ni resolver; el enlace “ya está listo” para la historia.
- **Límite de propiedades** en el enlace: no aplica; usa la cantidad que ayude al ritmo del clip.
- **Agendamiento:** representación **simbólica** (una pantalla de confirmación basta).
- El guion puede cambiar detalles visuales **sin actualizar** este documento, siempre que se mantenga el flujo de la sección 5.

### Producto real (para más adelante; no requerido para el video)

Temas a cerrar cuando se pase de demo a desarrollo:

1. Cómo **asegurar** enlaces (token, login, expiración).
2. **Límite** razonable de fichas por cliente para no saturar.
3. **Agendamiento:** slots fijos, disponibilidad del broker, integración con calendario.
4. **Varias propiedades:** una cita por propiedad vs flujo unificado.
5. **Idioma** y **marca visible** al cliente (Atrio, broker, ambos).

---

## 9. Guion sugerido para el video (storyboard rápido)

Enfoque **esquemático**: lo importante es la secuencia, no la fidelidad de cada pantalla.

1. **WhatsApp:** broker escribe criterios (ej. venta, depa, Valle, hasta $8M, pet friendly).
2. **Bot:** confirma y envía **enlace** (sin explicar cómo se genera ni protege).
3. **Pantalla simbólica (broker):** recorrido tipo “una ficha a la vez”; se ven 2–3 descartes y 2–3 guardadas (números ajustables).
4. **Pantalla simbólica (cliente):** mismo lenguaje visual genérico; swipe rápido.
5. **Resumen + calendario ficticio:** favoritas y elección de fecha/hora **ilustrativa**.
6. **Confirmación:** mensaje tipo “Visitas agendadas” — **fin del flujo del cliente**.
7. **WhatsApp (broker):** notificación resumida (propiedades + horarios + cierre); puede ser texto estático en el video.
8. Cierre: tagline / sinergia (voz Atrio, sin comprometer copy final).

---

## 10. Glosario rápido

- **Ficha técnica:** vista resumida de una propiedad con datos suficientes para decidir en segundos.
- **Swipe / Tinder:** patrón de una tarjeta a la vez, decisión binaria, cola de candidatos.
- **AMM:** Área Metropolitana de Monterrey.
- **Sesión de búsqueda:** unidad que amarra criterios + conjunto de IDs resultado + selecciones broker + selecciones cliente + **agendamiento de visitas** hasta estado **completado**.
- **Cierre del proceso:** momento en que el cliente confirma en el enlace web la(s) visita(s); después solo notificación al broker y eventual seguimiento operativo fuera del MVP.

---

*Última actualización: sección 0 (video meramente demostrativo); UX y decisiones separadas en “video” vs “producto futuro”; eliminación de autenticación y límites como requisitos del audiovisual.*