import db from '../models';
const Resources = db.resources;
const Op = db.Sequelize.Op;

export default {
    create: (req, res, next) => {
        const resources = ({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link
        });

        Resources.create(resources)
        .then(data => {
        res.status(200).send({
            status: 200,
            message: "Resources created successfully!",
            data:data
        });
        })
        .catch(err => {
        res.status(500).send({
            status: 500,
            message:
            err.message || "Some error occurred while creating resources."
        });
        });
    },

    findall: (req, res, next) => {
        const id = req.query.id;
        let condition = id ? { id: id } : null;
  
        Resources.findAll({ where: condition})
          .then(data => {
            res.status(200).send({
              status: 200,
              message: "Resources fetched succesfully!",
              data:data
            });
          })
          .catch(err => {
            res.status(500).send({
              status: 500,
              message:
                err.message || "Some error occurred while fetching all resources"
            });
          });
    },

    update: (req, res, next) => {
        const id = req.params.id;

        Resources.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                status:200,
                message: "Resources were updated successfully."
              });
            } else {
              res.send({
                status: 400,
                message: `Resources with id=${id} not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              status: 500,
              message: "Error updating resources with id=" + id
            });
          });
    },

    delete: (req, res, next) => {
      const id = req.params.id;

      Resources.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              status: 200,
              message: "Resources were deleted successfully!"
            });
          } else {
            res.send({
              status: 400,
              message: `Resources with id=${id} not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            status: 500,
            message: "Could not delete resources with id=" + id
          });
        });
    }
}