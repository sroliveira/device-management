const Category = require('./Category');

module.exports = class Device {
     
    constructor(id, color, partnumber, category) {
        this.id = id;
        this.color = color;
        this.partnumber = partnumber;
        this.category = category;
    }
}