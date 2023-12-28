/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.jiosaavn.com'
          },
          {
            protocol: 'http',
            hostname: 'www.jiosaavn.com'
          },
          {
            protocol: 'https',
            hostname: 'c.saavncdn.com'
          },
          {
            protocol: 'http',
            hostname: 'c.saavncdn.com',
          },
          {
            protocol: 'https',
            hostname: 'pli.saavncdn.com'
          },
          {
            protocol: 'http',
            hostname: 'pli.saavncdn.com',
          },
          {
            protocol: 'https',
            hostname: 'admin.aws.sg.saavn.com'
          },
          {
            protocol: 'http',
            hostname: 'admin.aws.sg.saavn.com',
          },
          {
            protocol: 'https',
            hostname: 'www.flaticon.com',
          },
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          },
        ],
        
      },
}

module.exports = nextConfig
