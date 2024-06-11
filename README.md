# Monorepository proof of concept
# Author: Ryan Shaughnessy (ryan.shaughnessy@cbre.com)

### Getting Started ###
(1) Install yarn (https://classic.yarnpkg.com/en/)
(2) Open a console
(3) Issue the following commands:

yarn
lerna bootstrap

### Creating a new package ###
(1) Issue the following command:

yarn create-package

(2) Follow the console prompts.  Upon successful completion, your package will be created. 
NOTE: the script for this is rough.  No validation checking. Ensure package names would work as 
an NPM repository.

### adding a new package ###
You may proceed with adding new packages as required by your package. A few things to note:

(1) You can add within the package (cd to the package, and do "yarn add")

(2) You can add from the root of the monorepo with this command:

lerna add --scope name_of_package npm_package_to_install

Please note that the name_of_package should match the name found in the package.json of the package. 

For example, if I wanted to run a package located in "packages/global-listings/gl-controls" with a package name of "@cbre/gl-controls", the proper command would be:

lerna add --scope @cbre/gl-controls some_npm_package  (in other words, its not the path, that will fail)

(3) WARNING!, if you just do "lerna add npm_package_to_install" with no scope, it will add the dependency to all packages.  This is
not recommended unless you know all packages need the library in question.

It is always recommended to run the following command after adding a new package:

lerna bootstrap

This ensures the newly added package is added to node_modules and everything is glued together properly.

### publishing ###

To publish, you will need to have an NPM login.  In addition, the create_package.py script (./scripts) has 
my personal NPM hardcoded as the prefix (@ryanshaug), so you'd need to both login and change this to publish.

When you are ready to publish the preferred method is to:

(1) Commit your changes

(2) At root, issue the following command:

lerna publish

(3) Lerna will check through all packages and if there is a change, it will prompt you to increment the version number.

### unit testing ###

You can unit test either at the top application level or at an individual package level.

For all tests in the monorepo:

yarn lerna run test --stream

At local:

yarn test

OR (from root)

lerna run test --scope PACKAGE_NAME

### storybook ###

Like with other aspects of the application, you can either run locally (cd into the directory) or globally.
If you run local to the package, you will only see the components in that package:

yarn storybook

If you run globally, you will compile and see all stories in the mono repository:

yarn lerna run storybook

If you want to run storybook from root for only one package:

lerna run storybook --scope PACKAGE_NAME

### local server ###

A local server exists in each package that you can add components to for visual testing purposes. 

The file to modify in each package is: local-server/app.tsx

You can modify this file however you please to assist with development.  

To run the server, you can either:

(1) cd into the package directory root and type the command:

yarn start

OR

(2) from the root, type the command: lerna run test --scope PACKAGE_NAME

##### symlinks #####

If you use the yarn create-package command, then a symlink will be automatically created for use within other components.  For example,
if I wanted to use a component from gl-controls in another package, I would just need to import using the symlink (instead of doing
something like yarn add ...).  Lerna manages all dependencies. 
