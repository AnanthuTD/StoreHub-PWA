import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  PercentageOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  BellOutlined,
  PlusOutlined,
  EditOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Divider, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/interface';

const { Sider } = Layout;

type MenuItem = {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Main menu items
const items: MenuItem[] = [
  getItem('Dashboard', '/vendor/dashboard', <HomeOutlined />),
  getItem('Register', '/vendor/owner/register', <ProfileOutlined />),
  getItem('Register Shop', '/vendor/shop/register', <ProfileOutlined />),
  getItem('New Orders', '/vendor/new-orders', <ShoppingCartOutlined />),
  getItem('Products', '/vendor/products', <AppstoreOutlined />, [
    getItem('Add Product', '/vendor/products/add', <PlusOutlined />),
    getItem('Manage Products', '/vendor/products/manage', <EditOutlined />),
  ]),
  getItem('Offers', '/vendor/offers', <PercentageOutlined />),
  getItem('Payment Overview', '/vendor/payment-overview', <DollarCircleOutlined />),
  getItem('Reports', '/vendor/reports', <FileTextOutlined />),
  getItem('Notifications', '/vendor/notifications', <BellOutlined />),
];

// Account section items
const accountMenuItems: ItemType[] = [
  getItem('Profile', '/admin/profile', <ProfileOutlined />),
  getItem('Subscription', '/vendor/subscription', <CreditCardOutlined />),
];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(location.pathname); // Set default to current path

  useEffect(() => {
    setActiveMenu(location.pathname); // Update active menu when the route changes
  }, [location.pathname]);

  const handleMenuItemClick = (e: { key: string }) => {
    setActiveMenu(e.key);
    navigate(e.key);
  };

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed} width={250}>
      <Typography.Title style={{ paddingLeft: 3 }} level={3}>
        ShopHub Vendor
      </Typography.Title>
      {/* Main Menu */}
      <Menu mode="inline" selectedKeys={[activeMenu]} items={items} onClick={handleMenuItemClick} />
      <Divider>Accounts</Divider>
      {/* Account Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
        items={accountMenuItems}
        onClick={handleMenuItemClick}
      />
    </Sider>
  );
};

export default Sidebar;
