import React from 'react';
import { NavigationItem } from '../../interfaces/NavigationItem';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import styles from './NavItem.module.scss';

export interface NavItemProps extends NavigationItem{}

const NavItem = ({ title, svg }: NavItemProps) => {
  return (
    <li className={`${styles.navItem}`}>
      <Link to={`/${title.toLowerCase()}`}>
        <Icon
            id={svg.id}
            blockName={svg.blockName}
            width={svg.width}
            height={svg.height}
            fill={svg.fill}
            />
          <p className={`${styles.navItem__name} _text`}>{title}</p>
      </Link>
    </li>
  )
}

export default NavItem