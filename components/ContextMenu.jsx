const { React, getModule, contextMenu: { closeContextMenu } } = require('powercord/webpack');
const { Menu } = require('powercord/components');

class ContextMenu extends React.Component {
    render() {
        return (
            <Menu.Menu navId='embedLinks-menu' onClose={closeContextMenu}>
                <Menu.MenuGroup>
                    <Menu.MenuItem
                        id='quick-settings'
                        label='Open Settings'
                        action={() => getModule(['open', 'saveAccountChanges'], false).open('Link Preview Utility')}
                    />
                </Menu.MenuGroup>
            </Menu.Menu>
        );
    }
}

module.exports = ContextMenu;