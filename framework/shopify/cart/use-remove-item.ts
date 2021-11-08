import useCart from "@common/cart/use-cart";
import useRemoveItem, { UseRemoveItem } from "@common/cart/use-remove-item";
import { Cart } from "@common/types/cart";
import { MutationHook } from "@common/types/hooks";
import { CheckoutLineItemsRemovePayload } from "@framework/schema";
import checkoutToCart from "@framework/utils/checkout-to-cart";
import getCheckoutId from "@framework/utils/get-checkout-id";
import checkoutLineItemRemoveMutation from "@framework/utils/mutations/checkout-line-items-remove";

export default useRemoveItem as UseRemoveItem<typeof handler>;

export type RemoveItemDescriptor = {
  fetcherInput: {
    id: string;
  };
  fetcherOutput: {
    checkoutLineItemsRemove: CheckoutLineItemsRemovePayload;
  };
  data: Cart;
};

export const handler: MutationHook<RemoveItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemRemoveMutation,
  },
  async fetcher({ input: { id }, options, fetch }) {
    const { data } = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItemIds: [id],
      },
    });
    const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout);
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
