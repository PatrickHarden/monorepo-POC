import os, shutil, json

team = input("Enter your team  (global-listings [default] or spacespot):") or "global-listings"

if team != "global-listings" and team != "spacespot":
    print("Please try again.  Valid entries are global-listings or spacespot")
    team = input("Enter your team  (global-listings [default] or spacespot):") or "global-listings"

if team != "global-listings" and team != "spacespot":
    print("Valid entries are global-listings or spacespot, sorry. Try again later.")
    exit()

packageName = input("Enter the name of the package: ")
packageName = packageName.lower()    # ensure its lowercase

packagePrefix = ""
packageDir = "packages/"

if team == "global-listings":
    packagePrefix = "@ryanshaug/"
    packageDir += "global-listings/"
elif team == "spacespot":
    packagePrefix = "@spacespot/"
    packageDir += "spacespot/"
else:
    print("unknown error")
    exit()

version = input("Enter the package version (0.0.1): ") or "0.0.1"

description = input("Enter a package description: ") or packageName
author = input("Enter author name: ") or team
homepage = input("Homepage: " ) or "https://www.cbre.com"

fullPackagePath = os.path.join(packageDir,packageName)

if os.path.isdir(fullPackagePath) == False:

    # copy all files into the new directory from the template folder
    shutil.copytree("template", fullPackagePath)

    # after we save, setup the package name in package.json
    packageJSONFile = os.path.join(fullPackagePath,"package.json")

    if os.path.isfile(packageJSONFile) == True:

        with open(packageJSONFile, mode='r+') as f:
            data = json.load(f)
            data["name"] = packagePrefix + packageName
            data["version"] = version
            data["description"] = description
            data["author"] = author
            data["homepage"] = homepage
            f.seek(0)
            json.dump(data, f, indent=4)
            f.truncate()

        # now cd to the directory and yarn to update the package and ready it for use
        os.chdir(fullPackagePath)
        os.system('yarn')
        os.system('yarn link')


        print("\n---------\n")
        print("Your package is created!  It is located here: " + fullPackagePath + " Now go make something cool!")

    else:
        print("There was an error editing the package.json file, please do it manually to setup your package name")

else: 

    print("That package exists already, please try again.")    