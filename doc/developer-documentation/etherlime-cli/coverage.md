# etherlime coverage

## Syntax

```text
etherlime coverage [path] [timeout] [port] [solcVersion]
[workingDirectory] [html] [ignoreFiles]
```

### Workflow of coverage

* Copy all test files from test directory to `.coverage_tests` temporary directory
* Copy all contract files from contract directory to `.coverage_contracts` temporary directory
* Build all contract files **without optimization** from temporary directory and saves them to `.coverage_artifacts` directory
* Run test files, create `coverage` folder with the result and delete all temporary directories.

Parameters:

* `path` - \[Optional\] By specifying `path` you can set a path to a

  selected directory or you can set the path directly to the

  javascript file which contains your tests. By default the `path`

  points to `./test`.

* `timeout` - \[Optional\] This parameter defines the test timeout in

  milliseconds. Defaults to 2000 ms.

* `port` - \[Optional\] The port to run the solidity coverage testrpc

  \(compatible with etherlime ganache deployer\). Default: 8545.


* `solcVersion` - \[Optional\] By specifying `solcVersion` you can

  choose a specific solc version to be used for compilation and

  coverage reports.

* `buildDirectory` - \[Optional\] By specifying `buildDirectory` you

  can choose which folder to use for reading builded contracts from,

  instead of the default one: `./build`.

* `html` - \[Optional\] By specifying `html` you can choose either to

  open automatically with you default browser the html coverage report

  located in: `./coverage`. Defaults to `false`.

* `ignoreFiles` - \[Optional\] By specifying `ignoreFiles` you can set files

  that would be omitted in coverage report. List them separated with comma. By
  
  default all files imported from `./node-modules' are ignored.

