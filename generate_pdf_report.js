import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOTS_DIR = '/Users/krish/Desktop/report/screenshots';
const TEMPLATE_FILE = '/Users/krish/Desktop/pageturn/report_template.html';
const OUTPUT_PDF_DESKTOP = '/Users/krish/Desktop/Krish_Patel_A8-B1-13_ECommerce_Project_Report.pdf';
const OUTPUT_PDF_PROJECT = '/Users/krish/Desktop/pageturn/Krish_Patel_A8-B1-13_ECommerce_Project_Report.pdf';

function getBase64Image(filename) {
  const fullPath = path.join(SCREENSHOTS_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    console.error(`Image missing: ${fullPath}`);
    return '';
  }
  const ext = path.extname(filename).replace('.', '');
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const images = {
  home: getBase64Image('01_home.png'),
  catalogue: getBase64Image('02_catalogue_filters.png'),
  search: getBase64Image('03_search_suggestions.png'),
  product: getBase64Image('04_product_details.png'),
  cartDrawer: getBase64Image('05_cart_drawer.png'),
  cartPage: getBase64Image('06_cart_page_coupon.png'),
  auth: getBase64Image('07_register_login.png'),
  checkoutAddr: getBase64Image('08_checkout_address.png'),
  checkoutPay: getBase64Image('09_checkout_payment.png'),
  invoice: getBase64Image('10_order_confirmation_invoice.png'),
  tracking: getBase64Image('11_order_tracking.png'),
  adminDash: getBase64Image('12_admin_dashboard.png'),
  adminInv: getBase64Image('13_admin_inventory.png'),
  adminOrders: getBase64Image('14_admin_orders.png'),
  darkMode: getBase64Image('15_dark_mode.png'),
  mobileHome: getBase64Image('16_mobile_home.png'),
  mobileCart: getBase64Image('17_mobile_cart.png'),
  flowDiagram: getBase64Image('diagram_user_flow.png'),
  erDiagram: getBase64Image('diagram_er_model.png')
};

async function generatePDF() {
  console.log('Reading report template...');
  let html = fs.readFileSync(TEMPLATE_FILE, 'utf8');

  // Replace image tokens
  for (const [key, base64Val] of Object.entries(images)) {
    html = html.replaceAll(`{{${key}}}`, base64Val);
  }

  console.log('Launching headless Chrome to render PDF...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Compiling PDF buffer with header and footer templates...');
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '18mm',
      bottom: '18mm',
      left: '16mm',
      right: '16mm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family: 'Space Grotesk', sans-serif; font-size: 7.5pt; width: 100%; display: flex; justify-content: space-between; padding: 0 16mm; border-bottom: 0.5pt solid #CCC; padding-bottom: 3px; color: #666;">
        <span>PageTurn: E-Commerce and ERP Case Study</span>
        <span style="color: #E4472B; font-weight: bold;">TA-2 Theory Assessment</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-family: 'Space Grotesk', sans-serif; font-size: 7.5pt; width: 100%; display: flex; justify-content: space-between; padding: 0 16mm; border-top: 0.5pt solid #CCC; padding-top: 3px; color: #555;">
        <span><strong>Krish Patel</strong> | Roll No: <strong>A8-B1-13</strong> (Semester 5, CSE Core)</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `
  });

  fs.writeFileSync(OUTPUT_PDF_DESKTOP, pdfBuffer);
  fs.writeFileSync(OUTPUT_PDF_PROJECT, pdfBuffer);

  const sizeMB = (fs.statSync(OUTPUT_PDF_DESKTOP).size / (1024 * 1024)).toFixed(2);
  console.log('==================================================');
  console.log('PROJECT REPORT PDF SUCCESSFULLY GENERATED!');
  console.log(`Saved: ${OUTPUT_PDF_DESKTOP} (${sizeMB} MB)`);
  console.log(`Saved: ${OUTPUT_PDF_PROJECT} (${sizeMB} MB)`);
  console.log('==================================================');

  await browser.close();
}

generatePDF().catch(err => {
  console.error('PDF Generation Error:', err);
  process.exit(1);
});
