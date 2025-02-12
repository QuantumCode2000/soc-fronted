```markdown
# 🛠️ Guía de Configuración del Proyecto (Windows)
```
## 📌 1. Preparación del Entorno
### 🚀 Crear una Carpeta y Clonar los Repositorios
Antes de empezar, necesitamos descargar los proyectos desde GitHub. 

1. **Abrir la terminal de comandos en Windows:**
   - Presiona `Win + R`, escribe `cmd`, presiona **Enter**.

2. **Ir a la carpeta donde queremos almacenar el proyecto:**
   ```sh
   cd %USERPROFILE%\Desktop  # O cualquier otra carpeta donde quieras guardar los archivos
   mkdir soc-proyecto  # Crear una carpeta
   cd soc-proyecto  # Ingresar a la carpeta
   ```

3. **Clonar los repositorios:**
   ```sh
   git clone https://github.com/TryCatch-SRL/soc-ai-backend.git
   git clone https://github.com/QuantumCode2000/soc-fronted.git
   git clone https://github.com/QuantumCode2000/soc-backend.git
   ```

4. **Entrar a la carpeta del proyecto:**
   ```sh
   cd soc-proyecto
   ```

✅ Ahora tenemos todas las carpetas listas para continuar.

---

## 📌 2. Base de Datos (MySQL en Docker para Windows)
### 🚀 Iniciar el contenedor de MySQL
```sh
docker run -p 3307:3306 ^
  -e MYSQL_ROOT_PASSWORD=your_root_password ^
  -e MYSQL_DATABASE=socdb ^
  -e MYSQL_USER=quantum ^
  -e MYSQL_PASSWORD=quantum ^
  --name socdb-container -d mysql:latest
```

### ✅ Verificar que está corriendo en Docker Desktop
```sh
docker ps
```
Si no aparece, intenta:
```sh
docker start socdb-container
```
Ver logs en caso de error:
```sh
docker logs socdb-container
```

### 🔎 Verificar conexión con TablePlus u otro cliente de MySQL
- **Host:** `localhost`
- **Puerto:** `3307`
- **Usuario:** `quantum`
- **Contraseña:** `quantum`
- **Base de datos:** `socdb`

---

## 📌 3. Backend (Node.js con NestJS)
### 🚀 Pasos
```sh
cd soc-backend  # Asegurarse de estar en la carpeta backend
git pull origin main  # Actualizar código
npm install  # Instalar dependencias
npm run start:dev  # Iniciar backend en modo desarrollo
```

### ✅ Verificar
- **No debe haber errores en rojo**.
- Debe estar corriendo en **puerto 3000**.
- Para probar si responde:
```sh
curl http://localhost:3000/api/health
```
Debe devolver algo como `{ "status": "ok" }`.

---

## 📌 4. Frontend (React/Vite)
### 🚀 Pasos
```sh
cd soc-fronted  # Asegurarse de estar en la carpeta frontend
git pull origin main  # Actualizar código
npm install  # Instalar dependencias
npm run dev  # Iniciar el frontend
```

### ✅ Verificar
- **No debe haber errores en rojo**.
- Acceder en el navegador a:
  ```
  http://localhost:5173
  ```

---

## 📌 5. IA (FastAPI con Python)
### 🚀 Pasos
```sh
cd soc-ai-backend  # Asegurarse de estar en la carpeta de IA
git pull origin main  # Actualizar código
python -m venv venv  # Crear entorno virtual
venv\Scripts\activate  # Activar entorno virtual (Windows)
pip install -r requirements.txt  # Instalar dependencias
uvicorn main:app --reload  # Iniciar servidor FastAPI
```

### ✅ Verificar
- **No debe haber errores en rojo**.
- La API debe estar corriendo en **puerto 8000**.
- Probar acceso:
```sh
curl http://127.0.0.1:8000/
```
Debe devolver `{ "message": "API para optimizar cortes de láminas" }`.

---

## 📌 6. Agregar Láminas para la Prueba
- **Debe agregar entre 5 y 15 láminas**.
- **No debe crear cortes que excedan el tamaño de las láminas**.

---

## 📌 7. Generar y Ejecutar el Corte
1. **Hacer clic en el icono de la tijera**.
2. **Esperar la generación del corte**.
3. **Hacer clic en "Ejecutar Corte" para descontarlo en la base de datos e inventario**.

---

## 🔄 Mantenimiento y Actualización
🔹 **Actualizar código en todas las carpetas**
```sh
cd soc-proyecto
cd soc-backend && git pull origin main && cd ..
cd soc-fronted && git pull origin main && cd ..
cd soc-ai-backend && git pull origin main && cd ..
```

🔹 **Cada comando debe ejecutarse en su carpeta correspondiente**.

🔹 **Verificar la conexión de la base de datos** (ya se enseñó cómo conectarse desde TablePlus).
```sh
docker exec -it socdb-container mysql -u quantum -p
SHOW DATABASES;
```

---

🔥 ¡Listo! Tu entorno está configurado y listo para usarse en Windows. 🚀
```
