const { React } = require('powercord/webpack');
const { Menu } = require('powercord/components');

class ContextMenu extends React.Component {
    render() {
        return (
            <Menu.Menu navId='embedLinks-menu'>
                <Menu.MenuGroup>
                    <Menu.MenuItem
                        id='test'
                        label='Test'
                        action={() => { console.log("TEST") }}
                    />
                </Menu.MenuGroup>
            </Menu.Menu>
        );
    }
}

module.exports = ContextMenu;