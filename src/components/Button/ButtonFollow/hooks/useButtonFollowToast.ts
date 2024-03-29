import { useToast, UseToastOptions } from '@chakra-ui/react';

import { TOAST_DURATION } from 'utils/constants';

export const useButtonFollowToast = () => {
  const toast = useToast();

  const toastDefaultOptions: UseToastOptions = {
    status: 'success',
    variant: 'subtle',
    duration: TOAST_DURATION
  };

  const showToast = (opts: UseToastOptions = {}) => {
    const options = Object.assign({}, toastDefaultOptions, { ...opts });

    toast(options);
  };

  return { toast: showToast };
};
