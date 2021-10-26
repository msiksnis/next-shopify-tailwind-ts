import useAddItem from "@common/cart/use-add-item";
import { MutationHook } from "@common/types/hooks";
import getCheckoutId from "@framework/utils/get-checkout-id";
import { checkoutLineItemsAddMutation } from "@framework/utils/mutations/checkout-Line-Items-Add";

export default useAddItem;

export const handler: MutationHook = {
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

    const response = await fetch({
      ...options,
      variables,
    });

    return response;
  },
  useHook: ({ fetch }: any) => {
    return async (input: any) => {
      const response = await fetch(input);
      return { output: response };
    };
  },
};
