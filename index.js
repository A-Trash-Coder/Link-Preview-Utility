const { Plugin } = require('powercord/entities');
const { getModule, constants: { Permissions } } = require('powercord/webpack');
const Settings = require('./Settings.jsx');
const dispatcher = getModule(['dispatch'], false)

module.exports = class EmbedLinksUtility extends Plugin {
  async startPlugin () {
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
        })
      };
    });
  };

  pluginWillUnload () {
    if (this.switchChannel) dispatcher.unsubscribe('CHANNEL_SELECT', this.switchChannel);
    powercord.api.settings.unregisterSettings('Link Preview Utility');
  };

  async import (filter, functionName = filter) {
    if (typeof filter === 'string') {
      filter = [ filter ];
    }

    this[functionName] = (await getModule(filter))[functionName];
  };

  async doImports () {
    await this.import('getChannelPermissions');
    await this.import('getChannel');
  };

  hasPermission (channel, permission) {
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

    if (channel.type == 1 || channel.type == 3){
      return;
    }

    if (hasPerm) {
      if (hasPermsShow) {
        var color = this.settings.get('hasPermsColor', '43b581');
        var text = this.settings.get('hasPermsText', 'EMBED LINKS');
      } else {
        return;
      };
    } else {
      if (nonPermsShow) {
        var color = this.settings.get('nonPermsColor', 'f04747');
        var text = this.settings.get('nonPermsText', 'NO EMBED LINKS');
      } else {
        return;
      };
    };

    var embedLinks = document.getElementById("EmbedLinks")
    if (embedLinks != null) {
      return;
    };

    var header = document.getElementsByClassName('toolbar-1t6TWx')[0];
    var p = document.createElement("p");
    p.id = "EmbedLinks"
    p.textContent = text;
    p.style.color = "#" + color;
    header.insertBefore(p, header.childNodes[0]);
  };
};