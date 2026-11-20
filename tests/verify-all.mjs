import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-landscape-1024", width: 1024, height: 768 },
  { name: "tablet-portrait-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

const OUTPUT_DIR = "/Users/nitrousoxide/.gemini/antigravity/brain/f8df7b48-623a-4f10-95e2-350eb044faaa";

async function run() {
  console.log("🚀 Starting Playwright Verification Suite...");
  const browser = await chromium.launch();
  let totalErrors = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const pageErrors = [];
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.goto("http://localhost:3456", { waitUntil: "networkidle" });

    // 1. Check Console & Page Errors
    if (consoleErrors.length > 0) {
      console.error(`❌ Console errors detected in ${vp.name}:`, consoleErrors);
      totalErrors += consoleErrors.length;
    } else {
      console.log(`✓ 0 console errors in ${vp.name}`);
    }

    if (pageErrors.length > 0) {
      console.error(`❌ Page errors in ${vp.name}:`, pageErrors);
      totalErrors += pageErrors.length;
    } else {
      console.log(`✓ 0 page errors in ${vp.name}`);
    }

    // 2. Check Horizontal Overflow
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return { docWidth, scrollWidth, hasOverflow: scrollWidth > docWidth };
    });

    if (overflow.hasOverflow) {
      console.error(`❌ Horizontal overflow in ${vp.name}: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.docWidth}`);
      totalErrors++;
    } else {
      console.log(`✓ Zero horizontal overflow in ${vp.name} (${overflow.docWidth}px)`);
    }

    // Capture Full Page Screenshot
    const screenshotPath = path.join(OUTPUT_DIR, `nolan_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✓ Captured screenshot: ${screenshotPath}`);

    // If desktop, test interactive features
    if (vp.name === "desktop-1440") {
      console.log("\n--- Testing Interactive Grandmaster Features (Desktop) ---");

      // Test 1: Temporal Turnstile Toggle (VOID -> BLUEPRINT -> VOID)
      const initialTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
      console.log(`Initial theme: ${initialTheme}`);
      await page.keyboard.press("t");
      await page.waitForTimeout(300);
      const flippedTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
      console.log(`✓ Theme after pressing 'T': ${flippedTheme}`);
      if (flippedTheme !== "blueprint") totalErrors++;
      await page.keyboard.press("t"); // Flip back to void
      await page.waitForTimeout(300);

      // Test 2: Systems Workbench Keyboard Switch (Keys 1, 2, 3, 4)
      await page.keyboard.press("2");
      await page.waitForTimeout(300);
      const sys2Title = await page.locator("#systems h3").textContent();
      console.log(`✓ Switched to System 2 via key '2': ${sys2Title}`);
      if (!sys2Title.includes("PropEval")) totalErrors++;

      await page.keyboard.press("3");
      await page.waitForTimeout(300);
      const sys3Title = await page.locator("#systems h3").textContent();
      console.log(`✓ Switched to System 3 via key '3': ${sys3Title}`);
      if (!sys3Title.includes("Disha")) totalErrors++;

      await page.keyboard.press("1");
      await page.waitForTimeout(300);

      // Test 3: Playable Chess Puzzle (Solve Back-Rank: Rd8#)
      console.log("Testing chess puzzle interaction...");
      const d1Square = page.locator('button[aria-label*="Square d1"]');
      const d8Square = page.locator('button[aria-label*="Square d8"]');

      await d1Square.click();
      await page.waitForTimeout(200);
      await d8Square.click();
      await page.waitForTimeout(500);

      const statusText = await page.locator("#arena").textContent();
      if (statusText.includes("CHECKMATE") || statusText.includes("CHALLENGE UNLOCKED")) {
        console.log("✓ Checkmate successfully executed and challenge unlocked!");
      } else {
        console.error("❌ Chess move verification failed");
        totalErrors++;
      }

      // Test 4: Command Palette ⌘K
      await page.keyboard.press("Control+k");
      await page.waitForTimeout(300);
      const paletteVisible = await page.locator('input[placeholder*="command"]').isVisible();
      console.log(`✓ Command palette opened via ⌘K: ${paletteVisible}`);
      if (!paletteVisible) totalErrors++;
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);

      // Test 5: Right-Click Custom Menu
      await page.mouse.click(400, 300, { button: "right" });
      await page.waitForTimeout(300);
      const menuVisible = await page.locator("text=SAHIL.LAB MENU").isVisible();
      console.log(`✓ Custom brutalist context menu opened on right-click: ${menuVisible}`);
      if (!menuVisible) totalErrors++;
      await page.mouse.click(10, 10); // close
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n========================================`);
  if (totalErrors === 0) {
    console.log("🏆 ALL PLAYWRIGHT VERIFICATION CHECKS PASSED WITH 0 ERRORS!");
  } else {
    console.error(`❌ Total failures: ${totalErrors}`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Fatal Playwright runner error:", err);
  process.exit(1);
});
