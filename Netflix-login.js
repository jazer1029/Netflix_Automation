const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Configuración del navegador
const options = new chrome.Options();
options.addArguments('--disable-extensions');
options.addArguments('--disable-gpu');
options.addArguments('--headless'); // Ejecución sin interfaz gráfica

async function netflixLoginTest() {
  // Inicializar el navegador
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Abrir la página de inicio de sesión de Netflix
    await driver.get('https://www.netflix.com/login');

    // Esperar a que los elementos de la página estén disponibles
    await driver.wait(until.elementLocated(By.name('userLoginId')), 5000);
    await driver.wait(until.elementLocated(By.name('password')), 5000);
    await driver.wait(until.elementLocated(By.css('body')), 30000);

    // Ingresar credenciales de inicio de sesión
    await driver.findElement(By.name('userLoginId')).sendKeys('Email', Key.RETURN);
    await driver.findElement(By.name('password')).sendKeys('Contraseña', Key.RETURN);

    // Esperar a que la página de inicio de sesión se complete
    await driver.wait(until.urlContains('https://www.netflix.com/browse'), 10000);

    // Realizar alguna verificación o acción adicional si es necesario
    // ...

    console.log('Inicio de sesión exitoso.');
  } finally {
    // Cerrar el navegador al finalizar
    // await driver.quit();
  }
}

// Ejecutar la prueba
netflixLoginTest();

//Julio Jazer Ramirez Zorrilla
//2021-2360
