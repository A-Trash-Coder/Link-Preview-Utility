const { Plugin } = require('powercord/entities');
const { getModule, constants: { Permissions } } = require('powercord/webpack');
const Settings = require('./Settings.jsx');
const dispatcher = getModule(['dispatch'], false)
const getChannelPermissions = getModule(['getChannelPermissions'], false)
const getChannel = getModule(['getChannel'], false)

module.exports = class EmbedLinksUtility extends Plugin {
  async startPlugin() {
    await this.doImports();
    
    powercord.api.settings.registerSettings('Link Preview Utility', {
      category: this.entityID,
      label: 'Link Preview Utility',
      render: Settings
    });

    dispatcher.subscribe('CHANNEL_SELECT', this.switchChannel = data => {
      if (this.lastChannelId != data.channelId) {
        setTimeout(() => {
          this.updateDiv(data), 200
        });
      };
    });
  };

  pluginWillUnload() {
    if (this.switchChannel) dispatcher.unsubscribe('CHANNEL_SELECT', this.switchChannel);

    powercord.api.settings.unregisterSettings('Link Preview Utility');
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

  updateDiv(data) {
    var channel = this.getChannel(data.channelId)
    var hasPerm = this.hasPermission(channel, Permissions.EMBED_LINKS)
    var nonPermsShow = this.settings.get('nonPermsShow', true);
    var hasPermsShow = this.settings.get('hasPermsShow', true);

    if (!this.hasPermission(channel, Permissions.SEND_MESSAGES)) {
      return;
    }

    if (channel.type == 1 || channel.type == 3) {
      return;
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
        return;
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
        return;
      };
    };

    var embedLinks = document.getElementById("EmbedLinks");
    if (embedLinks != null) {
      return;
    };

    var header = document.getElementsByClassName('toolbar-1t6TWx')[0];
    if (this.settings.get('showIcon')) {
      var item = document.createElement('img');
      item.setAttribute('src', src);
      item.id = "EmbedLinks";
      item.height = 24;
      item.width = 24;
    } else {
      var item = document.createElement("p");
      item.id = "EmbedLinks";
      item.textContent = text;
      if (this.settings.get('oldStyling')) {
        item.style.color = "#" + color;
      } else {
        item.style.color = "white";
        item.style.backgroundColor = "#" + color;
        item.style.borderRadius = "20px";
        item.style.padding = "0px 5px 0px 5px";
        item.style.fontSize = "15px";
      }
    };
    header.insertBefore(item, header.childNodes[0]);
  };
};