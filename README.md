# 📘 Diseño y Construcción de APIs - Parcial Práctico

### 🚀 Organización de la aplicación Nest: `miso4403-parcial-practico`

A continuación, se muestra la estructura general del proyecto:

```
├── 📄 README.md
├── 📁 collections                # Colecciones Postman para probar el API
│   ├── Dishes.postman_collection.json
│   ├── Restaurants-Dishes.postman_collection.json
│   └── Restaurants.postman_collection.json
├── 📁 dist                      # Archivos compilados de la aplicación
│   ├── app.*                    # Archivos principales de la app
│   ├── plato/                   # Módulo de platos
│   ├── restaurante/            # Módulo de restaurantes
│   ├── restaurante-plato/      # Relación restaurantes-platos
│   └── shared/                 # Código compartido (errores, utilidades, etc.)
├── 📁 src                       # Código fuente de la aplicación
│   ├── app.*                   # Entrypoint y configuración principal
│   ├── plato/                  # Controladores, servicios y entidades de Plato
│   ├── restaurante/            # Controladores, servicios y entidades de Restaurante
│   ├── restaurante-plato/      # Lógica de la relación entre Restaurante y Plato
│   └── shared/                 # Utilidades compartidas como errores e interceptores
├── 📁 test                      # Pruebas end-to-end (E2E)
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── 🛠 eslint.config.mjs
├── 🛠 nest-cli.json
├── 📦 package.json
├── 📦 package-lock.json
├── 🛠 tsconfig.json
└── 🛠 tsconfig.build.json
```

---

### 🛠️ Instrucciones para ejecutar la aplicación

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el siguiente comando para instalar las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```

---

### 🧪 Instrucciones para ejecutar las pruebas unitarias

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta las pruebas con el siguiente comando:
   ```bash
   npm run test:watch
   ```

---

### ✅ Ejecución de pruebas de lógica (unitarias)

<img width="446" alt="Screenshot 2025-05-15 at 8 20 12 PM" src="https://github.com/user-attachments/assets/6ec28df0-9b54-4c1e-942c-c86d30cca87b" />

---

### 📬 Ejecución de pruebas del API en Postman

#### 🍽️ Dishes

<img width="817" alt="Screenshot 2025-05-15 at 8 21 03 PM" src="https://github.com/user-attachments/assets/9aa39618-a728-497c-9443-5920b893f380" />

#### 🏨 Restaurants

<img width="819" alt="Screenshot 2025-05-15 at 8 21 19 PM" src="https://github.com/user-attachments/assets/850d44fe-2fd7-4d25-84a4-91f39ab1633f" />

#### 🔗 Restaurants-Dishes

<img width="816" alt="Screenshot 2025-05-15 at 8 21 35 PM" src="https://github.com/user-attachments/assets/b6334234-5ae7-4483-9cad-08d8fff6c94c" />
