const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs'); // Módulo para trabajar con archivos

// Configuración del navegador
const options = new chrome.Options();
options.addArguments('--disable-extensions');
options.addArguments('--disable-gpu');
options.addArguments('--headless'); // Ejecución sin interfaz gráfica

async function netflixLoginTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  let testResult = ''; // Variable para registrar el resultado
  let details = ''; // Detalles del test

  try {
    // Abrir la página de inicio de sesión de Netflix
    await driver.get('https://www.netflix.com/login');
    details += 'Página de inicio de sesión cargada correctamente.<br>';

    // Esperar a que los elementos de la página estén disponibles
    await driver.wait(until.elementLocated(By.name('userLoginId')), 5000);
    await driver.wait(until.elementLocated(By.name('password')), 5000);
    details += 'Campos de usuario y contraseña detectados.<br>';

    // Ingresar credenciales de inicio de sesión
    await driver.findElement(By.name('userLoginId')).sendKeys('Email', Key.RETURN);
    await driver.findElement(By.name('password')).sendKeys('Contraseña', Key.RETURN);
    details += 'Credenciales ingresadas.<br>';

    // Esperar a que la página de inicio de sesión se complete
    await driver.wait(until.urlContains('https://www.netflix.com/browse'), 10000);
    details += 'Inicio de sesión exitoso, URL validada.<br>';

    testResult = 'Exitoso';
    console.log('Inicio de sesión exitoso.');
  } catch (error) {
    testResult = 'Fallido';
    details += `Error: ${error.message}<br>`;
    console.error('Error durante la prueba:', error);
  } finally {
    // Cerrar el navegador
    await driver.quit();

    // Generar el reporte HTML
    generateHTMLReport(testResult, details);
  }
}

// Función para generar el reporte HTML
function generateHTMLReport(testResult, details) {
  const date = new Date().toLocaleString(); // Fecha y hora actual
  const reportContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Reporte de Prueba - Selenium</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .success { color: green; }
            .failure { color: red; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
        </style>
    </head>
    <body>
        <h1>Reporte de Prueba - Selenium</h1>
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Resultado:</strong> <span class="${testResult === 'Exitoso' ? 'success' : 'failure'}">${testResult}</span></p>
        <h2>Detalles:</h2>
        <p>${details}</p>
    </body>
    </html>
  `;

  // Escribir el reporte en un archivo
  fs.writeFileSync('reporte_prueba.html', reportContent);
  console.log('Reporte generado: reporte_prueba.html');
}

// Ejecutar la prueba
netflixLoginTest();

//Julio Jazer Ramirez Zorrilla
// En las lines 24 y 25 donde dice "Email" y "Contraseña" van las credenciales a usar para el inicio de sesion en Netflix.
