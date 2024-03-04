import React from 'react';
import {Container} from 'reactstrap';

const Footer = () => {
    return (
        <footer className="bg-dark">
            <Container className="py-4 text-muted text-center">
                <a href="https://github.com/arjunbharara" target="blank" className="text-muted">Github</a> {' | '}
                <a href="/" className="text-muted">Home</a> {' | '}
                <a href="/login" className="text-muted">Login</a> {' | '}
                <a href="/register" className="text-muted">Signup</a>
                <p className="text-light pt-2">
                    <img src="favicon.png" alt="" className="pr-2"/>
                    Recipe Repository
                </p>
            </Container>
        </footer>
    );
}

export default Footer;