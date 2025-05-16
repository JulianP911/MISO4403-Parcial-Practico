# Diseño y Construcción de APIs - Parcial Práctico

### Organización de la aplicación de Nest - "miso4403-parcial-practico"

├── README.md
├── collections
│   ├── Dishes.postman_collection.json
│   ├── Restaurants-Dishes.postman_collection.json
│   └── Restaurants.postman_collection.json
├── dist
│   ├── app.controller.d.ts
│   ├── app.controller.js
│   ├── app.controller.js.map
│   ├── app.module.d.ts
│   ├── app.module.js
│   ├── app.module.js.map
│   ├── app.service.d.ts
│   ├── app.service.js
│   ├── app.service.js.map
│   ├── main.d.ts
│   ├── main.js
│   ├── main.js.map
│   ├── plato
│   │   ├── plato.controller.d.ts
│   │   ├── plato.controller.js
│   │   ├── plato.controller.js.map
│   │   ├── plato.dto.d.ts
│   │   ├── plato.dto.js
│   │   ├── plato.dto.js.map
│   │   ├── plato.entity.d.ts
│   │   ├── plato.entity.js
│   │   ├── plato.entity.js.map
│   │   ├── plato.module.d.ts
│   │   ├── plato.module.js
│   │   ├── plato.module.js.map
│   │   ├── plato.service.d.ts
│   │   ├── plato.service.js
│   │   └── plato.service.js.map
│   ├── restaurante
│   │   ├── restaurante.controller.d.ts
│   │   ├── restaurante.controller.js
│   │   ├── restaurante.controller.js.map
│   │   ├── restaurante.dto.d.ts
│   │   ├── restaurante.dto.js
│   │   ├── restaurante.dto.js.map
│   │   ├── restaurante.entity.d.ts
│   │   ├── restaurante.entity.js
│   │   ├── restaurante.entity.js.map
│   │   ├── restaurante.module.d.ts
│   │   ├── restaurante.module.js
│   │   ├── restaurante.module.js.map
│   │   ├── restaurante.service.d.ts
│   │   ├── restaurante.service.js
│   │   └── restaurante.service.js.map
│   ├── restaurante-plato
│   │   ├── restaurante-plato.controller.d.ts
│   │   ├── restaurante-plato.controller.js
│   │   ├── restaurante-plato.controller.js.map
│   │   ├── restaurante-plato.module.d.ts
│   │   ├── restaurante-plato.module.js
│   │   ├── restaurante-plato.module.js.map
│   │   ├── restaurante-plato.service.d.ts
│   │   ├── restaurante-plato.service.js
│   │   └── restaurante-plato.service.js.map
│   ├── shared
│   │   ├── errors
│   │   │   ├── business-errors.d.ts
│   │   │   ├── business-errors.js
│   │   │   └── business-errors.js.map
│   │   ├── interceptors
│   │   │   └── business-errors
│   │   │       ├── business-errors.interceptor.d.ts
│   │   │       ├── business-errors.interceptor.js
│   │   │       └── business-errors.interceptor.js.map
│   │   └── testing-utils
│   │       ├── typeorm-testing-config.d.ts
│   │       ├── typeorm-testing-config.js
│   │       └── typeorm-testing-config.js.map
│   └── tsconfig.build.tsbuildinfo
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── plato
│   │   ├── plato.controller.ts
│   │   ├── plato.dto.ts
│   │   ├── plato.entity.ts
│   │   ├── plato.module.ts
│   │   ├── plato.service.spec.ts
│   │   └── plato.service.ts
│   ├── restaurante
│   │   ├── restaurante.controller.ts
│   │   ├── restaurante.dto.ts
│   │   ├── restaurante.entity.ts
│   │   ├── restaurante.module.ts
│   │   ├── restaurante.service.spec.ts
│   │   └── restaurante.service.ts
│   ├── restaurante-plato
│   │   ├── restaurante-plato.controller.ts
│   │   ├── restaurante-plato.module.ts
│   │   ├── restaurante-plato.service.spec.ts
│   │   └── restaurante-plato.service.ts
│   └── shared
│       ├── errors
│       │   └── business-errors.ts
│       ├── interceptors
│       │   └── business-errors
│       │       └── business-errors.interceptor.ts
│       └── testing-utils
│           └── typeorm-testing-config.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json

### Instrucciones para ejecutar la aplicación de Nest - "miso4403-parcial-practico"

A continuación, se detalla la forma de correr la aplicación de nest:

<ul>
  <li>Abrir una terminal en la ubicación del proyecto.</li>
  <li>Ingresar el comando <code>npm install</code> para descargar las dependencias necesarias para la ejecución de la aplicación.</li>
  <li>Ingresar el comando <code>npm run start:dev</code> para ejecutar la aplicación.</li>
</ul>

### Instrucciones para ejecutar los test de la aplicación de Nest - "miso4403-parcial-practico"

A continuación, se detalla la forma de correr los test de la aplicación de angular:

<ul>
  <li>Abrir una terminal en la ubicación del proyecto.</li>
  <li>Ingresar el comando <code>npm run test:watch</code> para ejecutar las prueba de la aplicación.</li>
</ul>

### Ejecución de las pruebas de lógica de la aplicación de Nest - "miso4403-parcial-practico"

<img width="446" alt="Screenshot 2025-05-15 at 8 20 12 PM" src="https://github.com/user-attachments/assets/6ec28df0-9b54-4c1e-942c-c86d30cca87b" />

### Ejecución de las pruebas del API con Postman de la aplicación de Nest - "miso4403-parcial-practico"

#### Dishes

<img width="817" alt="Screenshot 2025-05-15 at 8 21 03 PM" src="https://github.com/user-attachments/assets/9aa39618-a728-497c-9443-5920b893f380" />

#### Restaurants

<img width="819" alt="Screenshot 2025-05-15 at 8 21 19 PM" src="https://github.com/user-attachments/assets/850d44fe-2fd7-4d25-84a4-91f39ab1633f" />

#### Restaurants-Dishes

<img width="816" alt="Screenshot 2025-05-15 at 8 21 35 PM" src="https://github.com/user-attachments/assets/b6334234-5ae7-4483-9cad-08d8fff6c94c" />
