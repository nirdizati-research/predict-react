import React, {Component} from 'react';
import {NavigationDrawer} from 'react-md/lib/NavigationDrawers/index';
import {FontIcon} from 'react-md/lib/index';
import {IndexLink, Link} from 'react-router';
import PropTypes from 'prop-types';

function isActive(to, path) {
  return to === path;
}

class Full extends Component {
  render() {
    const {
      location: {pathname},
      children,
    } = this.props;

    return (
      <NavigationDrawer
        // defaultVisible={true}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle='Hello, World!'

        defaultVisible={false}
        navItems={[{
          component: IndexLink,
          to: '/',
          active: isActive('/', pathname),
          primaryText: 'Dashboard',
          leftIcon: <FontIcon>home</FontIcon>,
        }, {
          component: Link,
          to: '/upload',
          active: isActive('/upload', pathname),
          primaryText: 'Upload',
          leftIcon: <FontIcon>bookmark</FontIcon>,
        }, {
          component: Link,
          to: '/page2',
          active: isActive('/page2', pathname),
          primaryText: 'Page 2',
          leftIcon: <FontIcon>donut_large</FontIcon>,
        }]}
      >
        {children ? React.cloneElement(children, {key: pathname}) : null}
      </NavigationDrawer>
    );
  }
}

Full.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default Full;
