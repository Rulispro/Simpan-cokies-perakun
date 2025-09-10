const puppeteer = require("puppeteer");

(async () => {
  try {
    // Baca cookies dari Secrets
    const cookies = JSON.parse(process.env.COOKIE_AKUN1); 

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    await page.setUserAgent(
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36"
);

    

    // Set cookies login Facebook
    await page.setCookie(...cookies);

    // Buka grup
    await page.goto("https://facebook.com/groups/343495659674510/", {
      waitUntil: "networkidle2"
    });

    // Klik tombol "Write something..."
await page.waitForSelector("div[role='button'][tabindex='0']", { visible: true });
await page.click("div[role='button'][tabindex='0']");

// Tunggu composer muncul
await page.waitForTimeout(3000);

// Cari textbox caption
await page.waitForSelector("textarea[name='xc_message'], textarea[name='message'], div[contenteditable='true']", { visible: true });

// Isi caption
const textbox = await page.$("textarea[name='xc_message'], textarea[name='message'], div[contenteditable='true']");
await textbox.type("Hello grup ini test auto posting 🚀");

    // Upload foto/video (file harus ada di repo!)
   // const fileInput = await page.$("input[type='file'][accept*='image'], input[type='file'][accept*='video']");
    //await fileInput.uploadFile("./media/test.jpg"); // file ini harus ada di repo

    // Tunggu upload selesai
   // await page.waitForTimeout(5000);

    // Klik tombol POST
    await page.waitForSelector("button[type='submit']", { visible: true });
    await page.click("button[type='submit']");

    console.log("✅ Post berhasil dikirim!");
    await browser.close();
  } catch (err) {
    console.error("❌ Gagal posting:", err);
    process.exit(1);
  }
})();
