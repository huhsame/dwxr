
module.exports = {
    generateUUID: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 3 | 8);
            return v.toString(16);
        });
    },
    checkEmpty: function( obj ){
        return (Object.entries( obj ).length === 0 && obj.constructor === Object)
    }

};
