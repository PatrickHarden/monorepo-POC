import React from 'react';
import { mount } from 'enzyme';
import GLCheckbox from '../checkbox';

describe('gl-controls', () => {

  describe('checkbox', () => {

    let props:any;
    let wrapper:any;

    beforeEach(() => {
        props = {
            name: "unitTestMe",
            label: "Checkbox Unit Test",
            checked: false,
            changeHandler: jest.fn()
        }
    });

    // it is a checkbox
    it("it should be a checkbox (type = checkbox)", () => {
        wrapper = mount(<GLCheckbox {...props}/>);
        expect(wrapper.find('input').props().type).toEqual("checkbox")
    });

    // it has a label of "I am a checkbox"
    it("renders the expected label", () => {
        wrapper = mount(<GLCheckbox {...props}/>);
        expect(wrapper.find('span[data-ut="label"]').text()).toEqual("Checkbox Unit Test");
    });
  });
});