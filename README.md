<div align="center"><strong>Mongolia Health Portal</strong></div>
<div align="center">Accumulating health services data with OpenStreetMap</div>

<br />

<div align="center">
  <sub>Maintained by <a href="http://www.kathmandulivinglabs.org/">Kathmandu Living Labs</a> </sub>
</div>
<br />

## C2M2-Mongolia - Backend

Backend repository for C2M2-Mongolia based on Node JS.

### Development Setup

* Clone the repository: 
`git clone git@code.kathmandulivinglabs.org:c2m2-mongolia/c2m2-api.git`
* Install required npm packages: `npm i && npm i -g nodemon`
* Run the development server `$ npm run start`

### To generate the API Documentations using APIDOC
* `npm run apidocs`
  
### Build and push docker image for c2m2-api

* Login to the gitlab container registry with your gitlab credentials: `docker login code.kathmandulivinglabs.org:5555`
* Build docker image: `docker build -t code.kathmandulivinglabs.org:5555/c2m2-mongolia/c2m2-api/dev:${version_number.dd.mm.yyyy} .`
* Push docker image: `docker push code.kathmandulivinglabs.org:5555/c2m2-mongolia/c2m2-api/dev:${version_number.dd.mm.yyyy}`

### Run API server using docker image

* Copy the latest docker image from container registry and paste it in the `docker-compose.yml` file
* Run the server: `docker-compose up`

### Open source configuration

* [Location configuration](docs/location.md): Configuration steps to use administrative boundary files in the project.
* [DB configuration](docs/database.md): Configuration steps for database modelling and setup in the project

### Contributing

If you'd like to contribute, clone the repository and push your changes to `data-portal-cityname` branch. You may also fork the repository and contribute to this open source data portal API.

### Links

* [API Documentation](http://178.128.59.143:8080/apidocs/): Existing API doc link for Mongolia health portal.
* [Issue tracker](): Link to issue board for mongolia health portal backend repository.

## Partners

This project is a part of the C2M2 project with Kathmandu Living Labs and Public Lab Mongolia as project partners.

<a href="https://www.publiclabmongolia.org/" target="_blank"><img src="https://www.publiclabmongolia.org/wp-content/uploads/2019/11/cropped-logo-design-public-1-100x103.png" height="80" width="80"></a>
<a href="http://www.kathmandulivinglabs.org/" target="_blank"><img src="https://avatars.githubusercontent.com/u/5390948?s=280&v=4" height="80" width="80"></a>

## License

This project is licensed under the MIT license.