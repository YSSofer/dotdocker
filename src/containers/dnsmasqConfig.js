export default port => ({
  Image: 'andyshinn/dnsmasq:latest',
  name: 'dotdocker-dnsmasq',
  Cmd: ['--address=/docker/127.0.0.1', '--log-facility=-'],
  ExposedPorts: {
    [`${port}/tcp`]: {},
    [`${port}/udp`]: {},
  },
  HostConfig: {
    PortBindings: {
      '53/tcp': [
        {
          HostPort: `${port}`,
        },
      ],
      '53/udp': [
        {
          HostPort: `${port}`,
        },
      ],
    },
    RestartPolicy: { Name: 'always' },
    CapAdd: ['NET_ADMIN'],
  },
});
