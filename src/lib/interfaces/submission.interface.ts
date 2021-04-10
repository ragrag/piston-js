import Language from './language.interface';
import Verdict from './verdict.interface';

type ProcessOutput = {
  stdin: string;
  stdout: string;
  stderr: string;
  code: number;
  signal: string;
};

type BatchResult = {
  status: Verdict;
  stdout: string;
  stdin: string;
  expectedOutput: string;
};

type Submission = {
  language: Language;
  fileName: string;
  sourceCode: string;
  input?: string[];
  expectedOutput?: string[];
  runTimeout?: number;
  compileTimeout?: number;
};

type SubmissionResult = {
  compile?: ProcessOutput;
  run: ProcessOutput[];
  result: BatchResult;
};

export { Submission, SubmissionResult };
