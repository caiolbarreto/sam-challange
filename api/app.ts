// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as schema from './prisma/schema.prisma';
import * as x from './node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node';
import * as l from './node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node';
import { createIngredientHandler } from './src/infra/http/handlers/ingredients/create-ingredient.handler';
import { fetchAllIngredientsHandler } from './src/infra/http/handlers/ingredients/fetch-all-ingredients.handler';
import { updateIngredientHandler } from './src/infra/http/handlers/ingredients/update-ingredient.handler';
import { deleteIngredientHandler } from './src/infra/http/handlers/ingredients/delete-ingredient.handler';
import { createSnackHandler } from './src/infra/http/handlers/snacks/create-snack.handler';
import { deleteSnackHandler } from './src/infra/http/handlers/snacks/delete-snack.handler';
import { fetchAllSnacksHandler } from './src/infra/http/handlers/snacks/fetch-all-snacks.handler';
import { createOrderHandler } from './src/infra/http/handlers/orders/create-order.handler';
import { fetchAllOrdersHandler } from './src/infra/http/handlers/orders/fetch-all-orders.handler';
import { deleteAllOrdersHandler } from './src/infra/http/handlers/orders/delete-all-orders.handler';

if (process.env.NODE_ENV !== 'production') {
  console.debug(schema, x, l);
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export {
  createIngredientHandler,
  fetchAllIngredientsHandler,
  updateIngredientHandler,
  deleteIngredientHandler,
  createSnackHandler,
  deleteSnackHandler,
  fetchAllSnacksHandler,
  createOrderHandler,
  fetchAllOrdersHandler,
  deleteAllOrdersHandler,
};
