"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"
import { Else, If, Then } from "react-if"

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      size="lg"
      className="w-full"
    >
      <If condition={isSuccess}>
        <Then>Added!</Then>
        <Else>Add to cart</Else>
      </If>
    </Button>
  )
}

export default AddToCartButton
