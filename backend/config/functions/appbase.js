const parser = require('fast-xml-parser');
const fetch = require('isomorphic-unfetch');
const Appbase = require('appbase-js');


module.exports = async () => {
  const jobs = await fetch(
    'https://kernn.herokuapp.com/jobs'
  )
  .then(res => res.json())

  var bulkBody = [] 
  jobs.map(job => {
    var index = { index: { _id: job.id } }
    var body = { 
      title: job.title,
      location_town: job.location_town,
      contract: job.contract,
      compagny_description: job.compagny_description,
      profil_description: job.profil_description,
      mission_description: job.mission_description,
      salary: job.salary,
      experience: job.experience,
      category_name: job.job_category.name,
      category_image_url: job.job_category.image.url,
      created_at: job.created_at,
      updated_at: job.updated_at
    }
    bulkBody.push(index, body)
  })

  var appbase = Appbase({
    "url": process.env.APPBASE_API_URL,
    "app": process.env.APPBASE_APP_ID,
    "credentials": process.env.APPBASE_API_KEY
  })
  appbase
    .bulk({
      type: "_doc",
      body: bulkBody
    })
    .then(res => {
      console.log('successfully indexed: ', res);
    })
    .catch(err => {
      console.log('indexing error: ', err);
    });
  
};