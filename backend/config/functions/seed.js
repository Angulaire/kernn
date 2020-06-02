const Papa = require('papaparse');
const fs = require('fs');


module.exports = async () => {
  const path = require('path');
  const file = path.join(__dirname, 'fake.csv');
  const fileInput = fs.createReadStream(file);

  Papa.parse(fileInput, {
    header: true,
    delimiter: ";",
    complete: function(results) {
      jobs = results.data
      jobs.map(job => 
        strapi
        .query('job')
        .create({
          title: job.title,
          location_town: job.location_town,
          contract: job.contract,
          compagny_description: job.compagny_description,
          profil_description: job.profil_description,
          mission_description: job.mission_description,
          salary: job.salary,
          experience: job.experience,
          job_category: {
            id: job.job_category_id
          }
        })
      )
    }
  });
};