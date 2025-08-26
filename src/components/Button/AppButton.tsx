import { Button } from "antd";
import styles from './AppButton.module.css';

export default function AppButton(props: any) {
	const { type, htmlType, onClick, loading, classNames, children = '', icon, size, iconBtn = false, style } = props;

	return (
    <Button
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      loading={loading}
      icon={icon}
	  size={size}
	  style={style}
      className={`${styles.btn} ${iconBtn ? styles.iconBtn : ''} ${classNames}`}
    >
      {children}
    </Button>
  );
}