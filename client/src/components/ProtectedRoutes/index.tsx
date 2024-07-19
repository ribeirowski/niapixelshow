import React, { ComponentType, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

function withProtectedRoute<P extends {}>(WrappedComponent: ComponentType<P>): ComponentType<P> {
    return function ProtectedComponent(props: P): ReactElement | null {
        const { authenticated, loading, checkAuth } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !authenticated) {
                checkAuth().then(() => {
                    if (!authenticated) {
                        router.push('/');
                    }
                });
            }
        }, [loading, authenticated, checkAuth, router]);

        if (loading) {
            return <p>Loading...</p>;
        }

        return authenticated ? <WrappedComponent {...props} /> : null;
    };
}

export default withProtectedRoute;
