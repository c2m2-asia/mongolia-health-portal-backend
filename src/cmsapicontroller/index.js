import express from 'express';
const api = express();
import users from './users';
import homepage from './homepage';
import multer from 'multer';

var storage = multer.diskStorage ({
  destination : 'temp/',
  filename: function (req, file, cb) {
    cb (null, file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file');

/**
	  * @api {post} /admin/api/v1/users/login login 
	 * @apiName Post login
	 * @apiGroup Admin
	 *
	 *
	 * @apiParam {String} username Admin username
	 * @apiParam {String} password Admin password

	 * @apiSuccessExample {json} Body parameters
	 *						{
     *                        "username":"",
	 * 						  "password": ""
	 *				      }
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
     *	  		"success": 1,
     *			"message": "Login successful",
     *			"jwt": ""
	 *		}
     *
	 *
	 * @apiDescription API for admin login
	 * @apiVersion 1.0.0
	 */
api.post('/users/login', users.generateToken, users.login);

/**
	 * @api {post} /admin/api/v1/imageupload imageupload 
	 * @apiName Post imageupload
	 * @apiGroup Admin
	 *
	 *
	 * @apiParam {File} file Upload image or file

	 * @apiSuccessExample {json} Body parameters
	 *						{
     *                        "file": ${path}
	 *				      	}
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *			response = {
     *		   		success: true,
     *   			data: res
     *			}
     *
	 *
	 * @apiDescription API for image or files upload
	 * @apiVersion 1.0.0
	 */
api.post('/imageupload', upload, homepage.imageuploader);

/**
	  * @api {post} /admin/api/v1/homepage/add add content
	 * @apiName Post add content
	 * @apiGroup Admin
	 *
	 *
	 * @apiSuccessExample {json} Body parameters
	 *						{
     *							"header": "",
     *							"sub_header": "",
     *							"description": "",
     *							"collaborator_1_name": "",
     *							"collaborator_1_logo": "", // link to image/file from imageupload API response.
     *							"collaborator_1_detail": "",
     *							"collaborator_1_website": "",
     *							"collaborator_2_name": "",
     *							"collaborator_2_logo": "", // link to image/file from imageupload API response.
     *							"collaborator_2_detail": "",
     *							"collaborator_2_website": ""
	 *						}
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
	 *	  		"id": 1,
	 *			"header": ""
	 *			...
	 *			"createdAt": "",
	 *			"updatedAt": "",
	 *		}
     *
	 *
	 * @apiDescription API to add content for homepage
	 * @apiVersion 1.0.0
	 */
api.post('/homepage/add', homepage.add);

/**
	* @api {get} /admin/api/v1/homepage fetch 
	 * @apiName Get fetch
	 * @apiGroup Admin
	 *
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
	 *	  		"id": 1,
	 *			"header": ""
	 *			...
	 *			"createdAt": "",
	 *			"updatedAt": "",
	 *		}
     *
	 * @apiDescription API that fetches homepage content
	 * @apiVersion 1.0.0
	 */
api.get('/homepage', homepage.fetch);

/**
	 * @api {put} /admin/api/v1//homepage/:id edit 
	 * @apiName Put edit
	 * @apiGroup Admin
	 *
	 * @apiParam {string} id id of content to be updated
	 *
	 * @apiSuccessExample {json} Body parameters
	 *						{
     *							"header": "",
     *							"sub_header": "",
     *							"description": "",
     *							"collaborator_1_name": "",
     *							"collaborator_1_logo": "", // link to image/file from imageupload API response.
     *							"collaborator_1_detail": "",
     *							"collaborator_1_website": "",
     *							"collaborator_2_name": "",
     *							"collaborator_2_logo": "", // link to image/file from imageupload API response.
     *							"collaborator_2_detail": "",
     *							"collaborator_2_website": ""
	 *						}
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
     *          "message": "Content was updated successfully."
	 *		}
     *
	 *
	 * @apiDescription API to edit homepage content
	 * @apiVersion 1.0.0
	 */
api.put('/homepage/:id', homepage.edit);


export default api;