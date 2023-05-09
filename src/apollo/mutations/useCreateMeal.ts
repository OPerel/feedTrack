import { gql, useMutation } from '@apollo/client';

const useCreateMeal = () => {
  return useMutation(
    gql(`
    mutation CreateMeal($ingredients: [String], $createdAt: DateTime) {
      createMeal(ingredients: $ingredients, createdAt: $createdAt) {
        id
        ingredients
        createdAt
      }
    }
  `),
    {
      refetchQueries: ['GetMeals'],
    }
  );
};

export default useCreateMeal;
