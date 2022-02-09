module.exports = {
  apps : [{
    name:'yjserve',
    script: './bin/www',
    watch: 'true',
    instances:4,
  }],

  deploy : {
    production : {
      user : 'root',
      host : '121.5.236.190',
      ref  : 'origin/master',
      repo : 'git@github.com:441234591/yjblogback.git',
      path : '/www/wwwroot',
      ssh_options:"StrictHostKeyChecking=no",
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      "env":{
        "NODE_ENV":"production"
      }
    }
  }
};
