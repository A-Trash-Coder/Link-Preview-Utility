const { React } = require('powercord/webpack');
const { TextInput, SwitchItem, Category } = require('powercord/components/settings');

module.exports = ({ getSetting, updateSetting, toggleSetting }) => (
  <div>
    <SwitchItem
      note='Whether to have the old or new styling.'
      value={getSetting('oldStyling', false)}
      onChange={() => toggleSetting('oldStyling')}
    >
      Old Styling
    </SwitchItem>

    <SwitchItem
      note='Whether to have an icon display instead of text.'
      value={getSetting('showIcon', false)}
      onChange={() => toggleSetting('showIcon')}
    >
      Show an icon instead of text
    </SwitchItem>

    <SwitchItem
        note='Whether to have text display when you have the embed links permission.'
        value={getSetting('hasPermsShow', true)}
        onChange={() => toggleSetting('hasPermsShow')}
      >
        Show text/icon with permission
    </SwitchItem>

    <SwitchItem
      note='Whether to have text display when you do not have the embed links permission.'
      value={getSetting('nonPermsShow', true)}
      onChange={() => toggleSetting('nonPermsShow')}
    >
      Show text/icon when you lack permission
    </SwitchItem>

    <Category
      name='Text'
      description='Change the text for permissions for the plugin.'
      opened={getSetting('embedLinksText', true)}
      onChange={() => toggleSetting('embedLinksText')}
    >
      <TextInput
        note='The text used when you have the embed links permission.'
        defaultValue={getSetting('hasPermsText', 'EMBED LINKS')}
        required={true}
        onChange={val => updateSetting('hasPermsText', val)}
      >
        Has permission text
      </TextInput>

      <TextInput
        note='The text used when you do not have the embed links permission.'
        defaultValue={getSetting('nonPermsText', 'NO EMBED LINKS')}
        required={true}
        onChange={val => updateSetting('nonPermsText', val)}
      >
        Does not have permission text
      </TextInput>
    </Category>

    <Category
      name='Colors'
      description='Change the text colors for the plugin.'
      opened={getSetting('embedLinksColor', true)}
      onChange={() => toggleSetting('embedLinksColor')}
    >
      <TextInput
        note='The color used when you do not have the embed links permission.'
        defaultValue={getSetting('nonPermsColor', 'f04747')}
        required={true}
        onChange={val => updateSetting('nonPermsColor', val)}
      >
        Does not have permission color
      </TextInput>

      <TextInput
        note='The color used when you have the embed links permission.'
        defaultValue={getSetting('hasPermsColor', '43b581')}
        required={true}
        onChange={val => updateSetting('hasPermsColor', val)}
      >
        Has permission color
      </TextInput>
    </Category>

    <Category
      name='Image Links'
      description='Change the icon links for the plugin.'
      opened={getSetting('embedLinksLinks', true)}
      onChange={() => toggleSetting('embedLinksLinks')}
    >
      <TextInput
        note='The image used when you have the embed links permission.'
        defaultValue={getSetting('hasPermsImage', 'https://img.icons8.com/flat_round/64/000000/checkmark.png')}
        required={true}
        onChange={val => updateSetting('hasPermsImage', val)}
      >
        Has permission image link
      </TextInput>

      <TextInput
        note='The image used when you do not have the embed links permission.'
        defaultValue={getSetting('nonPermsImage', 'https://img.icons8.com/flat_round/64/000000/no-entry--v1.png')}
        required={true}
        onChange={val => updateSetting('nonPermsImage', val)}
      >
        Does not have permission image link
      </TextInput>
    </Category>
  </div>
);