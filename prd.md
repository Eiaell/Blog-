<prd>
  <meta>
    <title>Landing Personal - Engelbert Huber</title>
    <version>1.0</version>
    <owner>Engelbert Huber</owner>
    <status>Draft</status>
    <lastUpdated>2025-09-08</lastUpdated>
  </meta>

  <vision>
    <goal>
      Crear una landing personal estilo rowancheung.com para posicionar a Engelbert como operador de IA,
      mostrando su stack de herramientas, writing, entrevistas, media, y análisis político.
    </goal>
    <audience>
      Profesionales de IA, constructoras, educadores, policy-makers y potenciales clientes/aliados.
    </audience>
  </vision>

  <features>
    <feature id="hero">
      <description>Sección inicial con foto, tagline, highlight y links sociales.</description>
      <userStory>Como visitante quiero entender quién es Engelbert en 10 segundos.</userStory>
      <acceptanceCriteria>
        <criterion>Avatar visible y cargado sin errores.</criterion>
        <criterion>Nombre + tagline en tipografía clara.</criterion>
        <criterion>Links sociales funcionales.</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="writing">
      <description>Sección de artículos y newsletter.</description>
      <userStory>Como lector quiero encontrar artículos y posts con valor práctico.</userStory>
      <acceptanceCriteria>
        <criterion>Grid con al menos 3 posts destacados.</criterion>
        <criterion>CTA “Ver todo” funcional.</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="interviews">
      <description>Selección de entrevistas relevantes.</description>
      <userStory>Como visitante quiero acceder a entrevistas para ver la red y perspectivas.</userStory>
      <acceptanceCriteria>
        <criterion>Miniaturas de entrevistas con título y enlace.</criterion>
        <criterion>CTA “Ver todo” funcional.</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="media">
      <description>Stack de media: Midjourney, Veo3, Nanobanana, Heygen, Elevenlabs, Kling.</description>
      <userStory>Como creador quiero conocer las herramientas audiovisuales que Engelbert domina.</userStory>
      <acceptanceCriteria>
        <criterion>Listado visible con descripciones.</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="aiStack">
      <description>Stack de IA incluyendo Gemini, Gemini CLI, Claude, Claude Code, ChatGPT, Codex, Grok, Deepseek.</description>
      <userStory>Como profesional quiero entender el stack actual de Engelbert.</userStory>
      <acceptanceCriteria>
        <criterion>Cada herramienta debe tener al menos 2 bullets de uso.</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="politica">
      <description>Sección para análisis y opinión en política.</description>
      <userStory>Como lector interesado en política quiero encontrar artículos y micro-ensayos en un solo lugar.</userStory>
      <acceptanceCriteria>
        <criterion>Título “Política” visible.</criterion>
        <criterion>Espacio en blanco listo para posts futuros.</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="timeline">
      <description>Life rundown con hitos clave (2019–2025).</description>
      <userStory>Como visitante quiero ver un recorrido rápido de la trayectoria de Engelbert.</userStory>
      <acceptanceCriteria>
        <criterion>Años y descripciones mostrados en orden cronológico.</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="newsletter">
      <description>Formulario de suscripción a newsletter.</description>
      <userStory>Como lector quiero suscribirme de manera simple con mi email.</userStory>
      <acceptanceCriteria>
        <criterion>Campo de email validado.</criterion>
        <criterion>Botón “Suscribirme” funcional (aunque sea mock).</criterion>
      </acceptanceCriteria>
    </feature>

    <feature id="footer">
      <description>Footer con copyright y stack técnico.</description>
      <userStory>Como visitante quiero saber el stack usado y confirmar autoría.</userStory>
      <acceptanceCriteria>
        <criterion>Texto © con año actual.</criterion>
        <criterion>Stack técnico visible en desktop.</criterion>
      </acceptanceCriteria>
    </feature>
  </features>

  <futureIdeas>
    <idea>Integración con blog dinámico (Notion API o CMS ligero).</idea>
    <idea>Embed de videos generados con Heygen y Elevenlabs.</idea>
    <idea>Feed en vivo de X o LinkedIn.</idea>
    <idea>Subsección de análisis comparativo entre IA y política.</idea>
  </futureIdeas>
</prd>