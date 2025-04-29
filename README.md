Install Playwright and @playwright/test:

npm install playwright
npm install @playwright/test


Run the test again:

npx playwright test


🧪 วิธีรันทั้งหมด:

npx playwright test
🧪 วิธีรันเฉพาะไฟล์:

npx playwright test src/tests_ex_01/product.spec.js
🧪 วิธีรันเฉพาะ test case หรือชื่อ test ที่ตรง:

npx playwright test -g "product page should display correct title"