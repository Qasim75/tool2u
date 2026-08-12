import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Tool2U crashed:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-4 text-center dark:bg-surface-dark">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/10">
            <AlertTriangle className="size-8 text-red-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink dark:text-white">Something went wrong</h1>
          <p className="max-w-sm text-ink-soft dark:text-white/60">
            An unexpected error occurred. Try reloading the homepage — your data was never sent anywhere,
            so nothing was lost on a server.
          </p>
          <Button onClick={this.handleReset}>Back to homepage</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
