import { gql, useMutation } from '@apollo/client';

const useDeleteFeel = () => {
  return useMutation(
    gql(`
    mutation DeleteFeel($id: String!) {
      deleteFeel(id: $id)
    }
  `),
    {
      refetchQueries: ['GetFeels'],
    }
  );
};

export default useDeleteFeel;
