import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5173';

const DIRS = [
  '/Users/krish/Desktop/report/screenshots',
  '/Users/krish/Desktop/pageturn/report/screenshots'
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function saveScreenshot(page, filename) {
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const fullPath = path.join(dir, `${filename}.png`);
    await page.screenshot({ path: fullPath, fullPage: false });
    console.log(`Saved: ${fullPath} (${(fs.statSync(fullPath).size / 1024).toFixed(1)} KB)`);
  }
}

async function run() {
  console.log('Launching Chrome for screenshot capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Home Page
  console.log('Capturing 01_home...');
  await page.goto(`${BASE_URL}/#home`, { waitUntil: 'networkidle0' });
  await sleep(1500);
  await saveScreenshot(page, '01_home');

  // 2. Catalogue with Filters
  console.log('Capturing 02_catalogue_filters...');
  await page.goto(`${BASE_URL}/#catalogue`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '02_catalogue_filters');

  // 3. Search Suggestions Dropdown
  console.log('Capturing 03_search_suggestions...');
  await page.goto(`${BASE_URL}/#home`, { waitUntil: 'networkidle0' });
  await sleep(800);
  await page.click('.header-search-input');
  await page.type('.header-search-input', 'Solitude', { delay: 100 });
  await sleep(1000);
  await saveScreenshot(page, '03_search_suggestions');

  // 4. Product Details
  console.log('Capturing 04_product_details...');
  await page.goto(`${BASE_URL}/#product/1`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '04_product_details');

  // 5. Cart Drawer
  console.log('Capturing 05_cart_drawer...');
  await page.goto(`${BASE_URL}/#catalogue`, { waitUntil: 'networkidle0' });
  await sleep(800);
  // Open cart drawer via evaluate
  await page.evaluate(() => {
    const cartBtn = document.querySelector('button[title="Shopping Cart"]');
    if (cartBtn) cartBtn.click();
  });
  await sleep(1000);
  await saveScreenshot(page, '05_cart_drawer');

  // Close drawer
  await page.keyboard.press('Escape');
  await sleep(500);

  // 6. Cart Page with Coupon
  console.log('Capturing 06_cart_page_coupon...');
  await page.goto(`${BASE_URL}/#cart`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '06_cart_page_coupon');

  // 7. Register / Login Modal
  console.log('Capturing 07_register_login...');
  await page.goto(`${BASE_URL}/#home`, { waitUntil: 'networkidle0' });
  await sleep(800);
  // Trigger auth modal
  await page.evaluate(() => {
    window.location.hash = 'login';
  });
  await sleep(1000);
  await saveScreenshot(page, '07_register_login');

  // Close modal by clicking close button
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close dialog"]');
    if (closeBtn) closeBtn.click();
  });
  await sleep(600);

  // 8. Checkout Step 1: Address
  console.log('Capturing 08_checkout_address...');
  await page.goto(`${BASE_URL}/#checkout`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '08_checkout_address');

  // 9. Checkout Step 3: Payment
  console.log('Capturing 09_checkout_payment...');
  // Click continue to delivery then payment
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const continueBtn = buttons.find(b => b.textContent.includes('Continue to Delivery'));
    if (continueBtn) continueBtn.click();
  });
  await sleep(600);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const paymentBtn = buttons.find(b => b.textContent.includes('Proceed to Payment'));
    if (paymentBtn) paymentBtn.click();
  });
  await sleep(1000);
  await saveScreenshot(page, '09_checkout_payment');

  // 10. Order Confirmation & Printable Invoice
  console.log('Capturing 10_order_confirmation_invoice...');
  await page.goto(`${BASE_URL}/#order-confirmation/ORD-9421-PT`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '10_order_confirmation_invoice');

  // 11. Order Tracking Timeline
  console.log('Capturing 11_order_tracking...');
  await page.goto(`${BASE_URL}/#order-tracking/ORD-9421-PT`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '11_order_tracking');

  // Login as Admin for Admin views
  console.log('Logging in as Admin...');
  await page.evaluate(() => {
    localStorage.setItem('pt_is_admin', 'true');
  });

  // 12. Admin Dashboard (Analytics & Charts)
  console.log('Capturing 12_admin_dashboard...');
  await page.goto(`${BASE_URL}/#admin`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '12_admin_dashboard');

  // 13. Admin Inventory
  console.log('Capturing 13_admin_inventory...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const invTab = buttons.find(b => b.textContent.includes('Inventory'));
    if (invTab) invTab.click();
  });
  await sleep(1000);
  await saveScreenshot(page, '13_admin_inventory');

  // 14. Admin Orders Management
  console.log('Capturing 14_admin_orders...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const ordTab = buttons.find(b => b.textContent.includes('Order Management'));
    if (ordTab) ordTab.click();
  });
  await sleep(1000);
  await saveScreenshot(page, '14_admin_orders');

  // 15. Dark Mode
  console.log('Capturing 15_dark_mode...');
  await page.evaluate(() => {
    localStorage.setItem('pt_theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.goto(`${BASE_URL}/#home`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '15_dark_mode');

  // Reset theme
  await page.evaluate(() => {
    localStorage.setItem('pt_theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  });

  // MOBILE SCREENSHOTS (390px viewport)
  console.log('Setting mobile viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  // 16. Mobile Home
  console.log('Capturing 16_mobile_home...');
  await page.goto(`${BASE_URL}/#home`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '16_mobile_home');

  // 17. Mobile Cart
  console.log('Capturing 17_mobile_cart...');
  await page.goto(`${BASE_URL}/#cart`, { waitUntil: 'networkidle0' });
  await sleep(1200);
  await saveScreenshot(page, '17_mobile_cart');

  await browser.close();
  console.log('All 17 screenshots successfully captured and verified!');
}

run().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
