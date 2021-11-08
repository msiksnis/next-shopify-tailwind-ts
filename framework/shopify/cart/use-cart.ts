import { useApiProvider } from "@common";
import useCart, { UseCart } from "@common/cart/use-cart";
import { Cart } from "@common/types/cart";
import { SWRHook } from "@common/types/hooks";
import { Checkout } from "@framework/schema";
import checkoutToCart from "@framework/utils/checkout-to-cart";
import createCheckout from "@framework/utils/create-checkout";
import getCheckoutQuery from "@framework/utils/queries/get-checkout-query";
import Cookies from "js-cookie";
import { useMemo } from "react";

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string;
  };
  fetcherOutput: {
    node: Checkout;
  };
  data: Cart;
};

export default useCart as UseCart<typeof handler>;

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }) {
    let checkout: Checkout;

    if (checkoutId) {
      const { data } = await fetch({ ...options, variables: { checkoutId } });

      checkout = data.node;
    } else {
      checkout = await createCheckout(fetch as any);
    }

    const cart = checkoutToCart(checkout);
    return cart;
  },
  useHook:
    ({ useData }) =>
    () => {
      const { checkoutCookie } = useApiProvider();
      const result = useData({
        swrOptions: {
          revalidateOnFocused: false,
        },
      });

      if (result.data?.completedAt) {
        Cookies.remove(checkoutCookie);
      }

      return useMemo(() => {
        return {
          ...result,
          isEmpty: (result.data?.lineItems.length ?? 0) <= 0,
        };
      }, [result]);
    },
};
