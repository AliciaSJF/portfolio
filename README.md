# Animación de Scroll - Portfolio

## 📋 Descripción

Este proyecto contiene una animación interactiva donde la imagen de una cabeza se mete dentro de una caja cuando el usuario hace scroll en la página. La animación mantiene su escala y funcionalidad intacta sin importar dónde se implemente.

## 🎯 Características

- ✅ **Animación activada por scroll**: La cabeza se mueve hacia la caja al hacer scroll
- ✅ **Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla
- ✅ **Snippet reutilizable**: Código que puedes copiar y usar en cualquier lugar
- ✅ **Seguimiento del mouse**: Las pupilas siguen el cursor del mouse
- ✅ **Efectos hover**: Interactividad adicional al pasar el mouse
- ✅ **Optimizado**: Usa Intersection Observer y requestAnimationFrame para mejor rendimiento

## 📁 Estructura de Archivos

```
portfolio/
├── img/
│   ├── box.png          # Imagen de la caja
│   ├── head.png         # Imagen de la cabeza
│   ├── pupil.png        # Imagen de las pupilas
│   └── pupil copy.png   # Copia de respaldo
├── index.html           # Página principal
├── styles.css           # Estilos CSS
├── script.js            # JavaScript principal
├── animation-snippet.html # Snippet reutilizable
└── README.md           # Este archivo
```

## 🚀 Cómo usar

### Opción 1: Ejecutar el proyecto completo
1. Abre `index.html` en tu navegador
2. Desplázate hacia abajo para ver la animación

### Opción 2: Usar el snippet reutilizable
1. Abre `animation-snippet.html`
2. Copia el código HTML, CSS y JavaScript
3. Pégalo en tu proyecto
4. Ajusta las rutas de las imágenes si es necesario

## 🎨 Personalización

### Cambiar tamaños
```css
.animation-wrapper {
    width: 500px;  /* Cambia el ancho */
    height: 500px; /* Cambia la altura */
}
```

### Ajustar sensibilidad del scroll
```javascript
scrollThreshold: 300  // Más píxeles = menos sensible
```

### Modificar velocidad de animación
```css
.head-image {
    transition: all 1.2s ease; /* Más segundos = más lento */
}
```

## 📱 Responsive Design

La animación se adapta automáticamente:
- **Desktop**: 400px × 400px
- **Tablet**: 300px × 300px  
- **Mobile**: 250px × 250px

## 🔧 Funciones JavaScript Disponibles

```javascript
// Crear nueva instancia
const animation = new ScrollAnimation('.mi-contenedor');

// Resetear animación
animation.reset();

// Forzar estado
animation.setScrollState(true);

// Crear snippet programáticamente
const snippet = createScrollAnimationSnippet({
    size: { width: '500px', height: '500px' },
    scrollThreshold: 300
});
```

## 🎯 Características Técnicas

- **CSS**: Transiciones suaves con cubic-bezier
- **JavaScript**: Intersection Observer para optimización
- **Responsive**: Media queries para diferentes dispositivos
- **Performance**: RequestAnimationFrame para animaciones fluidas
- **Accesibilidad**: Alt tags en todas las imágenes

## 🐛 Solución de Problemas

### La animación no funciona
- Verifica que las rutas de las imágenes sean correctas
- Asegúrate de que el JavaScript se carga después del HTML
- Comprueba la consola del navegador para errores

### Las imágenes no se ven
- Confirma que las imágenes estén en la carpeta `img/`
- Verifica los nombres de archivo (case-sensitive)
- Comprueba los permisos de archivo

### La animación es muy lenta/rápida
- Ajusta `scrollThreshold` en el JavaScript
- Modifica los valores de `transition` en el CSS

## 📄 Licencia

Este proyecto es de uso libre. Puedes modificarlo y usarlo como desees.

## 🤝 Contribuciones

¡Las mejoras son bienvenidas! Siéntete libre de:
- Optimizar el código
- Añadir nuevas características
- Mejorar la documentación
- Reportar bugs

---

**¡Disfruta de tu animación! 🎉**
