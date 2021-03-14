import express from 'express';
const app = express();
import keys from '../utilities/keys';
import bodyParser from 'body-parser';
import * as filestack from 'filestack-js';

//import database
import db from '../models';
const Homepage = db.homepage;
const Op = db.Sequelize.Op;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


export default {

  imageuploader: async (req, res, next) => {
    const client = filestack.init(keys.filestackAPIKey);
    let response = {};
    await client.upload(req.file.path)
    .then(res => {
      console.log('success: ', res.url)
      response = {
        success: true,
        data: res
      }
    })
    .catch(err => {
      console.log(err)
    });

    res.send(response);
  },

    add: (req, res, next) => {

      const content = ({
        header: req.body.header,
        sub_header: req.body.sub_header,
        description: req.body.description,
        collaborator_1_name: req.body.collaborator_1_name,
        collaborator_1_logo: req.body.collaborator_1_logo,
        collaborator_1_detail: req.body.collaborator_1_detail,
        collaborator_1_website: req.body.collaborator_1_website,
        collaborator_2_name: req.body.collaborator_2_name,
        collaborator_2_logo: req.body.collaborator_2_logo,
        collaborator_2_detail: req.body.collaborator_2_detail,
        collaborator_2_website: req.body.collaborator_2_website
      });

      Homepage.create(content)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding content to the homepage."
        });
      });
    },

    fetch: (req, res, next) => {
      const id = req.query.id;
      let condition = id ? { id: id } : null;

      Homepage.findAll({ where: condition})
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while fetching content."
          });
        });
    }, 

    edit: (req, res, next) => {
      const id = req.params.id;

        Homepage.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Content was updated successfully."
              });
            } else {
              res.send({
                message: `Content with id=${id} not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating the content with id=" + id
            });
          });
    }
}