README.txt

Proyecto: MyL Suplementos Deportivos - Comparación Bootstrap y UnoCSS

Este archivo tiene algunas consideraciones importantes y cosas a tener en cuenta sobre cómo trabajamos con **Bootstrap** y **UnoCSS** en este proyecto. La idea es que sirva como guía rápida para cualquier integrante del grupo que necesite entender nuestras decisiones.

1) Consideraciones generales
-----------------------------
- Ambos enfoques permiten construir sitios web responsivos de manera rápida.
- **Bootstrap** es un framework completo con componentes prearmados (navbars, cards, modals, etc.).
- **UnoCSS** es un motor de utilidades (utility-first) que genera las clases necesarias de forma dinámica, similar a Tailwind pero más ligero.
- La elección depende de si se prioriza **velocidad y estandarización** (Bootstrap) o **flexibilidad y rendimiento** (UnoCSS).

2) Bootstrap
-------------
Ventajas:
- Muy popular, con muchísimos ejemplos, tutoriales y documentación.
- Gran cantidad de componentes listos para usar (navbars, modals, grids, etc.).
- Facilita prototipar rápido sin mucho CSS manual.
- Amplia comunidad y soporte.

Desventajas:
- Puede sentirse repetitivo o "igual a todos" si no se personaliza.
- Requiere aprender muchas clases específicas.
- Personalizar estilos avanzados suele necesitar CSS adicional.
- El CSS cargado puede ser más pesado que el necesario si el proyecto es pequeño.

3) UnoCSS
----------
Ventajas:
- Muy liviano: genera solo las clases que realmente se usan.
- Extremadamente flexible: se pueden crear utilidades personalizadas fácilmente.
- Filosofía utility-first, lo que da control absoluto sobre el diseño sin necesidad de CSS extra.
- Integración directa con proyectos modernos (Vue, React, Vite, etc.).

Desventajas:
- Curva de aprendizaje más alta para quienes no están acostumbrados a utilidades tipo Tailwind.
- No trae componentes listos: hay que construirlos manualmente (botones, modals, etc.).
- Menos documentación y ejemplos que Bootstrap.
- Para principiantes puede ser más difícil lograr consistencia si no hay un diseño definido.

4) Cosas importantes al trabajar en grupo
-----------------------------------------
- No mezclar clases de Bootstrap con UnoCSS en los mismos archivos: generan conflictos y confusión.
- Definir desde el inicio si el proyecto usa un framework o el otro, y respetarlo en todo el equipo.
- Mantener consistencia en colores, tipografías y espaciados: en Bootstrap con variables/CSS, en UnoCSS con presets/configuración.
- Revisar siempre el diseño en dispositivos móviles: ambos soportan responsive, pero con distinta lógica.
- Documentar cualquier clase personalizada o configuración adicional que se use en UnoCSS.

5) Recomendaciones
------------------
- Para proyectos rápidos, prototipos o cuando se busca facilidad: **Bootstrap** es la opción más directa.
- Para proyectos donde se prioriza rendimiento, personalización y un look único: **UnoCSS** puede ser más potente.
- Si el grupo tiene distintos niveles de experiencia, Bootstrap es más accesible.
- En proyectos más técnicos y modernos, UnoCSS se integra mejor con entornos de desarrollo actuales.

6) Aclaraciones
----------------
- Ambos enfoques son válidos: Bootstrap da rapidez y componentes, UnoCSS da control y ligereza.
- La diferencia principal está en la filosofía: Bootstrap = framework completo, UnoCSS = utilidades bajo demanda.
- Antes de empezar, acordar en grupo qué se prioriza: velocidad de desarrollo, personalización o ligereza del sitio.
- Siempre consultar la documentación oficial:
  - Bootstrap: https://getbootstrap.com/
  - UnoCSS: https://unocss.dev/
