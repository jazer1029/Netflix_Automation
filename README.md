Selenium Netflix Login Test Suite
Este proyecto contiene un conjunto de pruebas automatizadas desarrolladas con Selenium WebDriver en Node.js para validar diversas funcionalidades del sistema de inicio de sesión de Netflix. El objetivo es asegurar que el sistema maneja correctamente diferentes escenarios, incluyendo credenciales válidas, errores comunes de usuario y otros casos límite.

Tabla de Contenidos
Requisitos previos
Casos de prueba
Ejecución del proyecto
Generación de reportes
Credenciales
Video de demostración
Requisitos previos
Para ejecutar este proyecto, asegúrate de contar con los siguientes elementos instalados:

Node.js (versión 14 o superior)
npm (incluido con Node.js)
Google Chrome (última versión)
ChromeDriver (compatible con tu versión de Chrome)
Selenium WebDriver
Instala las dependencias necesarias ejecutando el siguiente comando:

bash
"npm install selenium-webdriver"

Casos de prueba
El proyecto incluye los siguientes casos de prueba:

Inicio de sesión válido en Netflix
Inicio de sesión con credenciales válidas
Error por usuario inválido
Error por contraseña inválida
Validación de campos vacíos
Formato de correo inválido
Bloqueo de cuenta tras múltiples intentos fallidos
Validación de campos con espacios en blanco
Inicio de sesión en múltiples navegadores simultáneamente
Validación del enlace "Olvidé mi contraseña"
Reinicio de sesión tras cerrar sesión
Cada prueba genera un reporte HTML con el resultado detallado.

Ejecución del proyecto
Para ejecutar el conjunto completo de pruebas, usa el siguiente comando:

bash
"node <nombre-del-archivo>.js"

El script automáticamente abre navegadores de prueba, ejecuta los casos y genera reportes en formato HTML en el directorio ./reportes.

Generación de reportes
Cada prueba genera un archivo HTML detallado con:

Nombre de la prueba.
Resultado (Exitoso o Fallido).
Detalles del error en caso de fallo.
Fecha y hora de ejecución.
Los reportes se almacenan en el directorio ./reportes/.

Credenciales
En las líneas del código donde se encuentran los campos "email" y "password", debes ingresar las credenciales que deseas utilizar para la validación de inicio de sesión en Netflix.

⚠ Nota: Asegúrate de utilizar credenciales válidas o de prueba para evitar problemas.

Video de demostración
Puedes consultar un video que muestra la ejecución de las pruebas aquí. https://www.youtube.com/watch?v=G-qGcGEG1tM

Autor
Julio Jazer Ramírez Zorrilla
