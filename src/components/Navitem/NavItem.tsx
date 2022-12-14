import React from 'react';
import { NavigationItem } from '@interfaces/NavigationItem';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import styles from './NavItem.module.scss';

export interface NavItemProps extends NavigationItem{}

const NavItem = ({ title, svg }: NavItemProps) => {
  return (
    <li className={ `${styles.navItem}` }>
      <NavLink to={ `/${title.toLowerCase()}` } className={ isActive => isActive ? 'navItem_active' : undefined }>
        <Icon
            id={ svg.id }
            blockName={ svg.blockName }
            width={ svg.width }
            height={ svg.height }
            fill={ svg.fill }
            />
          <p className={ `${styles.navItem__name} _text` }>{ title }</p>
      </NavLink>
    </li>
  )
}

export default NavItem