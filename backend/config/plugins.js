module.exports = ({ env }) => {
  const hasCloudinaryConfig =
    env('CLOUDINARY_NAME') && env('CLOUDINARY_KEY') && env('CLOUDINARY_SECRET');

  if (!hasCloudinaryConfig) {
    return {};
  }

  return {
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
  };
};
