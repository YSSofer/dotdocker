import { homedir } from 'os';
import { resolve } from 'path';

export default {
  Image: 'codekitchen/dinghy-http-proxy:latest',
  name: 'dotdocker-proxy',
  Env: ['CONTAINER_NAME=dotdocker-proxy'],
  ExposedPorts: {
    '80/tcp': {},
    '443/tcp': {},
    '19322/udp': {},
  },
  HostConfig: {
    Binds: [
      '/var/run/docker.sock:/tmp/docker.sock:ro',
      `${resolve(homedir(), '.dotdocker/certs')}:/etc/nginx/certs:ro`,
    ],
    PortBindings: {
      '19322/udp': [
        {
          HostPort: '19322',
        },
      ],
      '443/tcp': [
        {
          HostPort: '443',
        },
      ],
      '80/tcp': [
        {
          HostPort: '80',
        },
      ],
    },
    RestartPolicy: { Name: 'always' },
  },
};
