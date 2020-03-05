import React from 'react';
import PropTypes from "prop-types";

const styles = {
  alertBox: {
    cursor: "pointer",
    padding: "1rem",
    fontWeight: "bold"
  },
  alertDefault: {
    backgroundColor: "#b7b6b1",
    color: "#57544f"
  },
  alertError: {
    backgroundColor: "#e11100",
    color: "#5a1200"
  },
  alertWarning: {
    backgroundColor: "#e1cb00",
    color: "#5a5000"
  }
};

const Alert = ({ alert: { message, type = "info" }, hideAlert }) => {
  const getStyles = () => {
    const typeStyle = {
      style: {},
      icon: type
    };

    switch (type) {
      case "error":
        typeStyle.style = styles.alertError;
        break;

      case "warning":
        typeStyle.style = styles.alertWarning;
        break;

      default:
        typeStyle.style = styles.alertDefault;
        break;
    }

    return {
      alertStyle: {
        alertBox: styles.alertBox,
        alertType: typeStyle.style
      },
      typeStyle
    };
  };

  const close = () => hideAlert();

  const {alertStyle, typeStyle} = getStyles();
  return (
    <section id="alertBox" className="row" >
      <div className="col s10 offset-s1 m10 offset-m1" style={{...alertStyle.alertBox, ...alertStyle.alertType}}>
        <i className="material-icons left">{typeStyle.icon}</i>
        <span>{message}</span>

        <i className="material-icons right" onClick={close}>close</i>
      </div>
    </section>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["error", "info", "warning"])
  }).isRequired,
  hideAlert: PropTypes.func.isRequired
};

export default Alert;