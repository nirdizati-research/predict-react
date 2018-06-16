import React, {Component} from 'react';
import {NavigationDrawer} from 'react-md/lib/NavigationDrawers/index';
import {IndexLink, Link} from 'react-router';
import PropTypes from 'prop-types';
import {Button, FontIcon} from 'react-md';
import HelpDialog from '../../components/static/HelpDialog';
import {getHelpText} from '../../components/static/helpReference';
import Footer from '../../components/footer/Footer';
import RunningTasks from '../RunningTasks';


const helpButton = (click) => (
  <Button flat swapTheming onClick={click} iconBefore={false} iconEl={<FontIcon>help</FontIcon>}>
    Help
  </Button>);

function isActive(to, path) {
  return to === path;
}

class Full extends Component {
  state = {visible: false};

  click() {
    this.setState({visible: true});
  }

  hide() {
    this.setState({visible: false});
  }

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
        toolbarTitle='Nirdizati Research'

        toolbarActions={[<RunningTasks key="running"/>, helpButton(this.click.bind(this))]}
        defaultVisible={false}
        navItems={[{
          component: IndexLink,
          to: '/',
          active: isActive('/', pathname),
          primaryText: 'Home',
          leftIcon: <FontIcon>home</FontIcon>,
        }, {
          component: Link,
          to: '/upload',
          active: isActive('/upload', pathname),
          primaryText: 'Upload',
          leftIcon: <FontIcon>backup</FontIcon>,
        }, {
          component: Link,
          to: '/logs',
          active: isActive('/logs', pathname),
          primaryText: 'Log details',
          leftIcon: <FontIcon>description</FontIcon>,
        }, {
          component: Link,
          to: '/split',
          active: isActive('/split', pathname),
          primaryText: 'Split',
          leftIcon: <FontIcon>swap_horiz</FontIcon>,
        }, {
          component: Link,
          to: '/label',
          active: isActive('/label', pathname),
          primaryText: 'Labelling',
          leftIcon: <FontIcon>label_outline</FontIcon>,
        }, {
          component: Link,
          to: '/training',
          active: isActive('/training', pathname),
          primaryText: 'Training',
          leftIcon: <FontIcon>build</FontIcon>,
        }, {
          component: Link,
          to: '/jobs',
          active: isActive('/jobs', pathname),
          primaryText: 'Task status',
          leftIcon: <FontIcon>list</FontIcon>,
        }, {
          component: Link,
          to: '/validation',
          active: isActive('/validation', pathname),
          primaryText: 'Validation',
          leftIcon: <FontIcon>insert_chart</FontIcon>,
        }, {
          component: Link,
          to: '/prediction',
          active: isActive('/prediction', pathname),
          primaryText: 'Prediction',
          leftIcon: <FontIcon>work</FontIcon>,
        }, {
          component: Link,
          to: '/runtime',
          active: isActive('/runtime', pathname),
          primaryText: 'Runtime',
          leftIcon: <FontIcon>flash_on</FontIcon>,
        }]}
      >
        <HelpDialog texts={getHelpText(pathname)} visible={this.state.visible} hide={this.hide.bind(this)}/>
        {children ? React.cloneElement(children, {key: pathname}) : null}
        <Footer/>
      </NavigationDrawer>
    );
  }
}

Full.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default Full;
