import React from 'react';

/**
 * SplineErrorBoundary
 * 
 * Prevents any WebGL, Spline runtime, or asset fetch error from crashing
 * the parent React tree. If an error occurs, it displays a graceful fallback
 * while keeping the entire hero section, typography, navigation, and CTAs intact.
 */
export default class SplineErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Spline 3D Scene encountered an error, activating graceful fallback:', error, errorInfo);
        if (this.props.onError) {
            this.props.onError(error);
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none p-4">
                    <div className="w-20 h-20 rounded-full border border-violet-500/20 bg-violet-600/5 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-violet-400/80 animate-ping" />
                    </div>
                    <span className="mt-3 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        3D ENVIRONMENT STANDBY
                    </span>
                </div>
            );
        }

        return this.props.children;
    }
}
