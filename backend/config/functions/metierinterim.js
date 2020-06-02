const parser = require('fast-xml-parser');
const fetch = require('isomorphic-unfetch');
const Appbase = require('appbase-js');

module.exports = async () => {
  const offers = await fetch(
      'https://www.mytalentplug.com/xml.aspx?jbID=u/S3BRjmcl8='
    )
    .then(res => res.text())
    .then(data => parser.parse(data).offers.offer)
    console.log(`Offers from API: ${offers.length}`)

  // Delete all ORM query
  // const offers_db = await strapi
  //   .query('offre')
  //   .find({_limit: -1})
  // console.log(offers_db.length)


  offers.map(async (offer) => {
    var entry = await strapi
      .query('job')
      .findOne({ key_id: offer.offer_keyid })
    // Create only if entry doesn't exist
    if (entry == null) {
      return (
        strapi
          .query('job')
          .create({
            key_id: offer.offer_keyid,
            published_at: new Date(offer.posting_date),
            updated_at: new Date(offer.updating_date),
            reference: offer.job_reference,
            title: offer.job_title,
            company_name: offer.company_name,
            agence_id: offer.id_agence,
            company_description: offer.company_description,
            secteur_metier_interim: offer.SecteurMetierInterim,
            description: offer.job_description,
            applicant_profile: offer.applicant_profile,
            function: offer.job_function,
            industry: offer.job_industry,
            location_administrativearea: offer.location_administrativearea,
            location_subadministrativearea: offer.location_subadministrativearea,
            location_town: offer.location_town,
            type: offer.job_type,
            contract: offer.job_contract,
            application_email: offer.application_email
          })
      )
    }
  })

  // Index to Appbase
  var bulkBody = [] 
  offers.map((offer) => {
    var index = { index: { _id: offer.offer_keyid } }
    var body = { 
      published_at: offer.posting_date,
      updated_at: offer.updating_date,
      reference: offer.job_reference,
      title: offer.job_title,
      company_name: offer.company_name,
      agence_id: offer.id_agence,
      company_description: offer.company_description,
      secteur_metier_interim: offer.SecteurMetierInterim,
      description: offer.job_description,
      applicant_profile: offer.applicant_profile,
      function: offer.job_function,
      industry: offer.job_industry,
      location_administrativearea: offer.location_administrativearea,
      location_subadministrativearea: offer.location_subadministrativearea,
      location_town: offer.location_town,
      type: offer.job_type,
      contract: offer.job_contract,
      application_email: offer.application_email 
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