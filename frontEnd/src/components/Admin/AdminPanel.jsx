import * as React from 'react';

export default class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Admin Panel</h1>
                <button> Edit Users </button>
                <br/>
                <button> Edit Admins </button>
                <br/>
                <button> Edit Equipment </button>
            </div>
        );
    }
}
