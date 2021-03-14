import express from 'express';
const api = express();
import features from './feature';
import userReview from './userReview';
import searchkeywords from './search';
import resources from './resources';
import location from './locations';

/**
	 * @api {get} /api/v1/amenities/tags?tags=edit/filter fetch tags
	 * @apiName Get all tags
	 * @apiGroup Features
	 *
	 * @apiParam {String} tags query parameter specifying either edit or filter to fetch required tags
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
     *	  		"status": 200,
     *			"message": "Tags fetched successfully!",
	 *			"data": []
	 *		}
	 *
	 * @apiDescription API that retrieves all tags used for filters and editing POIs
	 * @apiVersion 1.0.0
*/
api.get('/amenities/tags', features.gettags);

/**
	 * @api {post} /api/v1/features features 
	 * @apiName Post feature
	 * @apiGroup Features
	 *
	 *
	 * @apiParam {Varchar} type Type for feature to be fetched ("healthServices" or "pharmacies")
	 * @apiParam {json} filters Optional parameter to filter out data by type, services, category as per the osm tag and value
	 * @apiParam {String} city First admin level for data filter ("Ulaanbaatar")
	 * @apiParam {String} district Second admin level i.e district id
	 * @apiParam {String} khoroo Third admin level i.e khoroo id

	 * @apiSuccessExample {json} Body parameters
	 *						{
     *                        "type": "healthServices",
	 * 						  "city": "Ulaanbaatar",
     *						  "district": "Khan Uul",
     *						  "khoroo": "0112271",
     *                         "filters": [
	 *						{
	 *							"osmTag": "healthcare:speciality",
	 *							"osmValue": ["neurology","dentist"]
	 *						},
	 *						{
	 *							"osmTag": "wheelchair",
	 *							"osmValue": ["no"]
	 *						}
	 *					   ]
	 *				      }
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
     *	  		"status": 200,
     *          "message":"Features fetched successfully!",
	 * 			"boundary": [],
	 *	  		"geometries" : {}
	 *		}
     *
     *
	 *
	 *
	 * @apiDescription API that fetches and filters features
	 * @apiVersion 1.0.0
	 */
api.post('/features', features.collectFilters, features.fetch, features.adminboundary, features.boundaryfilter, features.respond);

/**
	    * @api {post} /api/v1/extracts/download Generate CSV / GeoJSON  
	    * @apiName Download
	    * @apiGroup Features
	   
	    * @apiParam {Varchar} type Type for feature to be fetched ("healthServices" or "pharmacies")
		* @apiParam {json} filters Optional parameter to filter out data by type, services, category as per the osm tag and value
		* @apiParam {String} city First admin level for data filter ("Ulaanbaatar")
		* @apiParam {String} district Second admin level i.e district id
		* @apiParam {String} khoroo Third admin level i.e khoroo id

		* @apiSuccessExample {json} Body parameters
		*						{
		*                        "type": "healthServices",
		* 						  "city": "Ulaanbaatar",
		*						  "district": "Khan Uul",
		*						  "khoroo": "0112271",
		*                         "filters": [
		*						{
		*							"osmTag": "healthcare:speciality",
		*							"osmValue": ["neurology","dentist"]
		*						},
		*						{
		*							"osmTag": "wheelchair",
		*							"osmValue": ["no"]
		*						}
		*					   ]
		*				      }
	    * @apiSuccessExample {json} Success-Response:
	    *
	    *	{
	    *	  "status": 200,
	   	*	  "csvlink" : "extracts/1495945856052.csv",// use this like - http://178.128.59.143/extracts/1495945856052.csv
	   	* 	  "geojsonlink" : "extracts/1495945856052.json"
	   	*	}
		*	
	    *
	    * @apiDescription API that that generates CSV / GeoJSON download link
	    * @apiVersion 1.0.0
	    */
api.post('/extracts/download', features.collectFilters, features.fetch, features.adminboundary, features.boundaryfilter, features.download, features.respond);
/**
	 * @api {post} /api/v1/review create user review
	 * @apiName Post user review
	 * @apiGroup User Review
	 *
	 *
	 * @apiParam {string} osm_username Unique username of osm users
	 * @apiParam {integer} rating Integer value between 1 to 5
	 * @apiParam {text} comments Text field with user review comments
	 * @apiParam {string} service_id Feature id
	 * @apiParam {text} service Service received by the user
	 * @apiParam {text} health_expertise Name of the health expertise the user consulted with

	 * @apiSuccessExample {json} Body parameters
	 *				{
     *					"osm_username": "samyoga",
     *					"rating": 4,
     *					"comments": "not bad",
	 *					"service_id": "8247955719",
	 *					"service": "Orthopedic surgery",
     *					"health_expertise": "Dr. Ram Bahadur, Orthopedic surgeon"
	 *				}
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 * 		"status": 200,
     *		"data": [
	 *			{
     *	  			"id": 1,
     *          	"osm_username": "samyoga",
     *				"rating": 4,
     *				"comments": "not bad",
	 *				"service_id": "8247955719",
	 *				"updatedAt": "2021-01-05T08:05:10.933Z	
	 *				"service": "Orthopedic surgery",
     *				"health_expertise": "Dr. Ram Bahadur, Orthopedic surgeon"
     *				"updatedAt": "2021-01-05T08:05:10.933Z",
     *				"createdAt": "2021-01-05T08:05:10.933Z"
	 *			}
	 *
	 * @apiDescription API that creates user rating
	 * @apiVersion 1.0.0
*/
api.post('/review', userReview.create);

/**
	 * @api {get} /api/v1/review fetch all
	 * @apiName Get all user review
	 * @apiGroup User Review
	 *
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		"status": 200,
     *		"data": [
	 *			{
     *	  			"id": 1,
     *          	"osm_username": "samyoga",
     *				"rating": 4,
     *				"comments": "not bad",
	 *				"service_id": "8247955719",
	 *				"updatedAt": "2021-01-05T08:05:10.933Z	
	 *				"service": "Orthopedic surgery",
     *				"health_expertise": "Dr. Ram Bahadur, Orthopedic surgeon"
     *				"updatedAt": "2021-01-05T08:05:10.933Z",
     *				"createdAt": "2021-01-05T08:05:10.933Z"
	 *			}
	 *
	 * @apiDescription API that retrieves all user rating
	 * @apiVersion 1.0.0
*/
api.get('/review', userReview.findall);

/**
	 * @api {get} /api/v1/review/id/:id fetch by id
	 * @apiName Get user review by id
	 * @apiGroup User Review
	 *
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		"status": 200,
     *		"data": [
	 *			{
     *	  			"id": 1,
     *          	"osm_username": "samyoga",
     *				"rating": 4,
     *				"comments": "not bad",
	 *				"service_id": "8247955719",
	 *				"updatedAt": "2021-01-05T08:05:10.933Z	
	 *				"service": "Orthopedic surgery",
     *				"health_expertise": "Dr. Ram Bahadur, Orthopedic surgeon"
     *				"updatedAt": "2021-01-05T08:05:10.933Z",
     *				"createdAt": "2021-01-05T08:05:10.933Z"
	 *			}
	 *
	 * @apiDescription API that retrieves all user rating
	 * @apiVersion 1.0.0
*/
api.get('/review/id/:id', userReview.findById);

/**
	 * @api {get} /api/v1/review/username/:osm_username fetch by username
	 * @apiName Get user review by username
	 * @apiGroup User Review
	 *
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		"status": 200,
     *		"data": [
	 *			{
     *	  			"id": 1,
     *          	"osm_username": "samyoga",
     *				"rating": 4,
     *				"comments": "not bad",
	 *				"service_id": "8247955719",
	 *				"updatedAt": "2021-01-05T08:05:10.933Z	
	 *				"service": "Orthopedic surgery",
     *				"health_expertise": "Dr. Ram Bahadur, Orthopedic surgeon"
     *				"updatedAt": "2021-01-05T08:05:10.933Z",
     *				"createdAt": "2021-01-05T08:05:10.933Z"
	 *			}
	 *
	 * @apiDescription API that retrieves user rating by osm username
	 * @apiVersion 1.0.0
*/
api.get('/review/username/:osm_username', userReview.findallbyosmusername)

/**
	 * @api {get} /api/v1/review/service/:service_id fetch by service
	 * @apiName Get user review by service
	 * @apiGroup User Review
	 * 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		"status": 200,
     *		"data": [
	 *			{
     *	  			"id": 1,
     *          	"osm_username": "samyoga",
     *				"rating": 4,
     *				"comments": "not bad",
	 *				"service_id": "8247955719",
	 *				"updatedAt": "2021-01-05T08:05:10.933Z	
	 *				"service": "Orthopedic surgery",
     *				"health_expertise": "Dr. Ram Bahadur, Orthopedic surgeon"
     *				"updatedAt": "2021-01-05T08:05:10.933Z",
     *				"createdAt": "2021-01-05T08:05:10.933Z"
	 *			}
	 *
	 * @apiDescription API that retrieves user rating by service id
	 * @apiVersion 1.0.0
*/
api.get('/review/service/:service_id', userReview.findallbyservice);

/**
	 * @api {put} /api/v1/review/update/:id update user review
	 * @apiName Update user review
	 * @apiGroup User Review
	 *
	 * @apiParam {string} service_id unique service id that is to be updated
	 * 
	 * @apiSuccessExample {json} Body parameters
	 *				{
     *					"osm_username": "samyoga",
     *					"rating": 3,
     *					"comments": "no wheelchair available",
	 *					"service_id": "8247955719",
	 *					"service": "Orthopedic surgery",
     *					"health_expertise": "Dr. Ram Bahadur, Orthopedic surgeon"
	 *				}
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
	 *	       "status": 200, 
     *	  	   "message": "User rating was updated successfully!"
	 *		}
	 *
	 * @apiDescription API that updates user rating
	 * @apiVersion 1.0.0
*/
api.put('/review/update/:id', userReview.updateReview);

/**
	 * @api {delete} /api/v1/review/delete/:id delete user review
	 * @apiName Delete user review
	 * @apiGroup User Review
	 *
	 *
	 * @apiParam {integer} id unique id of the rating that is to be deleted
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
	 *         "status": 200,	 
     *	  	   "message": "User rating was deleted successfully!"
	 *		}
	 *
	 * @apiDescription API that deletes user rating
	 * @apiVersion 1.0.0
*/
api.delete('/review/delete/:id', userReview.deleteReview);

/**
	 * @api {get} /api/v1/search/:keywords?type=healthServices/pharmacies search query
	 * @apiName Get searched query
	 * @apiGroup Search
	 *
	 * @apiParam {String} type query parameter specifying either 'pharmacies' or 'healthServices' to fetch filtered data
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 * {
     *   "status": 200,
     *   "message": "Data fetched successfully!",
     *   "result": [
	 *		{
	 *			"id": 222,
	 *			"service": [],
	 *			"category": [],
	 *			"speciality": [],
	 *			"geometries": {
	 *				"type": "Feature",
	 *				"properties": {
	 *					"type": "node",
	 *					"id": "1967140755",
	 *					"tags": {
	 *						"name": "Эмийн сан",
	 *						"amenity": "pharmacy",
	 *						"name:en": "Pharmacy",
	 *						"name:mn": "Эмийн сан"
	 *					}
	 *				},
	 *				"geometry": {
	 *					"type": "Point",
	 *					"coordinates": [
	 *						106.9183287,
	 *						47.9007014
	 *					]
	 *				},
	 *				"city": "Ulaanbaatar",
	 *				"district": "Khan Uul",
	 *				"khoroo": "0112279"
	 *			}
	 * 		}]
	 *	}
	 *
	 * @apiDescription API that retrieves data for searched query
	 * @apiVersion 1.0.0
*/
api.get('/search/:keywords', searchkeywords.search );

/**
	 * @api {post} /api/v1/review create resources
	 * @apiName Post resources
	 * @apiGroup Resources
	 *
	 *
	 * @apiParam {text} title Text field showing title for resource page
	 * @apiParam {text} description Text field with content for resource page
	 * @apiParam {string} link String field with link for resource page
	 *

	 * @apiSuccessExample {json} Body parameters
	 *				{
     *					"title": "Accumulating health services data with OpenStreetMap in Mongolia.",
	 *					"description": "Do you know where the closest hospital is from your home? Do you know where you can easily access an ambulance from during an emergency situation? Are you prepared?
	 *									Mongolia Health Portal is the answer to these questions and more. Public Lab Mongolia, the local partner of C2M2 Mongolia project, with help from Kathmandu Living Labs,
	 *                                  has been spearheading the ground effort to produce robust geospatial data for Mongolia. It is hoped that the critical infrastructure information made open here plays an integral part in keeping both yourself and your neighbors healthy.",
     *					"link": "http://kathmandulivinglabs.org/"
	 *				}
	 *
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 * 			{
     *    			"status": 200,
     *    			"data": {
     *    				"id": 1,
     *					"title": "Accumulating health services data with OpenStreetMap in Mongolia.",
     *	    			"description": "Do you know where the closest hospital is from your home? Do you know where you can easily access an ambulance from during an emergency situation? Are you prepared? Mongolia Health Portal is the answer to these questions and more. Public Lab Mongolia, the local partner of C2M2 Mongolia project, with help from Kathmandu Living Labs,       has been spearheading the ground effort to produce robust geospatial data for Mongolia. It is hoped that the critical infrastructure information made open here plays an integral part in keeping both yourself and your neighbors healthy.",
     *   				"link": "http://kathmandulivinglabs.org/",
     *	    			"updatedAt": "2021-03-03T08:09:31.338Z",
     *	    			"createdAt": "2021-03-03T08:09:31.338Z"
     *				}	
	 *			}
	 *
	 * @apiDescription API that creates resources
	 * @apiVersion 1.0.0
*/
api.post('/resource', resources.create);

/**
	 * @api {get} /api/v1/resource fetch all
	 * @apiName Get all resources
	 * @apiGroup Resources
	 *
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 * 			{
     *    			"status": 200,
     *    			"data": {
     *    				"id": 1,
     *					"title": "Accumulating health services data with OpenStreetMap in Mongolia.",
     *	    			"description": "Do you know where the closest hospital is from your home? Do you know where you can easily access an ambulance from during an emergency situation? Are you prepared? Mongolia Health Portal is the answer to these questions and more. Public Lab Mongolia, the local partner of C2M2 Mongolia project, with help from Kathmandu Living Labs,       has been spearheading the ground effort to produce robust geospatial data for Mongolia. It is hoped that the critical infrastructure information made open here plays an integral part in keeping both yourself and your neighbors healthy.",
     *   				"link": "http://kathmandulivinglabs.org/",
     *	    			"updatedAt": "2021-03-03T08:09:31.338Z",
     *	    			"createdAt": "2021-03-03T08:09:31.338Z"
     *				}	
	 *			}
	 *
	 * @apiDescription API that retrieves all resources
	 * @apiVersion 1.0.0
*/
api.get('/resource', resources.findall);

/**
	 * @api {put} /api/v1/resource/update/:id update resources
	 * @apiName Update resources
	 * @apiGroup Resources
	 *
	 * @apiParam {string} id unique id that is to be updated
	 * 
	 * @apiSuccessExample {json} Body parameters
	 *				{
     *					"title": "Accumulating health services data with OpenStreetMap in Mongolia.",
	 *					"description": "Do you know where the closest hospital is from your home? Do you know where you can easily access an ambulance from during an emergency situation? Are you prepared?
	 *									Mongolia Health Portal is the answer to these questions and more. Public Lab Mongolia, the local partner of C2M2 Mongolia project, with help from Kathmandu Living Labs,
	 *                                  has been spearheading the ground effort to produce robust geospatial data for Mongolia. It is hoped that the critical infrastructure information made open here plays an integral part in keeping both yourself and your neighbors healthy.",
     *					"link": "http://kathmandulivinglabs.org/"
	 *				}
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
	 *	       "status": 200, 
     *	  	   "message": "Resources were updated successfully!"
	 *		}
	 *
	 * @apiDescription API that updates resources
	 * @apiVersion 1.0.0
*/
api.put('/resource/update/:id', resources.update);

/**
	 * @api {delete} /api/v1/resource/delete/:id delete resources
	 * @apiName Delete resources
	 * @apiGroup Resources
	 *
	 *
	 * @apiParam {integer} id unique id of the resource that is to be deleted
	 
	 * @apiSuccessExample {json} Success-Response:
	 *
	 *		{
	 *         "status": 200,	 
     *	  	   "message": "Resources was deleted successfully!"
	 *		}
	 *
	 * @apiDescription API that deletes resources
	 * @apiVersion 1.0.0
*/
api.delete('/resource/delete/:id', resources.delete);

api.get('/location/', location.showlocationdivision);

export default api;