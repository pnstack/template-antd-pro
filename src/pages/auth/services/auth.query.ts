import { useMutation } from '@tanstack/react-query';
import { authService } from './auth.service';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (input: any) => {
      return authService.login(input);
    },
  });
};
