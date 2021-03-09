import { any } from "joiful";
import DataTags from "./DataTags";

class ServerDoc {
  getInfo() {
    const dataTags = new DataTags();

    return {
      openapi: '3.0.1',
      info: {
        version: '1.0.0',
        title: 'Ayu Grosir Api',
        description: 'Rest api for ayu grosir',
        termsOfService: 'http://api_url/terms/',
        contact: {
          name: 'Jafar Pahrudin',
          email: 'jafar.pahrudin@gmail.com',
          url: 'https://feliex1992.github.io'
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      servers: [
        {
          url: 'http://localhost:7001/api/v1',
          description: 'Local server'
        },
        {
          url: 'https://ayu-grosir-api.herokuapp.com/api/v1',
          description: 'Heroku server'
        },
        {
          url: 'https://147.139.193.169:3759/api/v1',
          description: 'alibaba server'
        }
      ],
      security: [
        {
          ApiKeyAuth: any
        }
      ],
      tags: [
        // Master
        { name: dataTags.masterUser() },

        // Transaksi

        // Report
      ]
    };
  }
}

export default ServerDoc;