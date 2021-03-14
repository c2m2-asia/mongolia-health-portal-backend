import db from '../models';
const UserReview = db.userreview;
const Op = db.Sequelize.Op;

export default {
    create: (req, res, next) => {
        const review = ({
            osm_username: req.body.osm_username,
            rating: req.body.rating,
            comments: req.body.comments,
            service_id: req.body.service_id,
            service: req.body.service,
            health_expertise: req.body.health_expertise
          });

          UserReview.create(review)
          .then(data => {
            res.status(200).send({
              status: 200,
              data:data
            });
          })
          .catch(err => {
            res.status(500).send({
              status: 500,
              message:
                err.message || "Some error occurred while rating the service."
            });
          });
    },

    findall: (req, res, next) => {
      const id = req.query.id;
      let condition = id ? { id: id } : null;

      UserReview.findAll({ where: condition})
        .then(data => {
          res.status(200).send({
            status: 200,
            data:data
          });
        })
        .catch(err => {
          res.status(500).send({
            status: 500,
            message:
              err.message || "Some error occurred while fetching all user ratings"
          });
        });
    },

    findallbyservice: (req, res, next) => {
      const serviceId = req.params.service_id;

      UserReview.findAll({ where: {service_id: serviceId} })
        .then(data => {
          let average_rating, rating = 0;
          data.forEach(d => {
            rating += d.rating;
          })
          average_rating = rating / data.length;
          res.send({
            status: 200,
            message: "Service ratings fetched successfully!",
            average_rating: average_rating.toFixed(2),
            data: data
          });
        })
        .catch(err => {
          res.status(500).send({
            status:500,
            message:
              err.message || "Some error occurred while fetching all user ratings for service with id=" + serviceId
          });
        });
    },

    findallbyosmusername: (req, res, next) => {
      const osmusername = req.params.osm_username;

      UserReview.findAll({ where: {osm_username: osmusername} })
        .then(data => {
          res.status(200).send({
            status: 200,
            data:data
          });
        })
        .catch(err => {
          res.status(500).send({
            status: 500,
            message:
              err.message || "Some error occurred while fetching all user ratings for username=" + osmusername
          });
        });
    },

    findById: (req, res, next) => {
      const id = req.params.id;

      UserReview.findByPk(id)
        .then(data => {
          res.status(200).send({
            status: 200,
            data:data
          });
        })
        .catch(err => {
          res.status(500).send({
            status: 500,
            message: "Error fetching user ratings with id=" + id
          });
        });
    },

    updateReview: (req, res, next) => {
        const id = req.params.id;

        UserReview.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                status:200,
                message: "User rating was updated successfully."
              });
            } else {
              res.send({
                status: 400,
                message: `User rating with id=${id} not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              status: 500,
              message: "Error updating user rating with id=" + id
            });
          });
    },

    deleteReview: (req, res, next) => {
      const id = req.params.id;

      UserReview.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              status: 200,
              message: "User rating was deleted successfully!"
            });
          } else {
            res.send({
              status: 400,
              message: `User rating with id=${id} not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            status: 500,
            message: "Could not delete User rating with id=" + id
          });
        });
    }
}