"use client"

import { trpc } from "@/trpc/client"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

const PayPal = ({
  orderDetail,
}: {
  orderDetail: {
    totalAmount: string
  }
}) => {
  const router = useRouter()
  const { items, removeItem } = useCart()

  const { mutate: createOrder } = trpc.payment.createOrder.useMutation({
    onSuccess: (order) => {
      if (order)
        if (order) {
          removeItem(order.id)
          router.push(`/thank-you?orderId=${order.id}`)
        }
    },
    onError: () => router.push("/cart"),
  })

  const productIds = items.map(({ product }) => product.id)

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AYFGTFfFuRJYcz_l7XH95rACpMiax49XyaxR65NFo-Qy87maYi1Ps6P7PORgYiv7fHUu_v7lwkZX3tBX",
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Digital Products",
                amount: {
                  currency_code: "USD",
                  value: orderDetail?.totalAmount,
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          const order = await actions?.order?.capture()
          if (!order) return
          const amount = order?.purchase_units?.[0]
          createOrder({ productIds })
        }}
        onError={(error) => {
          console.log(error)
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPal
