import { Form, Input } from "antd";


export default function AppInput(props: any) {
	const { type, name, label, rules, prefix, placeholder, autoFocus = false, iconRender, classNames } = props;

	return (
    <Form.Item name={name} label={label} rules={rules} className={classNames}>
      {type === 'password' ? (
        <Input.Password prefix={prefix} placeholder={placeholder} autoFocus={autoFocus} iconRender={iconRender} />
      ) : (
        <Input prefix={prefix} placeholder={placeholder} autoFocus={autoFocus} />
      )}
    </Form.Item>
  );

}