const { Plugin } = require('powercord/entities');
const { React, getModule, getModuleByDisplayName, constants: { Permissions } } = require('powercord/webpack');
const Settings = require('./components/Settings.jsx');
const { inject, uninject } = require('powercord/injector');
const EmbedLinks = require('./components/EmbedLinks.jsx')
const EmbedLinksIcon = require('./components/EmbedLinksIcon.jsx')

module.exports = class EmbedLinksUtility extends Plugin {
  async startPlugin() {
    powercord.api.settings.registerSettings('Link Preview Utility', {
      category: this.entityID,
      label: 'Link Preview Utility',
      render: Settings
    });

    this.loadStylesheet('style.css');

    await this.doImports();
    await this.updateDiv()
  };

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings('Link Preview Utility');
    uninject('LinkEmbedComponent')
  };

  async import(filter, functionName = filter) {
    if (typeof filter === 'string') {
      filter = [filter];
    };
    this[functionName] = (await getModule(filter))[functionName];
  };

  async doImports() {
    await this.import('getChannelPermissions');
    await this.import('getChannel');
  };

  hasPermission(channel, permission) {
    const permissions = this.getChannelPermissions(channel.id);
    return permissions && (permissions & permission) !== 0;
  };

  async updateDiv() {
    const HeaderBarContainer = await getModuleByDisplayName('HeaderBarContainer');
    inject('LinkEmbedComponent', HeaderBarContainer.prototype, 'renderLoggedIn', (args, res) => {
      var channel = this.getChannel(res.props.children[1].key)
      if (channel === null) {
        return res;
      };
      var hasPerm = this.hasPermission(channel, Permissions.EMBED_LINKS)
      var nonPermsShow = this.settings.get('nonPermsShow', true);
      var hasPermsShow = this.settings.get('hasPermsShow', true);

      if (!this.hasPermission(channel, Permissions.SEND_MESSAGES)) {
        return res;
      }

      if (channel.type == 1 || channel.type == 3) {
        return res;
      }

      if (hasPerm) {
        if (hasPermsShow) {
          if (this.settings.get('showIcon')) {
            var src = this.settings.get('hasPermsImage', 'https://img.icons8.com/flat_round/64/000000/checkmark.png');
          } else {
            var color = this.settings.get('hasPermsColor', '43b581');
            var text = this.settings.get('hasPermsText', 'EMBED LINKS');
          };
        } else {
          return res;
        };
      } else {
        if (nonPermsShow) {
          if (this.settings.get('showIcon')) {
            var src = this.settings.get('nonPermsImage', 'https://img.icons8.com/flat_round/64/000000/no-entry--v1.png');
          } else {
            var color = this.settings.get('nonPermsColor', 'f04747');
            var text = this.settings.get('nonPermsText', 'NO EMBED LINKS');
          };
        } else {
          return res;
        };
      };

      if (this.settings.get('showIcon')) {
        if (res.props.toolbar && res.props.toolbar.props.children && res.props.toolbar.props.children[0][0]) {
          const element = React.createElement(HeaderBarContainer.Icon, {
            icon: () => React.createElement(EmbedLinksIcon, { src: src })
          })
          res.props.toolbar.props.children.unshift(element);
        }
      } else {
        if (this.settings.get('oldStyling')) {
          color = "#" + color;
          var backgroundColor = "";
        } else {
          var backgroundColor = "#" + color;
          color = "#FFFFFF";
        }
        if (res.props.toolbar && res.props.toolbar.props.children && res.props.toolbar.props.children[0][0]) {
          const element = React.createElement(EmbedLinks, { text: text, color: color, backgroundColor: backgroundColor });
          res.props.toolbar.props.children.unshift(element);
        }
      };
      return res;
    });
  };
};