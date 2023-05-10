import { gql, useMutation } from '@apollo/client';

const useDeleteMeal = () => {
  return useMutation(
    gql(`
    mutation DeleteMeal($id: String!) {
      deleteMeal(id: $id)
    }
  `),
    {
      refetchQueries: ['GetMeals'],
    }
  );
};

export default useDeleteMeal;
