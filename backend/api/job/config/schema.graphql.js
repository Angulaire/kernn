module.exports = {
  query: `
    jobsCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      jobsCount: {
        description: 'Return the count of jobs',
        resolverOf: 'application::job.job.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.job.services.job.count(options.where || {});
        },
      },
    },
  },
};