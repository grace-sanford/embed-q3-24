## Context

This is a environment for testing embed use-cases. It uses [this document](https://app.sigmacomputing.com/sigma-support/workbook/GS-Q3-24-Embed-Main-17S6AE3gIPEpthqvCWler8) in the sigma-support instance.

There's a public team called [Grace Test Embed Team](https://app.sigmacomputing.com/sigma-support/admin/teams/208e07fa-2d9f-4520-9c9a-cb461927c9cd) within sigma-support with several users that have variously configured member types and emails for testing. For example:
- try `grace's.sanford+8@sigmacomputing.com` to test encoding special characters in an embed URL
- try `grace.sanford+9@sigmacomputing.com` to see what it looks like when an `Internal` Member tries to access an embed
- try `grace.sanford+9@sigmacomputing.com` to see what it looks like when an `Guest` Member tries to access an embed

## Set up
- Clone this repo
- Run `npm install` to install packages and dependencies
- Using the variables defined in the `.sample.env` file of this repo, configure your own `.env` file 
- Run `npm start` command to start up the server. node-supervisor should watch files for changes, but if you need to restart the server run `rs`
- Run `npm start events` command to test code in the `/events` directory