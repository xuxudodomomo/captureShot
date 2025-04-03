const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors({
 origin:'*',
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.get("/take-screenshot", async (req, res) => {
	try {
		const browser =  await puppeteer.launch({
	headless: "new",
	args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

		const page = await browser.newPage();
		await page.goto(`hhttps://captureshot.netlify.app/`, { waitUntil: "networkidle2" });
		const screenshot = await page.screenshot({ fullPage: true });

		await browser.close();
		res.set({
			"Content-Type": "image/png",
			"Content-Disposition": "inline; filename=screenshot.png",
		});

		res.send(screenshot);
	} catch (error) {
		console.error("Error capturing screenshot:", error);
		res.status(500).send("Screenshot failed");
	}
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
