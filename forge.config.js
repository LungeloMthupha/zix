module.exports = {
  packagerConfig: {
    asar: true,
    icon:'./ico/Zix'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: './ico/Zix.ico'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './ico/Zix.ico'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './ico/Zix.ico'
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {
        icon: './ico/Zix.ico'
      },
    },
  ],
};
