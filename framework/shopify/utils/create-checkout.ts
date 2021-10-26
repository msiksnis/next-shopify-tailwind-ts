import { ApiFetcher } from "@common/types/api";
import checkoutCreate from "./mutations/checkout-create";

const createCheckout = async (fetch: ApiFetcher): Promise<any> => {
  debugger;
  const { data } = await fetch({
    query: checkoutCreate,
  });
  debugger;
  return data;
};

export default createCheckout;
