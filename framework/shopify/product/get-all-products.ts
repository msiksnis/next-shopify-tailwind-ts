import { ApiConfig } from "@common/types/api";
import { Product } from "@common/types/product";
import { ProductConnection } from "../schema";
import { normalizeProduct } from "../utils/normalize";
import getAlLProductsQuery from "../utils/queries/get-all-products";

type ReturnType = { products: ProductConnection };

const getAlLProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<ReturnType>({
    query: getAlLProductsQuery,
  });

  const products =
    data.products.edges.map(({ node: product }) => normalizeProduct(product)) ??
    [];

  return products;
};

export default getAlLProducts;
