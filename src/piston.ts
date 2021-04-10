import 'dotenv/config';
import { Submission, SubmissionResult } from './lib/interfaces/submission.interface';
import Client from './lib/client';
import { AxiosInstance } from 'axios';

type PistonConfig = {
  baseURL: string;
  apiKey?: string;
  apiKeyHeader?: string;
};

class Piston {
  private baseURL: string;
  private apiKey: string;
  private apiKeyHeader: string;
  private client: AxiosInstance;
  constructor({ baseURL, apiKey = '', apiKeyHeader = '' }: PistonConfig) {
    if (!baseURL) throw new Error('Must Provide A Base URL For The Piston Server');
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.apiKeyHeader = apiKeyHeader;
    this.client = Client.create(this.baseURL, this.apiKey, this.apiKeyHeader);
  }

  public async run({
    language,
    sourceCode,
    fileName,
    input = [''],
    expectedOutput,
    compileTimeout = 10000,
    runTimeout = 3000,
  }: Submission): Promise<SubmissionResult> {
    if (expectedOutput && input.length !== expectedOutput.length) throw new Error('Length of expected output must match length of input');

    const response = await this.client.post('/jobs', {
      language: language.name,
      version: language.version,
      files: [
        {
          name: fileName,
          content: sourceCode,
        },
      ],
      main: fileName,
      stdin: input,
      ...(expectedOutput && { expected_output: expectedOutput }),
      compile_timeout: compileTimeout,
      run_timeout: runTimeout,
      args: [],
    });

    return response.data;
  }
}

export default Piston;
export { PistonConfig };
