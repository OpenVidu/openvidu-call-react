import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './DialogExtension.css';

const openViduExtensionUrl = 'https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold';

function DialogExtensionComponent(props) {
    const {cancelClicked, showDialog} = props;
    const [isInstalled, setIsInstalled] = useState(false);

    const onNoClick = function () {
        cancelClicked();
    }

    const goToChromePage = function () {
        window.open(openViduExtensionUrl);
        setIsInstalled(true);
    }

    const refreshBrowser = function () {
        window.location.reload();
    }

    return (
        <div>
            {showDialog ? (
                <div id="dialogExtension">
                    <Card id="card">
                        <CardContent>
                            <Typography color="textSecondary">Hello</Typography>
                            <Typography color="textSecondary">
                                You need install this chrome extension and refresh the browser for can share your screen.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={onNoClick}>
                                Cancel
                            </Button>
                            <Button size="small" onClick={goToChromePage}>
                                Install
                            </Button>
                            {isInstalled ? (
                                <Button size="small" onClick={refreshBrowser}>
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

DialogExtensionComponent.PropTypes = {
    cancelClicked: PropTypes.func,
    showDialog: PropTypes.bool,
}

export default DialogExtensionComponent;
