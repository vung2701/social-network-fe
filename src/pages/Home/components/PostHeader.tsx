import React from 'react';
import { Avatar, Space, Typography, Dropdown, Button } from 'antd';
import { UserOutlined, MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { User } from '../../../types';

const { Text, Title } = Typography;

interface PostHeaderProps {
  author: User;
  timeAgo: string;
}

const PostHeader: React.FC<PostHeaderProps> = React.memo(({ author, timeAgo }) => {
  const menuItems: MenuProps['items'] = [
    {
      key: 'report',
      label: 'Báo cáo',
      danger: true,
    },
    {
      key: 'hide',
      label: 'Ẩn bài viết',
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Space size="small">
        <Avatar 
          size={40} 
          icon={<UserOutlined />} 
          src={author.avatar}
          style={{ backgroundColor: '#87d068' }}
        />
        <div>
          <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
            {author.name}
          </Title>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {timeAgo}
          </Text>
        </div>
      </Space>
      
      <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
        <Button 
          type="text" 
          icon={<MoreOutlined />} 
          size="small"
          style={{ color: '#8c8c8c' }}
        />
      </Dropdown>
    </div>
  );
});

export default PostHeader;
