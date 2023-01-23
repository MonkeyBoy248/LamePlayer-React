import { NavigationItem } from '@interfaces/NavigationItem';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import styles from './NavItem.module.scss';

export interface NavItemProps extends NavigationItem{}

const NavItem = ({ title, svg, link }: NavItemProps) => {
  return (
    <li className={styles.navItem}>
      <NavLink end to={link} className={ ({isActive}) => isActive ? styles.navItem_active : '' }>
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