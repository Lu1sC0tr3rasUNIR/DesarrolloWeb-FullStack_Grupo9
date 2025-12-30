# Copilot Instructions - Librería Online (Grupo 9)

## Arquitectura del Proyecto

Este es un e-commerce de libros construido con **React + TypeScript + Vite + SCSS**. La arquitectura está basada en Context API con providers centralizados.

### Estructura de Datos Principal
- **Backend simulado**: `src/lib/myBackend.tsx` contiene datos hardcodeados de libros y credenciales de autenticación (`admin`/`admin`)
- **Estado global**: Manejado por `StorageProvider` que centraliza books, cart, filters y categories
- **Identificación única**: Los libros usan `isbn` como key en todos los Maps (no `id`)

## Convenciones Clave

### Sistema de Importaciones
- **Alias `@/`** apunta a `src/` (configurado en `vite.config.ts` y `tsconfig.app.json`)
- Siempre usar `@/components`, `@/hooks`, `@/interfaces`, etc. - nunca rutas relativas

### Gestión de Estado
- **NUNCA usar `useState` para datos compartidos** - siempre a través de StorageContext
- **Acceso al contexto**: Usar el hook `useLocalStorage()` que envuelve `useContext(StorageContext)`
- **Estructura del carrito**: `Map<string, ICartItem>` donde la key es el `isbn` del libro
- **Estructura de libros**: `Map<string, IBooks>` donde la key también es el `isbn`

### Patrones de Componentes

#### Componentes Reutilizables
Ubicados en `src/components/` con interfaces tipadas en `src/interfaces/components/`:

```tsx
// Ejemplo: Button con variantes
<Button 
  label="Texto" 
  onClick={handler} 
  variant="primary" | "success" | "base"
  icon="cart" // Opcional, del sistema Icons
/>
```

#### Páginas
- **Ruteo**: Usar `react-router-dom` v7 con rutas definidas en [App.tsx](src/App.tsx)
- **Layout condicional**: El componente `Layout` solo muestra Header/Navbar/Cart cuando `isAuthenticated === true`
- **Parámetros**: Las rutas dinámicas usan formato `/book/:isbn` (ej: [Book.tsx](src/pages/Book.tsx))

### Sistema de Estilos SCSS

#### Estructura Modular
```scss
// src/styles/global.scss importa todo usando @use
@use './typography/index' as typography;
@use './components/index' as components;
@use './variables/index' as variables;
```

#### Convenciones CSS
- **Naming**: BEM-style con prefijos (`container-book`, `button-base`, `book-reviews`)
- **Colores**: Usar función `colors.get-color("paper", 7)` de `variables/colors`
- **Archivos**: Un archivo SCSS por componente en `src/styles/components/_component.scss`

### TypeScript Patterns

#### Interfaces Tipadas
- **Ubicación estricta**: Cada tipo tiene su carpeta en `src/interfaces/`
  - Componentes → `interfaces/components/IButton.tsx`
  - Hooks → `interfaces/hooks/IUseCart.tsx`
  - Context → `interfaces/context/IStorageContext.tsx`

- **Exportación**: Las interfaces se exportan como default o named exports
- **Props**: Siempre tipar props con interfaces `I{ComponentName}`

## Flujos Críticos

### Agregar al Carrito
```tsx
// Patrón usado en Book.tsx
const newCart = new Map(cart); // Clonar el Map
const key = book.isbn;

if (newCart.has(key)) {
  const item = newCart.get(key)!;
  item.quantity += quantity;
  item.value = item.quantity * unitPrice;
  newCart.set(key, item);
} else {
  newCart.set(key, { book, quantity, value: unitPrice * quantity });
}

updateCart(newCart); // Actualizar vía context
```

### Filtrado de Libros
Ver [Home.tsx](src/pages/Home.tsx#L15-L24) - los filtros se aplican simultáneamente:
- Búsqueda por título (filter string)
- Categorías seleccionadas (categoryFilter Map)
- Rango de precios (valueFilter min/max)

### Autenticación Mock
- Login con credenciales hardcodeadas: `admin`/`admin` ([lib/myBackend.tsx](src/lib/myBackend.tsx#L5-L7))
- Token falso: `fake-jwt-token`
- AuthContext maneja `isAuthenticated` boolean

## Comandos de Desarrollo

```bash
npm run dev      # Inicia Vite dev server (puerto 5173)
npm run build    # Build de producción (tsc + vite build)
npm run preview  # Preview de build
npm run lint     # ESLint
```

## Notas Importantes

1. **Paginación**: Implementada manualmente en Home, 10 items por página
2. **Reviews**: Guardadas en localStorage con key `reviews-${isbn}`
3. **Modal del carrito**: Controlado por `activeCart` boolean en StorageContext
4. **Navegación**: Usar `useNavigate()` de react-router-dom - nunca enlaces `<a>`
5. **Imágenes**: URLs externas en el objeto book o placeholder via.placeholder.com

## Al Agregar Nuevas Features

- ✅ Crear interface en `interfaces/` correspondiente
- ✅ Si es estado compartido, agregarlo a StorageContext
- ✅ Componentes nuevos requieren archivo SCSS en `styles/components/`
- ✅ Importar el nuevo SCSS en `styles/components/index.scss`
- ✅ Usar `@/` alias para todas las importaciones
- ✅ Props siempre tipadas con interfaces `I{Name}`
