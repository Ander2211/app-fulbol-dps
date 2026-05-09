# Documentación: Sistema de Modo Oscuro Global

## 📋 Resumen
Se ha implementado un sistema global de tema claro/oscuro (light/dark mode) en la aplicación de fútbol. El cambio de tema afecta a **toda la aplicación** y se persiste automáticamente en el dispositivo.

---

## 🎯 Características

### ✅ Cambio Global de Tema
- Cambio instantáneo en toda la aplicación al presionar el botón toggle
- Afecta a todas las pantallas, navegación y componentes

### ✅ Persistencia
- La preferencia de tema se guarda automáticamente en AsyncStorage
- La selección persiste entre sesiones de la aplicación

### ✅ Diseño Consistente
- **Modo Claro**: Fondo blanco (#f5f5f5), texto oscuro (#000000)
- **Modo Oscuro**: Fondo oscuro (#1a1a1a), texto blanco (#ffffff)
- Colores de interfaz adaptados para cada modo

---

## 🏗️ Arquitectura Técnica

### Nuevo Archivo Creado

#### `src/services/ThemeContext.js`
Archivo principal que contiene:
- **ThemeProvider**: Componente que envuelve la app para proporcionar acceso al tema
- **useTheme()**: Hook personalizado para acceder al contexto de tema en cualquier componente
- **Sistema de colores**: Paleta de colores para modo claro y oscuro

```javascript
const theme = {
  isDarkMode,
  colors: isDarkMode ? {
    // Colores modo oscuro
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#404040',
    // ... más colores
  } : {
    // Colores modo claro
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    // ... más colores
  }
};
```

---

## 📝 Archivos Modificados

### 1. **App.js**
- ✅ Importado `ThemeProvider` desde ThemeContext
- ✅ Envuelto `MainContainer` con `<ThemeProvider>`
- **Cambio**: La aplicación ahora tiene acceso global al contexto de tema

```javascript
import { ThemeProvider } from './src/services/ThemeContext';

// En el render:
<ThemeProvider>
  <NavigationContainer>
    <MainContainer onLogout={handleLogout} />
  </NavigationContainer>
</ThemeProvider>
```

### 2. **src/screens/Perfil.js**
- ✅ Importado `useTheme` hook
- ✅ Agregado botón toggle (☀️🌙) en esquina superior derecha
- ✅ Aplicado `colors` dinámicos a todos los elementos
- ✅ Estilos actualizados para adaptarse al tema

**Elementos con tema dinámico**:
- Background del container
- Colores de superficie (cards)
- Colores de texto (primary y secondary)
- Bordes y separadores

### 3. **src/screens/HomeScreen.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos a:
  - Fondo del container
  - Cards de equipos
  - Texto (títulos, subtítulos)
  - Bordes

### 4. **src/screens/ResultadosScreen.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos a:
  - Fondo principal
  - Botones de filtro
  - Cards de resultados
  - Texto (liga, equipos, puntuación)

### 5. **src/screens/CalendarioScreen.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos a:
  - Fondo y header
  - Cards de partidos
  - Texto (fechas, equipos, venue)
  - Iconos

### 6. **src/screens/DetailScreen.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos a:
  - Badge overlay del equipo
  - Título y subtítulo
  - Cards de información
  - Texto en secciones

### 7. **src/screens/EventDetailScreen.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos a:
  - Background del container
  - Secciones de estadísticas e información
  - Texto y etiquetas

### 8. **src/screens/Inicio.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos al background y texto

### 9. **src/screens/Otros.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos al background y texto

### 10. **src/navigation/MainContainer.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos a:
  - Background de la barra de tabs
  - Header de pantallas
  - Colores de texto del header

### 11. **src/navigation/StackNavigator.js**
- ✅ Importado `useTheme` hook
- ✅ Aplicados colores dinámicos al header del Stack Navigator

---

## 🎨 Paleta de Colores

### Modo Claro (Light Mode)
| Elemento | Color | Hex |
|----------|-------|-----|
| Background | Gris Claro | #f5f5f5 |
| Surface (Cards) | Blanco | #ffffff |
| Texto Principal | Negro | #000000 |
| Texto Secundario | Gris | #666666 |
| Bordes | Gris Claro | #e0e0e0 |
| Primario (Acentos) | Naranja | #f4511e |

### Modo Oscuro (Dark Mode)
| Elemento | Color | Hex |
|----------|-------|-----|
| Background | Negro Oscuro | #1a1a1a |
| Surface (Cards) | Gris Oscuro | #2d2d2d |
| Texto Principal | Blanco | #ffffff |
| Texto Secundario | Gris Claro | #b0b0b0 |
| Bordes | Gris Muy Oscuro | #404040 |
| Primario (Acentos) | Naranja | #f4511e |

---

## 🔧 Cómo Usar

### Para el Usuario Final

1. **Acceder al perfil**: Toca la pestaña "Perfil" en la barra inferior
2. **Cambiar tema**: Presiona el botón en la **esquina superior derecha** (☀️ para claro, 🌙 para oscuro)
3. **Automático**: La app se actualiza instantáneamente en todas las pantallas

### Para Desarrolladores

#### Acceder al Tema en un Componente

```javascript
import { useTheme } from '../services/ThemeContext';

export default function MiComponente() {
  const { colors, isDarkMode } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.titulo, { color: colors.text }]}>
        Hola {isDarkMode ? 'Oscuro' : 'Claro'}
      </Text>
    </View>
  );
}
```

#### Estructura de StyleSheet Recomendada

```javascript
const styles = StyleSheet.create({
  container: { flex: 1 }, // Sin backgroundColor fija
  titulo: { fontSize: 24, fontWeight: 'bold' }, // Sin color fijo
  // ... otros estilos
});

// En el render, aplicar colores dinámicamente:
<View style={[styles.container, { backgroundColor: colors.background }]} />
<Text style={[styles.titulo, { color: colors.text }]} />
```

#### Alternar Tema Manualmente

```javascript
const { toggleTheme, isDarkMode } = useTheme();

<TouchableOpacity onPress={toggleTheme}>
  <Text>{isDarkMode ? '☀️' : '🌙'}</Text>
</TouchableOpacity>
```

---

## 📊 Almacenamiento Persistente

### Clave de AsyncStorage
```javascript
'THEME_MODE' // Booleano: true = oscuro, false = claro
```

### Flujo de Persistencia

1. **Al iniciar**: `ThemeContext` lee `THEME_MODE` de AsyncStorage
2. **Al cambiar**: `toggleTheme()` guarda la preferencia en AsyncStorage
3. **Al reiniciar**: Se recupera automáticamente la última preferencia

---

## 🚀 Inicio Rápido para Nuevas Pantallas

Para agregar tema dinámico a una nueva pantalla:

### Paso 1: Importar el Hook
```javascript
import { useTheme } from '../services/ThemeContext';
```

### Paso 2: Usar el Hook
```javascript
export default function MiPantalla() {
  const { colors } = useTheme();
  // ... resto del código
}
```

### Paso 3: Aplicar Colores en StyleSheet
```javascript
// ❌ NO hacer esto (colores fijos)
const styles = StyleSheet.create({
  container: { backgroundColor: '#ffffff' },
});

// ✅ HACER esto (aplicar dinámicamente)
const styles = StyleSheet.create({
  container: { flex: 1 }, // Sin color fijo
});

// En el render:
<View style={[styles.container, { backgroundColor: colors.background }]}>
```

---

## 🐛 Solución de Problemas

### El tema no cambia
- Verificar que el componente está dentro de `<ThemeProvider>`
- Asegurarse de usar el hook `useTheme()`
- Reiniciar la aplicación

### Los colores no se actualizan
- Verificar que se está aplicando dinámicamente: `style={[styles.className, { color: colors.text }]}`
- No aplicar colores directamente en `StyleSheet.create()`

### AsyncStorage no funciona
- Verificar que `@react-native-async-storage/async-storage` está instalado
- Revisar permisos del dispositivo

---

## 📦 Dependencias Utilizadas

- `@react-native-async-storage/async-storage` ✅ (ya instalada)
- `react` ✅ (ya instalada)
- `react-native` ✅ (ya instalada)

**No se requieren dependencias adicionales**

---

## 🎓 Estructura del Proyecto

```
src/
├── services/
│   └── ThemeContext.js          ← Sistema de temas (nuevo)
├── screens/
│   ├── Perfil.js                ← Con botón toggle
│   ├── HomeScreen.js            ← Actualizado
│   ├── ResultadosScreen.js      ← Actualizado
│   ├── CalendarioScreen.js      ← Actualizado
│   ├── DetailScreen.js          ← Actualizado
│   ├── EventDetailScreen.js     ← Actualizado
│   ├── Inicio.js                ← Actualizado
│   └── Otros.js                 ← Actualizado
└── navigation/
    ├── MainContainer.js         ← Actualizado
    └── StackNavigator.js        ← Actualizado
App.js                            ← Actualizado (envuelto con ThemeProvider)
```

---

## 📅 Historial de Cambios

| Fecha | Cambio | Estado |
|-------|--------|--------|
| 08/05/2026 | Creación de ThemeContext.js | ✅ Completado |
| 08/05/2026 | Actualización de App.js | ✅ Completado |
| 08/05/2026 | Actualización de todas las pantallas | ✅ Completado |
| 08/05/2026 | Actualización de navegación | ✅ Completado |

---

## 🔮 Posibles Mejoras Futuras

1. **Más temas**: Agregar temas personalizados (morado, azul, etc.)
2. **Configuración avanzada**: Tamaño de fuente dinámico
3. **Animaciones**: Transiciones suaves al cambiar tema
4. **Selector de tema**: Panel con múltiples opciones en lugar de toggle
5. **Tema automático**: Detectar preferencia del sistema operativo
6. **Colores por componente**: Permitir personalización granular

---

## 📞 Soporte

Para preguntas sobre la implementación o mejoras sugeridas, revisar:
- `src/services/ThemeContext.js` - Lógica central
- Cualquier archivo de pantalla para ver ejemplos de uso

---

**Documentación generada**: 08/05/2026  
**Versión**: 1.0  
**Estado**: Producción ✅
