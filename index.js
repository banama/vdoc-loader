module.exports = function (content) {
    var self = this
    this.cacheable()
    var options = this.options.vue || {}
    var output = "vdoc.add({"
    var temp = JSON.parse(content)
    Object.keys(temp).forEach(function(key){
        var data = temp[key]
        output += `
            '${data.route}': {
                path: '${data.path}',
                route: '${data.route}',
                get: `
        output += new Function(`
                return function(res){
                    require(["-!doc-loader?route=${data.route}!..${data.path}"], res)
                }`)()
        output += "},"
    })
    output += "});"
    output += `module.exports = ${content}`
    return output
}
