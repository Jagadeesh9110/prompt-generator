import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const RegisterPage: React.FC = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create a new account.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Registration is currently disabled for this demo.</p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full" variant="outline">
                    <Link to="/login">Back to Login</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default RegisterPage;
