import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./DialogExtension.css";

const DialogExtensionComponent = (props) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const Url = process.env.OPEN_VIDU_URL;

  const onNoClick = () => {
    // this.cancel.emit();
    props.cancelClicked();
  };

  const goToChromePage = () => {
    window.open(Url);
    setIsInstalled(true);
  };

  const refreshBrowser = () => window.location.reload();

  return (
    <div>
      {props && props.showDialog ? (
        <div id="dialogExtension">
          <Card id="card">
            <CardContent>
              <Typography color="textSecondary">Hello</Typography>
              <Typography color="textSecondary">
                You need install this chrome extension and refresh the browser
                for can share your screen.
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
};

export default DialogExtensionComponent;
