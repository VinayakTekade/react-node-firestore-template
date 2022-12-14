const {BigQuery} = require('@google-cloud/bigquery');

const credentials = {
    type: 'authorized_user',
    client_id: keys.installed.client_id,
    client_secret: keys.installed.client_secret,
    refresh_token: tokens.refresh_token,
};



function getTanentDetails(){

    const bigquery = new BigQuery(credentials);

    const query = `SELECT name, SUM(number) as total
    FROM \`bigquery-public-data.usa_names.usa_1910_current\`
    WHERE name = 'William'
    GROUP BY name;`;

    const options = {
      query: query,
    };

    const [job] = await bigquery.createQueryJob(options);
    //console.log(`Job ${job.id} started.`);

    return rows;

}

  
