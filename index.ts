import { chromium, devices } from 'playwright'
import { createTransport } from 'nodemailer'

import 'dotenv/config'
;(async () => {
	const browser = await chromium.launch()
	const context = await browser.newContext(devices['Desktop Edge'])
	const page = await context.newPage()
	const WEBSITE_URL = process.env.WEBSITE_URL!
	const BNH_URL = process.env.BNH_URL!
	await page.goto(`${WEBSITE_URL}/${BNH_URL}`, {
		timeout: 120000,
	})

	if (
		(await (
			await page.getByText(' ' + new Date().toLocaleDateString('ja-JP')).all()
		).length) === 0
	) {
		console.log('SE SUBIÓ NUEVO CAPÍTULO BROTHER')
	}
	await context.close()
	await browser.close()
})()
