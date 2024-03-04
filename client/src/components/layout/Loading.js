import React from 'react';
import { Spinner } from 'reactstrap';

function Loading() {
    return (
        <div className="text-center">
            <Spinner color="dark" />
        </div>
    );
}

export default Loading;