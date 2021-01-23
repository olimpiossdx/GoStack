import React, { useRef, useEffect } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';

import { } from '@unform/mobile';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
    return () => {
      registerField
    }
  }, [fieldName, inputValueRef]);

  return (
    <Container>
      <Icon name={icon} size={20} color='#666360' />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance='dark'
        placeholderTextColor='#666360'
        defaultValue={defaultValue}
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
          inputValueRef.current.value = event.nativeEvent.text;
        }}
        {...rest} />
    </Container>
  )
}

export default Input;
