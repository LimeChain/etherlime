# etherlime coverage

## Syntax

```text
etherlime coverage [path] [timeout] [port] [solcVersion]
[workingDirectory] [html] [ignoreFiles]
```

### Workflow of etherlime coverage

* The `coverage` command copy all test files from test directory to `.coverage_tests` temporary directory
* The `coverage` command copy all contract files from contract directory to `.coverage_contracts` temporary directory
* All contract files are builded **without optimization** from temporary directory and saved to `.coverage_artifacts` directory
* All test files are run, `coverage` folder is created with the result and all temporary directories are deleted.

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

* `workingDirectory` - \[Optional\] Defines the folder to use for

    reading contracts from, instead of the default one: ./contracts

* `html` - \[Optional\] By specifying `html` you can choose either to

  open automatically with you default browser the html coverage report

  located in: `./coverage`. Defaults to `false`.

* `ignoreFiles` - \[Optional\] By specifying `ignoreFiles` you can set files

  that would be omitted in coverage report. List them separated with comma. By
  
  default all files imported from `./node-modules' are ignored.

* `gasPrice` - \[Optional\] By specifying `gasPrice` you can specify the price of gas in wei. Defaults to `20000000000`.

* `gasLimit` - \[Optional\] By specifying `gasLimit` you can specify the block gas limit. Defaults to `6721975`.