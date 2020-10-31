const { React } = require("powercord/webpack");

class EmbedLinks extends React.Component {
	render() {
		return (
			<p className={'EmbedLinks'} style={{ backgroundColor: this.props.backgroundColor, color: this.props.color }}>
				{this.props.text}
			</p>
		);
	}
}

module.exports = EmbedLinks;