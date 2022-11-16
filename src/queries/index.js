import { client } from '..';

const queryApolloClient = async (query, variables = {}) => {
  let data = null;
  await client
    .query({ query: query, variables: variables })
    .then((result) => {
      data = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export default queryApolloClient;
