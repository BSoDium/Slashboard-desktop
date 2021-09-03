import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class HomePage extends React.Component<any, any> {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        // const { authSuccess } = this.props.location.state || false;

        // atm the login page is skipped because the backend isn't ready
        const authSuccess = true;

        return (authSuccess ?
            <Redirect to="dashboard/servers" />
            :
            <Redirect to="login" />
        );
    }
}

export default withRouter(HomePage);