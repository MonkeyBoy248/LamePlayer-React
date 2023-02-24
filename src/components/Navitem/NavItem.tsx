import { NavigationItem } from '@interfaces/NavigationItem';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import styles from './NavItem.module.scss';

const NavItem: FC<NavigationItem> = ({ title, svg, link }: NavigationItem): JSX.Element => {
  const getActiveLinkClassName = (isActive: boolean): string => {
    return isActive ? styles.navItem_active : '';
  };

  return (
    <li className={styles.navItem}>
      <NavLink end to={link} className={({ isActive }): string => getActiveLinkClassName(isActive)}>
        <Icon id={svg.id} width={svg.width} height={svg.height} fill={svg.fill} />
        <p className={`${styles.navItem__name} _text`}>{title}</p>
      </NavLink>
    </li>
  );
};

export default NavItem;
