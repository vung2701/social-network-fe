import React from 'react';
import { Typography, Image } from 'antd';

const { Paragraph } = Typography;

interface PostContentProps {
  content: string;
  image?: string;
}

const PostContent: React.FC<PostContentProps> = React.memo(({ content, image }) => {
  return (
    <div style={{ marginTop: '8px' }}>
      {/* Text Content */}
      {content && (
        <Paragraph 
          style={{ 
            margin: 0, 
            fontSize: '16px', 
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {content}
        </Paragraph>
      )}
      
      {/* Image Content */}
      {image && (
        <div style={{ marginTop: '12px' }}>
          <Image
            src={image}
            alt="Post image"
            style={{ 
              borderRadius: '8px',
              maxHeight: '400px',
              objectFit: 'cover'
            }}
            preview={{
              mask: 'Xem ảnh',
              maskClassName: 'custom-mask'
            }}
          />
        </div>
      )}
    </div>
  );
});

export default PostContent;
