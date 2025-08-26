import { Button } from "antd";
import styles from './AppButton.module.css';

export default function AppButton(props: any) {
	const { type, htmlType, onClick, loading, classNames, children, icon, size } = props;

	return (
    <Button
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      loading={loading}
      className={`${styles.btn} ${classNames}`}
      icon={icon}
      size={size}
    >
      {children}
    </Button>
  );
}