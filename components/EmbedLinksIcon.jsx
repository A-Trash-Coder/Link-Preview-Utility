const { React } = require("powercord/webpack");

class EmbedLinks extends React.Component {
	render() {
		return (
			<img src={this.props.src} height={24} width={24}></img>
		);
	}
}

module.exports = EmbedLinks;