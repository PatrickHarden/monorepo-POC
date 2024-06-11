import React, { FC, useState } from 'react';
import styled from 'styled-components';

interface Props {
  /** Unique name of the checkbox */
  name:string,
  /** Text displayed next to checkbox */
  label?:string,
  /** Whether the checkbox is checked by default */
  checked?:boolean,
  /** (name, checked) => void */
  changeHandler?:Function
}

const GLCheckbox: FC<Props> = (props:Props) => {

  const { name, label, checked, changeHandler} = props;

  // local state
  const [localChecked, setLocalChecked] = useState<boolean>(checked ? checked : false);

  // click handler
  const handleClick = (e: any) => {
    if (changeHandler) {
        setLocalChecked(e.currentTarget.checked);
        changeHandler(name, e.currentTarget.checked);
    }
  }

  // handler to support the spacebar
  const onKeyDown = (e: React.KeyboardEvent) => {
    const keyPressed = e.charCode || e.which;
    if (keyPressed === 32) {  // spacebar
        const checkToggled:boolean = !localChecked;
        setLocalChecked(checkToggled);
        if (changeHandler) {
            changeHandler(name, checkToggled);
        }
    }
  }

  return (
    <Container>
      <div>Hello</div>
      <CheckboxInput id={name} name={name} type="checkbox" defaultChecked={localChecked} onChange={handleClick} onKeyDown={onKeyDown} />
      { label && <CheckboxLabel data-ut="label">{label}</CheckboxLabel> }
    </Container>
  );
}

const Container = styled.div`
  width:100%;
  display:inline-flex;
  position:relative;
`;

const CheckboxInput = styled.input``;

const CheckboxLabel = styled.span`
  color: blue
`;

export default GLCheckbox;