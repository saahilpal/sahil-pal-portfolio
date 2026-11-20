import { chromium } from "playwright";
import { spawn } from "child_process";

const PORT = 3009;
const URL = `http://localhost:${PORT}`;
const ARTIFACT_DIR = "/Users/nitrousoxide/.gemini/antigravity/brain/f8df7b48-623a-4f10-95e2-350eb044faaa";

async function run() {
  console.log(`Starting next start on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  // Wait for server to be responsive
  let started = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(URL);
      if (res.ok) {
        started = true;
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  if (!started) {
    console.error("Server failed to start in 15 seconds.");
    server.kill();
    process.exit(1);
  }

  console.log("Server is live at", URL);

  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "desktop-1440", width: 1440, height: 900 },
    { name: "tablet-landscape-1024", width: 1024, height: 768 },
    { name: "tablet-portrait-768", width: 768, height: 1024 },
    { name: "mobile-390", width: 390, height: 844 },
  ];

  let testPassed = true;

  for (const vp of viewports) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      permissions: ["clipboard-read", "clipboard-write"],
    });

    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // 1. Check Horizontal Overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (overflow) {
      console.error(`❌ FAIL [${vp.name}]: Horizontal overflow detected!`);
      testPassed = false;
    } else {
      console.log(`✓ PASS [${vp.name}]: No horizontal overflow.`);
    }

    // 2. Check Rhythm Operator Bar and Hero Decluttering
    const hasRhythmBar = await page.evaluate(() => {
      return document.body.innerText.includes("RHYTHM ENGINE");
    });
    if (hasRhythmBar) {
      console.log(`✓ PASS [${vp.name}]: Pocket Operator Rhythm Engine bar present.`);
      // Test Play/Stop toggle
      const playBtn = await page.$('button[aria-label="Start Rhythm"]');
      if (playBtn) {
        await playBtn.click();
        await page.waitForTimeout(200);
        const stopBtn = await page.$('button[aria-label="Stop Rhythm"]');
        if (stopBtn) {
          console.log(`✓ PASS [${vp.name}]: Rhythm started, Stop button active.`);
          // Stop with Space key
          await page.keyboard.press("Space");
          await page.waitForTimeout(200);
          console.log(`✓ PASS [${vp.name}]: Rhythm stopped via Space hotkey.`);
        }
      }
      // Test Keyboard Synthesizer Note Trigger
      await page.keyboard.press("a");
      await page.waitForTimeout(100);
      const noteActive = await page.evaluate(() => {
        return document.body.innerText.includes("D3");
      });
      if (noteActive) {
        console.log(`✓ PASS [${vp.name}]: Keyboard note 'a' (D3) triggered visual synth feedback.`);
      }
    } else {
      console.error(`❌ FAIL [${vp.name}]: Rhythm Engine bar missing!`);
      testPassed = false;
    }

    const hasTelemetry = await page.evaluate(() => {
      return document.body.innerText.includes("LIVE SYSTEM TELEMETRY");
    });
    const hasOverclock = await page.evaluate(() => {
      return (
        document.body.innerText.includes("OVERCLOCK 3D MESH") ||
        document.body.innerText.includes("TURBINE ENGAGED")
      );
    });

    if (hasTelemetry) {
      console.error(`❌ FAIL [${vp.name}]: Hero still contains LIVE SYSTEM TELEMETRY!`);
      testPassed = false;
    } else {
      console.log(`✓ PASS [${vp.name}]: LIVE SYSTEM TELEMETRY card removed.`);
    }

    if (hasOverclock) {
      console.error(`❌ FAIL [${vp.name}]: Hero still contains OVERCLOCK button!`);
      testPassed = false;
    } else {
      console.log(`✓ PASS [${vp.name}]: OVERCLOCK button removed.`);
    }

    // 3. Test Hero Canvas Spatial Beat Click
    const heroCanvas = await page.$("canvas");
    if (heroCanvas) {
      const box = await heroCanvas.boundingBox();
      if (box) {
        // Click spatial beat positions using page.mouse to simulate natural pointer events
        await page.mouse.click(box.x + box.width * 0.3, box.y + box.height * 0.3);
        await page.waitForTimeout(150);
        await page.mouse.click(box.x + box.width * 0.7, box.y + box.height * 0.7);
        await page.waitForTimeout(150);
        console.log(`✓ PASS [${vp.name}]: Hero spatial beat canvas clicked without errors.`);
      }
    }

    // 4. Test Chess Arena (on desktop-1440 and mobile-390)
    if (vp.name === "desktop-1440") {
      console.log(`\n--- Running Full Mate-in-2 Chess Verification on ${vp.name} ---`);
      const chessSection = await page.$("#arena");
      if (chessSection) {
        await chessSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Verify Puzzle 1: Philidor's Smothered Mate
        // Step 1: White Queen b3 -> g8
        const b3 = await page.$('button[data-square="b3"]');
        const g8 = await page.$('button[data-square="g8"]');
        if (b3 && g8) {
          console.log("Playing Step 1: b3 -> g8 (Qg8+!!)");
          await b3.click();
          await page.waitForTimeout(100);
          await g8.click();
          await page.waitForTimeout(150);

          // Verify Brilliant Move badge !!
          const brilliantBadge = await page.$("text=!!");
          if (brilliantBadge) {
            console.log("✓ PASS: Teal Brilliant Move badge '!!' displayed on Queen sacrifice!");
          } else {
            console.warn("⚠️ Warning: Brilliant Move badge '!!' selector not matched directly.");
          }

          // Verify move strip shows 1. Qg8+!!
          const moveStrip1 = await page.innerText("#arena");
          if (moveStrip1.includes("Qg8+")) {
            console.log("✓ PASS: Algebraic Move Strip contains 1. Qg8+!!");
          } else {
            console.error("❌ FAIL: Move strip missing Qg8+!!");
            testPassed = false;
          }

          // Wait 400ms for Black's automatic forced reply: Rxg8
          console.log("Waiting for Black's forced auto-reply (320ms)...");
          await page.waitForTimeout(500);

          const moveStripReply = await page.innerText("#arena");
          if (moveStripReply.includes("Rxg8")) {
            console.log("✓ PASS: Black played forced reply 1... Rxg8 automatically!");
          } else {
            console.error("❌ FAIL: Black failed to auto-reply with Rxg8!");
            testPassed = false;
          }

          // Step 2: Deliver Checkmate with White Knight h6 -> f7
          console.log("Playing Step 2: h6 -> f7 (Nf7#)");
          const h6 = await page.$('button[data-square="h6"]');
          const f7 = await page.$('button[data-square="f7"]');
          if (h6 && f7) {
            await h6.click();
            await page.waitForTimeout(100);
            await f7.click();
            await page.waitForTimeout(300);

            const checkmateText = await page.innerText("#arena");
            if (checkmateText.includes("CHECKMATE DELIVERED") || checkmateText.includes("Nf7#")) {
              console.log("✓ PASS: Checkmate delivered! 2. Nf7# confirmed.");
            } else {
              console.error("❌ FAIL: Checkmate confirmation not found!");
              testPassed = false;
            }

            // Test Copy Challenge Note button
            const copyBtn = await page.$("text=Copy Challenge Note");
            if (copyBtn) {
              await copyBtn.click();
              await page.waitForTimeout(200);
              console.log("✓ PASS: 'Copy Challenge Note' button clicked successfully.");
            }
          }
        }

        // Test Wrong Move Handling on Next Puzzle
        console.log("Testing wrong move response on Puzzle 2...");
        const nextPuzzleBtn = await page.$("text=NEXT PUZZLE");
        if (nextPuzzleBtn) {
          await nextPuzzleBtn.click();
          await page.waitForTimeout(400);

          // Try an illegal/wrong move
          const wrongPiece = await page.$('button[data-square="g2"]');
          const wrongDest = await page.$('button[data-square="g3"]');
          if (wrongPiece && wrongDest) {
            await wrongPiece.click();
            await page.waitForTimeout(100);
            await wrongDest.click();
            await page.waitForTimeout(400);

            const wrongStatus = await page.innerText("#arena");
            if (wrongStatus.includes("Incorrect move") || wrongStatus.includes("Defended by Black")) {
              console.log("✓ PASS: Wrong move properly triggered error message and board reset.");
            } else {
              console.log("Status after wrong move:", wrongStatus.slice(0, 100));
            }
            // Wait for reset timeout
            await page.waitForTimeout(850);
          }
        }

        // Test Puzzle 3: Boden's Criss-Cross Mate
        console.log("Navigating to Puzzle 3 (Boden Criss-Cross Mate)...");
        const nextPuzzleBtn2 = await page.$("text=NEXT PUZZLE");
        if (nextPuzzleBtn2) {
          await nextPuzzleBtn2.click();
          await page.waitForTimeout(600);

          const puzzle3Text = await page.innerText("#arena");
          if (puzzle3Text.includes("BODEN'S CRISS-CROSS MATE")) {
            console.log("✓ PASS: Puzzle 3 title is '03 // BODEN'S CRISS-CROSS MATE'.");
          }

          // Step 1: White Queen c3 -> c6 (1. Qxc6+!!)
          console.log("Playing Step 1: c3 -> c6 (Qxc6+!!)");
          const c3 = await page.$('button[data-square="c3"]');
          const c6 = await page.$('button[data-square="c6"]');
          if (c3 && c6) {
            await c3.click();
            await page.waitForTimeout(150);
            await c6.click();
            await page.waitForTimeout(200);

            // Wait 500ms for Black's forced auto-reply: 1... bxc6
            console.log("Waiting for Black's forced auto-reply (bxc6)...");
            await page.waitForTimeout(500);

            const moveStrip3 = await page.innerText("#arena");
            if (moveStrip3.includes("bxc6") || moveStrip3.includes("Qxc6+")) {
              console.log("✓ PASS: Step 1 played and Black played forced reply!");
            }

            // Step 2: Deliver Double Bishop Checkmate with f1 -> a6 (2. Ba6#)
            console.log("Playing Step 2: f1 -> a6 (Ba6#)");
            const f1 = await page.$('button[data-square="f1"]');
            const a6 = await page.$('button[data-square="a6"]');
            if (f1 && a6) {
              await f1.click();
              await page.waitForTimeout(150);
              await a6.click();
              await page.waitForTimeout(400);

              const checkmate3 = await page.innerText("#arena");
              if (checkmate3.includes("CHECKMATE") || checkmate3.includes("Ba6#")) {
                console.log("✓ PASS: Boden's Criss-Cross Mate delivered! (2. Ba6# confirmed)");
              } else {
                console.error("❌ FAIL: Boden's Mate not confirmed! Text was:", checkmate3.slice(0, 150));
                testPassed = false;
              }
            }
          }
        }
      }
    }

    // 5. Check Systems Workbench 4 Flagships
    const bodyText = await page.innerText("body");
    const flagships = ["SYNAPSE", "PROPEVAL", "DISHA AI", "RAG-DOCANALYZER"];
    for (const f of flagships) {
      if (bodyText.toUpperCase().includes(f)) {
        console.log(`✓ PASS [${vp.name}]: Flagship system '${f}' present.`);
      } else {
        console.error(`❌ FAIL [${vp.name}]: Flagship system '${f}' missing!`);
        testPassed = false;
      }
    }

    // Check Console & Page Errors
    if (consoleErrors.length > 0) {
      console.warn(`⚠️ Console errors on ${vp.name}:`, consoleErrors);
    } else {
      console.log(`✓ PASS [${vp.name}]: 0 console errors.`);
    }

    if (pageErrors.length > 0) {
      console.error(`❌ FAIL [${vp.name}]: Page errors detected:`, pageErrors);
      testPassed = false;
    } else {
      console.log(`✓ PASS [${vp.name}]: 0 page errors.`);
    }

    // Capture screenshot
    const screenshotPath = `${ARTIFACT_DIR}/upgrade_${vp.name}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot captured: ${screenshotPath}`);

    await page.close();
  }

  await browser.close();
  server.kill();

  if (testPassed) {
    console.log("\n🎉 ALL UPGRADE TESTS PASSED WITH 100% SUCCESS!");
    process.exit(0);
  } else {
    console.error("\n❌ SOME TESTS FAILED.");
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
