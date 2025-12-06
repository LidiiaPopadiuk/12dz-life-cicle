import { Component } from "react";

export class CrashProtector extends Component {

    //ErrorBoundary

    state = {
        hasError: false,
    }
    componentDidCatch(error, info) {
        console.log('Сталася помилка', error);
        console.log('Деталі', info);
        this.setState({ hasError: true })
    }

    // Або так:
    //     static getDerivedStateFromError(error) {
    //     return { hasError: true };
    //   }

    //   componentDidCatch(error, info) {
    //     console.log("Сталася помилка", error);
    //     console.log("Деталі", info);
    //   }

    render() {
        if (this.state.hasError) {
            return <p>Somethimg went wrong!</p>
        }
        return this.props.children
    }
}