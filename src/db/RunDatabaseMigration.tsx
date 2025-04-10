import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Code } from '../components/ui/code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import sessionsMigration from './create_user_sessions_table.sql?raw';
import profilesMigration from './create_profiles_table.sql?raw';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function RunDatabaseMigration() {
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'sessions' | 'profiles'>('profiles'); // Default to profiles since it's new

    const runMigration = async (sqlScript: string, migrationName: string) => {
        setStatus('running');
        setError(null);

        try {
            // Run the migration SQL script
            const { error } = await supabase.rpc('exec_sql', { sql: sqlScript });

            if (error) throw error;

            setStatus('success');
        } catch (err: unknown) {
            console.error(`${migrationName} migration error:`, err);
            setStatus('error');
            setError(err instanceof Error ? err.message : `Failed to run ${migrationName} migration`);
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Database Migration Tool</CardTitle>
                <CardDescription>
                    Run migration scripts to set up or update database tables
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'sessions' | 'profiles')}>
                    <TabsList className="mb-4">
                        <TabsTrigger value="sessions">User Sessions Table</TabsTrigger>
                        <TabsTrigger value="profiles">Profiles Table</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sessions">
                        <div className="space-y-4">
                            <div className="p-4 border rounded-md bg-muted">
                                <h3 className="font-semibold mb-2">Sessions Migration SQL</h3>
                                <Code className="text-xs overflow-auto max-h-64">
                                    {sessionsMigration}
                                </Code>
                            </div>

                            {status === 'error' && activeTab === 'sessions' && (
                                <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-md text-destructive">
                                    <h3 className="font-semibold mb-1">Error</h3>
                                    <p>{error}</p>
                                </div>
                            )}

                            {status === 'success' && activeTab === 'sessions' && (
                                <div className="p-4 border border-green-500/50 bg-green-500/10 rounded-md text-green-600">
                                    <h3 className="font-semibold mb-1">Success</h3>
                                    <p>The sessions migration was executed successfully.</p>
                                </div>
                            )}

                            <Button
                                onClick={() => runMigration(sessionsMigration, 'Sessions')}
                                disabled={status === 'running'}
                                variant={status === 'success' && activeTab === 'sessions' ? "outline" : "default"}
                            >
                                {status === 'running' && activeTab === 'sessions' ? 'Running...' :
                                    status === 'success' && activeTab === 'sessions' ? 'Migration Complete' :
                                        'Run Sessions Migration'}
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="profiles">
                        <div className="space-y-4">
                            <div className="p-4 border rounded-md bg-muted">
                                <h3 className="font-semibold mb-2">Profiles Migration SQL</h3>
                                <Code className="text-xs overflow-auto max-h-64">
                                    {profilesMigration}
                                </Code>
                            </div>

                            {status === 'error' && activeTab === 'profiles' && (
                                <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-md text-destructive">
                                    <h3 className="font-semibold mb-1">Error</h3>
                                    <p>{error}</p>
                                </div>
                            )}

                            {status === 'success' && activeTab === 'profiles' && (
                                <div className="p-4 border border-green-500/50 bg-green-500/10 rounded-md text-green-600">
                                    <h3 className="font-semibold mb-1">Success</h3>
                                    <p>The profiles migration was executed successfully.</p>
                                </div>
                            )}

                            <Button
                                onClick={() => runMigration(profilesMigration, 'Profiles')}
                                disabled={status === 'running'}
                                variant={status === 'success' && activeTab === 'profiles' ? "outline" : "default"}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {status === 'running' && activeTab === 'profiles' ? 'Running...' :
                                    status === 'success' && activeTab === 'profiles' ? 'Migration Complete' :
                                        'Run Profiles Migration'}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
} 