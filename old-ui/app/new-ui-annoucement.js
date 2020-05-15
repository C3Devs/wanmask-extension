const PropTypes = require('prop-types')
const {PureComponent} = require('react')
const h = require('react-hyperscript')
const actions = require('../../ui/app/actions')

module.exports = class NewUiAnnouncement extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  close = async () => {
    await this.props.dispatch(actions.setFeatureFlag('skipAnnounceBetaUI', true))
  }

  switchToNewUi = async () => {
    const flag = 'betaUI'
    const enabled = true
    await this.props.dispatch(actions.setFeatureFlag(
      flag,
      enabled,
    ))
    await this.close()
    global.platform.openExtensionInBrowser()
  }

  render () {
    return (
      h('div.new-ui-announcement', [
        h('section.new-ui-announcement__announcement-header', [
          h('h1', 'Announcement'),
          h('a.close', {
            onClick: this.close,
          }, '×'),
        ]),
        h('section.new-ui-announcement__body', [
          h('h1', 'Welcome to WanMask'),
          h('p', [
            'The new UI is now the default UI. You can still use the old ui version of WanMask if you want.',
          ]),
          h('p', [
            'To load the old UI click the button in settings.',
          ]),
        ]),
        h('section.new-ui-announcement__footer', [
          h('h1', 'Ready to start with WanMask?'),
          h('button.positive', {
            onClick: this.switchToNewUi,
          }, 'Try it now'),
        ]),
      ])
    )
  }
}
