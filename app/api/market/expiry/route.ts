import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function GET(req: Request) {
    try {
        console.log('🚀 [Expiry API] Fetching option expiries from Python...');

        // Path to Python project
        const pythonProjectPath = path.join(process.cwd(), 'Project', 'RAG_Production');
        const pythonCmd = path.join(pythonProjectPath, '.venv', 'bin', 'python');

        // Command to run: Import client and print expiries as JSON
        const scriptCode = `
from src.integration.option_chain_client import get_available_expiry_dates
import json
try:
    expiries = get_available_expiry_dates('NIFTY')
    print('__JSON_START__')
    print(json.dumps({'expiries': expiries}))
    print('__JSON_END__')
except Exception as e:
    print('__JSON_START__')
    print(json.dumps({'error': str(e)}))
    print('__JSON_END__')
`;

        const pythonProcess = spawn(pythonCmd, ['-c', scriptCode], {
            cwd: pythonProjectPath,
            env: {
                ...process.env
            }
        });

        let pythonOutput = '';
        let pythonError = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            pythonError += data.toString();
        });

        const result: any = await new Promise((resolve, reject) => {
            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    const startMarker = '__JSON_START__';
                    const endMarker = '__JSON_END__';
                    const startIndex = pythonOutput.indexOf(startMarker);
                    const endIndex = pythonOutput.indexOf(endMarker);

                    if (startIndex !== -1 && endIndex !== -1) {
                        const jsonText = pythonOutput.substring(startIndex + startMarker.length, endIndex);
                        try {
                            resolve(JSON.parse(jsonText));
                        } catch (e) {
                            reject(new Error('Failed to parse JSON output: ' + e));
                        }
                    } else {
                        reject(new Error('No JSON output found. Logs: ' + pythonOutput));
                    }
                } else {
                    reject(new Error(`Python process exited with code ${code}. Error: ${pythonError}`));
                }
            });

            // Set timeout (10 seconds should be enough for metadata)
            setTimeout(() => {
                pythonProcess.kill();
                reject(new Error('Python execution timeout'));
            }, 10000);
        });

        if (result.error) {
            throw new Error(result.error);
        }

        return NextResponse.json({
            success: true,
            expiries: result.expiries || []
        });

    } catch (error: any) {
        console.error("❌ [Expiry API] Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to fetch expiries"
        }, { status: 500 });
    }
}
