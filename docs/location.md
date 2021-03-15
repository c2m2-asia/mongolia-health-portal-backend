## Location configuration

### Setup

* Update the [config file](https://github.com/c2m2-asia/mongolia-health-portal-backend/blob/main/src/config/config.js) with

    - required `amenities` for which data is to be fetched.
    - administrative divisions or `admindivisions` of the particular region or city.
    - `city` name
    - `tags` for the type and kind of data you are fetching.

> **NOTE:** These variables are dependent entities and are used across various modules throughout the project.


* Navigate to [adminboudaries](/adminboudaries) folder and 

    - Replace the `Ulaanbaatar.geojson` file with the particular region's boundary file.

> **NOTE:** Name the file with the same name that you've mentioned in `city` inside [config file](https://github.com/c2m2-asia/mongolia-health-portal-backend/blob/main/src/config/config.js).

* Depending on the location divisions of the particular region you're working on, update admin level folders with required boundary files.
* For the location division update the [meta.json](https://github.com/c2m2-asia/mongolia-health-portal-backend/blob/main/src/config/meta.json) file with the particular region's administrative divisions.
