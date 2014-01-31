const data = require('sdk/self').data;
const tabs = require('sdk/tabs');
const notify = require('sdk/notifications').notify;

let btn;

exports.main = function(options) {

    btn = require("toolbarbutton").ToolbarButton({
        id: 'my-toolbar-button',
        label: 'Add skull!',
        image: data.url('favicon.png'),
        onCommand: function() {
            notify({
                title: "Some title!",
                text: "Some text",
                data: "some data",
                onClick: function (data) {
                    require('sdk/tabs').open('data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E');
                }
            });
        }
    });
    
    if (options.loadReason === "install") {
        btn.moveTo({
        toolbarID: "nav-bar",
            forceMove: false // only move from palette
        });
    }
};