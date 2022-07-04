import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef
} from 'react';

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

export interface SearchProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<{}>>;
}

export function Search(props: SearchProps) {
  const { setIsLoading, setSearch, setUser } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!inputRef.current) return;
    const username = inputRef.current.value;

    setSearch(username);
    fetchData(username);
  };

  const fetchData = (username: string) => {
    setIsLoading(true);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box as={'form'} onSubmit={handleSubmit} w={'full'}>
      <InputGroup>
        <Input
          ref={inputRef}
          focusBorderColor={'border.base'}
          placeholder="Type username..."
          variant={'filled'}
          _focus={{
            outline: 'none'
          }}
        />
        <InputRightElement w={'auto'} mr={1}>
          <Button type={'submit'} size={'sm'}>
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
