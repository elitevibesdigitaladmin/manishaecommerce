
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import AdminNavbar from '../Admin/components/AdminNavbar/AdminNavbar';
import AdminSidebar from '../Admin/components/AdminSidebar/AdminSidebar';

const AdminLayout = () => {
  return (

    <div className={styles.adminContainer}>
      <div className={styles.navbar}>
        <AdminNavbar />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.sidebar}>
          <AdminSidebar />
        </div>
        <div className={styles.content}>
          {/* Content Replace with your actual content */}
          <Outlet />
        </div>
      </div>
    </div>

  );
};

export default AdminLayout;
