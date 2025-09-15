# Guía de Formato para Artículos del Blog

Esta guía define el formato estándar para todos los artículos del blog de Engelbert Huber. Úsala como referencia para mantener consistencia visual y legibilidad en todo el contenido.

## Estructura de Datos del Artículo

Todos los artículos se definen en `src/data/content.ts` con la siguiente estructura:

```typescript
{
  id: '4',
  title: 'Título del Artículo',
  content: `Contenido en markdown...`,
  excerpt: 'Resumen breve del artículo para mostrar en las tarjetas.',
  date: '2025-09-15',
  category: 'writing', // o 'interviews'
  tags: ['IA', 'Tecnología', 'Término1', 'Término2'],
  featured: true // o false
}
```

## Reglas de Formato del Contenido

### 1. NO incluir título H1 en el contenido
❌ **INCORRECTO:**
```markdown
content: `# Título del Artículo

El contenido empieza aquí...`
```

✅ **CORRECTO:**
```markdown
content: `El contenido empieza directamente aquí...`
```

**Razón:** El título se maneja automáticamente por el componente desde el campo `title`.

### 2. Primer párrafo con Drop-cap
El primer párrafo debe configurarse para tener letra inicial grande. Agregar el texto del primer párrafo a la condición `isDropCapParagraph` en `src/app/articles/[id]/page.tsx`:

```typescript
const isDropCapParagraph =
  text.startsWith('Durante más de cuatro décadas') ||
  text.startsWith('En las afueras de Melbourne') ||
  text.startsWith('La Generación Aumentada por Recuperación (RAG') ||
  text.startsWith('Tu nuevo primer párrafo aquí...')
```

### 3. Formato de Subtítulos
✅ **CORRECTO:**
```markdown
## **Subtítulo Principal**
## **¿Cómo funciona la IA?**
## **Los Tres Paradigmas: Evolución Tecnológica**
```

**Características:**
- Usar `##` (H2)
- Subtítulo entre `**negritas**`
- Títulos descriptivos y atractivos
- Usar dos puntos para subtítulos explicativos

### 4. Secciones con Encabezados
✅ **CORRECTO:**
```markdown
**Recuperación**: Cuando un usuario realiza una consulta...

**Procesamiento**: La información se combina con...

**Generación**: El resultado final se produce...
```

**Características:**
- Encabezado de sección en `**negritas**` seguido de `:`
- Explicación en texto normal
- Una línea en blanco entre secciones

### 5. Listas y Enumeraciones
✅ **CORRECTO:**
```markdown
Los desarrollos se pueden clasificar en tres paradigmas:

**RAG Básico (Naive RAG)**: La implementación inicial y más sencilla...

**RAG Avanzado (Advanced RAG)**: Introduce mejoras en el proceso...

**RAG Modular (Modular RAG)**: Es el enfoque más reciente...
```

**Características:**
- Cada elemento de lista con encabezado en `**negritas**`
- Explicación en texto normal
- Una línea en blanco entre elementos

### 6. EVITAR Negritas Excesivas
❌ **INCORRECTO:**
```markdown
El **proceso** de **RAG** utiliza **LLM** y **API** para crear **prompts** con **información** actualizada.
```

✅ **CORRECTO:**
```markdown
El proceso de RAG utiliza LLM y API para crear prompts con información actualizada.
```

**Regla:** Solo usar negritas en:
- Subtítulos principales
- Encabezados de sección
- Elementos de lista principales
- NO en palabras sueltas dentro de párrafos

### 7. Párrafos y Texto Corrido
✅ **CORRECTO:**
```markdown
La inteligencia artificial generativa está transformando múltiples industrias. Esta tecnología permite crear contenido original basado en patrones aprendidos de grandes conjuntos de datos.

Las aplicaciones incluyen generación de texto, imágenes y código. Los modelos más avanzados pueden mantener coherencia contextual a lo largo de conversaciones extensas.
```

**Características:**
- Párrafos en texto normal sin formato excesivo
- Una línea en blanco entre párrafos
- Texto fluido y legible

## Ejemplos Completos

### ✅ Estructura Correcta
```markdown
content: `La inteligencia artificial está revolucionando la forma en que trabajamos. Esta tecnología emergente ofrece capacidades sin precedentes para automatizar tareas complejas.

## **¿Cómo Funciona la IA Moderna?**

El proceso generalmente sigue estos pasos:

**Entrenamiento**: Los modelos aprenden de grandes conjuntos de datos...

**Inferencia**: Una vez entrenados, pueden procesar nuevas consultas...

**Optimización**: Los resultados se refinan continuamente...

## **Tres Aplicaciones Transformadoras**

**Generación de Contenido**: Creación automática de texto, imágenes y videos.

**Análisis Predictivo**: Identificación de patrones para predecir tendencias futuras.

**Automatización Inteligente**: Optimización de procesos empresariales complejos.

Las implicaciones de esta tecnología son profundas y continuarán expandiéndose en los próximos años.`
```

### ❌ Estructura Incorrecta
```markdown
content: `# La IA está Revolucionando Todo

La **inteligencia artificial** está **revolucionando** la forma en que **trabajamos**. Esta **tecnología** emergente ofrece **capacidades** sin precedentes.

## Como Funciona la IA Moderna

El **proceso** de **IA** generalmente sigue estos **pasos**:

• **Entrenamiento**: Los **modelos** aprenden de **grandes** conjuntos de **datos**...
• **Inferencia**: Una vez **entrenados**, pueden **procesar** nuevas **consultas**...

**Aplicaciones**: **Generación** de **contenido**, **análisis** predictivo, **automatización**.`
```

## Checklist de Calidad

Antes de agregar un artículo, verifica:

- [ ] El contenido NO incluye título H1
- [ ] El primer párrafo está configurado para drop-cap
- [ ] Los subtítulos usan formato `## **Título**`
- [ ] Las secciones tienen encabezados `**Sección**:`
- [ ] NO hay negritas excesivas en párrafos
- [ ] Hay líneas en blanco entre secciones
- [ ] El `excerpt` es descriptivo y atractivo
- [ ] Las `tags` son relevantes
- [ ] La `date` está en formato 'YYYY-MM-DD'

## Metadatos Importantes

### Categorías
- `'writing'`: Artículos originales
- `'interviews'`: Entrevistas y conversaciones

### Tags Recomendados
- `'IA'`: Inteligencia Artificial
- `'Tecnología'`: Temas tecnológicos generales
- `'Machine Learning'`: Aprendizaje automático
- `'Futuro'`: Tendencias y prospectiva
- `'Educación'`: Temas educativos

### Configuración Featured
- `featured: true`: Aparece en la sección destacados
- `featured: false`: Solo en listado completo

## Proceso de Publicación

Una vez que el artículo esté formateado correctamente:

### 1. Agregar al Repositorio
```bash
git add src/data/content.ts
git commit -m "feat: Add article about [topic]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin master
```

### 2. Deploy Automático
- **Vercel** detectará automáticamente el cambio en GitHub
- El deploy se activará sin intervención manual
- **NO ejecutar `npm run dev`** - el usuario no necesita ver cambios localmente

### 3. Verificación
- Esperar 2-3 minutos para que complete el deploy
- Verificar en https://www.ehuber.lat que el artículo aparezca correctamente
- Confirmar formato, tabla de contenidos, y navegación

### 4. Configuración Drop-cap (si es necesario)
Si es un nuevo artículo, agregar el primer párrafo a la condición en `src/app/articles/[id]/page.tsx`:

```typescript
const isDropCapParagraph =
  text.startsWith('Durante más de cuatro décadas') ||
  text.startsWith('En las afueras de Melbourne') ||
  text.startsWith('La Generación Aumentada por Recuperación (RAG') ||
  text.startsWith('Primer párrafo del nuevo artículo...')
```

## Notas para Claude Code

Cuando el usuario proporcione texto para un nuevo artículo:

1. **Analizar el contenido** y estructurarlo según esta guía
2. **Crear subtítulos atractivos** con formato `## **Título**`
3. **Organizar en secciones** con encabezados apropiados
4. **Evitar negritas excesivas** - solo en lugares estratégicos
5. **Configurar drop-cap** agregando el primer párrafo a la condición
6. **Generar metadatos** apropiados (excerpt, tags, date)
7. **Asignar ID único** incrementando el número más alto existente
8. **Hacer commit y push** inmediatamente para deploy automático
9. **NUNCA ejecutar `npm run dev`** - usar solo deploy de producción

Esta guía asegura consistencia visual y una experiencia de lectura profesional en todo el blog.