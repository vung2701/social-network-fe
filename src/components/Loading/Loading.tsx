import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

export default function Loading({ 
  size = 'default', 
  fullScreen = false, 
  text,
  className 
}: LoadingProps) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (fullScreen) {
    return (
      <div 
        className={className}
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.9)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999
        }}
      >
        <Spin 
          indicator={antIcon} 
          size={size}
          style={{ marginBottom: text ? '16px' : 0 }}
        />
        {text && (
          <div style={{ 
            color: '#666', 
            fontSize: '14px',
            marginTop: '8px'
          }}>
            {text}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={className}
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '40px 20px'
      }}
    >
      <Spin 
        indicator={antIcon} 
        size={size}
        style={{ marginBottom: text ? '16px' : 0 }}
      />
      {text && (
        <div style={{ 
          color: '#666', 
          fontSize: '14px',
          marginTop: '8px'
        }}>
          {text}
        </div>
      )}
    </div>
  );
}

// Page Loading component (alias for fullScreen loading)
export const PageLoading = ({ text, className }: Omit<LoadingProps, 'fullScreen'>) => (
  <Loading fullScreen text={text} className={className} />
);

// Inline Loading component (small size, no fullScreen)
export const InlineLoading = ({ text, className }: Omit<LoadingProps, 'fullScreen' | 'size'>) => (
  <Loading size="small" text={text} className={className} />
);

// Button Loading component (very small, no text)
export const ButtonLoading = ({ className }: Omit<LoadingProps, 'fullScreen' | 'size' | 'text'>) => (
  <Loading size="small" className={className} />
);
