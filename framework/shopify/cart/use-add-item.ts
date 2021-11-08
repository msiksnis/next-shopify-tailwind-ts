import useAddItem, { UseAddItem } from "@common/cart/use-add-item";
import useCart from "@common/cart/use-cart";
import { Cart } from "@common/types/cart";
import { MutationHook } from "@common/types/hooks";
import { CheckoutLineItemsAddPayload } from "@framework/schema";
import checkoutToCart from "@framework/utils/checkout-to-cart";
import getCheckoutId from "@framework/utils/get-checkout-id";
import { checkoutLineItemsAddMutation } from "@framework/utils/mutations/checkout-line-items-add";

export default useAddItem as UseAddItem<typeof handler>;

export type AddItemHookDescriptor = {
  fetcherInput: {
    variantId: string;
    quantity: number;
  };
  fetcherOutput: {
    checkoutLineItemsAdd: CheckoutLineItemsAddPayload;
  };
  data: Cart;
};

export const handler: MutationHook<AddItemHookDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsAddMutation,
  },

  fetcher: async ({ fetch, options, input }) => {
    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [
        {
          variantId: input.variantId,
          quantity: 1,
        },
      ],
    };

    const { data } = await fetch({
      ...options,
      variables,
    });

    const cart = checkoutToCart(data.checkoutLineItemsAdd.checkout);
    return cart;
  },

  useHook:
    ({ fetch }: any) =>
    () => {
      const { mutate: updateCart } = useCart();

      return async (input) => {
        const response = await fetch(input);
        await updateCart(response, false);
        return response;
      };
    },
};
