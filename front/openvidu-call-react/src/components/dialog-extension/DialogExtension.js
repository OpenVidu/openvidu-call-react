import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './DialogExtension.css';

export default class DialogExtensionComponent extends Component {
    constructor(props) {
        super(props);
        this.openviduExtensionUrl =
            'https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold';
        //isInstalled: boolean;

        this.state = {
            isInstalled: false,
        };
        this.goToChromePage = this.goToChromePage.bind(this);
        this.onNoClick = this.onNoClick.bind(this);
        this.refreshBrowser = this.refreshBrowser.bind(this);
    }

    componentWillReceiveProps(props) {}

    componentDidMount() {}

    onNoClick() {
        // this.cancel.emit();
        this.props.cancelClicked();
    }

    goToChromePage() {
        window.open(this.openviduExtensionUrl);
        this.setState({ isInstalled: true });
    }

    refreshBrowser() {
        window.location.reload();
    }

    render() {
        return (
            <div>
                {this.props && this.props.showDialog ? (
                    <div id="dialogExtension">
                        <Card id="card">
                            <CardContent>
                                <Typography color="textSecondary">Hello</Typography>
                                <Typography color="textSecondary">
                                    You need install this chrome extension and refresh the browser for can share your screen.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={this.onNoClick}>
                                    Cancel
                                </Button>

                                <Button size="small" onClick={this.goToChromePage}>
                                    Install
                                </Button>
                                {this.state.isInstalled ? (
                                    <Button size="small" onClick={this.refreshBrowser}>
                                        Refresh
                                    </Button>
                                ) : null}
                            </CardActions>
                        </Card>
                    </div>
                ) : null}
            </div>
        );
    }
}
