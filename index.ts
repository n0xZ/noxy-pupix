import { chromium, devices } from 'playwright'
import { createTransport } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { schedule } from 'node-cron'
import 'dotenv/config'

//This will trigger on Friday, 12:00

schedule('0 0 12 * * Tuesday', async () => {
	const WEBSITE_URL = process.env.WEBSITE_URL!
	const CM_URL = process.env.CM_URL!
	const SENDER_EMAIL = process.env.SENDER_EMAIL!
	const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL!
	const USERNAME_EMAIL = process.env.USERNAME_EMAIL!
	const USERNAME_PASSWORD = process.env.USERNAME_PASSWORD!
	const browser = await chromium.launch()
	const context = await browser.newContext(devices['Desktop Edge'])
	const page = await context.newPage()

	await page.goto(`${WEBSITE_URL}/${CM_URL}`, {
		timeout: 120000,
	})

	if (
		(await (
			await page.getByText(' ' + new Date().toLocaleDateString('ja-JP')).all()
		).length) === 0
	) {
		let mail: MailOptions = {
			to: RECEIVER_EMAIL,
			from: SENDER_EMAIL,
			subject: 'Notificación acerca de nuevo capitulo de CM',
			text: 'No se subió nada hoy. seguí agarrando la pala.',
		}
		const transporter = createTransport({
			service: 'hotmail',
			auth: { user: USERNAME_EMAIL, pass: USERNAME_PASSWORD },
		})
		let sendedEmailNotification = await transporter.sendMail(mail)
		if (sendedEmailNotification.accepted) {
			console.log('Email enviado con éxito')
		}
	} else {
		let mail: MailOptions = {
			to: RECEIVER_EMAIL,
			from: SENDER_EMAIL,
			subject: 'MARTES - Notificación acerca de nuevo capitulo de CM',
			text: 'SE SUBIÓ UN NUEVO CAP HOY. LARGÁ LA PALA',
		}
		const transporter = createTransport({
			service: 'hotmail',
			auth: { user: USERNAME_EMAIL, pass: USERNAME_PASSWORD },
		})
		let sendedEmailNotification = await transporter.sendMail(mail)
		if (sendedEmailNotification.accepted) {
			console.log('Email enviado con éxito')
		}
	}

	await context.close()
	await browser.close()
})

schedule('0 0 12 * * Friday', async () => {
	const WEBSITE_URL = process.env.WEBSITE_URL!
	const BNH_URL = process.env.BNH_URL!
	const SENDER_EMAIL = process.env.SENDER_EMAIL!
	const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL!
	const USERNAME_EMAIL = process.env.USERNAME_EMAIL!
	const USERNAME_PASSWORD = process.env.USERNAME_PASSWORD!
	const browser = await chromium.launch()
	const context = await browser.newContext(devices['Desktop Edge'])
	const page = await context.newPage()

	await page.goto(`${WEBSITE_URL}/${BNH_URL}`, {
		timeout: 120000,
	})

	if (
		(await (
			await page.getByText(' ' + new Date().toLocaleDateString('ja-JP')).all()
		).length) === 0
	) {
		let mail: MailOptions = {
			to: RECEIVER_EMAIL,
			from: SENDER_EMAIL,
			subject: 'Notificación acerca de nuevo capitulo de BNH',
			text: 'No se subió nada hoy. seguí agarrando la pala.',
		}
		const transporter = createTransport({
			service: 'hotmail',
			auth: { user: USERNAME_EMAIL, pass: USERNAME_PASSWORD },
		})
		let sendedEmailNotification = await transporter.sendMail(mail)
		if (sendedEmailNotification.accepted) {
			console.log('Email enviado con éxito')
		}
	} else {
		let mail: MailOptions = {
			to: RECEIVER_EMAIL,
			from: SENDER_EMAIL,
			subject: 'VIERNES - Notificación acerca de nuevo capitulo de BNH',
			text: 'SE SUBIÓ UN NUEVO CAP HOY. LARGÁ LA PALA',
		}
		const transporter = createTransport({
			service: 'hotmail',
			auth: { user: USERNAME_EMAIL, pass: USERNAME_PASSWORD },
		})
		let sendedEmailNotification = await transporter.sendMail(mail)
		if (sendedEmailNotification.accepted) {
			console.log('Email enviado con éxito')
		}
	}

	await context.close()
	await browser.close()
})
