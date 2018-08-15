const fs = require('fs-extra')
const path = require('path')

const methods = {
    clean: function (pathName) {
        fs.emptyDirSync(path.join(__dirname, '../' + pathName))
    },
    init: function (pathName) {
        this.clean(pathName)
    }
}

let action = process.argv[2]
if (action) {
    methods.init(action)
}