import { Input } from 'antd';
const { TextArea } = Input;

export default function AppTextArea(props: any) {
  const { value, onChange, placeholder, onKeyPress, autoSize, style, classNames } = props;

  return (
    <TextArea
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      autoSize={autoSize}
	  style={style}
	  className={classNames}
    />
  );
}
