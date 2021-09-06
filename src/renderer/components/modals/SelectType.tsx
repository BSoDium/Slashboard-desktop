import React from 'react';
import Select, { ActionMeta, ValueType } from 'react-select';

const SelectType = (props: {
  options: Array<any>;
  onChange: (value: ValueType<any, any>, action: ActionMeta<any>) => void;
  defaultValue?: ValueType<any, any>;
}) => {
  const { options, onChange, defaultValue } = props;
  return (
    <Select
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
      name="type"
      theme={(theme) => ({
        ...theme,
        borderRadius: 7,
        colors: {
          ...theme.colors,
          neutral0: '#0e3455', // background and highlighted text
          neutral80: '#fff', // normal text
          primary25: '#33597a',
          primary: 'rgb(221, 222, 235)',
          neutral20: '#0e3455',
        },
      })}
      style={(style: any) => ({
        ...style,
        height: '50px',
      })}
      styles={{
        control: (base: any) => ({
          ...base,
          height: '50px',
          minHeight: '50px',
          border: 'none',
        }),

        container: (base: any) => ({
          ...base,
          boxShadow:
            base.isFocused &&
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }),

        option: (base: any) => ({
          ...base,
          borderRadius: 4,
        }),
      }}
    />
  );
};

SelectType.defaultProps = {
  defaultValue: null,
};

export default SelectType;
