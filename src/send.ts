import express from "express"
import { Resend } from "resend"
import { Product } from "./payload-types"
import { ReceiptEmailHtml } from "./components/emails/ReceiptEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

export const resendEmailHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const { user, order } = req.body
  // send receipt
  try {
    const data = await resend.emails.send({
      from: "DigitalPanda <dkm1036@gmail.com>",
      to: [user.email],
      subject: "Thanks for your order! This is your receipt.",
      html: ReceiptEmailHtml({
        date: new Date(),
        email: user.email,
        orderId: order.orderId,
        products: order.products as Product[],
      }),
    })
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
