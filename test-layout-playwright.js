// Playwright layout test
// Run with: npx playwright test test-layout-playwright.js

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const htmlPath = path.join(__dirname, 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

test.describe('Layout Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Serve the HTML file
        await page.goto(`file://${htmlPath}`);
    });

    test('no horizontal overflow on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.waitForTimeout(500);
        
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // Allow 5px tolerance
    });

    test('no horizontal overflow on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForTimeout(500);
        
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    });

    test('no horizontal overflow on desktop', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForTimeout(500);
        
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    });

    test('terminal container stays within bounds', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        
        const terminal = await page.locator('.terminal');
        const terminalBox = await terminal.boundingBox();
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        
        expect(terminalBox.width).toBeLessThanOrEqual(viewportWidth);
    });

    test('project items wrap properly', async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.waitForTimeout(500);
        
        const projectItems = await page.locator('.project-item').all();
        for (const item of projectItems) {
            const box = await item.boundingBox();
            const viewportWidth = await page.evaluate(() => window.innerWidth);
            expect(box.width).toBeLessThanOrEqual(viewportWidth);
        }
    });
});

