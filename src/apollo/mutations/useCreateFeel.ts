import { gql, useMutation } from '@apollo/client';

const useCreateFeel = () => {
  return useMutation(
    gql(`
    mutation CreateFeel($score: Int, $createdAt: DateTime) {
      createFeel(score: $score, createdAt: $createdAt) {
        score
        createdAt
      }
    }
  `),
    {
      refetchQueries: ['GetFeels'],
    }
  );
};

export default useCreateFeel;
