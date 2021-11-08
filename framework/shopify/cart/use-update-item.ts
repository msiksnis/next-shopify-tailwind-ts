import useUpdateItem, { UseUpdateItem } from "@common/cart/use-update-item";
import { Cart } from "@common/types/cart";
import { MutationHook } from "@common/types/hooks";
import { CheckoutLineItemsUpdatePayload } from "@framework/schema";
import checkoutToCart from "@framework/utils/checkout-to-cart";
import getCheckoutId from "@framework/utils/get-checkout-id";
import checkoutLineItemUpdateMutation from "@framework/utils/mutations/checkout-line-items-update";
import useCart from "./use-cart";

export default useUpdateItem as UseUpdateItem<typeof handler>;

export type UpdatedItemDescriptor = {
  fetcherInput: { id: string; variantId: string; quantity: number };
  fetcherOutput: { checkoutLineItemsUpdate: CheckoutLineItemsUpdatePayload };
  data: Cart;
};

export const handler: MutationHook<UpdatedItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemUpdateMutation,
  },

  async fetcher({ input: item, options, fetch }) {
    const { data } = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItems: [
          {
            id: item.id,
            variantId: item.variantId,
            quantity: item.quantity ?? 1,
          },
        ],
      },
    });
    const cart = checkoutToCart(data.checkoutLineItemsUpdate.checkout);
    return cart;
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate: updateCart } = useCart();

      return async (input) => {
        const data = await fetch(input);
        updateCart(data, false);
        return data;
      };
    },
};
