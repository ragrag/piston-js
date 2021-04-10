[![PR's Welcome][pr-welcoming-image]][pr-welcoming-url]

## A JavaScript client for [Piston-Batch](https://github.com/ragrag/piston-batch), A fork from Piston, a high performance general purpose code execution engine that supports batch submissions and code evaluation.

### Contains Full TypeScript Typings

&nbsp;

## Installation

```
$ npm install piston-js
```

## Basic Usage

```ts
import Piston from 'piston-js';

(async () => {
  const piston = new Piston('https://pistonserver.com');
  try {
    const result: SubmissionResult = await piston.run({
      language: {
        name: 'python',
        version: '3.9.1',
      },
      fileName: 'main.py',
      sourceCode: 'print(int(input())*3)',
      input: ['2'],
      expectedOutput: ['4'],
    });
    console.log(result);
    /*{
     run: [ { stdout: '6', stderr: '', code: 0, signal: null, stdin: '2' } ],
     verdict: { status: 'WA', stdout: '6', stdin: '2', expected_output: '4' }
    } */
  } catch (err) {
    console.log(err.response.data);
  }
})();
```

## API

## **Piston(config: [`PistonConfig`](#PistonConfig)) : Piston**

Returns an instance of Piston

### **PistonConfig**

An object type representing the config for the Piston instance

### properties

| Property | Type | Description |Default |
| ------------- |:-------------:|-------------|--------------|
| baseURL |`string` | the base url of the piston server | - |
| apiKey | `string?` | the api key used to access the piston server |"" |
| apiKeyHeader | `string?` | name of the api key header | ""|  

<br/>

## **Piston.run(submission: [`Submission`](#Submission)) : Promise< [`SubmissionResult`](#SubmissionResult)>**

Runs a submission and returns the result

### **Submission**

An object representing a submission

#### properties

| Property | Type | Description |Default |
| ------------- |:-------------:|-------------|--------------|
| sourceCode |`string` | the source code to execute | - |
| language | [Language](#Language) | the programming language to execute  |- |
| fileName | `string` | name of the file to execute, 'e.g: Main.java'. Some languages like Java need files to have the same name as the Main class.  |- |
| input? | `string[]` | batch stdin to execute  | [""]|
| expectedOutput? |`string[]` | if provided, the execution will be evaluated against all stdout resulted from `input`. if provided, must have equal length to `input` | null|
| runTimeout? | `number` |milliseconds before timing out the program (TLE) | 3000 |
| compileTimeout? | `number` |milliseconds before timing out the compilation of the source code (applies only to compiled languages) (TLE) | 10000 |

<br/>

#### **Language**

Type of Language required in [`Submission`](#Submission)

#### properties

| Property | Type | Description |Default |
| ------------- |:-------------:|-------------|--------------|
| name |`string` | name of the language | - |
| version | `string` | version of the language  |- |
<br/>


### **SubmissionResult**

An object representing the result of a [`Submission`](#Submission)

#### properties

| Property | Type | Description |
| ------------- |:-------------:|-------------|
| compile? | [ProcessOutput](#ProcessOutput) | only available in compiled languages | - |
| run | [ProcessOutput](#ProcessOutput) | result of each individual stdin in the batch  |
| result | [BatchResult](#BatchResult) | Final result of the submission batch after evaluation  |

<br/>

#### **ProcessOutput**

Type of an execution process output

#### properties

| Property | Type | Description |
| ------------- |:-------------:|-------------|
| stdin |`string` | process stdin |
| stdout |`string` | process stdout |
| stderr |`string` | process stderr |
| code |`number` | process return code |
| signal |`string` | process signal |

<br/>

#### **BatchResult**

Type of an execution process output

#### properties

| Property | Type | Description |
| ------------- |:-------------:|-------------|
| status |[Verdict](#Verdict) | submission evaluation verdict|
| stdout |`string` | stdout of the first failed submission in the batch |
| stdin |`string` | stdin of the first failed submission in the batch |
| expectedOutput |`string` |expected output of the first failed submission in the batch |
| signal |`string` | process signal |

<br/>

- A submission is considered a failed submission in the batch if its [Verdict](#Verdict) is not accepted (`AC`)    
- If a submission batch is accepted, stdout and stdin will have the results of the first submission in the batch

### **Verdict**

An enum representing the verdict of a submission as strings


| Property    |      Value      | description                                                 |
| ----------- | :-------------: | ----------------------------------------------------------- |
| AC          |     `'AC'`      | The source code executed successfully/passed all test cases | - |
| COMPILATION | `'COMPILATION'` | Compilation error                                           | - |
| ERROR       |    `'ERROR'`    | An error during the whole execution process                 |
| MLE         |     `'MLE'`     | Memory limit exceeded (NOT YET IMPLEMENTED)                 |
| PENDING     |   `'PENDING'`   | Submission is pending                                       |
| RUNTIME     |   `'RUNTIME'`   | Runtime error                                               |
| TLE         |     `'TLE'`     | Time limit exceeded (timedout)                              |
| WA          |     `'WA'`      | Wrong answer (Failed test cases)                            |

<br/>

[pr-welcoming-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-welcoming-url]: https://github.com/ragrag/piston-js/pulls
