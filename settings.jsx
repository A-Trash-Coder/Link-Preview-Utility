const { React } = require('powercord/webpack');
const { TextInput, SwitchItem } = require('powercord/components/settings');

module.exports = ({ getSetting, updateSetting, toggleSetting }) => (
  <div>
    <TextInput
      note='The color used when the embed links permission is true.'
      defaultValue={getSetting('hasPermsColor', '43b581')}
      required={true}
      onChange={val => updateSetting('hasPermsColor', val)}
    >
      Has permissions color
    </TextInput>
    <TextInput
      note='The color used when the embed links permission is false.'
      defaultValue={getSetting('nonPermsColor', 'f04747')}
      required={true}
      onChange={val => updateSetting('nonPermsColor', val)}
    >
      Does not have permissions color
    </TextInput>
    <SwitchItem
      note='Whether to have text display when you have permissions.'
      value={getSetting('hasPermsShow', true)}
      onChange={() => toggleSetting('hasPermsShow')}
    >
      Show text with permissions
    </SwitchItem>
    <SwitchItem
      note='Whether to have text display when you do not have permissions.'
      value={getSetting('nonPermsShow', true)}
      onChange={() => toggleSetting('nonPermsShow')}
    >
      Show text without permissions
    </SwitchItem>
    <TextInput
      note='The text used when the embed links permission is true.'
      defaultValue={getSetting('hasPermsText', 'EMBED LINKS')}
      required={true}
      onChange={val => updateSetting('hasPermsText', val)}
    >
      Permissions text
    </TextInput>
    <TextInput
      note='The text used when the embed links permission is false.'
      defaultValue={getSetting('nonPermsText', 'NO EMBED LINKS')}
      required={true}
      onChange={val => updateSetting('nonPermsText', val)}
    >
      Does not have permissions text
    </TextInput>
  </div>
);