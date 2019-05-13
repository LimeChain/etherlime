# dockermachine-cli-js
A node.js wrapper for the docker-machine command line tool

[![NPM](https://nodei.co/npm/dockermachine-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/dockermachine-cli-js/)
[![NPM](https://nodei.co/npm-dl/dockermachine-cli-js.png?months=6&height=3)](https://nodei.co/npm/dockermachine-cli-js/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

### Step 1: Prerequisites

The docker-machine command line tool must be installed and accessible in the path

### Step 2: Installation
    
    npm install dockermachine-cli-js
    

## Usage

### With promise

```js
var DockerMachineCLI = require('dockermachine-cli-js');

var keyValueObject = {
    'driver': 'amazonec2',
    'amazonec2-access-key': 'XYZ',
    'amazonec2-secret-key': 'ZYX',
    'amazonec2-ami': 'ami-b59ce48f',
    'amazonec2-region': 'ap-southeast-2',
    'amazonec2-zone': 'a',
    'amazonec2-instance-type': 't2.micro',
    'amazonec2-root-size': 8,
};

var options = new DockerMachineCLI.Options(
  /* keyValueObject */ keyValueObject,
  /* currentWorkingDirectory */ null);

var dockerMachine = new DockerMachineCLI.DockerMachine(options);

dockerMachine.command('create machinename').then(function (data) {
    console.log(data);    
});

//{
//  command: 'docker-machine create machinename  --driver amazonec2 --amazonec2-access-key XYZ --amazonec2-secret-key ZYX --amazonec2-ami ami-b59ce48f --amazonec2-region ap-southeast-2 --amazonec2-zone a --amazonec2-instance-type t2.micro --amazonec2-root-size 8',
//    raw: '"Running pre-create checks...\\nCreating machine...\\n(machinename) Launching instance...\\nWaiting for machine to be running, this may take a few minutes...\\nDetecting operating system of created instance...\\nWaiting for SSH to be available...\\nDetecting the provisioner...\\nProvisioning with ubuntu(upstart)...\\nInstalling Docker...\\nCopying certs to the local machine directory...\\nCopying certs to the remote machine...\\nSetting Docker configuration on the remote daemon...\\nChecking connection to Docker...\\nDocker is up and running!\\nTo see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env machinename\\n"'
//}
```

### With callback

```js

dockerMachine.command('create machinename', function (err, data) {
  console.log(data);   
});

```

### Typescript

```ts
import { DockerMachine, Options } from 'dockermachine-cli-js';

const keyValueObject = {
  'driver': 'amazonec2',
  'amazonec2-access-key': config.accessKeyId,
  'amazonec2-secret-key': config.secretAccessKey,
  'amazonec2-ami': 'ami-b59ce48f',
  'amazonec2-region': 'ap-southeast-2',
  'amazonec2-zone': 'a',
  'amazonec2-instance-type': 't2.micro',
  'amazonec2-root-size': 8,
};

const options = new Options(
  /* keyValueObject */ keyValueObject,
  /* currentWorkingDirectory */ null
);
const dockerMachine = new DockerMachine(options);

dockerMachine.command('create machinename').then(function (data) {
  console.log(data);
});

```

* ls

```js
dockerMachine.command('ls').then(function (data) {
  console.log(data);
});

//{
//  command: 'docker-machine ls ',
//    raw: '"NAME          ACTIVE   DRIVER      STATE     URL                        SWARM   DOCKER    ERRORS\\nmachinename   -        amazonec2   Running   tcp://52.63.109.186:2376           v1.11.2   \\n"',
//      machineList:
//  [{
//    name: 'machinename',
//    active: '-',
//    driver: 'amazonec2',
//    state: 'Running',
//    url: 'tcp://52.63.109.186:2376',
//    swarm: '',
//    docker: 'v1.11.2',
//    errors: ''
//  }]
//}

```


* inspect

```js
dockerMachine.command('inspect machinename').then(function (data) {
  console.log(data);
});

//        { command: 'docker-machine inspect machinename ',                                                
//          raw: '"{\\n    \\"ConfigVersion\\": 3,\\n    \\"Driver\\": {\\n        \\"IPAddress\\": \\"52.6
//    \\"MachineName\\": \\"machinename\\",\\n        \\"SSHUser\\": \\"ubuntu\\",\\n        \\"SSHPort\\":
//HKeyPath\\": \\"/home/ubuntu/.docker/machine/machines/machinename/id_rsa\\",\\n        \\"StorePath\\": \
//er/machine\\",\\n        \\"SwarmMaster\\": false,\\n        \\"SwarmHost\\": \\"tcp://0.0.0.0:3376\\",\\
//covery\\": \\"\\",\\n        \\"Id\\": \\"87af397ff5403329648162fb6cdd7188\\",\\n        \\"AccessKey\\":
//XYZ\\",\\n        \\"SecretKey\\": \\"ZYX\\",\\n        \\"SessionT
//       \\"Region\\": \\"ap-southeast-2\\",\\n        \\"AMI\\": \\"ami-b59ce48f\\",\\n        \\"SSHKeyID
//"KeyName\\": \\"machinename\\",\\n        \\"InstanceId\\": \\"i-0a69ee84e5a885107\\",\\n        \\"Insta
//cro\\",\\n        \\"PrivateIPAddress\\": \\"172.31.13.155\\",\\n        \\"SecurityGroupId\\": \\"sg-7db
//\\"SecurityGroupName\\": \\"docker-machine\\",\\n        \\"Tags\\": \\"\\",\\n        \\"ReservationId\\
// \\"DeviceName\\": \\"/dev/sda1\\",\\n        \\"RootSize\\": 8,\\n        \\"VolumeType\\": \\"gp2\\",\\
//nceProfile\\": \\"\\",\\n        \\"VpcId\\": \\"vpc-3413c051\\",\\n        \\"SubnetId\\": \\"subnet-5e4
//\\"Zone\\": \\"a\\",\\n        \\"RequestSpotInstance\\": false,\\n        \\"SpotPrice\\": \\"0.50\\",\\
//POnly\\": false,\\n        \\"UsePrivateIP\\": false,\\n        \\"UseEbsOptimizedInstance\\": false,\\n 
//\\": false,\\n        \\"SSHPrivateKeyPath\\": \\"\\"\\n    },\\n    \\"DriverName\\": \\"amazonec2\\",\\
//\": {\\n        \\"Driver\\": \\"\\",\\n        \\"Memory\\": 0,\\n        \\"Disk\\": 0,\\n        \\"En
//            \\"ArbitraryFlags\\": [],\\n            \\"Dns\\": null,\\n            \\"GraphDir\\": \\"\\"
//nv\\": [],\\n            \\"Ipv6\\": false,\\n            \\"InsecureRegistry\\": [],\\n            \\"La
//       \\"LogLevel\\": \\"\\",\\n            \\"StorageDriver\\": \\"\\",\\n            \\"SelinuxEnabled
//      \\"TlsVerify\\": true,\\n            \\"RegistryMirror\\": [],\\n            \\"InstallURL\\": \\"h
//m\\"\\n        },\\n        \\"SwarmOptions\\": {\\n            \\"IsSwarm\\": false,\\n            \\"Ad
//            \\"Discovery\\": \\"\\",\\n            \\"Master\\": false,\\n            \\"Host\\": \\"tcp:
//n            \\"Image\\": \\"swarm:latest\\",\\n            \\"Strategy\\": \\"spread\\",\\n            \
//n            \\"Overcommit\\": 0,\\n            \\"ArbitraryFlags\\": [],\\n            \\"Env\\": null\\
//  \\"AuthOptions\\": {\\n            \\"CertDir\\": \\"/home/ubuntu/.docker/machine/certs\\",\\n         
// \\"/home/ubuntu/.docker/machine/certs/ca.pem\\",\\n            \\"CaPrivateKeyPath\\": \\"/home/ubuntu/.
///ca-key.pem\\",\\n            \\"CaCertRemotePath\\": \\"\\",\\n            \\"ServerCertPath\\": \\"/hom
//hine/machines/machinename/server.pem\\",\\n            \\"ServerKeyPath\\": \\"/home/ubuntu/.docker/machi
//ame/server-key.pem\\",\\n            \\"ClientKeyPath\\": \\"/home/ubuntu/.docker/machine/certs/key.pem\\
//ServerCertRemotePath\\": \\"\\",\\n            \\"ServerKeyRemotePath\\": \\"\\",\\n            \\"Client
//e/ubuntu/.docker/machine/certs/cert.pem\\",\\n            \\"ServerCertSANs\\": [],\\n            \\"Stor
//pollo/.docker/machine/machines/machinename\\"\\n        }\\n    },\\n    \\"Name\\": \\"machinename\\"\\n
//          machine:                                                                                       
//           { ConfigVersion: 3,                                                                           
//             Driver:                                                                                     
//              { IPAddress: '52.63.109.186',                                                              
//                MachineName: 'machinename',                                                              
//                SSHUser: 'ubuntu',                                                                       
//                SSHPort: 22,                                                                             
//                SSHKeyPath: '/home/ubuntu/.docker/machine/machines/machinename/id_rsa',                  
//                StorePath: '/home/ubuntu/.docker/machine',                                               
//                SwarmMaster: false,                                                                      
//                SwarmHost: 'tcp://0.0.0.0:3376',                                                         
//                SwarmDiscovery: '',                                                                      
//                Id: '87af397ff5403329648162fb6cdd7188',                                                  
//                AccessKey: 'XYZ',                                                       
//                SecretKey: 'ZYX',                                   
//                SessionToken: '',                                                                        
//                Region: 'ap-southeast-2',                                                                
//                AMI: 'ami-b59ce48f',                                                                     
//                SSHKeyID: 0,                                                                             
//                KeyName: 'machinename',                                                                  
//                InstanceId: 'i-0a69ee84e5a885107',                                                       
//                InstanceType: 't2.micro',                                                                
//                PrivateIPAddress: '172.31.13.155',                                                       
//                SecurityGroupId: 'sg-7db92718',                                                          
//                SecurityGroupName: 'docker-machine',                                                     
//                Tags: '',                                                                                
//                ReservationId: '',                                                                       
//                DeviceName: '/dev/sda1',                                                                 
//                RootSize: 8,                                                                             
//                VolumeType: 'gp2',                                                                       
//                IamInstanceProfile: '',                                                                  
//                VpcId: 'vpc-3413c051',                                                                   
//                SubnetId: 'subnet-5e44f13b',                                                             
//                Zone: 'a',                                                                               
//                RequestSpotInstance: false,                                                              
//                SpotPrice: '0.50',                                                                       
//                PrivateIPOnly: false,                                                                    
//                UsePrivateIP: false,                                                                     
//                UseEbsOptimizedInstance: false,                                                          
//                Monitoring: false,                                                                       
//                SSHPrivateKeyPath: '' },                                                                 
//             DriverName: 'amazonec2',                                                                    
//             HostOptions:                                                                                
//              { Driver: '',                                                                              
//                Memory: 0,                                                                               
//                Disk: 0,                                                                                 
//                EngineOptions:                                                                           
//                 { ArbitraryFlags: [],                                                                   
//                   Dns: null,                                                                            
//                   GraphDir: '',                                                                         
//                   Env: [],                                                                              
//                   Ipv6: false,                                                                          
//                   InsecureRegistry: [],                                                                 
//                   Labels: [],                                                                           
//                   LogLevel: '',                                                                         
//                   StorageDriver: '',                                                                    
//                   SelinuxEnabled: false,                                                                
//                   TlsVerify: true,                                                                      
//                   RegistryMirror: [],                                                                   
//                   InstallURL: 'https://get.docker.com' },                                               
//                SwarmOptions:                                                                            
//                 { IsSwarm: false,                                                                       
//                   Address: '',                                                                          
//                   Discovery: '',                                                                        
//                   Master: false,                                                                        
//                   Host: 'tcp://0.0.0.0:3376',                                                           
//                   Image: 'swarm:latest',                                                                
//                   Strategy: 'spread',                                                                   
//                   Heartbeat: 0,                                                                         
//                   Overcommit: 0,                                                                        
//                   ArbitraryFlags: [],                                                                   
//                   Env: null },                                                                          
//                AuthOptions:                                                                             
//                 { CertDir: '/home/ubuntu/.docker/machine/certs',                                        
//                   CaCertPath: '/home/ubuntu/.docker/machine/certs/ca.pem',                              
//                   CaPrivateKeyPath: '/home/ubuntu/.docker/machine/certs/ca-key.pem',                    
//                   CaCertRemotePath: '',                                                                 
//                   ServerCertPath: '/home/ubuntu/.docker/machine/machines/machinename/server.pem',       
//                   ServerKeyPath: '/home/ubuntu/.docker/machine/machines/machinename/server-key.pem',    
//                   ClientKeyPath: '/home/ubuntu/.docker/machine/certs/key.pem',                          
//                   ServerCertRemotePath: '',                                                             
//                   ServerKeyRemotePath: '',                                                              
//                   ClientCertPath: '/home/ubuntu/.docker/machine/certs/cert.pem',                        
//                   ServerCertSANs: [],                                                                   
//                   StorePath: '/home/ubuntu/.docker/machine/machines/machinename' } },                   
//             Name: 'machinename' } }                                                                     

```



## License

MIT

[npm-image]: https://img.shields.io/npm/v/dockermachine-cli-js.svg?style=flat
[npm-url]: https://npmjs.org/package/dockermachine-cli-js
[downloads-image]: https://img.shields.io/npm/dm/dockermachine-cli-js.svg?style=flat
[downloads-url]: https://npmjs.org/package/dockermachine-cli-js