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

async function fixAdminScreenshots() {
  console.log('Re-capturing Admin Screenshots 12, 13, 14 with authenticated session...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  await page.goto(`${BASE_URL}/#admin`, { waitUntil: 'networkidle0' });
  await sleep(800);

  // Click the submit button on the admin login card
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Access ERP Console'));
    if (btn) btn.click();
  });
  await sleep(1500);

  // 12. Admin Dashboard (Analytics & Charts)
  console.log('Capturing 12_admin_dashboard...');
  await saveScreenshot(page, '12_admin_dashboard');

  // 13. Admin Inventory
  console.log('Capturing 13_admin_inventory...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const invTab = buttons.find(b => b.textContent.includes('Inventory & Stock'));
    if (invTab) invTab.click();
  });
  await sleep(1200);
  await saveScreenshot(page, '13_admin_inventory');

  // 14. Admin Orders Management
  console.log('Capturing 14_admin_orders...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const ordTab = buttons.find(b => b.textContent.includes('Order Management'));
    if (ordTab) ordTab.click();
  });
  await sleep(1200);
  await saveScreenshot(page, '14_admin_orders');

  await browser.close();
  console.log('Admin screenshots successfully recaptured and verified!');
}

fixAdminScreenshots().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
