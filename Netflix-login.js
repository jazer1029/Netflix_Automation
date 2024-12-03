const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs'); // Módulo para trabajar con archivos

// Configuración del navegador
const options = new chrome.Options();
options.addArguments('--disable-extensions');
options.addArguments('--disable-gpu');

// Función principal para ejecutar los casos de prueba
async function runAllTests() {
    await testNetflixLogin();
    await testValidLogin();
    await testInvalidUser();
    await testInvalidPassword();
    await testEmptyFields();
    await testInvalidEmailFormat();
    await testAccountLock();
    await testWhitespaceFields();
    await testMultipleBrowserSessions();
    await testForgotPasswordLink();
    await testReLoginAfterLogout();
}

// Casos de prueba

// 1.Caso de prueba: Validación de inicio de sesión de Netflix
async function testNetflixLogin() {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  let testResult = '';
  let details = 'Inicio de sesión de Netflix. ';
  try {
      await driver.get('https://www.netflix.com/login');
      await driver.findElement(By.name('userLoginId')).sendKeys('email', Key.RETURN);
      await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);
      await driver.wait(until.urlContains('https://www.netflix.com/browse'), 10000);
      details += 'Inicio de sesión exitoso.';
      testResult = 'Exitoso';
  } catch (error) {
      testResult = 'Fallido';
      details += `Error: ${error.message}`;
  } finally {
      await driver.quit();
      generateHTMLReport('Inicio de sesión de Netflix', testResult, details);
  }
}

// 2. Inicio de sesión exitoso con credenciales válidas
async function testValidLogin() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    let testResult = '';
    let details = 'Inicio de sesión válido. ';
    try {
        await driver.get('https://www.netflix.com/login');
        await driver.findElement(By.name('userLoginId')).sendKeys('email');
        await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);
        await driver.wait(until.urlContains('browse'), 10000);
        details += 'Inicio de sesión exitoso.';
        testResult = 'Exitoso';
    } catch (error) {
        testResult = 'Fallido';
        details += `Error: ${error.message}`;
    } finally {
        await driver.quit();
        generateHTMLReport('Inicio de sesión válido', testResult, details);
    }
}

// 3. Usuario inválido
async function testInvalidUser() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    let testResult = '';
    let details = 'Usuario inválido. ';
    try {
        await driver.get('https://www.netflix.com/login');
        await driver.findElement(By.name('userLoginId')).sendKeys('invalid_user@example.com');
        await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);
        const errorMessage = await driver.findElement(By.css('.error-message')).getText();
        if (errorMessage.includes('Usuario no encontrado')) {
            details += 'Mensaje de error correcto mostrado.';
            testResult = 'Exitoso';
        } else {
            details += 'Mensaje de error incorrecto.';
            testResult = 'Fallido';
        }
    } catch (error) {
        testResult = 'Fallido';
        details += `Error: ${error.message}`;
    } finally {
        await driver.quit();
        generateHTMLReport('Usuario inválido', testResult, details);
    }
}

// 4. Contraseña inválida
async function testInvalidPassword() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    let testResult = '';
    let details = 'Contraseña inválida. ';
    try {
        await driver.get('https://www.netflix.com/login');
        await driver.findElement(By.name('userLoginId')).sendKeys('email');
        await driver.findElement(By.name('password')).sendKeys('InvalidPassword', Key.RETURN);
        const errorMessage = await driver.findElement(By.css('.error-message')).getText();
        if (errorMessage.includes('Contraseña incorrecta')) {
            details += 'Mensaje de error correcto mostrado.';
            testResult = 'Exitoso';
        } else {
            details += 'Mensaje de error incorrecto.';
            testResult = 'Fallido';
        }
    } catch (error) {
        testResult = 'Fallido';
        details += `Error: ${error.message}`;
    } finally {
        await driver.quit();
        generateHTMLReport('Contraseña inválida', testResult, details);
    }
}

// 5. Campos vacíos
async function testEmptyFields() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    let testResult = '';
    let details = 'Campos vacíos. ';
    try {
        await driver.get('https://www.netflix.com/login');
        await driver.findElement(By.css('.login-button')).click();
        const errorMessage = await driver.findElement(By.css('.error-message')).getText();
        if (errorMessage.includes('Campos obligatorios')) {
            details += 'Mensaje de error correcto mostrado.';
            testResult = 'Exitoso';
        } else {
            details += 'Mensaje de error incorrecto.';
            testResult = 'Fallido';
        }
    } catch (error) {
        testResult = 'Fallido';
        details += `Error: ${error.message}`;
    } finally {
        await driver.quit();
        generateHTMLReport('Campos vacíos', testResult, details);
    }
}

// 6. Formato de correo inválido
async function testInvalidEmailFormat() {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  let testResult = '';
  let details = 'Formato de correo inválido. ';
  try {
      await driver.get('https://www.netflix.com/login');
      await driver.findElement(By.name('userLoginId')).sendKeys('invalid_email');
      await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);
      const errorMessage = await driver.findElement(By.css('.error-message')).getText();
      if (errorMessage.includes('Correo electrónico no válido')) {
          details += 'Mensaje de error correcto mostrado.';
          testResult = 'Exitoso';
      } else {
          details += 'Mensaje de error incorrecto.';
          testResult = 'Fallido';
      }
  } catch (error) {
      testResult = 'Fallido';
      details += `Error: ${error.message}`;
  } finally {
      await driver.quit();
      generateHTMLReport('Formato de correo inválido', testResult, details);
  }
}

// 7. Bloqueo después de múltiples intentos fallidos
async function testAccountLock() {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  let testResult = '';
  let details = 'Bloqueo después de intentos fallidos. ';
  try {
      await driver.get('https://www.netflix.com/login');
      // Intentar 3 veces con contraseñas incorrectas
      for (let i = 0; i < 3; i++) {
          await driver.findElement(By.name('userLoginId')).sendKeys('email');
          await driver.findElement(By.name('password')).sendKeys('InvalidPassword', Key.RETURN);
          await driver.sleep(2000); // Esperar 2 segundos entre intentos
      }
      const errorMessage = await driver.findElement(By.css('.error-message')).getText();
      if (errorMessage.includes('Cuenta bloqueada temporalmente')) {
          details += 'Mensaje de bloqueo temporal recibido.';
          testResult = 'Exitoso';
      } else {
          details += 'Mensaje de bloqueo no recibido.';
          testResult = 'Fallido';
      }
  } catch (error) {
      testResult = 'Fallido';
      details += `Error: ${error.message}`;
  } finally {
      await driver.quit();
      generateHTMLReport('Bloqueo después de intentos fallidos', testResult, details);
  }
}

// 8. Inicio de sesión con espacios en blanco
async function testWhitespaceFields() {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  let testResult = '';
  let details = 'Espacios en blanco en campos. ';
  try {
      await driver.get('https://www.netflix.com/login');
      await driver.findElement(By.name('userLoginId')).sendKeys('     '); // Solo espacios
      await driver.findElement(By.name('password')).sendKeys('     ', Key.RETURN); // Solo espacios
      const errorMessage = await driver.findElement(By.css('.error-message')).getText();
      if (errorMessage.includes('Por favor, ingrese un correo electrónico válido')) {
          details += 'Mensaje de error por espacios en blanco recibido.';
          testResult = 'Exitoso';
      } else {
          details += 'Mensaje de error incorrecto.';
          testResult = 'Fallido';
      }
  } catch (error) {
      testResult = 'Fallido';
      details += `Error: ${error.message}`;
  } finally {
      await driver.quit();
      generateHTMLReport('Espacios en blanco en campos', testResult, details);
  }
}

// 9. Inicio de sesión en navegadores diferentes simultáneamente
async function testMultipleBrowserSessions() {
  const driver1 = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  const driver2 = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  let testResult = '';
  let details = 'Sesiones múltiples en navegadores diferentes. ';
  try {
      // Iniciar sesión en navegador 1
      await driver1.get('https://www.netflix.com/login');
      await driver1.findElement(By.name('userLoginId')).sendKeys('email');
      await driver1.findElement(By.name('password')).sendKeys('password', Key.RETURN);
      await driver1.wait(until.urlContains('browse'), 10000);

      // Iniciar sesión en navegador 2
      await driver2.get('https://www.netflix.com/login');
      await driver2.findElement(By.name('userLoginId')).sendKeys('email');
      await driver2.findElement(By.name('password')).sendKeys('password', Key.RETURN);
      await driver2.wait(until.urlContains('browse'), 10000);

      details += 'Ambas sesiones iniciaron correctamente.';
      testResult = 'Exitoso';
  } catch (error) {
      testResult = 'Fallido';
      details += `Error: ${error.message}`;
  } finally {
      await driver1.quit();
      await driver2.quit();
      generateHTMLReport('Sesiones múltiples en navegadores diferentes', testResult, details);
  }
}

// 10. Validación del enlace "Olvidé mi contraseña"
async function testForgotPasswordLink() {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  let testResult = '';
  let details = 'Enlace "Olvidé mi contraseña". ';
  try {
      await driver.get('https://www.netflix.com/login');
      await driver.findElement(By.linkText('¿Olvidaste la contraseña?')).click();
      await driver.wait(until.urlContains('loginHelp'), 5000);
      details += 'Redirección al enlace de recuperación correcta.';
      testResult = 'Exitoso';
  } catch (error) {
      testResult = 'Fallido';
      details += `Error: ${error.message}`;
  } finally {
      await driver.quit();
      generateHTMLReport('Enlace "Olvidé mi contraseña"', testResult, details);
  }
}

// 11. Inicio de sesión después de cerrar sesión
async function testReLoginAfterLogout() {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  let testResult = '';
  let details = 'Reinicio de sesión después de cerrar sesión. ';
  try {
      // Inicio de sesión inicial
      await driver.get('https://www.netflix.com/login');
      await driver.findElement(By.name('userLoginId')).sendKeys('email');
      await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);
      await driver.wait(until.urlContains('browse'), 10000);

      // Cerrar sesión
      await driver.get('https://www.netflix.com/logout');

      // Reingresar
      await driver.get('https://www.netflix.com/login');
      await driver.findElement(By.name('userLoginId')).sendKeys('email');
      await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);
      await driver.wait(until.urlContains('browse'), 10000);

      details += 'Reinicio de sesión exitoso.';
      testResult = 'Exitoso';
  } catch (error) {
      testResult = 'Fallido';
      details += `Error: ${error.message}`;
  } finally {
      await driver.quit();
      generateHTMLReport('Reinicio de sesión después de cerrar sesión', testResult, details);
  }
}

// Generar reportes HTML para cada prueba
function generateHTMLReport(testName, testResult, details) {
  const date = new Date().toLocaleString(); // Fecha y hora actual
  const sanitizedTestName = testName.replace(/[^\w\s]/gi, '_'); // Reemplaza caracteres especiales
  const fileName = `reporte_${sanitizedTestName}.html`; // Nombre seguro para el archivo
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

  // Asegurarse de que el directorio exista o crear uno
  const dir = './reportes/';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  // Escribir el reporte en un archivo
  fs.writeFileSync(`${dir}${fileName}`, reportContent);
  console.log(`Reporte generado: ${dir}${fileName}`);
}

// Ejecutar todas las pruebas
runAllTests();


//Julio Jazer Ramirez Zorrilla
// En las lineas donde dice "email" y "password" van las credenciales a usar para el inicio de sesion en Netflix.
// Video ejecutando la prueba https://youtu.be/G-qGcGEG1tM
