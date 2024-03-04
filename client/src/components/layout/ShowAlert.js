import React from 'react';
import {Alert} from 'reactstrap';

const ShowAlert = (props) => {

    if (props.message.length > 0) {
        return (
        <Alert color={props.type} className="text-center" style={{maxWidth: '360px', margin: '0 auto 2px'}}>
            {props.message}
        </Alert>);
    }
    return null;
}

export default ShowAlert;